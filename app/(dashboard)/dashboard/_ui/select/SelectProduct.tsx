"use client";

import { QueryProduct } from "@/app/api/query-product";
import SelectCustom from "@/components/SelectCustom";
import { IHookForm } from "@/interface/interface-hook-form";
import { useQuery } from "@tanstack/react-query";
import { FieldValues, Path } from "react-hook-form";

export default function SelectProduct<T extends FieldValues>({
  field,
  control,
}: IHookForm<T>) {
  const { data } = useQuery({
    queryKey: ["all-product"],
    queryFn: () => QueryProduct.all(),
  });

  return (
    <div>
      <SelectCustom
        field={field as Path<T>}
        control={control}
        label={"Выберите продукт"}
        renderItems={data?.map((val) => ({
          value: String(val.id),
          name: val.name,
        }))}
      />
    </div>
  );
}
