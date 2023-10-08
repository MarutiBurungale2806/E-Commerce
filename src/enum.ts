export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    count: number
    rating:{
        count:number,
        rate: number
    }
  }

export interface CartProps {
    cartItems: Product[];
    removeFromCart: (id: number) => void;
  }

export  interface ProductListProps {
    addToCart: (product: Product) => void;
}

export interface Rating {
    rating : number
}

export interface HeaderProps {
    cartItems: Product[];
}
  