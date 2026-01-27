import { VideoProvider } from './VideoProvider.js';
export declare class EntryCamera {
    /**
    * Camera identifier
    */
    'id': string;
    /**
    * Camera name
    */
    'name': string;
    /**
    * Extended camera name
    */
    'nameExt'?: string;
    /**
    * External camera identifier
    */
    'idExt'?: string;
    /**
    * Whether camera supports snapshots
    */
    'supportsSnapshot'?: boolean;
    /**
    * Whether camera supports deep linking
    */
    'supportsDeeplink'?: boolean;
    /**
    * Whether camera supports motion snapshots
    */
    'supportsMotionSnapshot'?: boolean;
    /**
    * Whether camera supports face cropping
    */
    'supportsFaceCrop'?: boolean;
    /**
    * Whether camera supports face detection
    */
    'supportsFaceDetection'?: boolean;
    /**
    * Whether camera supports people detection
    */
    'supportsPeopleDetection'?: boolean;
    /**
    * Whether camera supports motion recap
    */
    'supportsMotionRecap'?: boolean;
    /**
    * Whether camera supports live streaming
    */
    'supportsLivestream'?: boolean;
    /**
    * Video provider identifier
    */
    'videoProviderId'?: number;
    'videoProvider'?: VideoProvider;
    static readonly discriminator: string | undefined;
    static attributeTypeMap: ReadonlyArray<{
        name: string;
        baseName: string;
        type: string;
        format: string;
    }>;
    static getAttributeTypeMap(): readonly {
        name: string;
        baseName: string;
        type: string;
        format: string;
    }[];
    static newInstance(obj: any): EntryCamera;
    constructor(id: string, name: string, nameExt?: string, idExt?: string, supportsSnapshot?: boolean, supportsDeeplink?: boolean, supportsMotionSnapshot?: boolean, supportsFaceCrop?: boolean, supportsFaceDetection?: boolean, supportsPeopleDetection?: boolean, supportsMotionRecap?: boolean, supportsLivestream?: boolean, videoProviderId?: number, videoProvider?: VideoProvider);
}
