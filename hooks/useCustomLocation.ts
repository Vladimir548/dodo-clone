import { useEffect, useState } from 'react'

const useCustomLocation = () => {
	const [location, setLocation] = useState(() => {
		if (typeof window === 'undefined') {
			return null
		}
		return {
			href: window.location.href,
			protocol: window.location.protocol,
			host: window.location.host,
			hostname: window.location.hostname,
			port: window.location.port,
			pathname: window.location.pathname,
			search: window.location.search,
			hash: window.location.hash,
			origin: window.location.origin,
		}
	})

	useEffect(() => {
		const updateLocation = () => {
			if (typeof window !== 'undefined') {
				setLocation({
					href: window.location.href,
					protocol: window.location.protocol,
					host: window.location.host,
					hostname: window.location.hostname,
					port: window.location.port,
					pathname: window.location.pathname,
					search: window.location.search,
					hash: window.location.hash,
					origin: window.location.origin,
				})
			}
		}

		window.addEventListener('popstate', updateLocation)
		window.addEventListener('hashchange', updateLocation)
		window.addEventListener('replacestate', updateLocation)
		window.addEventListener('pushstate', updateLocation)

		return () => {
			window.removeEventListener('popstate', updateLocation)
			window.removeEventListener('hashchange', updateLocation)
			window.removeEventListener('replacestate', updateLocation)
			window.removeEventListener('pushstate', updateLocation)
		}
	}, [])

	return location
}

export default useCustomLocation
