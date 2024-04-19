import db from '../../../db/database';

export default async function signup(req: any, res: any) {
  const { email, username, password } = req.body;

  const existingUsername = await db.execute({
    sql: 'SELECT * FROM users WHERE username = ?',
    args: [username],
  });
  const existingEmail = await db.execute({
    sql: 'SELECT * FROM users WHERE email = ?',
    args: [email],
  });

  if (existingEmail.rows.length > 0 || existingUsername.rows.length > 0) {
    return res.json({ error: 'Email or Username already exists' });
  }

  await db.execute({
    sql: 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
    args: [email, username, password],
  });

  return res.status(200).json({ message: 'Signup successful' });
}
