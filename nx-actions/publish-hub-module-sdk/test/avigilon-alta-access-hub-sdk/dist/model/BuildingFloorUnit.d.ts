export declare class BuildingFloorUnit {
    /**
    * Building floor unit identifier
    */
    'id'?: string;
    /**
    * Building floor unit name
    */
    'name'?: string;
    /**
    * Building identifier
    */
    'buildingId'?: string;
    /**
    * Floor identifier
    */
    'floorId'?: string;
    /**
    * Unit number
    */
    'unitNumber'?: string;
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
    static newInstance(obj: any): BuildingFloorUnit;
    constructor(id?: string, name?: string, buildingId?: string, floorId?: string, unitNumber?: string);
}
