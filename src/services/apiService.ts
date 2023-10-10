import { PRODUCT_API_URL } from "../api-constants";
import { ALL_USER_API_URL } from "../api-constants";
import { GET_USER_CART_API_URL } from "../api-constants";

//function to fetch products
export const fetchProducts = async () => {
    try {
        const response = await fetch(PRODUCT_API_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};


//function to fetch products
export const fetchAllUsers = async () => {
    try {
        const response = await fetch(ALL_USER_API_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

//function to fetch products
export const fetchUserCart = async (id:Number) => {
    try {
        const response = await fetch(`${GET_USER_CART_API_URL}/${id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};