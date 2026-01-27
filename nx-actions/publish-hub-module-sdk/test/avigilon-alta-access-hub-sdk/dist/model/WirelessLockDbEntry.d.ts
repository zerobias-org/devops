export declare class WirelessLockDbEntry {
    /**
    * Hashed credential number
    */
    'credentialNumberHash'?: string;
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
    static newInstance(obj: any): WirelessLockDbEntry;
    constructor(credentialNumberHash?: string);
}
