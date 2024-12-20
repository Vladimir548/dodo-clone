'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IHookForm } from '@/interface/interface-hook-form'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

interface IInputCounter<T extends FieldValues> extends IHookForm<T> {
	min: number
	max: number
	label: string
	disabled?: boolean
}

export default function InputCounter<T extends FieldValues>({
	min,
	max,
	label,
	disabled,
	field,
	control,
}: IInputCounter<T>) {
	const [count, setCount] = useState<number>(min)

	return (
		<div>
			<label className={'text-primary'} htmlFor=''>
				{label}
			</label>
			<Controller
				control={control}
				render={({ field: { onChange, value } }) => {
					if (!value) {
						onChange(count)
					}
					return (
						<div className={'flex items-center gap-x-3'}>
							<Button
								type={'button'}
								disabled={count <= min || disabled}
								onClick={() => setCount(Number(count) - 1)}
								variant={'outline'}
							>
								<Minus size={18} />
							</Button>
							<NumericFormat
								isAllowed={values => {
									const { value } = values
									return Number(value) < max && Number(value) > min
								}}
								className={'w-[60px]'}
								disabled={disabled}
								onValueChange={values => {
									console.log(values.value)
									onChange(values.value)
									setCount(Number(values.value))
								}}
								customInput={Input}
								value={count}
								min={min}
								max={max}
							/>

							<Button
								type={'button'}
								disabled={count >= max || disabled}
								onClick={() => setCount(Number(count) + 1)}
								variant={'outline'}
							>
								<Plus size={18} />
							</Button>
						</div>
					)
				}}
				name={field}
			/>
		</div>
	)
}
