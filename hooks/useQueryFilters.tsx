import React, { useEffect } from "react";

import { useFiltersStore } from "@/store/filters";
import { useRouter } from "next/navigation";
import queryString from "query-string";

export const useQueryFilters = (slug: string) => {
  const isMounted = React.useRef(false);
  const router = useRouter();
  const { prices, ingredients, sizes } = useFiltersStore();

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        slug: slug,
        priceTo: prices?.[slug]?.priceTo,
        priceFrom: prices?.[slug]?.priceFrom,
        ingredients: ingredients?.[slug],
        sizes: sizes?.[slug],
      };

      const query = queryString.stringify(params, {
        arrayFormat: "comma",
      });

      router.push(`?${decodeURIComponent(query)}`, {
        scroll: false,
      });
    }

    isMounted.current = true;
  }, [slug, ingredients, prices, sizes, router]);
};
