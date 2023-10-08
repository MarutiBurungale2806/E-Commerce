import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './componnents/ProductList';
import Cart from './componnents/Cart';
import Header from './componnents/Header'; // Import the Header component
import { Product } from './enum';

const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  // Function to add a product to the cart
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  return (
    <Router>
      <div>
        {/* Use the Header component */}
        <Header cartItems={cart}/>

        <Routes>
          <Route
            path="/"
            element={<ProductList addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={<Cart cartItems={cart} removeFromCart={removeFromCart} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
