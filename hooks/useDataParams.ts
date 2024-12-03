import queryString from 'query-string'
import { useEffect, useRef } from 'react'
import useCustomLocation from './useCustomLocation'
export const useDataParams = <T extends string | number>(
	key: string,
	fn: (val: T) => void,
	type: 'str' | 'num'
) => {
	const isMounted = useRef(false)
	const location = useCustomLocation()

	const parsed = queryString.parse(location?.search ?? '')
	useEffect(() => {
		if (isMounted.current) return

		const value = parsed[key] as string | undefined
		if (value) {
			const valueArr = value?.split(',')
			if (type === 'str' && value !== null) {
				valueArr.forEach(val => fn(val as T))
			} else {
				valueArr.forEach(val => fn(Number(val) as T))
			}
		}
		isMounted.current = true
	}, [])
}
