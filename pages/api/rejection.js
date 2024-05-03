import db from '../../db/database';
import { verify } from 'jsonwebtoken';

export default async function rejection(req, res) {
  const { matchId } = req.body;

  const MyToken = req.cookies.MyToken;

  const { id } = verify(MyToken, 'ASODFNASIOPFNIOASNFIOASN123134ASNIOF');

  await db.execute({
    sql: 'INSERT INTO votes (vote_id, user_id, vote) VALUES (?,?, ?)',
    args: [matchId, id, 0],
  });

  res.status(200).json({ message: 'ok' });
}
