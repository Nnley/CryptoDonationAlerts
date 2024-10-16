import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	startContent?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, startContent, ...props }, ref) => {
	return (
		<div className={cn('relative')}>
			{startContent && <div className='absolute left-3 top-1/2 -translate-y-1/2'>{startContent}</div>}
			<input
				type={type}
				className={cn(
					'flex h-12 w-full rounded-[10px] border-input bg-[#323232] px-4 py-1 text-base text-[#D9D9D9] shadow-sm transition-colors placeholder:text-[#858585] placeholder:text-base',
					'file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
					startContent && 'pl-9',
					className
				)}
				ref={ref}
				{...props}
			/>
		</div>
	)
})

Input.displayName = 'Input'

export { Input }
