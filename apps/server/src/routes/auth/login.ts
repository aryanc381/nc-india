import express from 'express';
import zod from 'zod';
import employees from '../../models/employeeSchema.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.use(express.json());

const loginBody = zod.object({
    email: zod.email(),
    password: zod.string()
});

router.post('/login', async (req, res) => {
    try {
        const parsed = loginBody.safeParse(req.body);
        if(!parsed.success) {
            const formattedErrors = parsed.error.issues.map((err) => ({ path: err.path[0], msg: err.message }));
            return res.json({
                status: 403, 
                msg: 'Invalid Credentials format, check your Email-ID.',
                err: formattedErrors
            });
        }
        const existing = await employees.findOne({ 'basicDetails.email': req.body.email });
        if(!existing) {
            return res.json({
                status: 405,
                msg: 'Employee does not exist.'
            });
        }

        const isMatch = await bcrypt.compare(req.body.password, existing.basicDetails.password);
        if(!isMatch) {
            return res.json({
                status: 401,
                msg: 'Invalid password for ' + existing.basicDetails.email + '.'
            });
        }

        return res.json({
            status: 200,
            msg: 'Login Successfull.',
            user: {
                id: existing.basicDetails.id,
                name: existing.basicDetails.name,
                email: existing.basicDetails.email
            }
        });
    } catch(err) {
        return res.json({
            status: 500,
            msg: 'Backend Internal Server Error.'
        });
    } 
});

export default router;