import { prisma } from "../../../prisma";
import { handleErrors } from "../../handle-errors/handle-errors";
import {
  persistUserChatMessage,
  noCacheDataErrorMessage,
} from "./persist-user-chat-message";
import { type PersistedChatMessageCacheData } from "@dollardojo/modules/types/chat/persisted-chat-message-cache-data";

jest.mock("../../../prisma", () => ({
  prisma: {
    user: {
      upsert: jest.fn(),
    },
  },
}));

jest.mock("../../handle-errors/handle-errors", () => ({
  handleErrors: jest.fn(),
}));

const mockPrismaUserUpsert = prisma.user.upsert as jest.Mock;

// console.error = jest.fn();

const cacheData: PersistedChatMessageCacheData[] = [
  {
    message: { user: "dollardojo", message: "this" },
    timestamp: "4/5/2023, 4:15:55 PM",
  },
  {
    message: { user: "dollardojo", message: "that" },
    timestamp: "4/5/2023, 4:15:55 PM",
  },
  {
    message: { user: "dollardojo", message: "what" },
    timestamp: "4/5/2023, 4:15:57 PM",
  },
  {
    message: { user: "dollardojo", message: "the" },
    timestamp: "4/5/2023, 4:15:58 PM",
  },
  {
    message: { user: "dollardojo", message: "trouble" },
    timestamp: "4/5/2023, 4:16:00 PM",
  },
  {
    message: { user: "dollardojo", message: "is going on?" },
    timestamp: "4/5/2023, 4:16:02 PM",
  },
];

const arrayLength = cacheData.length;

describe("persist user chat message", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call prisma", async () => {
    await persistUserChatMessage(cacheData);

    expect(prisma.user.upsert).toBeCalledTimes(arrayLength);
  });

  it("should throw an error when cache data is empty", async () => {
    const prismaErrorMessage = new Error("prisma blew up");

    mockPrismaUserUpsert.mockRejectedValueOnce(prismaErrorMessage);

    const response = await persistUserChatMessage([]);

    expect(response).toEqual(Error(noCacheDataErrorMessage));
  });

  it("should catch when prism upsert fails", async () => {
    mockPrismaUserUpsert.mockRejectedValueOnce(() => new Error("failed"));

    await persistUserChatMessage(cacheData);

    expect(handleErrors).toBeCalled();
  });
});
