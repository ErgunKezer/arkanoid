export function getKeyFromSessionStorage(key, defaultVal) {
	const availableUsers = sessionStorage.getItem(key);
	if (!availableUsers) {
		setSessionStorage(key, defaultVal);
		return defaultVal;
	}
	return JSON.parse(availableUsers);
}

export function setSessionStorage(key, value) {
	const stringValue = JSON.stringify(value);
	sessionStorage.setItem(key, stringValue);
}
