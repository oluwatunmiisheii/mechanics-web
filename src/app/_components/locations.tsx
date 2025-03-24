"use client";

import {
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import { LocationCard } from "@/components/location-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountries } from "@/context/countries.context";
import { get } from "@/lib/fetch";
import { LocationApiResponse } from "@/model/countries.model";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { Fragment } from "react";
import { Show } from "react-smart-conditional";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Locations = () => {
  const { selectedCountry } = useCountries();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("search", parseAsString);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<LocationApiResponse>({
    queryKey: ["locations", selectedCountry?.slug, search],
    queryFn: ({ pageParam = page }) =>
      get(`api/countries/${selectedCountry?.slug}/locations?page=${pageParam}`),
    initialPageParam: page,
    getNextPageParam: (lastPage) => {
      return lastPage.next
        ? Number.parseInt(lastPage.next.split("page=")[1], 10)
        : undefined;
    },
    enabled: !!selectedCountry,
  });

  const locations = data?.pages?.flatMap((page) => page.results) ?? [];
  const total = data?.pages?.[0]?.count ?? 0;

  const handleLoadMore = () => {
    fetchNextPage().then((result) => {
      if (result.data) {
        const newPage = page + 1;
        setPage(newPage, { shallow: true });
      }
    });
  };

  return (
    <section className="py-8 px-6 md:px-10 lg:px-16 bg-secondary/30">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              {search
                ? `Search results for "${search}"`
                : `Service locations in ${selectedCountry?.name}`}
            </h2>
          </div>
          <p className="text-muted-foreground">
            {total} {locations.length === 1 ? "location" : "locations"} with
            certified mechanics
          </p>
        </motion.div>

        <Show as={Fragment}>
          <Show.If
            condition={isLoading}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[...Array(8)].map((_, index) => (
              <Skeleton className="h-48" key={index} />
            ))}
          </Show.If>
          <Show.If
            condition={!isLoading && locations.length === 0}
            as={motion.div}
            className="text-center py-12"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Wrench className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">
              No mechanic locations found. Try a different search term or
              country.
            </p>
          </Show.If>
          <Show.Else as={AnimatePresence}>
            <motion.div
              key={`${selectedCountry?.id}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {locations.map((location) => (
                <motion.div key={`${location.id}-${location.name}`} variants={fadeInUp}>
                  <LocationCard location={location} />
                </motion.div>
              ))}
            </motion.div>
            {hasNextPage && (
              <div className="flex w-full justify-center mt-8">
                <Button onClick={handleLoadMore} disabled={isFetchingNextPage}>
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
