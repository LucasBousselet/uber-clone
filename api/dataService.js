import { fakeData } from "./fakeData";

const getFeaturedCategoriesAsync = () => {
    const featuredCategories = fakeData.featured.map(normedFeature => {
        const resolvedRestanrants = getRestaurantsFromIds(normedFeature.restaurants);
        return {
            ...normedFeature,
            restaurants: resolvedRestanrants
        };
    });
    return Promise.resolve(featuredCategories);
}

const getRestaurantsAsync = () => {
    return Promise.resolve(getRestaurantsFromIds());
}

const getRestaurantsFromFeatureIdAsync = (id) => {
    const restaurantsIds = fakeData.featured.find(feat => feat.id === id)?.restaurants;
    return Promise.resolve(getRestaurantsFromIds(restaurantsIds));
}

const getRestaurantsFromIds = (ids) => {
    let restaurants = []; 
    fakeData.restaurant.forEach(normedRestaurant => {
        // If specific ids were given, and that the restaurant isn't one of them, skip it
        if (ids && !ids.includes(normedRestaurant.id)) {
            return;
        }
        const resolvedType = getCategoryById(normedRestaurant.type);
        const resolvedDishes = getDishesByIds(normedRestaurant.dishes);
        restaurants.push({
            ...normedRestaurant,
            type: resolvedType,
            dishes: resolvedDishes
        });
    })
    return restaurants;
}

const getDishesByIds = ids => {
    let dishes = [];
    ids.forEach(id => {
        dishes.push(getDishById(id));
    });
    return dishes;
}

const getDishById = id => {
    return fakeData.dish.find(dish => dish.id === id);
}

const getDishesAsync = () => {
    return Promise.resolve(fakeData.dish);
}

const getCategoryById = id => {
    return fakeData.category.find(cat => cat.id === id);
}

const getCategoriesAsync = () => {
    return Promise.resolve(fakeData.category);
}

export {
    getFeaturedCategoriesAsync,
    getRestaurantsFromFeatureIdAsync,
    getDishesAsync,
    getCategoriesAsync,
}