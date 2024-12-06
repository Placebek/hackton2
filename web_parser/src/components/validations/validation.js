export const validateInput = value => {
	const ipv4Regex =
		/^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/
	const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/

	if (ipv4Regex.test(value)) {
		return { isValid: true, message: 'Введён корректный IP-адрес' }
	} else if (domainRegex.test(value)) {
		return { isValid: true, message: 'Введён корректный домен' }
	} else {
		return {
			isValid: false,
			message: 'Неверный формат. Введите IP-адрес или домен',
		}
	}
}
