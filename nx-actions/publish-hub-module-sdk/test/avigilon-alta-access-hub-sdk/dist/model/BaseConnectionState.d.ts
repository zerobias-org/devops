export declare class BaseConnectionState {
    /**
    * Number of seconds after which the access token becomes invalid
    */
    'expiresIn'?: number;
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
    static newInstance(obj: any): BaseConnectionState;
    constructor(expiresIn?: number);
}
