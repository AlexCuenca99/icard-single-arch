import { TOKEN, TABLE_OCUPPIED } from '../utils/constants';

export function setToken(token) {
	localStorage.setItem(TOKEN, token);
}

export function getToken() {
	return localStorage.getItem(TOKEN);
}

export function removeToken() {
	localStorage.removeItem(TOKEN);
}

export function setTableOcuppied(tableNumber) {
	localStorage.setItem(TABLE_OCUPPIED, tableNumber);
}

export function getTableOcuppied() {
	return localStorage.getItem(TABLE_OCUPPIED);
}

export function removeTableOcuppied() {
	localStorage.removeItem(TABLE_OCUPPIED);
}
