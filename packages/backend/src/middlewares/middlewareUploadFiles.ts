import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

// קביעת אחסון קבצים עם Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

// פילטר לקובץ המועלה
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const filetypes = /pdf|docx|jpg|jpeg|png|mp4/;
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = filetypes.test(file.mimetype);

  const image = /jpg|jpeg|png/;
  const document = /pdf|docx/;
  const audio = /mp4/;
  const maxSize = {
    image: 5 * 1024 * 1024,
    document: 10 * 1024 * 1024,
    audio: 50 * 1024 * 1024
  };

  if (!filetypes.test(extname) || !mimetype) {
    return cb(new Error('סוג הקובץ אינו מורשה'));
  }

  // בדיקת גודל הקובץ
  if (image.test(extname) && file.size > maxSize.image) {
    return cb(new Error('הקובץ חורג מהמגבלה המותרת לגודל לתמונות (5MB)'));
  } else if (document.test(extname) && file.size > maxSize.document) {
    return cb(new Error('הקובץ חורג מהמגבלה המותרת לגודל למסמכים (10MB)'));
  } else if (audio.test(extname) && file.size > maxSize.audio) {
    return cb(new Error('הקובץ חורג מהמגבלה המותרת לגודל לקבצי אודיו (50MB)'));
  }

  cb(null, true);
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});
