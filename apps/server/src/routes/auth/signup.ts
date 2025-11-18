import express from 'express';
import zod from 'zod';
import employees from '../../models/employeeSchema.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.use(express.json());

const signupBody = zod.object({
    name: zod.string(),
    id: zod.string(),
    phone: zod.string(),
    email: zod.email(),
    password: zod.string(),
    location: zod.object({
        office: zod.string(),
        region: zod.string() 
    })
});

router.post('/signup', async (req, res) => {
    try {
        const parsed = signupBody.safeParse(req.body);
        if(!parsed.success) {
            const formattedErrors = parsed.error.issues.map((err) => ({
                path: err.path[0],
                msg: err.message
            }));
            return res.json({
                status: 403,
                msg: 'Invalid / Missing Credentials.',
                err: formattedErrors
            });
        }
        const existingUser = await employees.findOne({ 'basicDetails.email': req.body.email });
        if(existingUser) {
            return res.json({
                status: 403,
                msg: 'User already exists, try logging in instead.'
            });
        }
        const { name, id, phone, email, password, location: { office, region } } = req.body;

        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
        
        const newEmployee = new employees({ basicDetails: { name, id, phone, email, password: hashedPassword, location: { office, region } }});
        await newEmployee.save();

        return res.json({
            status: 201,
            msg: 'User added to NC-Database Successfully!',
            email: newEmployee.basicDetails.email,
            password: newEmployee.basicDetails.password
        });

    } catch(err) {
        return res.json({
            stauts: 500,
            msg: 'Backend Internal Server Error.'
        });
    }
});

export default router;