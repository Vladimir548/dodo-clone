'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {QueryProportion} from "@/app/api/query-proportion";
import FormLayout from "@/app/(dashboard)/FormLayout";
import {InputCustom} from "@/components/shared/InputCustom";
import MultipleSelectCategory from "@/app/(dashboard)/dashboard/_ui/select/MultipleSelectCategory";
import {IProportion} from "@/interface/IProportion";

export default function CreateProportion() {
    const {handleSubmit, control, register} = useForm<IProportion>()
    const queryClient = useQueryClient();
    const {mutate} =useMutation({
        mutationKey:['create-proportion'],
        mutationFn:(dto:IProportion)=>QueryProportion.create(dto),
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
    const onSubmit: SubmitHandler<IProportion> = (data) => {
        mutate(data)
    };
    return (
       <FormLayout handleFn={handleSubmit(onSubmit)} buttonVariant={"create"} title={'Создание размеров'}>
           <InputCustom label={"Размер"} {...register('value', {required:true})}/>
           <MultipleSelectCategory control={control} field={"categories"}  />
       </FormLayout>
    );
};