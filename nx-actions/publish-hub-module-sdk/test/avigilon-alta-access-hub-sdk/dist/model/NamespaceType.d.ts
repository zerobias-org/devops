/**
* Type information for namespace
*/
export declare class NamespaceType {
    /**
    * Namespace type identifier
    */
    'id': number;
    /**
    * Namespace type name
    */
    'name': string;
    /**
    * Namespace model name
    */
    'modelName': string;
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
    static newInstance(obj: any): NamespaceType;
    constructor(id: number, name: string, modelName: string);
}
