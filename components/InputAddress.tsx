'use client'

import { cn } from '@/lib/utils'
import React, { useId } from 'react'
import {
	AddressSuggestions,
	DaDataAddress,
	DaDataSuggestion,
} from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
	onChange?: (value?: string) => void
	value?: DaDataSuggestion<DaDataAddress> | string
	label?: string
	defaultAddress?: string
	containerClassName?: string
}

export const InputAddress: React.FC<Props> = ({
	onChange,
	value,
	label,
	defaultAddress,
	containerClassName,
}) => {
	const id = useId()

	return (
		<div className='flex flex-col'>
			<label htmlFor=''>{label ?? 'Адрес доставки'}</label>
			<AddressSuggestions
				defaultQuery={defaultAddress}
				delay={500}
				value={value as DaDataSuggestion<DaDataAddress>}
				containerClassName={cn('relative', containerClassName)}
				highlightClassName={'text-primary'}
				suggestionsClassName={
					'absolute left-0 top-full z-50 w-full  bg-dark-background/70 backdrop-blur-md border border-primary rounded-md mt-1 h-full overflow-y-auto min-h-[200px] max-h-[300px] '
				}
				token='b5b8bb983ddcd08648080e0271d9dd367bb7aa65'
				uid={id}
				onChange={value => onChange?.(value?.value)}
			/>
		</div>
	)
}
