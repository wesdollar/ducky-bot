import { prisma } from "../../../prisma";
import { handleErrors } from "../../handle-errors/handle-errors";
import { type IrcMessageLogData } from "@dollardojo/modules/types/irc-messages/irc-message-log-data";

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
