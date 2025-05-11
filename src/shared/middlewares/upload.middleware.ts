import multer from "multer";
import { Express } from 'express';

const storage = multer.diskStorage({
    destination: './storage',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

export const upload = multer({ storage, fileFilter });
