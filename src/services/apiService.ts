import { PRODUCT_API_URL } from "../api-constants";

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
