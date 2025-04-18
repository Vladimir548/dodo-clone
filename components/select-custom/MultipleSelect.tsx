'use client'
import React from 'react'

import { Check } from 'lucide-react'
import Select from 'rc-select'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import './style.css'

interface ISelectProps<T extends FieldValues> {
	label: string
	control: Control<T>
	field: Path<T>
	option: React.ReactNode
	disabled?: boolean
}

export default function MultipleSelect<T extends FieldValues>({
	option,
	label,
	field,
	control,
	disabled,
}: ISelectProps<T>) {
	return (
		<div className={'flex flex-col text-primary'}>
			<label htmlFor=''>{label}</label>
			<Controller
				disabled={disabled}
				control={control}
				render={({ field: { onChange, value } }) => (
					<Select
						mode='multiple'
						className='w-[300px]  rounded-md '
						dropdownClassName='h-[200px] border border-primary '
						optionLabelProp='children'
						allowClear={true}
						menuItemSelectedIcon={<Check size={20} strokeWidth={3} />}
						onChange={onChange}
						value={value}
					>
						{option}
					</Select>
				)}
				name={field}
			/>
		</div>
	)
}
