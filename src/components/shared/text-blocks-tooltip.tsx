'use client'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
	className?: string
}

export const TextBlocksTooltip = ({ children, className }: Props) => {
	return (
		<HoverCard openDelay={200} closeDelay={100}>
			<HoverCardTrigger asChild>{children}</HoverCardTrigger>
			<HoverCardContent className={cn('bg-neutral-700', className)}>
				<div className='flex flex-col gap-1 text-center'>
					<div>
						<span className='text-neutral-400 font-bold text-base'>{'{walletAddress}'}</span>
						<small className='text-neutral-100 ml-2 text-sm'>- адрес кошелька донатера</small>
					</div>
					<div>
						<span className='text-neutral-400 font-bold text-base'>{'{tokenName}'}</span>
						<small className='text-neutral-100 ml-2 text-sm'>- название криптовалюты</small>
					</div>
					<div>
						<span className='text-neutral-400 font-bold text-base'>{'{amount}'}</span>
						<small className='text-neutral-100 ml-2 text-sm'>- сумма отправленных монет</small>
					</div>
				</div>
				<p className='text-wrap text-center text-xs text-neutral-300 mt-4 max-w-[350px]'>
					Вы можете использовать плейсхолдеры для персонализации вашего контента. Плейсхолдеры - это специальные
					маркеры, которые заменяются на актуальные значения при отображении контента.
				</p>
			</HoverCardContent>
		</HoverCard>
	)
}
