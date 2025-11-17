import { connectDB } from '@/app/lib/mongodb';
import { Employee } from '@/app/models/employee';
import zod from 'zod';

const signupBody = zod.object({
    name: zod.string(),
    employeeID: zod.number(),
    contact: zod.object({
        cType: zod.string(),
        cNumber: zod.number()
    }),
    email: zod.email(),
    region: zod.object({
        zone: zod.string(),
        city: zod.string()
    })
});

export async function GET(req: Request) {
    try {
        return Response.json({
            status: 200,
            msg: 'Backend working'
        })
    } catch(err) {
        return Response.json({
            status: 500,
            msg: 'Internal Server Error.'
        });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = signupBody.safeParse(body);
        if(!parsed.success) {
            return Response.json({
                status: 400,
                msg: "Invalid / Missing credentials."
            });
        }
        
        const db = await connectDB();
        if(db === "" || db === null) {
            return Response.json({
                status: 500,
                msg: "Error connecting to database."
            });
        }

        const employee = await Employee.create(body);
        return Response.json({
            status: 200,
            msg: "Employee added to database",
            name: employee.employeeInformation.name,
            email: employee.employeeInformation.email,  
        });
    } catch(err) {
        return Response.json({
            status: 500,
            msg: "Unknown Error occured."
        });
    }
    
}