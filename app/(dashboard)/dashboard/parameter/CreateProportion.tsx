'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {ISize} from "@/interface/interface-size";
import {QueryProportion} from "@/app/api/query-proportion";
import FormLayout from "@/app/(dashboard)/FormLayout";
import {InputCustom} from "@/components/shared/InputCustom";
import {DATAPRODUCTYPE} from "@/data/type-product";
import MultipleSelect from "@/components/select-custom/MultipleSelect";
import {Option} from "rc-select";

export default function CreateProportion() {
    const {handleSubmit, control, register} = useForm<ISize>()
    const queryClient = useQueryClient();
    const {mutate} =useMutation({
        mutationKey:['create-proportion'],
        mutationFn:(dto:ISize)=>QueryProportion.create(dto),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['by-type-size']
            })
            toast.success('Данные добавлены');
        },
        onError:()=>{
            toast.error('Ошибка при добавлении данных');
        }
    });
    const onSubmit: SubmitHandler<ISize> = (data) => {
        mutate(data)
    };
    return (
       <FormLayout handleFn={handleSubmit(onSubmit)} buttonVariant={"create"} title={'Создание размеров'}>
           <InputCustom label={"Размер"} {...register('proportion', {required:true})}/>
           <MultipleSelect<ISize> control={control} field={"typeProduct"} label={"Тип продукта"} option={DATAPRODUCTYPE.map((val) => <Option key={val.value} value={val.value}>{val.name}</Option>) } />
       </FormLayout>
    );
};