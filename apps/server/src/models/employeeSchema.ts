import mongoose from 'mongoose';
import dotenv from 'dotenv';
import type { EmployeeT } from '../types/employeeT.js';

dotenv.config();

mongoose.connect(`${process.env.DB_URL}`);

const employeeSchema = new mongoose.Schema({
    basicDetails: {
        name: {
            type: String,
            default: 'N/A'
        },
        id: {
            type: String,
            default: 'N/A'
        },
        phone: {
            type: String,
            default: 'N/A'
        },
        email: {
            type: String,
            default: 'N/A'
        },
        password: {
            type: String,
            default: 'N/A'
        },
        location: {
            office: {
                type: String,
                default: 'N/A'
            },
            region: {
                type: String,
                default: 'N/A'
            }
        }
    }
});

const employees = mongoose.model<EmployeeT>('Employee', employeeSchema);

export default employees;