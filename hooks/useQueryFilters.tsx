import React, { useEffect } from "react";

import { useCategoryStore } from "@/store/category";
import { useFiltersStore } from "@/store/filters";
import { useRouter } from "next/navigation";
import queryString from "query-string";

export const useQueryFilters = (slug: string) => {
  const isMounted = React.useRef(false);
  const router = useRouter();
  const { prices, ingredients, sizes } = useFiltersStore();
  const activeCategory = useCategoryStore((state) => state.activeCategory);
  console.log(activeCategory);
  console.log(slug);
  useEffect(() => {
    if (isMounted.current) {
      console.log(activeCategory);
      const params = {
        slug: activeCategory,
        priceTo: prices?.[slug]?.priceTo,
        priceFrom: prices?.[slug]?.priceFrom,
        ingredients: ingredients?.[slug],
        sizes: sizes?.[slug],
      };

      const query = queryString.stringify(params, {
        arrayFormat: "comma",
        skipEmptyString: true,
        skipNull: true,
      });

      router.push(`?${decodeURIComponent(query)}`, {
        scroll: false,
      });
    }

    isMounted.current = true;
  }, [slug, ingredients, prices, sizes, router]);
};
