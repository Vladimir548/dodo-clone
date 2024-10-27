'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {IProduct} from "@/interface/interface-product";
import {QueryProduct} from "@/app/api/query-product";
import FormLayout from "@/app/(dashboard)/FormLayout";
import {InputCustom} from "@/components/shared/InputCustom";
import {SelectItem} from "@/components/ui/select"
import {DATAPRODUCTYPE} from "@/data/type-product";
import SelectCustom from "@/components/SelectCustom";
import SelectCategory from "@/app/(dashboard)/dashboard/_ui/select/SelectCategory";
import SelectIngredient from "@/app/(dashboard)/dashboard/_ui/select/SelectIngredient";
import UploadImage from "@/components/shared/upload-image/UploadImage";
import {TextareaCustom} from "@/components/TextareaCustom";
export default function CreateProduct() {
    const {handleSubmit, control,register,watch} = useForm<IProduct>()
    const queryClient = useQueryClient();
    const {mutate} =useMutation({
        mutationKey:['create-product'],
        mutationFn:(dto:IProduct)=>QueryProduct.create(dto),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['all-product'],
            })
            toast.success('Данные добавлены');
        },
        onError:()=>{
            toast.error('Ошибка при добавлении данных');
        }
    });
    const onSubmit: SubmitHandler<IProduct> = (data) => {
        mutate(data)

    };
const type = watch('typeProduct')
    return (

       <FormLayout handleFn={handleSubmit(onSubmit)} buttonVariant={"create"} title={'Создание продукта'}>

           <InputCustom label={"Название"} {...register('name', {required:true})}/>

           <SelectCustom<IProduct> control={control} field={"typeProduct"} label={"Тип продукта"} renderItems={DATAPRODUCTYPE.map((val) => <SelectItem key={val.value} value={val.value}>{val.name}</SelectItem>) } />

           <SelectCategory control={control} field={'categoryId'} />

           <SelectIngredient type={type} control={control} field={'ingredientIds'}/>

           <UploadImage control={control} field={'file'}/>
       </FormLayout>
    );
};