import bcrypt from "bcrypt";
import { prisma } from "../../../prisma";
import { type User } from "@prisma/client";

export const login = async (username: string, password: string) => {
  if (!username || !password) {
    return false;
  }

  let user: User;

  try {
    user = await prisma.user.findFirstOrThrow({
      where: {
        username,
      },
    });
  } catch (error) {
    throw new Error("unable to find user");
  }

  bcrypt.compare(password, user.password as string, function (err, result) {
    console.log(JSON.stringify(result, null, 2));
    console.log(JSON.stringify(err, null, 2));
  });
};
