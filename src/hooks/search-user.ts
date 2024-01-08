import { useState } from "react";
import { api } from "~/trpc/react";

type SearchState = { query: string | null; isInitialMount: boolean };

export function useSearch() {
  const [{ query, isInitialMount }, setSearchState] = useState<SearchState>({
    query: null,
    isInitialMount: true,
  });

  const { data, isLoading } = api.user.search.useQuery({ query });

  return { isInitialMount, setSearchState, data, isLoading };
}
