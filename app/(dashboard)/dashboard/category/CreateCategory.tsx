'use client'

import {QueryCategory} from "@/app/api/query-category";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ICategory} from "@/interface/interface-category";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import FormLayout from "@/app/(dashboard)/FormLayout";
import {toast} from "react-toastify";
import {InputCustom} from "@/components/shared/InputCustom";

export default function CreateCategory() {

    const {handleSubmit, control, reset} = useForm<ICategory>()
    const queryClient = useQueryClient();
    const {mutate} =useMutation({
        mutationKey:['create-category'],
        mutationFn:(dto:ICategory)=>QueryCategory.create(dto),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['all-category']
            })
            toast.success('Данные добавлены');
    },
        onError:()=>{
            toast.error('Ошибка при добавлении данных');
        }
    });
    const onSubmit: SubmitHandler<ICategory> = (data) => {
        mutate(data)

    };
    return (
        <FormLayout title={'Создание'}  handleFn={handleSubmit(onSubmit)} buttonVariant={"create"}>
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom  onChange={onChange} value={value} label={'Название'}/>
                )}
                name="name"
            />
        </FormLayout>
    );
};