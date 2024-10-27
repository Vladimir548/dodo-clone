'use client'

import {Textarea, TextareaProps} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import * as React from "react";

interface ITextareaCustom extends TextareaProps{
    label: string;
    placeholder?:string
}

const TextareaCustom = React.forwardRef<HTMLTextAreaElement , ITextareaCustom>(
    ({ className,label,placeholder, ...props }, ref) => {
    return (
        <div className={'relative'}>
            <label className={'dark:text-white text-black '} htmlFor="">{label}</label>
            <Textarea
                placeholder={placeholder}
                className={cn(
                    "flex h-10 max-h-[200px] w-[300px] py-2 peer dark:text-white rounded-md border focus-visible:border-primary dark:border-primary/50 focus-visible:dark:border-primary bg-background px-3  text-sm ring-offset-background  dark:placeholder:text-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        </div>
    )
}
)

TextareaCustom.displayName = "TextareaCustom"

export { TextareaCustom }