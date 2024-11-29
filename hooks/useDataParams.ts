import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export const useDataParams = (
	key: string,
	fn: (val: number | string) => void,
	type: 'str' | 'num'
) => {
	const isMounted = useRef(false)
	const searchParams = useSearchParams()
	useEffect(() => {
		if (isMounted.current) return
		const value = searchParams.get(key)
		if (type === 'str') {
			fn(value)
		} else {
			value?.split(',').map(val => fn(Number(val)))
		}
		isMounted.current = true
	}, [])
}
