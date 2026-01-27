/**
* Card credential information
*/
export declare class UserCredentialCard {
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
    /**
    * Card ID
    */
    'cardId'?: string;
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
    static newInstance(obj: any): UserCredentialCard;
    constructor(id?: string, number?: string, facilityCode?: string, cardId?: string);
}
