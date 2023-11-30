import { last, throttle } from "lodash";
import { useCallback, useMemo } from "react";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";

import { defaultMapper } from "./useItemsList.defaultMapper";

export const useInfiniteItemsList = <
  EntityType,
  Query extends object,
  Result,
>(properties: {
  cacheKey(query: Query & { page: number }): Query & { page: number };
  fetcher(query: Query & { page: number }): Promise<EntityType[] | undefined>;

  itemMapper: (item: EntityType) => Result;
  pageSize: number;
  query: Query;
  swrConfiguration?: SWRInfiniteConfiguration;
}) => {
  const fetcher = useCallback(async (key: Query & { page: number }) => {
    return properties.fetcher({
      ...key,
      page: key.page,
    });
  }, []);

  const { data, isLoading, isValidating, mutate, setSize } = useSWRInfinite(
    (index, previousPageData) => {
      console.info(isValidating, isLoading);
      if (previousPageData && previousPageData.length === 0) return null;
      if (previousPageData && previousPageData.length < properties.pageSize)
        return null;
      return properties.cacheKey({
        ...properties.query,
        page: index + 1,
      });
    },
    fetcher,
    {
      dedupingInterval: 2 * 60e3,
      initialSize: 1,
      parallel: true,
      revalidateAll: false,
      ...properties.swrConfiguration,
    },
  );

  const items = useMemo(() => {
    if (!data?.length) return [];

    return data?.flatMap(
      (value) =>
        value?.map((item: EntityType) =>
          properties.itemMapper
            ? properties.itemMapper?.(item)
            : defaultMapper<EntityType, Result>(item),
        ) ?? [],
    );
  }, [data]);

  const refresh = useCallback(() => {
    return mutate();
  }, []);

  return {
    isLoading,
    list: items ?? [],
    loadMore: throttle(({ distanceFromEnd }: { distanceFromEnd: number }) => {
      if (isLoading) return;
      if (data && (last(data)?.length || 0) < properties.pageSize) {
        return;
      }
      setSize((size) => size + 1);
    }, 1e3),
    refresh,
  };
};
