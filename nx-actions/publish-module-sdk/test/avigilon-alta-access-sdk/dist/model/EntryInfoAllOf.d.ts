import { OrganizationRef } from './OrganizationRef.js';
export declare class EntryInfoAllOf {
    'org'?: OrganizationRef;
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
    static newInstance(obj: any): EntryInfoAllOf;
    constructor(org?: OrganizationRef);
}
