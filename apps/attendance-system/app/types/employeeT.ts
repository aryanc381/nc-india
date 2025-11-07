export interface IEmployee {
    employeeInformation: {
        name: string;
        employeeID: number | null;
        contact: {
            cType: string;
            cNumber: number | null;
        };
        email: string;
        region: {
            zone: string;
            city: string;
        };
    };
    employeeAttendance: {
        data: {
            data: number | null;
            checkinT: number | null;
            checkoutT: number | null;
            status: string;
        }[];
    };
    employeeLeave: {
        data: {
            date: number | null;
            categroy: string;
            description: string;
        }[];
    }
}