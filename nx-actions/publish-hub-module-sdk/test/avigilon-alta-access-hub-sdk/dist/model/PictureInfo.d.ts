import { URL } from '@zerobias-org/types-core-js';
/**
* Picture file information
*/
export declare class PictureInfo {
    /**
    * MIME type of the image
    */
    'contentType'?: string;
    /**
    * Name of the picture file
    */
    'fileName'?: string;
    /**
    * URL to the picture
    */
    'url'?: URL;
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
    static newInstance(obj: any): PictureInfo;
    constructor(contentType?: string, fileName?: string, url?: URL);
}
