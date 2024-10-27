import {useQuery} from "@tanstack/react-query";
import MultipleSelect from "@/components/select-custom/MultipleSelect";
import {Option} from "rc-select";
import {QueryPizzaType} from "@/app/api/query-pizza-type";
import {FieldValues} from "react-hook-form";
import {IHookForm} from "@/interface/interface-hook-form";

export default function SelectTypePizza<T extends  FieldValues>({control,field}:IHookForm<T>) {
    const {data} = useQuery({
        queryKey:['all-pizza-type'],
        queryFn:()=> QueryPizzaType.all(),

    })
    return (
        <div>

            <MultipleSelect field={field} control={control} label={'Выберите тип теста'} option={data?.map((val) => ( <Option key={val.id} value={val.id}>
                {val.name.name}
            </Option>))}/>
        </div>
    );
};