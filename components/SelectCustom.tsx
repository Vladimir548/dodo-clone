"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ISelectCustom<T extends FieldValues> {
  label: string;
  control: Control<T>;
  field: Path<T>;
  renderItems: { value: string; name: string }[] | undefined;
}
export default function SelectCustom<T extends FieldValues>({
  label,
  renderItems,
  control,
  field,
}: ISelectCustom<T>) {
  return (
    <div>
      <label className={"text-primary"}>{label}</label>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              {renderItems?.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        name={field}
      />
    </div>
  );
}
