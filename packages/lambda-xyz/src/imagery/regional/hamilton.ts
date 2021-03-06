import { EPSG } from '@basemaps/geo';
import { MosaicCog } from '../../tiff.mosaic';

MosaicCog.create({
    id: '01E06W22PSHWC3325F13PD451Z',
    name: 'hamilton_urban_2016-17_0-1m',
    projection: EPSG.Wgs84,

    minZoom: 14,
    priority: 150,
    year: 2016,
    resolution: 100,
    quadKeys: [
        '311333021001',
        '311333021003',
        '311333021010',
        '311333021012',
        '3113330032232',
        '3113330032233',
        '3113330032322',
        '3113330210112',
        '3113330210130',
        '3113330210132',
        '31133300322302',
        '31133300322303',
        '31133300322312',
        '31133300322313',
        '31133300323202',
        '31133300323203',
        '31133300323232',
        '31133300323233',
        '31133302103001',
        '31133302103010',
        '31133302103011',
        '31133302103100',
        '31133302103101',
    ],
});
