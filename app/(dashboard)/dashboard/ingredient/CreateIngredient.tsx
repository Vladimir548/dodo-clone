'use client'
import UploadImage from "@/components/shared/upload-image/UploadImage";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {toast} from "react-toastify";
import {IIngredient} from "@/interface/interface-ingredient";
import {InputCustom} from "@/components/shared/InputCustom";
import FormLayout from "@/app/(dashboard)/FormLayout";
import {QueryIngredient} from "@/app/api/query-ingredient";
import {NumericFormat} from "react-number-format";
import MultipleSelectCategory from "@/app/(dashboard)/dashboard/_ui/select/MultipleSelectCategory";

export default function CreateIngredient() {
    const {handleSubmit, control, register} = useForm<IIngredient>()
    const queryClient = useQueryClient();
    const {mutate} =useMutation({
        mutationKey:['create-ingredient'],
        mutationFn:(dto:IIngredient)=>QueryIngredient.create(dto),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['by-type-ingredient'],
            })
            toast.success('Данные добавлены');
        },
        onError:()=>{
            toast.error('Ошибка при добавлении данных');
        }
    });
    const onSubmit: SubmitHandler<IIngredient> = (data) => {
        mutate(data)
    };
    return (
        <FormLayout   handleFn={handleSubmit(onSubmit)} buttonVariant={"create"} title={"Создание ингредиентов"}>

           <InputCustom label={'Название'} {...register('name', {required:true})}/>
            <Controller control={control} render={({field: {onChange, value}})=> (
                <NumericFormat onValueChange={(values) => onChange(values.value)} value={value} thousandSeparator="," label={"Цена"} suffix={" ₽"}  customInput={InputCustom}/>
            )} name={'price'}/>
            <MultipleSelectCategory  control={control} field={"categories"}/>
            <UploadImage  control={control} field={'file'}/>
        </FormLayout>
    );
};