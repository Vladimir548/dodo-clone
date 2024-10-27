'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {ISize} from "@/interface/interface-size";
import {QuerySize} from "@/app/api/query-size";
import FormLayout from "@/app/(dashboard)/FormLayout";
import {InputCustom} from "@/components/shared/InputCustom";
import {DATAPRODUCTYPE} from "@/data/type-product";
import MultipleSelect from "@/components/select-custom/MultipleSelect";
import {Option} from "rc-select";

export default function CreateSize() {
    const {handleSubmit, control, register} = useForm<ISize>()
    const queryClient = useQueryClient();
    const {mutate} =useMutation({
        mutationKey:['create-size'],
        mutationFn:(dto:ISize)=>QuerySize.create(dto),
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
           <InputCustom label={"Размер"} {...register('size', {required:true})}/>
           <MultipleSelect<ISize> control={control} field={"typeProduct"} label={"Тип продукта"} option={DATAPRODUCTYPE.map((val) => <Option key={val.value} value={val.value}>{val.name}</Option>) } />
       </FormLayout>
    );
};