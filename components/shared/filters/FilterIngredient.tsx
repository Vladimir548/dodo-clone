"use client";

import { QueryIngredient } from "@/app/api/query-ingredient";
import { FiltersListCheckbox } from "@/components/shared/filters/FiltersListChecbox";
import { useDataParams } from "@/hooks/useDataParams";
import { useFiltersStore } from "@/store/filters";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  categoryId: number | null;
}
export default function FilterIngredient({ categoryId }: IProps) {
  const { data, isPending } = useQuery({
    queryKey: ["all-ingredients", categoryId],
    queryFn: () => QueryIngredient.byCategory(categoryId),
    enabled: !!categoryId,
  });

  const { ingredients, toggleIngredients, currentCategory } = useFiltersStore(
    (state) => ({
      ingredients: state?.ingredients,
      toggleIngredients: (id: number) => state.toggleIngredients(id),
      currentCategory: state.currentCategory,
    })
  );
  useDataParams("ingredients", toggleIngredients, "num");
  const item = data?.map((ingredient) => ({
    value: String(ingredient.id),
    text: ingredient.name,
  }));
  return (
    <div>
      {data && data?.length > 0 && (
        <FiltersListCheckbox
          selected={ingredients?.[currentCategory]}
          onClickCheckbox={toggleIngredients}
          name={"ingredient"}
          title={"Ингредиенты"}
          defaultItems={item}
          loading={isPending}
          items={item?.length ? item : []}
        />
      )}
    </div>
  );
}
