import { DepartmentDetails } from "src/app/health-facility/models/department.model";
import { HealthFacility } from "src/app/health-facility/models/health-facility.model";
import { Sex } from "src/app/_enums/sex.enum";

export interface Patient{
    id?: number;
    firstName: string;
    lastName: string;
    pesel: string;
    sex: Sex;
    age?: number;
    dateOfBirth: Date;
    placeOfBirth: string;
    healthFacility?: HealthFacility;
    department?: DepartmentDetails;
}