'use client'



import {Title} from "@/components/shared/Title";
import {TextareaCustom} from "@/components/TextareaCustom";
import {InputAddress} from "@/components/InputAddress";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {InputCustom} from "@/components/shared/InputCustom";

interface IProps<T extends FieldValues> {
    control: Control<T>;
    fieldAddress: Path<T>
    fieldComment: Path<T>

}

export default function OrderSectionAddressDelivery<T extends FieldValues>({fieldAddress,fieldComment,control}:IProps<T>) {
    return (
        <div className={'border border-primary rounded-md p-3 '}>
            <div className={'border-b border-gray-500 py-2'}>
                <Title className={'font-bold'} text={'3. Адрес доставки'}/>
            </div>
            <div className={'pt-2'} >
                <div className={'flex flex-col gap-y-2'}>
                    <Controller rules={{required:'Это поле обязательно к заполнению'}} control={control} render={({field: {onChange, value}}) => (
                        <InputAddress onChange={onChange} value={value}  />
                    )} name={fieldAddress}/>

                    <Controller control={control} render={({field: {onChange, value}}) => (
                        <TextareaCustom onChange={onChange} value={value} placeholder={'Укажите тут дополнительную информацию для курьера'}  className={'w-full'} label={'Комментарий к заказу'}/>
                    )} name={fieldComment}/>

                </div>

            </div>

        </div>
    );
};