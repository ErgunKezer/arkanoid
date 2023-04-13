export function getKeyFromLocalStorage(key, defaultVal) {
	const availableUsers = localStorage.getItem(key);
	if (!availableUsers) {
		setLocalStorage(key, defaultVal);
		return defaultVal;
	}
	console.log('retrieve from ls');
	return JSON.parse(availableUsers);
}

export function setLocalStorage(key, value) {
	const stringValue = JSON.stringify(value);
	localStorage.setItem(key, stringValue);
}
