import { listPokemon } from "@/lib/pokemon";
import { useInfiniteQuery } from "@tanstack/react-query";

const PARAMS_PAGE_KEY = "page";

export const useInfinitePokemons = ({ page }: { page: number }) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["pokemonList", page],
      queryFn: listPokemon,
      initialPageParam: 0, // Always start from page 0 for continuous list
      getNextPageParam: (lastPage) => lastPage.nextPageParam,
    });

  const wrappingFetchNextPage = () => {
    // Bump pageIndex in query params:
    const { nextPageParam } = data?.pages.at(-1) || {};
    const searchParams = new URLSearchParams();
    searchParams.set(PARAMS_PAGE_KEY, `${Number(nextPageParam) + 1}`);
    const qp = searchParams.toString();
    history.replaceState({}, "", `${location.pathname}${qp ? "?" + qp : ""}`);
    fetchNextPage();
  };

  return {
    pokemonData: data,
    fetchNextPage: wrappingFetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  };
};
