import client from '../../../db/database';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function login(req: any, res: any) {
  const { username, password } = req.body;

  const existingUser = await client.execute({
    sql: 'SELECT * FROM users WHERE username = ?',
    args: [username],
  });

  const matchPassword = await client.execute({
    sql: 'SELECT password FROM users WHERE username = ?',
    args: [username],
  });

  if (
    matchPassword.rows[0]?.password === password &&
    existingUser.rows.length > 0
  ) {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        username: username,
      },
      'ASODFNASIOPFNIOASNFIOASN123134ASNIOF'
    );

    const serialized = cookie.serialize('MyToken', token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    res.setHeader('Set-Cookie', serialized);

    return res.json({ message: 'Login successful' });
  } else {
    return res.json({ error: 'Invalid username or password' });
  }
}
