import { cn } from '@/lib/utils'
import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	startContent?: React.ReactNode
	onFileChange?: (file: File | null) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, startContent, onFileChange, ...props }, ref) => {
		const isFileInput = type === 'file'
		const [isDragging, setIsDragging] = React.useState(false)

		const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
			event.preventDefault()
		}

		const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
			event.preventDefault()
			setIsDragging(true)
		}

		const handleDragLeave = () => {
			setIsDragging(false)
		}

		const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
			event.preventDefault()
			setIsDragging(false)
			const file = event.dataTransfer.files[0]
			if (file && onFileChange) {
				onFileChange(file)
			}
		}

		const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0]
			if (onFileChange) {
				onFileChange(file || null)
			}
		}

		return (
			<div className='relative'>
				{startContent && <div className='absolute left-3 top-1/2 -translate-y-1/2'>{startContent}</div>}
				<input
					type={type}
					accept='audio/*'
					className={cn(
						'flex h-12 w-full rounded-[10px] border-input bg-[#323232] px-4 py-1 text-base text-[#D9D9D9] shadow-sm transition-colors placeholder:text-[#858585] placeholder:text-base focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
						isFileInput && 'cursor-pointer hidden',
						startContent && 'pl-9',
						className
					)}
					ref={ref}
					onChange={handleFileInputChange}
					{...props}
				/>
				{isFileInput && (
					<label
						htmlFor={props.id}
						className={cn(
							'flex cursor-pointer items-center justify-center bg-gray-500 hover:bg-gray-600 text-white font-bold',
							'bg-transparent border-2 border-gray-500 border-dashed rounded-xl',
							isDragging && 'bg-gray-700',
							className
						)}
						onDragOver={handleDragOver}
						onDragEnter={handleDragEnter}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
					>
						{props.value && typeof props.value === 'string' ? (
							<span className='truncate pointer-events-none'>{props.value}</span>
						) : (
							<span className='flex items-center justify-center pointer-events-none'>Выберите аудио</span>
						)}
					</label>
				)}
			</div>
		)
	}
)

Input.displayName = 'Input'

export { Input }
