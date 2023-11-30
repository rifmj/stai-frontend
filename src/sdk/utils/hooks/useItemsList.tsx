import { useMemo } from "react";
import useSWR, { Fetcher, SWRConfiguration } from "swr";

import { defaultMapper } from "./useItemsList.defaultMapper";

export function useItemsList<Item, Result>(
  key: string,
  fetcher: Fetcher<Item[] | undefined, string>,
  itemMapper: (item: Item) => Result,
  swrConfiguration?: SWRConfiguration,
) {
  const { data, error, isLoading, mutate } = useSWR(
    key,
    fetcher,
    swrConfiguration,
  );

  const items = useMemo(() => {
    if (!data?.length) return [];
    return data?.map((value) =>
      itemMapper ? itemMapper?.(value) : defaultMapper<Item, Result>(value),
    );
  }, [data]);

  return {
    error,
    isLoading,
    list: items ?? [],
    mutate,
  };
}
