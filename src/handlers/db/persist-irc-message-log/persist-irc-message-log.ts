import { prisma } from "../../../prisma";
import { handleErrors } from "../../handle-errors/handle-errors";

export interface IrcMessageLogData {
  message: string;
  timestamp: string;
}

export const persistIrcMessageLog = async ({
  message,
  timestamp,
}: IrcMessageLogData) => {
  try {
    await prisma.messageLog.create({
      data: {
        message,
        timestamp: new Date(timestamp),
      },
    });
  } catch (error) {
    handleErrors(error, "prisma create message log failed");

    return Error("persist message log failed");
  }
};
