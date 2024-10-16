'use client'

import { cn } from '@/lib/utils'
import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

interface SliderProps {
	className?: string
	value?: number[]
	tooltipText?: string
	tooltip?: boolean
}

const Tooltip = ({ value, text, left }: { value: number[]; text: string; left: number }) => {
	const tooltipWidth = text.length * 6
	const adjustedLeft = left - tooltipWidth / 2

	return (
		<div
			className='absolute text-sm text-[#A4A4A4] flex flex-row gap-[3px] max-w-52'
			style={{
				left: `${adjustedLeft}px`,
				top: 'calc(100% + 4px)',
			}}
		>
			<span>{value[0]}</span>
			<span>{text}</span>
		</div>
	)
}

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & SliderProps
>(({ className, value, tooltipText, tooltip = false, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn('relative flex w-full touch-none select-none items-center', className)}
		{...props}
	>
		<SliderPrimitive.Track className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-[#323232]'>
			<SliderPrimitive.Range className='absolute h-full bg-[#576AEB]' />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className='block h-5 w-5 rounded-full border border-[#576AEB] bg-[#576AEB] shadow transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'>
			{tooltip !== false && value !== undefined && (
				<Tooltip value={value} text={tooltipText || ''} left={value[0] / 100} />
			)}
		</SliderPrimitive.Thumb>
	</SliderPrimitive.Root>
))

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
