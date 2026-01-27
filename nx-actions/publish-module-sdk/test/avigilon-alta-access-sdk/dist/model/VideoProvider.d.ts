/**
* Video provider information for camera integration
*/
export declare class VideoProvider {
    /**
    * Video provider identifier
    */
    'id': string;
    /**
    * Video provider type identifier
    */
    'videoProviderTypeId': string;
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
    static newInstance(obj: any): VideoProvider;
    constructor(id: string, videoProviderTypeId: string);
}
