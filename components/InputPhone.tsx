'use client'

import {InputCustom} from "@/components/shared/InputCustom";
import { PatternFormat} from "react-number-format";
import {cn} from "@/lib/utils";
import {InputProps} from "@/components/ui/input";
import * as React from "react";
interface IInputCustom extends InputProps{
    onValueChange:(value:number)=>void
    action?:React.ReactNode
    required?:boolean
}
const InputPhone = React.forwardRef<HTMLInputElement , IInputCustom>(
    ({ className,action, type,onChange,onValueChange,required, ...props }, ref) => {
    return (
        <PatternFormat
            className={cn(
                ``,
                className
            )}
            required={required}

            onValueChange={(values)=> onValueChange(Number(values.floatValue)) }
            customInput={InputCustom}
            label={'Номер телефона'}
            allowEmptyFormatting
            mask="_"
            format="+7 (###) ###-##-##"
        />
    )
}
)
InputPhone.displayName = "InputPhone"

export { InputPhone }