/**
* Card credential information
*/
export declare class OrgCredentialCard {
    /**
    * Card identifier
    */
    'id'?: string;
    /**
    * Card number
    */
    'number'?: string;
    /**
    * Card facility code
    */
    'facilityCode'?: string;
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
    static newInstance(obj: any): OrgCredentialCard;
    constructor(id?: string, number?: string, facilityCode?: string);
}
