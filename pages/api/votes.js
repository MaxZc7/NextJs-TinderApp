import { verify } from 'jsonwebtoken';
import db from '../../db/database';

export default async function votes(req, res) {
  const MyToken = req.cookies.MyToken;

  const { id } = verify(MyToken, 'ASODFNASIOPFNIOASNFIOASN123134ASNIOF');

  const votesUser = await db.execute({
    sql: 'SELECT vote_id, vote FROM votes WHERE user_id = ?',
    args: [id],
  });

  if (votesUser.rows.length <= 0) {
    return res.json({
      message: 'You do not have votes',
    });
  }

  // No Liked users
  const noLikedUsersIds = await db.execute({
    sql: 'SELECT vote_id FROM votes WHERE vote = ? AND user_id = ? ',
    args: [0, id],
  });

  const noLikedPlaceholders = noLikedUsersIds.rows.map(() => '?').join(',');
  const noLikedSqlConsult = `SELECT username, image, id FROM users WHERE id IN (${noLikedPlaceholders})`;

  const noLikedIdsDesestructured = noLikedUsersIds.rows.map(
    (vote) => vote.vote_id
  );

  const noLikedUsers = await db.execute({
    sql: noLikedSqlConsult,
    args: [...noLikedIdsDesestructured],
  });
  // Liked Users
  const likedUsersIds = await db.execute({
    sql: 'SELECT vote_id FROM votes WHERE vote = ? AND user_id = ? ',
    args: [1, id],
  });

  const likedPlaceholders = likedUsersIds.rows.map(() => '?').join(',');
  const likedSqlConsult = `SELECT username, image, id FROM users WHERE id IN (${likedPlaceholders})`;

  const likedIdsDesestructured = likedUsersIds.rows.map((vote) => vote.vote_id);

  const likedUsers = await db.execute({
    sql: likedSqlConsult,
    args: [...likedIdsDesestructured],
  });

  const noLikedUsersData = noLikedUsers.rows.map(({ username, image, id }) => ({
    id,
    username,
    image,
  }));

  const likedUsersData = likedUsers.rows.map(({ username, image, id }) => ({
    id,
    username,
    image,
  }));

  // match users
  let matchUsersData;
  if (likedUsersData.length > 0) {
    const voteOfLikedUsersPlaceHolder = likedUsersData.map(() => '?').join(',');

    const votesOfLikedUsers = await db.execute({
      sql: `SELECT vote_id,user_id, vote FROM votes WHERE user_id IN (${voteOfLikedUsersPlaceHolder})`,
      args: [...likedIdsDesestructured],
    });

    const matchVotes = [];
    votesOfLikedUsers.rows.forEach((vote) => {
      if (vote.vote === 1 && vote.vote_id == id) {
        matchVotes.push(vote);
      }
    });

    const matchVoteIds = matchVotes.map((vote) => vote.user_id);
    const matchPlaceHolder = matchVotes.map(() => '?').join(',');
    const matchUsers = await db.execute({
      sql: `SELECT * FROM users WHERE id IN (${matchPlaceHolder})`,
      args: [...matchVoteIds],
    });
    matchUsersData = matchUsers.rows.map(({ username, image, id }) => ({
      username,
      image,
      id,
    }));
  }

  return res.json({
    noLikedUsersData: noLikedUsersData,
    likedUsersData: likedUsersData,
    matchUsersData: matchUsersData,
  });
}
