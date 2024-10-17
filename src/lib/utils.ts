import type { IDonation } from '@/constants/alert.types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatTextBlockString(template: string, values: IDonation): string {
	return template.replace(/{(.*?)}/g, (_, key) => {
		const typedKey = key as keyof IDonation

		if (typedKey === 'walletAddress' && values[typedKey] && values[typedKey]?.length > 10) {
			const address = values[typedKey]
			return `${address.slice(0, 3)}...${address.slice(-6)}`
		}
		return values[typedKey] || ''
	})
}
