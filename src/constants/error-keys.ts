export type ErrorKey = string;
export type ErrorKeys = Record<ErrorKey, string>;

export const errorKeys = {
  noItemsInCache: "no_items_in_cache",
} as const;
