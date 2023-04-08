export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  caasi: (dev: string) => {};
  helloAck: (ack: string) => {};
}

export interface ClientToServerEvents {
  hello: () => void;
  world: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
