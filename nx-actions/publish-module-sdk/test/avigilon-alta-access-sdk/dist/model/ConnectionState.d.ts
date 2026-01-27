export declare class ConnectionState {
    /**
    * Number of seconds after which the access token becomes invalid
    */
    'expiresIn'?: number;
    /**
    * The access token returned by the Auth client
    */
    'accessToken'?: string;
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
    static newInstance(obj: any): ConnectionState;
    constructor(expiresIn?: number, accessToken?: string);
}
