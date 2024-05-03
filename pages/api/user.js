import { verify } from 'jsonwebtoken';
import db from '../../db/database';
export default async function user(req, res) {
  const MyToken = req.cookies.MyToken;

  const isToken = MyToken ?? false;

  if (MyToken) {
    const { username } = verify(
      MyToken,
      'ASODFNASIOPFNIOASNFIOASN123134ASNIOF'
    );
    const avatar = await db.execute({
      sql: 'SELECT image FROM users WHERE username = (?)',
      args: [username],
    });
    return res.json({
      username: username,
      avatar: avatar.rows[0].image ?? '/defaultProfile.jpg',
      isToken: isToken,
    });
  }
  return res.json({ error: 'Invalid token' });
}
