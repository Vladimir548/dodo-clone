'use client'

import Select, {Option} from "rc-select";
import {IHookForm} from "@/interface/interface-hook-form";
import { Controller, useFieldArray} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {QueryProportion} from "@/app/api/query-proportion";
import {TypeProduct} from "@/interface/enums";
import { useState } from "react";
import { IProductVariant, ISize } from "@/interface/interface-product-variant";
import { InputCustom } from "@/components/shared/InputCustom";
import { NumericFormat } from "react-number-format";
import { Check } from "lucide-react";
import {IProportion} from "@/interface/IProportion";

type FormValues = IProductVariant;
interface ISizeProps extends IHookForm<FormValues>{
    category:number | undefined
    watch:any
}

export default function SelectSize({control,category,watch}:ISizeProps) {

    const {data} = useQuery({
        queryKey:['by-type-size',category],
        queryFn:()=> QueryProportion.byType(category),
        enabled:!!category
    })

    const [selectedSizes, setSelectedSizes] = useState<number[]>([]);

  
    const { fields, append, remove } = useFieldArray<FormValues>({
        control,
        name: "sizes",

    });

    const handleSizeChange = (value: number[]) => {
        setSelectedSizes(value);
        const currentValues:ISize[] = watch("sizes");
        currentValues.forEach((field, index) => {
            if (!value.includes(field.sizeId)) {
                remove(index);
            }
        });

        value.forEach((size) => {
            console.log(size)
            if (!currentValues.some((field) => field.sizeId === size)) {
                append(({ sizeId:size, price: 0, weight: 0, }) as ISize);
            }
        });
    };

    return (
        <>
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
                    value={selectedSizes}>
                    {data?.map((val) => <Option key={val.id}
                                                        value={val.id}>{val.value}</Option>)}
                </Select>
                </div>
                 
                    <div className={'flex items-center gap-x-2'}>
                     {fields.map((field, index:number) => {   
                        console.log(field)                 
                            const sizeLabel = data?.find(val => Number(val.id) === (field as ISize).sizeId)?.value;
                            console.log('sizeLabel',sizeLabel)
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
               
                </>
    );
};