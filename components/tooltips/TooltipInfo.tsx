'use client'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'
import { Title } from '../shared/Title'

interface ITooltipInfo {
	contentText: string
	titleText?: string
	contentClass?: string
}

function TooltipInfo({ contentText, titleText, contentClass }: ITooltipInfo) {
	return (
		<TooltipProvider delayDuration={100}>
			<Tooltip>
				<TooltipTrigger asChild>
					<button>
						<Info size={14} />
					</button>
				</TooltipTrigger>
				<TooltipContent className={'max-w-[400px]'}>
					{titleText && <Title className={'pb-2'} text={titleText} />}
					<p
						className={cn(
							'dark:text-white/80 text-black/80 pb-1',
							contentClass
						)}
					>
						{contentText}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default TooltipInfo
