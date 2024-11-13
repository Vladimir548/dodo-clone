"use client";

import { QueryCategory } from "@/app/api/query-category";
import SelectCustom from "@/components/SelectCustom";
import { useQuery } from "@tanstack/react-query";
import { Control, FieldValues, Path } from "react-hook-form";

interface ISelect<T extends FieldValues> {
  control: Control<T>;
  field: Path<T>;
}
export default function SelectCategory<T extends FieldValues>({
  field,
  control,
}: ISelect<T>) {
  const { data } = useQuery({
    queryKey: ["all-category"],
    queryFn: () => QueryCategory.all(),
  });

  return (
    <div>
      <SelectCustom
        label={"Категория"}
        renderItems={data?.map((val) => ({
          name: val.name,
          value: String(val.id),
        }))}
        control={control}
        field={field}
      />
    </div>
  );
}
