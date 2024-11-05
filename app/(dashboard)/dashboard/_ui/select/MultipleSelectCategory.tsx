
import {Option} from "rc-select";
import MultipleSelect from "@/components/select-custom/MultipleSelect";
import {Control, FieldValues, Path} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {QueryCategory} from "@/app/api/query-category";

interface Props<T extends FieldValues> {
    control:Control<T>;
    field:Path<T>

}

export default function MultipleSelectCategory<T extends FieldValues>({control,field}: Props<T >) {

    const {data} = useQuery({
        queryKey:['all-category'],
        queryFn:()=> QueryCategory.all()
    })

    return (
            <MultipleSelect control={control} field={field} label={"Категория продукта"} option={data?.map((val) => <Option key={val.id} value={val.id}>{val.name}</Option>) } />
    );
};