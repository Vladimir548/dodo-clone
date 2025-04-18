'use client'

import { InputCustom } from '@/components/shared/InputCustom'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { PatternFormat } from 'react-number-format'
interface IInputCustom {
	onValueInputChange: (value: number) => void
	action?: React.ReactNode
	required?: boolean
	className?: string
	type?: React.HTMLInputTypeAttribute
	disabled?: boolean
	defaultValue?:number
}
const InputPhone = React.forwardRef<HTMLInputElement, IInputCustom>(
	(
		{
			className,
			action,
			type,
			disabled,
			onValueInputChange,
			required,
			defaultValue,
			...props
		},
		ref
	) => {
		return (
			<PatternFormat
				className={cn(``, className)}
				required={required}
				defaultValue={defaultValue}
				onValueChange={values => onValueInputChange(Number(values.floatValue))}
				customInput={InputCustom}
				label={'Номер телефона'}
				allowEmptyFormatting
				mask='_'
				format='+# (###) ###-##-##'
				disabled={disabled}
				{...props}
			/>
		)
	}
)
InputPhone.displayName = 'InputPhone'

export { InputPhone }

