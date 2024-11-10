import {Option} from "rc-select";
import MultipleSelect from "@/components/select-custom/MultipleSelect";
import {DATAPRODUCTYPE} from "@/data/type-product";
import {Control, FieldValues, Path} from "react-hook-form";
import SelectCustom from "@/components/SelectCustom";
import {SelectItem} from "@/components/ui/select";

interface Props<T extends FieldValues> {
    control:Control<T>;
    field:Path<T>
}

export default function SelectType<T extends FieldValues>({control,field}: Props<T >) {
    return (
        <SelectCustom renderItems={DATAPRODUCTYPE.map(val => <SelectItem key={val.value} value={(val.value).toString()}>{val.name}</SelectItem>)} control={control} field={field} label={"Тип продукта"} />
    );
};