import { ObjectSerializer } from './index.js';
export class EntryCamera {
    /**
    * Camera identifier
    */
    'id';
    /**
    * Camera name
    */
    'name';
    /**
    * Extended camera name
    */
    'nameExt';
    /**
    * External camera identifier
    */
    'idExt';
    /**
    * Whether camera supports snapshots
    */
    'supportsSnapshot';
    /**
    * Whether camera supports deep linking
    */
    'supportsDeeplink';
    /**
    * Whether camera supports motion snapshots
    */
    'supportsMotionSnapshot';
    /**
    * Whether camera supports face cropping
    */
    'supportsFaceCrop';
    /**
    * Whether camera supports face detection
    */
    'supportsFaceDetection';
    /**
    * Whether camera supports people detection
    */
    'supportsPeopleDetection';
    /**
    * Whether camera supports motion recap
    */
    'supportsMotionRecap';
    /**
    * Whether camera supports live streaming
    */
    'supportsLivestream';
    /**
    * Video provider identifier
    */
    'videoProviderId';
    'videoProvider';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "id",
            "baseName": "id",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "name",
            "baseName": "name",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "nameExt",
            "baseName": "nameExt",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "idExt",
            "baseName": "idExt",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "supportsSnapshot",
            "baseName": "supportsSnapshot",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "supportsDeeplink",
            "baseName": "supportsDeeplink",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "supportsMotionSnapshot",
            "baseName": "supportsMotionSnapshot",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "supportsFaceCrop",
            "baseName": "supportsFaceCrop",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "supportsFaceDetection",
            "baseName": "supportsFaceDetection",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "supportsPeopleDetection",
            "baseName": "supportsPeopleDetection",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "supportsMotionRecap",
            "baseName": "supportsMotionRecap",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "supportsLivestream",
            "baseName": "supportsLivestream",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "videoProviderId",
            "baseName": "videoProviderId",
            // false
            // number
            // number
            "type": "number",
            "format": ""
        },
        {
            "name": "videoProvider",
            "baseName": "videoProvider",
            // false
            // VideoProvider
            // VideoProvider
            "type": "VideoProvider",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return EntryCamera.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'EntryCamera');
    }
    constructor(id, name, nameExt, idExt, supportsSnapshot, supportsDeeplink, supportsMotionSnapshot, supportsFaceCrop, supportsFaceDetection, supportsPeopleDetection, supportsMotionRecap, supportsLivestream, videoProviderId, videoProvider) {
        this.id = id;
        this.name = name;
        this.nameExt = nameExt;
        this.idExt = idExt;
        this.supportsSnapshot = supportsSnapshot;
        this.supportsDeeplink = supportsDeeplink;
        this.supportsMotionSnapshot = supportsMotionSnapshot;
        this.supportsFaceCrop = supportsFaceCrop;
        this.supportsFaceDetection = supportsFaceDetection;
        this.supportsPeopleDetection = supportsPeopleDetection;
        this.supportsMotionRecap = supportsMotionRecap;
        this.supportsLivestream = supportsLivestream;
        this.videoProviderId = videoProviderId;
        this.videoProvider = videoProvider;
    }
}
