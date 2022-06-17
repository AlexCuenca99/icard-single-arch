const FOOD_CART = 'foodsCart';

export function getFoodsCart() {
	const response = localStorage.getItem(FOOD_CART);
	return JSON.parse(response || '[]');
}

export function addFoodToCartLocalStorage(id) {
	const foods = getFoodsCart();
	foods.push(id);
	localStorage.setItem(FOOD_CART, JSON.stringify(foods));
}

export function removeFoodFromCartLocalStorage(index) {
	const idFoods = getFoodsCart();
	idFoods.splice(index, 1);
	localStorage.setItem(FOOD_CART, JSON.stringify(idFoods));
}

export function clearFoodCartLocalStorage() {
	localStorage.removeItem(FOOD_CART);
}
