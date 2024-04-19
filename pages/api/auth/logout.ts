import { verify } from 'jsonwebtoken';
import cookie from 'cookie';
export default function logout(req: any, res: any) {
  const MyToken = req.cookies.MyToken;

  const verified = verify(MyToken, 'ASODFNASIOPFNIOASNFIOASN123134ASNIOF');

  if (verified) {
    const serialized = cookie.serialize('MyToken', '', {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    res.setHeader('Set-Cookie', serialized);
    return res.status(200).json({ message: 'Logout successful' });
  }

  return res.status(401).send('Inavalid Token');
}
