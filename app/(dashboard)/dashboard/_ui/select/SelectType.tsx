import SelectCustom from "@/components/SelectCustom";
import { DATAPRODUCTYPE } from "@/data/type-product";
import { Control, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  field: Path<T>;
}

export default function SelectType<T extends FieldValues>({
  control,
  field,
}: Props<T>) {
  return (
    <SelectCustom
      renderItems={DATAPRODUCTYPE.map((val) => ({
        name: val.name,
        value: val.value,
      }))}
      control={control}
      field={field}
      label={"Тип продукта"}
    />
  );
}
