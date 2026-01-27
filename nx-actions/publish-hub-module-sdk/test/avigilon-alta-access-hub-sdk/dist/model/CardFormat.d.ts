/**
* Card format configuration
*/
export declare class CardFormat {
    /**
    * Card format identifier
    */
    'id': string;
    /**
    * Card format name
    */
    'name'?: string;
    /**
    * Card format code
    */
    'code'?: string;
    /**
    * Card format description
    */
    'description'?: string;
    /**
    * Bit length of the card format
    */
    'bitLength'?: number;
    /**
    * Facility code start position
    */
    'facilityCodeStart'?: number;
    /**
    * Facility code length
    */
    'facilityCodeLength'?: number;
    /**
    * Card number start position
    */
    'cardNumberStart'?: number;
    /**
    * Card number length
    */
    'cardNumberLength'?: number;
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
    static newInstance(obj: any): CardFormat;
    constructor(id: string, name?: string, code?: string, description?: string, bitLength?: number, facilityCodeStart?: number, facilityCodeLength?: number, cardNumberStart?: number, cardNumberLength?: number);
}
