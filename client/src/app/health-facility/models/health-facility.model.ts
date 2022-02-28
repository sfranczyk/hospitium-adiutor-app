import { DepartmentDetails } from "./department.model";

export interface HealthFacility {
    id?: number;
    name: string;
    city: string;
    departments: DepartmentDetails[] | string[];
}

export interface HealthFacilityDetails {
    id?: number;
    name: string;
    city: string;
}