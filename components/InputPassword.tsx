'use client'

import {useState} from "react";
import {InputCustom} from "@/components/shared/InputCustom";
import {Eye, EyeOff} from "lucide-react";
import {Controller, FieldValues} from "react-hook-form";
import {IHookForm} from "@/interface/interface-hook-form";
interface IPasswordInput<T extends FieldValues> extends IHookForm<T> {
    label:string
}

export default function InputPassword<T extends  FieldValues>({control,field,label}:IPasswordInput<T>)  {
    const [isHidden, setIsHidden] = useState(false);

    return (
            <Controller control={control} render={({field: {onChange, value}})=> (

                <InputCustom action={  <button type={"button"} onClick={()=>setIsHidden(prev => !prev)}  className={'absolute top-1/2 -translate-y-1/2 right-0 text-primary px-2 duration-300 ease-in-out w-10 h-full hover:text-primary/70 '}>{isHidden ? <EyeOff /> : <Eye />}</button>}  onChange={onChange} value={value}  type={isHidden ?  'text' :"password"} width={300}
                               className={'w-[300px]'} label={label} placeholder={'*************'}/>
            )} name={field}/>
    );
};