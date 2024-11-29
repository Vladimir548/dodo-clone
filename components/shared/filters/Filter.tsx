import { Title } from "@/components/shared/Title";
import FilterIngredient from "@/components/shared/filters/FilterIngredient";
import FilterPrice from "@/components/shared/filters/FilterPrice";
import FilterSize from "@/components/shared/filters/FilterSize";
import { TypeProduct } from "@/interface/enums";
import { useCategoryStore } from "@/store/category";
import { ReactNode } from "react";
import FilterDough from "./FilterDough";

interface IArrFilter {
  id: number;
  filter: ReactNode;
}
export default function Filter() {
  const categoryId = useCategoryStore((state) => state.activeCategoryId);
  const typeProduct = useCategoryStore((state) => state.typeProduct);

  const arrFilter: IArrFilter[] = [
    {
      id: 1,
      filter: typeProduct === TypeProduct.PIZZA && <FilterDough />,
    },
    {
      id: 2,
      filter: <FilterSize categoryId={categoryId} />,
    },
    {
      id: 3,
      filter: <FilterPrice categoryId={categoryId} />,
    },
    {
      id: 4,
      filter: <FilterIngredient categoryId={categoryId} />,
    },
  ];

  return (
    <div className="w-[270px] pr-[28px]  ">
      <Title text="Фильтрация" size="md" className="font-bold" />
      {arrFilter.map((data) => (
        <div key={data.id}>{data.filter}</div>
      ))}
    </div>
  );
}
