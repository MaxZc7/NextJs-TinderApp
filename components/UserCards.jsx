function UserCards({ likedUsersData, matchUsersData, noLikedUsersData }) {
  return (
    <section className="  flex flex-col mt-4 ">
      <div>
        {likedUsersData == undefined
          ? ''
          : likedUsersData?.map(({ username, image, id }) => (
              <div
                key={id}
                className="flex flex-col justify-center items-center gap-6  rounded-2xl border mb-4"
              >
                {' '}
                <span className="text-3xl font-medium pt-6">{username}</span>
                <picture>
                  <img
                    className="rounded-2xl p-2 pb-8 my-1 w-[350px]"
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
                className="flex flex-col justify-center items-center gap-6  rounded-2xl border mb-4"
              >
                {' '}
                <span className="text-3xl font-medium pt-6">{username}</span>
                <picture>
                  <img
                    className="rounded-2xl p-2 pb-8 my-1 w-[350px]"
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
                className="flex flex-col justify-center items-center gap-6  rounded-2xl border mb-4"
              >
                {' '}
                <span className="text-3xl font-medium pt-6">{username}</span>
                <picture>
                  <img
                    className="rounded-2xl p-2 pb-8 my-1 w-[350px]"
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
