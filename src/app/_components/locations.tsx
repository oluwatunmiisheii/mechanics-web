"use client";

import { parseAsString, useQueryState } from "nuqs";
import { LocationCard } from "@/components/location-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountries } from "@/context/countries.context";
import { LocationApiResponse } from "@/model/countries.model";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Wrench } from "lucide-react";
import { Fragment, useEffect } from "react";
import { Show } from "react-smart-conditional";
import { getCountryLocations } from "@/services/countries.service";


export const Locations = ({
  initialLocations,
  initialCountry,
}: {
  initialLocations: LocationApiResponse;
  initialCountry: string;
}) => {
  const { selectedCountry } = useCountries();
  const [search] = useQueryState("search", parseAsString);

  const {
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery<LocationApiResponse>({
    queryKey: ["locations", selectedCountry?.slug, search],
    queryFn: ({ pageParam = 1 }) =>
      getCountryLocations(selectedCountry?.slug ?? "", pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.next
        ? Number.parseInt(lastPage.next.split("page=")[1], 10)
        : undefined;
    },
    initialData: { pages: [initialLocations], pageParams: [1] },
    enabled: false,
  });

  const locations = data?.pages?.flatMap((page) => page.results) ?? [];
  const total = data?.pages?.[0]?.count ?? 0;

  useEffect(() => {
    if(!selectedCountry?.name) {
      return
    }
   if(selectedCountry?.name !== initialCountry) {
      refetch()
    }

  }, [selectedCountry?.name, initialCountry, refetch]);

  return (
    <section className="py-8 px-6 md:px-10 lg:px-16 bg-secondary/30">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              {search ? (
                `Search results for "${search}"`
              ) : (
                <span className="capitalize">
                  Service locations in {selectedCountry?.name || initialCountry}
                </span>
              )}
            </h2>
          </div>
          <p className="text-muted-foreground">
            {isFetching ? <Skeleton className="w-64 h-4 mt-2" /> : (
              <>
                {total} {locations.length === 1 ? "location" : "locations"} with
                certified mechanics
              </>
            )}
          </p>
        </div>

        <Show as={Fragment}>
          <Show.If
            condition={isFetching && !isFetchingNextPage}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[...Array(8)].map((_, index) => (
              <Skeleton className="h-48" key={index} />
            ))}
          </Show.If>
          <Show.If
            condition={!isFetching && locations.length === 0}
            as="div"
            className="text-center py-12"
          >
            <Wrench className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">
              No mechanic locations found. Try a different search term or
              country.
            </p>
          </Show.If>
          <Show.Else>
            <div
              key={`${selectedCountry?.id}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {locations.map((location) => (
                <div key={`${location.id}-${location.name}`}>
                  <LocationCard location={location} />
                </div>
              ))}
            </div>
            {hasNextPage && (
              <div className="flex w-full justify-center mt-8">
                <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </Show.Else>
        </Show>
      </div>
    </section>
  );
};
