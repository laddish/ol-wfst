import { Feature, PluggableMap, View, Overlay } from 'ol';
import { KML, WFS, GeoJSON } from 'ol/format';
import { Vector as VectorLayer, Tile as TileLayer } from 'ol/layer';
import { Draw, Modify, Select, Snap } from 'ol/interaction';
import { EventsKey } from 'ol/events';
import { Style } from 'ol/style';
import Control from 'ol/control/Control';
import Modal from 'modal-vanilla';
/**
 * @constructor
 * @param {class} map
 * @param {object} opt_options
 */
export default class Wfst {
    map: PluggableMap;
    view: View;
    overlay: Overlay;
    viewport: HTMLElement;
    protected options: Options;
    protected _i18n: i18n;
    protected _editedFeatures: Set<string>;
    protected _mapLayers: Array<VectorLayer | TileLayer>;
    protected _geoServerData: LayerData;
    protected _useLockFeature: boolean;
    protected _hasLockFeature: boolean;
    protected _hasTransaction: boolean;
    protected _geoServerCapabilities: XMLDocument;
    protected _editLayer: VectorLayer;
    protected _isEditModeOn: boolean;
    protected _isDrawModeOn: boolean;
    protected _editFeature: Feature;
    protected _editFeatureOriginal: Feature;
    protected _layerToInsertElements: string;
    protected _insertFeatures: Array<Feature>;
    protected _updateFeatures: Array<Feature>;
    protected _deleteFeatures: Array<Feature>;
    protected interactionWfsSelect: Select;
    protected interactionSelectModify: Select;
    protected interactionModify: Modify;
    protected interactionSnap: Snap;
    protected interactionDraw: Draw;
    protected _keyClickWms: EventsKey | EventsKey[];
    protected _keyRemove: EventsKey;
    protected _keySelect: EventsKey;
    protected _formatWFS: WFS;
    protected _formatGeoJSON: GeoJSON;
    protected _formatKml: KML;
    protected _xs: XMLSerializer;
    protected _countRequests: number;
    protected modal: typeof Modal;
    protected _controlApplyDiscardChanges: Control;
    protected _controlWidgetTools: Control;
    protected _isVisible: boolean;
    protected _currentZoom: number;
    protected _lastZoom: number;
    constructor(map: PluggableMap, opt_options?: Options);
    /**
     *
     * @param layers
     * @param showControl
     * @param active
     * @private
     */
    _initAsyncOperations(): Promise<void>;
    /**
     *
     * @param layers
     * @private
     */
    _connectToGeoServer(): Promise<boolean>;
    /**
     *
     * @param showControl
     * @param active
     * @private
     */
    _initMapElements(showControl: boolean, active: boolean): Promise<void>;
    /**
     * Layer to store temporary all the elements to edit
     * @private
     */
    _createEditLayer(): void;
    /**
     * Add already created layers to the map
     * @param layers
     * @public
     */
    addLayers(layers: Array<VectorLayer | TileLayer>): void;
    /**
     * Lock a feature in the geoserver before edit
     * @param featureId
     * @param layerName
     * @todo fix cql filter
     */
    _lockFeature(featureId: string | number, layerName: string, retry?: number): Promise<void>;
    /**
     *
     * @param layers
     * @private
     */
    _getLayersData(layers: Array<LayerParams>, geoServerUrl: string): Promise<void>;
    /**
     *
     * @param layers
     * @private
     */
    _createLayers(layers: Array<LayerParams>): void;
    /**
     *
     * @param msg
     * @private
     */
    _showError(msg: string): void;
    /**
     *
     * @param mode
     * @param features
     * @private
     */
    _transactWFS(mode: string, features: Array<Feature> | Feature, layerName: string): Promise<void>;
    /**
     *
     * @param feature
     * @private
     */
    _removeFeatureFromEditList(feature: Feature): void;
    /**
     *
     * @param feature
     * @private
     */
    _addFeatureToEditedList(feature: Feature): void;
    /**
     *
     * @param feature
     * @private
     */
    _isFeatureEdited(feature: Feature): boolean;
    /**
     * @private
     */
    _addInteractions(): void;
    /**
     *
     * @param feature
     * @private
     */
    _cancelEditFeature(feature: Feature): void;
    /**
     *
     * @param feature
     * @private
     */
    _finishEditFeature(feature: Feature): void;
    /**
     * @private
     */
    _selectFeatureHandler(): void;
    /**
     * @private
     */
    _removeFeatureHandler(): void;
    /**
     * @private
     */
    _addHandlers(): void;
    /**
     *
     * @param feature
     * @private
     */
    _styleFunction(feature: Feature): Array<Style>;
    _addControl(): void;
    /**
     *
     * @param feature
     * @private
     */
    _editModeOn(feature: Feature): void;
    /**
     * @private
     */
    _editModeOff(): void;
    /**
     * Remove a feature from the edit Layer and from the Geoserver
     * @param feature
     * @private
     */
    _deleteElement(feature: Feature, confirm: boolean): void;
    /**
     * Add Keyboards events to allow shortcuts on editing features
     * @private
     */
    _addKeyboardEvents(): void;
    /**
     * Add a feature to the Edit Layer to allow editing, and creates an Overlay Helper to show options
     *
     * @param feature
     * @param coordinate
     * @param layerName
     * @private
     */
    _addFeatureToEdit(feature: Feature, coordinate?: any, layerName?: any): void;
    /**
     * Removes in the DOM the class of the tools
     * @private
     */
    _resetStateButtons(): void;
    /**
    * Confirm to uplaod file
    *
    * @param feature
    * @private
    */
    _initUploadFileModal(content: string, featuresToInsert: Array<Feature>): void;
    /**
     * Parse and verify uploaded files
     * @param evt
     * @private
     */
    _processUploadFile(evt: Event): Promise<void>;
    /**
     * Add the widget on the map to allow change the tools and select active layers
     * @private
     */
    _addControlTools(): void;
    /**
     * Add features to the geoserver, in a custom layer
     * This is useful to use on uploading files
     *
     * @param layerName
     * @param features
     * @public
     */
    insertFeaturesTo(layerName: string, features: Array<Feature>): void;
    /**
     * Activate/deactivate the draw mode
     * @param bool
     * @public
     */
    activateDrawMode(bool: string | boolean): void;
    /**
     * Activate/desactivate the edit mode
     * @param bool
     * @public
     */
    activateEditMode(bool?: boolean): void;
    /**
     * Shows a fields form in a modal window to allow changes in the properties of the feature.
     *
     * @param feature
     * @private
     */
    _initEditFieldsModal(feature: Feature): void;
    /**
     * Remove the overlay helper atttached to a specify feature
     * @param feature
     * @private
     */
    _removeOverlayHelper(feature: Feature): void;
}
/**
 * **_[interface]_** - Data obtainen from geoserver
 * @protected
 */
