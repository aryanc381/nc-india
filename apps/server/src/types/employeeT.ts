export interface EmployeeT {
    basicDetails: {
        name: string;
        id: string;
        phone: string;
        email: string;
        password: string;
        location: {
            office: string;
            region: string;
        }
    }
    
}