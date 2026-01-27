import { ObjectSerializer } from './index.js';
/**
* Picture file information
*/
export class PictureInfo {
    /**
    * MIME type of the image
    */
    'contentType';
    /**
    * Name of the picture file
    */
    'fileName';
    /**
    * URL to the picture
    */
    'url';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "contentType",
            "baseName": "contentType",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "fileName",
            "baseName": "fileName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "url",
            "baseName": "url",
            // false
            // URL
            // URL
            "type": "URL",
            "format": "url"
        }
    ];
    static getAttributeTypeMap() {
        return PictureInfo.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'PictureInfo');
    }
    constructor(contentType, fileName, url) {
        this.contentType = contentType;
        this.fileName = fileName;
        this.url = url;
    }
}
