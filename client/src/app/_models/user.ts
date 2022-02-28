export interface User {
    username: string;
    firstName: string;
    lastName: string;
    profession?: string;
    token: string;
    roles: string[];
}