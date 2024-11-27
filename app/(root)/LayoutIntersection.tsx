'use client'

import { useIntersectionCategory } from '@/hooks/useIntersectionCategory'
import { TypeProduct } from '@/interface/enums'
import { cn } from '@/lib/utils'

interface ILayoutIntersection {
	children: React.ReactNode
	slug: string
	className?: string
	categoryId: number
	type: TypeProduct
}

export default function LayoutIntersection({
	children,
	slug,
	className,
	categoryId,
	type,
}: ILayoutIntersection) {
	const { intersectionRef } = useIntersectionCategory(slug, categoryId, type)

	return (
		<div
			className={cn('min-h-[600px]', className)}
			id={slug}
			ref={intersectionRef}
		>
			{children}
		</div>
	)
}
