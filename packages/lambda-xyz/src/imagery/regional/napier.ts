import { EPSG } from '@basemaps/geo';
import { MosaicCog } from '../../tiff.mosaic';

MosaicCog.create({
    id: '01E04AQY3QVYPVPPTZV6VFFBYT',
    name: 'napier-city_urban_2017-18_0-05m',
    projection: EPSG.Wgs84,

    minZoom: 14,
    priority: 150,
    year: 2017,
    resolution: 50,
    quadKeys: [
        '31133321303131',
        '31133321310233',
        '31133321312002',
        '31133321312020',
        '311333213031131',
        '311333213031132',
        '311333213031133',
        '311333213031303',
        '311333213031330',
        '311333213031331',
        '311333213102301',
        '311333213102302',
        '311333213102303',
        '311333213102310',
        '311333213102312',
        '311333213102320',
        '311333213102321',
        '311333213103220',
        '311333213103222',
        '311333213120002',
        '311333213120030',
        '311333213120032',
        '311333213120210',
        '311333213120212',
    ],
});
MosaicCog.create({
    id: '01E04BBBDDTBRX63S0YTQ7ZN2K',
    name: 'napier-city_urban_2017-18_0-1m',
    projection: EPSG.Wgs84,

    minZoom: 14,
    priority: 150,
    year: 2017,
    resolution: 100,
    quadKeys: [
        '311333213120',
        '3113332130313',
        '3113332131002',
        '3113332131020',
        '3113332131022',
        '3113332131023',
        '31133321301311',
        '31133321301313',
        '31133321301331',
        '31133321301332',
        '31133321301333',
        '31133321303110',
        '31133321303111',
        '31133321303113',
        '31133321310002',
        '31133321310003',
        '31133321310012',
        '31133321310030',
        '31133321310032',
        '31133321310212',
        '31133321310213',
        '31133321310302',
        '31133321310320',
        '31133321310322',
        '31133321312120',
        '31133321312122',
        '31133321312210',
    ],
});
