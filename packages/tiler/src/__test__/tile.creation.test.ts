import { LambdaSession, LogConfig } from '@basemaps/shared';
import { CogTiff } from '@cogeotiff/core';
import { CogSourceFile } from '@cogeotiff/source-file';
import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import { PNG } from 'pngjs';
import { Tiler } from '../tiler';
import PixelMatch = require('pixelmatch');

// To regenerate all the expected images set this to true and run the tests
const WRITE_IMAGES = false;

function getExpectedTileName(tileSize: number, x: number, y: number, zoom: number): string {
    return path.join(__dirname, `../../data/expected/tile_${tileSize}_${x}_${y}_z${zoom}.png`);
}
function getExpectedTile(tileSize: number, x: number, y: number, zoom: number): PNG {
    const fileName = getExpectedTileName(tileSize, x, y, zoom);
    const bytes = readFileSync(fileName);
    return PNG.sync.read(bytes);
}

describe('TileCreation', () => {
    // Tiff that is tiled and has WebMercator alignment for its resolution levels
    const tiffPath = path.join(__dirname, '../../data/rgba8_tiled.wm.tiff');
    const tiff = new CogTiff(new CogSourceFile(tiffPath));

    beforeEach(async () => {
        await tiff.init();
        LambdaSession.reset();
        LogConfig.disable();
    });

    it('should generate a tile', async () => {
        // Make a really large tile so this image will be visible at zoom zero
        const tiler = new Tiler(2 ** 20);
        const layers = await tiler.tile([tiff], 0, 0, 0, LogConfig.get());

        expect(layers).not.toEqual(null);
        if (layers == null) throw new Error('Tile is null');

        expect(layers.length).toEqual(1);
        const [layer] = layers;
        expect(layer.id).toEqual(tiff.source.name);
        expect(layer.extract).toEqual({ height: 16, width: 16 });
        expect(layer.resize).toEqual({ height: 2, width: 2 });
        expect(layer.x).toEqual(tiler.tileSize / 2);
        expect(layer.y).toEqual(tiler.tileSize / 2);
    });

    [
        { tileSize: 256, zoom: 18 },
        { tileSize: 256, zoom: 19 },
        { tileSize: 512, zoom: 19 },
        { tileSize: 1024, zoom: 19 },
        { tileSize: 2048, zoom: 19 },
        { tileSize: 4096, zoom: 19 },
    ].forEach(({ tileSize, zoom }) => {
        it(`should render a tile zoom:${zoom} tile: ${tileSize}`, async () => {
            const center = 2 ** zoom;
            const centerTile = center / 2;
            const tiler = new Tiler(tileSize);

            // Make the background black to easily spot flaws
            tiler.raster.background.alpha = 1;
            const layers = await tiler.tile([tiff], centerTile, centerTile, zoom, LogConfig.get());
            expect(layers).not.toEqual(null);
            if (layers == null) throw new Error('Tile is null');

            const png = await tiler.raster.compose(layers, LogConfig.get());
            const newImage = PNG.sync.read(png);
            if (WRITE_IMAGES) {
                const fileName = getExpectedTileName(tileSize, centerTile, centerTile, zoom);
                writeFileSync(fileName, png);
            }

            const expectedImage = await getExpectedTile(tileSize, centerTile, centerTile, zoom);

            const missMatchedPixels = PixelMatch(expectedImage.data, newImage.data, null, tileSize, tileSize);
            if (missMatchedPixels > 0) {
                const fileName = getExpectedTileName(tileSize, centerTile, centerTile, zoom) + '.diff.png';
                const output = new PNG({ width: tileSize, height: tileSize });
                PixelMatch(expectedImage.data, newImage.data, output.data, tileSize, tileSize);
                writeFileSync(fileName, PNG.sync.write(output));
            }
            expect(missMatchedPixels).toEqual(0);
        });
    });
});
