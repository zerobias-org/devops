/**
* TOTP software device information
*/
export declare class TotpSoftDevice {
    /**
    * TOTP device identifier
    */
    'id': string;
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
    static newInstance(obj: any): TotpSoftDevice;
    constructor(id: string);
}
