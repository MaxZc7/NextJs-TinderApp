import db from '../../db/database';
import { verify } from 'jsonwebtoken';

export default async function match(req, res) {
  try {
    const MyToken = req.cookies.MyToken;

    const { id } = verify(MyToken, 'ASODFNASIOPFNIOASNFIOASN123134ASNIOF');
    const ids = await db.execute('SELECT id FROM users');
    const idsNum = ids.rows.map((row) => row.id);

    let matchUsername, matchImage, matchId;
    let candidateFound = false;
    let finishVotes = false;
    while (!candidateFound && idsNum.length > 0) {
      const randomIndex = Math.floor(Math.random() * idsNum.length);
      const randomId = idsNum[randomIndex];

      if (randomId !== id) {
        const data = await db.execute({
          sql: 'SELECT * FROM users WHERE id = ?',
          args: [randomId],
        });

        matchUsername = data.rows[0].username;
        matchImage = data.rows[0].image;
        matchId = data.rows[0].id;

        const existingVote = await db.execute({
          sql: 'SELECT * FROM votes WHERE user_id = ? AND vote_id = ?',
          args: [id, matchId],
        });

        if (existingVote.rows.length === 0) {
          candidateFound = true;
        } else {
          idsNum.splice(randomIndex, 1);
        }
      } else {
        idsNum.splice(randomIndex, 1);
      }
    }

    if (!candidateFound) {
      matchUsername = 'No More candidates available';
      matchImage = null;
      matchId = null;
      finishVotes = true;
    }
    return res.json({
      matchUsername: matchUsername,
      matchImage: matchImage ?? '/defaultProfile.jpg',
      matchId: matchId,
      finishVotes: finishVotes,
    });
  } catch (e) {
    console.error('Error in match', e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
