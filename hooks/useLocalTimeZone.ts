export const useLocalTimeZone = (date: Date) => {
	const newDate = new Date(date.toString()).toLocaleString('ru-RU')

	const currentDate = newDate.toString().split(',')[0]
	const currentTime = newDate.toString().split(',')[1]

	return { currentDate, currentTime }
}
