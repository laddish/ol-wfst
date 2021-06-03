# OpenLayers WFST

Tiny WFST-T client to insert (drawing/uploading), modify and delete features on GeoServers using OpenLayers. Layers with these types of geometries are supported: _GeometryCollection_ (in this case, you can choose the geometry type of each element to draw), _Point_, _MultiPoint_, _LineString_, _MultiLineString_, _Polygon_ and _MultiPolygon_.

Tested with OpenLayers version 5 and 6.

<img src="screenshots/example-1.jpg" alt="Drawing" style="width:50%; float:left;">
<img src="screenshots/example-2.jpg" alt="Editing fields" style="width:50%; float:left;">

## Usage

See [Wfst Options](#options) for more details.

```javascript
import 'Wfst' from 'ol-wfst';
import { Fill, Stroke, Circle, Style } from 'ol/style';

// Css
import 'ol-wfst/lib/css/ol-wfst.css';
import 'ol-wfst/lib/css/bootstrap-modal.min.css'; // Do not import if you already have boostrap css

// Optional credentials
const password = 123456;
const username = 'username';

const wfst = new Wfst(map, {
    geoServerUrl: 'https://mysite.com/geoserver/myworkspace/ows',
    headers: { Authorization: 'Basic ' + btoa(username + ':' + password) },
    layers: [
        {
            name: 'myPointsLayer', // Name of the layer on the GeoServer
            label: 'Photos', // Optional Label to be displayed in the controller
            mode: 'wfs',
            zIndex: 99,
            style: new Style({
                image: new Circle({
                    radius: 7,
                    fill: new Fill({
                        color: '#000000'
                    }),
                    stroke: new Stroke({
                        color: [255, 0, 0],
                        width: 2
                    })
                })
            })
        },
        {
            name: 'myMultiGeometryLayer',
            label: 'Other elements'
        },
        {
            name: 'myLineStringLayer',
            label: 'Routes',
            visible: false
        }
    ],
    language: 'en',
    minZoom: 12,
    showUpload: true,
    beforeInsertFeature: function (feature) {
        // Add a custom value o perform an action before insert features
        feature.set('customProperty', 'customValue', true);
        return feature;
    }
});
```

### Some considerations

-   If the features/vertex appear to be slightly offset after adding them, check the _Number of Decimals_ in your Workplace, you may have to increment that to have a more accurete preview.
-   You can configure a _Basic Authentication_ or an _HTTP Header Proxy Authentication_ with this client, but in some cases is recommended setting that on an reverse proxy on the backend.
-   If you don't use a reverse proxy, remeber configure [cors](https://docs.geoserver.org/latest/en/user/production/container.html#enable-cors)

## Changelog

See [CHANGELOG](./CHANGELOG.md) for details of changes in each release.

## Install

The module uses [modal-vanilla](https://github.com/KaneCohen/modal-vanilla) as a peerDependency to show alerts, forms and messages. The Browser version has been bundled with this.

### Browser

#### JS

Load `ol-wfst.js` after OpenLayers. Wfst is available as `Wfst`.

```HTML
<script src="https://unpkg.com/ol-wfst@2.0.0"></script>
```

#### CSS

```HTML
<link rel="stylesheet" href="https://unpkg.com/ol-wfst@2.0.0/dist/css/ol-wfst.min.css" />
<link rel="stylesheet" href="https://unpkg.com/ol-wfst@2.0.0/dist/css/bootstrap.min.css" />
```

### Parcel, Webpack, etc.

NPM package: [ol-wfst](https://www.npmjs.com/package/ol-wfst).

#### JS

Install the package via `npm`

    npm install ol-wfst --save-dev

#### CSS

The CSS files can be found in `./node_modules/ol-wfst/lib`

##### TypeScript type definition

TypeScript types are shipped with the project in the dist directory and should be automatically used in a TypeScript project. Interfaces are provided for Wfst Options.

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [Wfst](#wfst)
    -   [Parameters](#parameters)
    -   [\_changeStateSelect](#_changestateselect)
        -   [Parameters](#parameters-1)
    -   [activateDrawMode](#activatedrawmode)
        -   [Parameters](#parameters-2)
    -   [activateEditMode](#activateeditmode)
        -   [Parameters](#parameters-3)
    -   [insertFeaturesTo](#insertfeaturesto)
        -   [Parameters](#parameters-4)
-   [Options](#options)
    -   [geoServerUrl](#geoserverurl)
    -   [headers](#headers)
    -   [layers](#layers)
    -   [active](#active)
    -   [evtType](#evttype)
    -   [useLockFeature](#uselockfeature)
    -   [showControl](#showcontrol)
    -   [minZoom](#minzoom)
    -   [modal](#modal)
    -   [language](#language)
    -   [i18n](#i18n)
    -   [showUpload](#showupload)
    -   [uploadFormats](#uploadformats)
    -   [processUpload](#processupload)
        -   [Parameters](#parameters-5)
    -   [beforeInsertFeature](#beforeinsertfeature)
        -   [Parameters](#parameters-6)
-   [LayerParams](#layerparams)
    -   [name](#name)
    -   [label](#label)
    -   [mode](#mode)
    -   [wfsStrategy](#wfsstrategy)
    -   [cqlFilter](#cqlfilter)
    -   [tilesBuffer](#tilesbuffer)
-   [I18n](#i18n-1)
    -   [labels](#labels)
    -   [errors](#errors)

### Wfst

Tiny WFST-T client to insert (drawing/uploading), modify and delete
features on GeoServers using OpenLayers. Layers with these types
of geometries are supported: "GeometryCollection" (in this case, you can
choose the geometry type of each element to draw), "Point", "MultiPoint",
"LineString", "MultiLineString", "Polygon" and "MultiPolygon".

#### Parameters

-   `map` **[PluggableMap](https://openlayers.org/en/latest/apidoc/module-ol_PluggableMap-PluggableMap.html)** Instance of the created map
-   `opt_options` **[Options](#options)?** Wfst options, see [Wfst Options](#options) for more details.

#### \_changeStateSelect

Update geom Types availibles to select for this layer

##### Parameters

-   `layerName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**
-   `geomDrawTypeSelected` **GeometryType** (optional, default `null`)

Returns **GeometryType**

#### activateDrawMode

Activate/deactivate the draw mode

##### Parameters

-   `layerName` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean))**

Returns **void**

#### activateEditMode

Activate/desactivate the edit mode

##### Parameters

-   `bool` (optional, default `true`)

Returns **void**

#### insertFeaturesTo

Add features directly to the geoserver, in a custom layer
without checking geometry or showing modal to confirm.

##### Parameters

-   `layerName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**
-   `features` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;Feature>**

Returns **void**

### Options

**_[interface]_** - Wfst Options specified when creating a Wfst instance

Default values:

```javascript
{
 geoServerUrl: null,
 headers: {},
 layers: null,
 evtType: 'singleclick',
 active: true,
 showControl: true,
 useLockFeature: true,
 minZoom: 9,
 language: 'en',
 i18n: {...}, // according to language selection
 uploadFormats: '.geojson,.json,.kml',
 processUpload: null,
 beforeInsertFeature: null,
}
```

#### geoServerUrl

Url for OWS services. This endpoint will recive the WFS, WFST and WMS requests

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### headers

Url headers for GeoServer requests. You can use it to add Authorization credentials

Type: HeadersInit

#### layers

Layers to be loaded from the geoserver

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[LayerParams](#layerparams)>

#### active

Init active

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

#### evtType

The click event to allow selection of Features to be edited

Type: (`"singleclick"` \| `"dblclick"`)

#### useLockFeature

Use LockFeatue request on GeoServer when selecting features.
This is not always supportedd by the GeoServer.
See <https://docs.geoserver.org/stable/en/user/services/wfs/reference.html>

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

#### showControl

Show/hide the control map

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

#### minZoom

Zoom level to hide features to prevent too much features being loaded

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

#### modal

Modal configuration

Type: {animateClass: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?, animateInClass: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?, transition: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?, backdropTransition: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?, templates: {dialog: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element))?, headerClose: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element))?}?}

#### language

Language to be used

Type: (`"es"` \| `"en"`)

#### i18n

Custom translations

Type: [I18n](#i18n)

#### showUpload

Show/hide the upload button

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

#### uploadFormats

Accepted extension formats on upload
Example: ".json,.geojson"

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### processUpload

Triggered to allow implement custom functions or to parse other formats than default
by filtering the extension. If this doesn't return features, the default function
will be used to extract them.

##### Parameters

-   `file` **File**

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;Feature>**

#### beforeInsertFeature

Triggered before inserting new features to the Geoserver.
Use this to insert custom properties, modify the feature, etc.

##### Parameters

-   `feature` **Feature**

Returns **Feature**

### LayerParams

**Extends Omit&lt;[VectorLayerOptions](https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html), 'source'>**

**_[interface]_** - Parameters to create the layers and connect to the GeoServer

You can use all the parameters supported by OpenLayers

Default values:

```javascript
{
 name: null,
 label: (same as name),
 mode: 'wfs',
 wfsStrategy: 'bbox',
 cqlFilter: null,
 tilesBuffer: 0,
}
```

#### name

Layer name in the GeoServer

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### label

Label to be displayed in the widget control

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### mode

Mode to use in the layer

Type: (`"wfs"` \| `"wms"`)

#### wfsStrategy

Strategy function for loading features. Only works if mode is "wfs"

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### cqlFilter

The cql_filter GeoServer parameter is similar to the standard filter parameter,
but the filter is expressed using ECQL (Extended Common Query Language).
ECQL provides a more compact and readable syntax compared to OGC XML filters.
For full details see the [ECQL Reference](https://docs.geoserver.org/stable/en/user/filter/ecql_reference.html#filter-ecql-reference) and CQL and ECQL tutorial.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### tilesBuffer

The buffer parameter specifies the number of additional
border pixels that are used on requesting rasted tiles
Only works if mode is 'wms'

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### I18n

**_[interface]_** - Custom Language specified when creating a WFST instance

#### labels

Labels section

Type: {select: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), addElement: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), editElement: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), save: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), delete: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), cancel: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), apply: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), upload: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), editMode: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), confirmDelete: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), geomTypeNotSupported: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), editFields: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), editGeom: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), selectDrawType: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), uploadToLayer: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), uploadFeatures: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), validFeatures: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), invalidFeatures: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), loading: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), toggleVisibility: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), close: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)}

#### errors

Errors section

Type: {capabilities: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), wfst: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), layer: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), noValidGeometry: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), geoserver: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), badFormat: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), badFile: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), lockFeature: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), transaction: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), getFeatures: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)}

## TODO

-   ~~Add support to diferent layer styles~~
-   ~~Improve widget controller: visibility toggle~~
-   Add cookies to persist widget controller state
-   Geometry type _LinearRing_ support
-   Tests!
-   Improve comments and documentation

## License

MIT (c) Gastón Zalba.
