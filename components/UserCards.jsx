function UserCards({ likedUsersData, matchUsersData, noLikedUsersData }) {
  return (
    <section className="border border-white flex flex-col p-4">
      <div>
        {likedUsersData == undefined
          ? ''
          : likedUsersData?.map(({ username, image, id }) => (
              <div
                key={id}
                className="flex flex-col justify-center items-center gap-6"
              >
                {' '}
                <span className="text-xl font-medium border-b">{username}</span>
                <picture>
                  <img
                    className="rounded-xl p-2 my-1 w-[350px]"
                    src={image ? image : '/defaultProfile.jpg'}
                    alt="imageOfUser"
                  />
                </picture>
              </div>
            ))}
      </div>
      <div>
        {matchUsersData == undefined
          ? ''
          : matchUsersData?.map(({ username, image, id }) => (
              <div
                key={id}
                className="flex flex-col justify-center items-center gap-6"
              >
                {' '}
                <span className="text-xl font-medium border-b">{username}</span>
                <picture>
                  <img
                    className="rounded-xl p-2 my-1 w-[350px]"
                    src={image ? image : '/defaultProfile.jpg'}
                    alt="imageOfUser"
                  />
                </picture>
              </div>
            ))}
      </div>
      <div>
        {noLikedUsersData == undefined
          ? ''
          : noLikedUsersData?.map(({ username, image, id }) => (
              <div
                key={id}
                className="flex flex-col justify-center items-center gap-6"
              >
                <span className="text-xl font-medium border-b">{username}</span>

                <picture>
                  <img
                    className="rounded-xl p-2 my-1 w-[350px]"
                    src={image ? image : '/defaultProfile.jpg'}
                    alt="imageOfUser"
                  />
                </picture>
              </div>
            ))}
      </div>
    </section>
  );
}

export default UserCards;