interface LayerData {
    namespace?: string;
    properties?: Record<string, unknown>;
    geomType?: string;
}
/**
 * **_[interface]_** - Custom Language specified when creating a WFST instance
 */
interface i18n {
    labels: {
        select: string;
        addElement: string;
        editElement: string;
        save: string;
        delete: string;
        cancel: string;
        apply: string;
        upload: string;
        editMode: string;
        confirmDelete: string;
        editFields: string;
        editGeom: string;
        uploadToLayer: string;
        uploadFeatures: string;
        validFeatures: string;
        invalidFeatures: string;
    };
    errors: {
        capabilities: string;
        wfst: string;
        layer: string;
        noValidGeometry: string;
        geoserver: string;
        badFormat: string;
        badFile: string;
        lockFeature: string;
        transaction: string;
        getFeatures: string;
    };
}
/**
 * **_[interface]_** - Parameters to create an load the GeoServer layers
 */
interface LayerParams {
    name: string;
    label?: string;
    cql_filter?: string;
    buffer?: number;
}
/**
 * **_[interface]_** - Wfst Options specified when creating a Wfst instance
 *
 * Default values:
 * ```javascript
    * {
    *  geoServerUrl: null,
    *  headers: {},
    *  layers: null,
    *  layerMode: 'wms',
    *  evtType: 'singleclick',
    *  active: true,
    *  showControl: true,
    *  useLockFeature: true,
    *  minZoom: 9,
    *  language: 'es',
    *  uploadFormats: '.geojson,.json,.kml'
    *  processUpload: null,
    *  beforeInsertFeature: null,
    * }
    * ```
 */
interface Options {
    /**
     * Url for OWS services. This endpoint will recive the WFS, WFST and WMS requests
     */
    geoServerUrl: string;
    /**
     * Url headers for GeoServer requests. You can use it to add the Authorization credentials
     */
    headers?: HeadersInit;
    /**
    * Layers names to be loaded from teh geoserver
    */
    layers?: Array<LayerParams>;
    /**
     * Service to use as base layer. You can choose to use vectors or raster images
     */
    layerMode?: 'wfs' | 'wms';
    /**
     * Strategy function for loading features if layerMode is on "wfs" requests
     */
    wfsStrategy?: string;
    /**
     * Click event to select the features
     */
    evtType?: 'singleclick' | 'dblclick';
    /**
     * Initialize activated
     */
    active?: boolean;
    /**
     * Use LockFeatue request on GeoServer when selecting features.
     * This is not always supportedd by the GeoServer.
     */
    useLockFeature?: boolean;
    /**
     * Display the control map
     */
    showControl?: boolean;
    /**
     * Zoom level to hide features to prevent too much features being loaded
     */
    minZoom?: number;
    /**
    * Language to be used
    */
    language?: string;
    /**
     * Show/hide the upload button
     */
    upload?: boolean;
    /**
     * Accepted extension formats on upload
     */
    uploadFormats?: string;
    /**
     * Triggered to process the uploaded files.
     * Use this to apply custom preocces or parse custom formats by filtering the extension.
     * If this doesn't return features, the default function will be used to extract the features.
     */
    processUpload?(file: File): Array<Feature>;
    /**
     * Triggered before insert new features to the Geoserver.
     * Use this to insert custom properties, modify the feature, etc.
     */
    beforeInsertFeature?(feature: Feature): Feature;
}
export { Options, i18n };
