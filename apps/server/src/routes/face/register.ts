import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const router = express.Router();
router.use(express.json());

router.post('/register', async (req, res) => {
    try {
        const { userId, photos } = req.body;
        console.log('reg')

        if(!photos || photos.length < 3) {
            return res.json({ status: 403, msg: 'Three photos required.' });
        }
        const folder = `uploads/facid/${userId}`;
        fs.mkdirSync(folder, { recursive: true });

        photos.forEach((img: any, i: any) => {
            const base64 = img.replace(/^data:image\/png;base64,/, "");
            fs.writeFileSync(`${folder}/face_${i+1}.png`, base64, "base64");
        });

        res.json({
            status: 200,
            msg: 'FaceID Saved.'
        })
    } catch(err) {
        return res.json({
            status: 500,
            msg: 'Internal Server Error.'
        })
    }
    
});

export default router;