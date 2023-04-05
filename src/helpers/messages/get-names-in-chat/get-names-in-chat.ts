export const getNamesInChat = (message: string) => {
  let regex;
  const usersInChat = [];

  if (message.length) {
    regex = /:(.*?)!/g;
    let match;

    // matches on multiples
    while ((match = regex.exec(message))) {
      usersInChat.push(match[1]);
    }

    if (usersInChat.length) {
      return usersInChat;
    }

    // matches on a single
    regex = /(?<=366 )(.*)(?= #dollardojo)/g;
    const namesInChat = message.match(regex);

    usersInChat.push(namesInChat);

    return usersInChat;
  }

  return [];
};
