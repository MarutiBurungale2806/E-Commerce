export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    count: number
    rating: {
        count: number,
        rate: number
    };
    quantity: number
}


export interface CartProps {
    removeFromCart: (id: number) => void;
    updateQuantity: (productId: number, newQuantity: number) => void;
    userCarts: {};
    productList: Product[]
}

export interface ProductListProps {
    addToCart: (product: Product) => void;
}

export interface Rating {
    rating: number
}

export interface HeaderProps {
    cartItemsCount: number;
}

export interface userId {
    id: number
}

export interface CartData {
    id: number;
    userId: number;
    date: string;
    products: {
      productId: number;
      quantity: number;
    }[];
    __v: number;
  }
  

