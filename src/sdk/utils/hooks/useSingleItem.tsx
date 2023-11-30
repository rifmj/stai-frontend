import { useMemo } from "react";
import useSWR, { Fetcher, SWRConfiguration } from "swr";

import { defaultMapper } from "./useItemsList.defaultMapper";

export function useSingleItem<Item, Result>(
  key: null | string,
  fetcher: Fetcher<Item | undefined, string>,
  itemMapper: (item: Item) => Result = defaultMapper,
  swrConfiguration?: SWRConfiguration,
) {
  const { data, error, isLoading, mutate } = useSWR(
    key,
    fetcher,
    swrConfiguration,
  );

  const item = useMemo(() => {
    if (!data) return;
    return itemMapper(data);
  }, [data]);

  return {
    error,
    isLoading,
    item,
    mutate,
  };
}
