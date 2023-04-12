import { prisma } from "../prisma";
import bcrypt from "bcrypt";

const setPassword = () => {
  let user;

  bcrypt.genSalt(Number(process.env.BCRYPT_ROUNDS), function (err, salt) {
    bcrypt.hash(
      process.env.DUCKY_BOT_USER_PASSWORD as string,
      salt,
      async (err, hash) => {
        if (err) {
          return console.log(err);
        }

        try {
          user = await prisma.user.update({
            where: {
              username: "dollardojo",
            },
            data: {
              password: hash as unknown as string,
            },
          });

          return console.log(JSON.stringify(user, null, 2));
        } catch (error) {
          return console.log(error);
        }
      }
    );
  });
};

setPassword();
