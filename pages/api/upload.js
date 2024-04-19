import upload from '../../multer';
import db from '../../db/database';
import jwt from 'jsonwebtoken';
import { NextResponse, NextRequest } from 'next/server';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const MyToken = req.cookies.MyToken;
  const { username } = jwt.verify(
    MyToken,
    'ASODFNASIOPFNIOASNFIOASN123134ASNIOF'
  );

  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file.' });
    }

    const isImage = req.file;
    if (isImage == undefined) {
      return res.json({ message: 'No image selected.' });
    } else {
      const img = req.file.path;
      const image = img.replace('public', '');

      await db.execute({
        sql: 'UPDATE users SET image = (?) WHERE username = (?)',
        args: [image, username],
      });

      return res.status(200).json({ message: 'File uploaded successfully.' });
    }
  });
}
