import mongoose, { model, Schema } from 'mongoose';
import { IEmployee } from '../types/employeeT';

const employeeSchema = new Schema<IEmployee>({
    employeeInformation: {
            name: {
            type: String,
            default: ""
        },
        employeeID: {
            type: Number,
            default: null
        },
        contact: {
            cType: {
                type: String,
                default: ""
            },
            cNumber: {
                type: Number,
                default: null
            }
        },
        email: {
            type: String,
            default: ""
        },
        region: {
            zone: {
                type: String,
                default: ""
            },
            city: {
                type: String,
                default: ""
            }
        }
    },
    employeeAttendance: {
        data: [{
            date: {
                type: Number,
                default: null
            },
            checkinT: {
                type: Number,
                default: null
            },
            checkoutT: {
                type: Number,
                default: null
            },
            status: {
                type: String,
                default: ""
            }
        }]
    },
    employeeLeave: {
        data: [{
            date: {
                type: Number,
                default: null
            },
            category: {
                type: String,
                default: ""
            },
            description: {
                type: String,
                default: ""
            }
        }]
    }  
});

export const Employee = model<IEmployee>("NC-Employees", employeeSchema);