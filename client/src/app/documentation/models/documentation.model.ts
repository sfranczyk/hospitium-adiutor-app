export interface Documentation {
    id?: number;
    content: string;
    patientId: number;
    typeId:	number;
    created?: Date;

    contentDescription?: string;
    name?: string;
}