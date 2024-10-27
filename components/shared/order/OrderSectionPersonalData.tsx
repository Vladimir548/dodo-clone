'use client'


import {Title} from "@/components/shared/Title";
import {InputCustom} from "@/components/shared/InputCustom";
import {InputPhone} from "@/components/InputPhone";
import {IHookForm} from "@/interface/interface-hook-form";
import {Control, Controller, FieldValues, Path} from "react-hook-form";


interface IProps<T extends FieldValues> {
    control: Control<T>;
    fieldFirstName: Path<T>
    fieldLastName: Path<T>
    fieldPhone: Path<T>
    fieldEmail: Path<T>
}

export default function OrderSectionPersonalData<T extends FieldValues>({
                                                                            fieldEmail,
                                                                            fieldPhone,
                                                                            fieldLastName,
                                                                            fieldFirstName,
                                                                            control
                                                                        }: IProps<T>) {
    return (
        <div className={'border border-primary rounded-md p-3 '}>
            <div className={'border-b border-gray-500 py-2'}>
                <Title className={'font-bold'} text={'2. Персональная информация'}/>
            </div>
            <div className="flex flex-col gap-y-2 pt-2">
                <div className={'flex items-center gap-x-3'}>
                    <Controller rules={{required:'Это поле обязательно к заполнению'}} control={control} render={({field: {onChange, value}}) => (
                        <InputCustom required={true} onChange={onChange} value={value} className={'w-[350px]'} label={'Имя'}/>
                    )} name={fieldFirstName}/>
                    <Controller control={control} render={({field: {onChange, value}}) => (
                        <InputCustom  onChange={onChange} value={value} className={'w-[350px]'} label={'Фамилия'}/>
                    )} name={fieldLastName}/>
                </div>
                <div className={'flex items-center gap-x-3'}>
                    <Controller rules={{required:'Это поле обязательно к заполнению'}} control={control} render={({field: {onChange, value}}) => (
                        <InputPhone  required={true}  onValueChange={onChange} value={value} className={'w-[350px]'}/>
                    )} name={fieldPhone}/>
                    <Controller rules={{required:'Это поле обязательно к заполнению'}} control={control} render={({field: {onChange, value}}) => (
                        <InputCustom required={true}  onChange={onChange} value={value} className={'w-[350px]'} label={'Email'}
                                     type={"email"}/>
                    )} name={fieldEmail}/>
                </div>
            </div>

        </div>
    );
};