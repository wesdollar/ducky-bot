import { logMessageTitle } from "../log-formatters/log-message-title";

export const getNamesInChat = (message: any) => {
  const regex = /(?<=366 )(.*)(?= #dollardojo)/g;
  const namesInChat = message.match(regex);

  if (namesInChat) {
    logMessageTitle("names in chat");

    console.log(namesInChat);
  }
};
