'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import React, { useEffect } from 'react'

import { cn } from '@/lib/utils'

type SliderProps = {
	className?: string
	min: number
	max: number
	step: number
	formatLabel?: (value: number) => string
	value?: number[] | undefined
	onValueChange?: (values: number[]) => void
	onValueCommit?: (values: number[]) => void
}

const RangeSlider = React.forwardRef(
	(
		{
			className,
			min,
			max,
			step,
			formatLabel,
			value,
			onValueChange,
			onValueCommit,
			...props
		}: SliderProps,
		ref
	) => {
		const initialValue = Array.isArray(value) ? value : [min, max]
		const [localValues, setLocalValues] = React.useState(initialValue)

		useEffect(() => {
			setLocalValues(Array.isArray(value) ? value : [min, max])
		}, [min, max, value])

		const handleValueChange = (newValues: number[]) => {
			if (onValueCommit) {
				onValueCommit(newValues)
			}
		}
		const handleLocalValueChange = (newValues: number[]) => {
			setLocalValues(newValues)
		}
		return (
			<SliderPrimitive.Root
				ref={ref as React.RefObject<HTMLDivElement>}
				min={min}
				max={max}
				step={step}
				defaultValue={localValues}
				value={localValues ?? []}
				onValueCommit={handleValueChange}
				onValueChange={handleLocalValueChange}
				className={cn(
					'relative flex w-full touch-none select-none mb-6 items-center',
					className
				)}
				{...props}
			>
				<SliderPrimitive.Track className='relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20'>
					<SliderPrimitive.Range className='absolute h-full bg-primary' />
				</SliderPrimitive.Track>
				{localValues.map((value, index) => (
					<React.Fragment key={index}>
						<div
							className='absolute text-center z-50 '
							style={{
								left: `calc(${((value - min) / (max - min)) * 100}% + 0px)`,
								top: `10px`,
							}}
						>
							<span className='text-sm'>
								{formatLabel ? formatLabel(value) : value}
							</span>
						</div>
						<SliderPrimitive.Thumb className='block h-4 w-4 rounded-full border border-primary/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50' />
					</React.Fragment>
				))}
			</SliderPrimitive.Root>
		)
	}
)

RangeSlider.displayName = SliderPrimitive.Root.displayName

export { RangeSlider }
