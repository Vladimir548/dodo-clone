'use client'

import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";

import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import { IProductVariant, ISize} from "@/interface/interface-product-variant";
import {QueryVariantProduct} from "@/app/api/query-variant-product";
import FormLayout from "@/app/(dashboard)/FormLayout";
import {InputCustom} from "@/components/shared/InputCustom";
import InputCounter from "@/components/InputCounter";
import {NumericFormat} from "react-number-format";
import UploadImage from "@/components/shared/upload-image/UploadImage";
import SelectProduct from "@/app/(dashboard)/dashboard/_ui/select/SelectProduct";
import MultipleSelect from "@/components/select-custom/MultipleSelect";
import Select, {Option} from "rc-select";

import useTypeProduct from "@/hooks/useTypeProduct";
import SelectParameter from "@/app/(dashboard)/dashboard/_ui/SelectParameter";
import {DATADOUGHTYPE} from "@/data/dough-type";
import {DATAPIZZASIZE, IPizzaSize} from "@/data/pizza-size";
import SelectCustom from "@/components/SelectCustom";
import {SelectItem} from "@/components/ui/select";
import React, { useState} from "react";
import {Check} from "lucide-react";


export default function CreateVariantProduct() {
    const {handleSubmit, control,setValue,getValues, watch} = useForm<IProductVariant>({
        defaultValues: {
            sizes: [],
        },
    })

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
    const watchProductId = watch("productId")
    const { fields, append, remove } = useFieldArray<IProductVariant>({
        control,
        name: "sizes",

    });

    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    const handleSizeChange = (value: string[]) => {
        setSelectedSizes(value);
        const currentValues = watch("sizes");
        currentValues.forEach((field, index) => {
            if (!value.includes(field.size)) {
                remove(index);
            }
        });

        value.forEach((size) => {
            if (!currentValues.some((field) => field.size === size)) {
                append(({ size, price: 0, weight: 0, }) as ISize);
            }
        });
    };

    const appendSize = ()=>{}

    const {type} = useTypeProduct(watchProductId)

    return (
        <FormLayout handleFn={handleSubmit(onSubmit)} buttonVariant={"create"} title={'Создание вариантов продукта'}>

            <SelectProduct control={control} field={'productId'}/>

            <SelectParameter control={control} field={'parameterId'} type={type}/>

            <InputCounter control={control} field={'quantity'} min={1} max={30} label={"Количество шт"}
                          disabled={type === 'PIZZA'}/>

            {type === 'PIZZA' && (
                <SelectCustom control={control} field={"doughName"} label={"Тип теста"}
                                renderItems={DATADOUGHTYPE.map((val) => <SelectItem key={val.value}
                                                                           value={val.value}>{val.name}</SelectItem>)}/>
            )}
            {type === 'PIZZA' && (
                <div className={'flex flex-col'}>
                    <label className={'text-primary'}>Размеры</label>
                <Select
                    mode="multiple"
                    className="w-[300px]  rounded-md "
                    dropdownClassName="h-[200px] border border-primary "
                    optionLabelProp="children"
                    allowClear={true}
                    menuItemSelectedIcon={<Check size={20} strokeWidth={3} />}
                    onChange={handleSizeChange}
                    value={selectedSizes}

                >
                    {DATAPIZZASIZE.map((val) => <Option key={val.value}
                                                        value={val.value}>{val.size}</Option>)}
                </Select>
                </div>
            )}
            <>
                {type === 'PIZZA' && (
                    <div className={'flex items-center gap-x-2'}>
                     {fields.map((field, index:number) => {
                            console.log(field)
                            const sizeLabel = DATAPIZZASIZE.find(val => val.value === (field as ISize).size)?.size;
                            return (
                            <div key={field.id}>
                                <>
                                <Controller
                                    control={control}
                                    name={`sizes.${index}.price`}
                                    render={({ field:{onChange,value} }) => (
                                        <NumericFormat
                                           onValueChange={(value) => onChange(value.floatValue)}
                                            value={value}
                                            thousandSeparator=","
                                            suffix=" ₽"
                                            customInput={InputCustom}
                                            label={`Цена для ${sizeLabel} `}
                                        />
                                    )}
                                />

                            </>
                                <Controller
                                    control={control}
                                    name={`sizes.${index}.weight`}
                                    render={({ field:{onChange,value} }) => {
                                        
                                      
                                        return (
                                        <NumericFormat
                                            onValueChange={(value) => onChange(value.floatValue)}
                                            value={value}
                                            thousandSeparator=","
                                            suffix=" г"
                                            customInput={InputCustom}
                                            label={`Масса для ${sizeLabel}`}
                                        />
                                    )
                                    }}
                                />
                            </div>
                        )})}
                    </div>
               )}
            </>
            <UploadImage<IProductVariant> control={control} field={'image'}/>
        </FormLayout>
    );
};