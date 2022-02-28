import { HealthFacilityDetails } from "./health-facility.model";

export interface Department {
    id?: number;
    name: string;
    healthFacilityId: number;
    healthFacility: HealthFacilityDetails;
}

export interface DepartmentDetails {
    id?: number;
    name: string;
}