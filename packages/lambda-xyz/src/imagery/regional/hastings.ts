import { EPSG } from '@basemaps/geo';
import { MosaicCog } from '../../tiff.mosaic';

MosaicCog.create({
    id: '01E06WS4SQJ39Z3GXJSMC15EXV',
    name: 'hastings_urban_2014-15_0-1m',
    projection: EPSG.Wgs84,

    minZoom: 14,
    priority: 150,
    year: 2014,
    resolution: 100,
    quadKeys: [
        '31133321303',
        '311333211300',
        '311333211302',
        '311333211320',
        '311333211322',
        '311333213122',
        '311333213201',
        '311333213210',
        '311333213211',
        '311333213213',
        '311333213300',
        '311333213301',
        '311333213302',
        '311333213321',
        '3113332112113',
        '3113332112131',
        '3113332113030',
        '3113332113032',
        '3113332113210',
        '3113332113212',
        '3113332113213',
        '3113332113230',
        '3113332113231',
        '3113332113232',
        '3113332130111',
        '3113332130113',
        '3113332130122',
        '3113332130123',
        '3113332130131',
        '3113332130132',
        '3113332130133',
        '3113332130231',
        '3113332130232',
        '3113332130233',
        '3113332131000',
        '3113332131001',
        '3113332131002',
        '3113332131020',
        '3113332131022',
        '3113332131202',
        '3113332131203',
        '3113332131212',
        '3113332131230',
        '3113332131232',
        '3113332131233',
        '3113332131322',
        '3113332132120',
        '3113332132121',
        '3113332133030',
        '3113332133031',
        '3113332133033',
        '3113332133100',
        '3113332133102',
        '3113332133120',
        '3113332133122',
        '3113332133230',
        '3113332133231',
    ],
});
