/**
* ACU (Access Control Unit) associated with an entry
*/
export declare class EntryAcu {
    /**
    * ACU identifier
    */
    'id': string;
    /**
    * ACU name
    */
    'name': string;
    /**
    * Whether ACU is in gateway mode
    */
    'isGatewayMode'?: boolean;
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
    static newInstance(obj: any): EntryAcu;
    constructor(id: string, name: string, isGatewayMode?: boolean);
}
