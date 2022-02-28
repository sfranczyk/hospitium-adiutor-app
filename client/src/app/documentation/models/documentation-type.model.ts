import { DescriptionElementType } from "../enums/description-element.enum";

export interface DocumentationType {
    id?: number;
    name: string;
    jsonDescription: string;
    isUnused?: boolean;
}

export interface DescriptionElement {
    type: DescriptionElementType;
    name: string;
    selectors?: string[];
}