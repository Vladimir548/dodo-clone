'use client'

import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";

import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import { IProductVariant} from "@/interface/interface-product-variant";
import {QueryVariantProduct} from "@/app/api/query-variant-product";
import FormLayout from "@/app/(dashboard)/FormLayout";
import InputCounter from "@/components/InputCounter";
import UploadImage from "@/components/shared/upload-image/UploadImage";
import SelectProduct from "@/app/(dashboard)/dashboard/_ui/select/SelectProduct";
import useTypeProduct from "@/hooks/useTypeProduct";
import {DATADOUGHTYPE} from "@/data/dough-type";
import SelectCustom from "@/components/SelectCustom";
import {SelectItem} from "@/components/ui/select";
import React, { useState} from "react";

import SelectSize from "../_ui/select/SelectSize";


export default function CreateVariantProduct() {
    const {handleSubmit, control, watch} = useForm<IProductVariant>({
        defaultValues: {
            sizes: [],
        },
    })
    const watchProductId = watch("productId")
    const {mutate} = useMutation({
        mutationKey: ['create-variant-product'],
        mutationFn: (dto: IProductVariant) => QueryVariantProduct.create(dto),
        onSuccess: () => {

            toast.success('Данные добавлены');
        },
        onError: () => {
            toast.error('Ошибка при добавлении данных');
        }
    });
    const onSubmit: SubmitHandler<IProductVariant> = (data) => {
        mutate(data)

    };
    const {type} = useTypeProduct(watchProductId)

    return (
        <FormLayout handleFn={handleSubmit(onSubmit)} buttonVariant={"create"} title={'Создание вариантов продукта'}>

            <SelectProduct control={control} field={'productId'}/>

            <InputCounter control={control} field={'quantity'} min={1} max={30} label={"Количество шт"}
                         />


                <SelectCustom control={control} field={"doughName"} label={"Тип теста"}
                                renderItems={DATADOUGHTYPE.map((val) => <SelectItem key={val.value}
                                                                           value={val.value}>{val.name}</SelectItem>)}/>
            <SelectSize control={control} type={type} watch={watch} />

            <UploadImage<IProductVariant> control={control} field={'image'}/>
        </FormLayout>
    );
};