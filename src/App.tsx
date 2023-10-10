import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './componnents/ProductList';
import Cart from './componnents/Cart';
import Header from './componnents/Header'; // Import the Header component
import { CartData, Product } from './enum';
import Login from './componnents/Login';
import PrivateComponent from './componnents/PrivateComponent';
import { fetchProducts, fetchUserCart } from './services/apiService';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userCart, setUserCart] = useState<any[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cartCount, setCartCount] = useState<number>(userCart[0]?.products?.length || 0)
  const auth = localStorage.getItem('user');
  useEffect(() => {
    // Used fetchProducts function to fetch data
    fetchProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
    if (auth !== null) {
      fetchUserCart(JSON.parse(auth).id)
        .then((data) => {
          setUserCart(data);
          setDataLoaded(true);
          setCartCount(data[0]?.products?.length)
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, [auth]);


  // Function to add a product to the cart
  const addToCart = (product: Product) => {
    // Check if the user's cart is empty
    if (!userCart.length || !userCart[0].products.length) {
      // Create a new cart with the product
      setUserCart([{ products: [{ productId: product.id, quantity: 1 }] }]);
      setCartCount(1);
      return;
    }

    // Check if the product is already in the cart
    const isProductPresentICart = userCart[0].products.some((item: any) => {
      if (item.productId === product.id) {
        // Increase the quantity if the product is already in the cart
        item.quantity += 1;
        return true;
      }
      return false;
    });

    if (!isProductPresentICart) {
      // If the product is not in the cart, add it as a new item
      const updatedCart = [...userCart[0].products, { productId: product.id, quantity: 1 }];
      setUserCart([{ products: updatedCart }]);
      setCartCount(updatedCart.length);
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = userCart[0].products.filter((product: any) => {
      return product.productId !== productId;
    });
    setUserCart([{ products: updatedCart }]); // Update userCart state
    setCartCount(cartCount - 1)
  };


  const updateQuantity = (productId: number, newQuantity: number) => {
    // Find the product in the userCart and update its quantity
    const updatedCart = userCart[0].products.map((product: any) => {
      if (product.productId === productId) {
        return {
          ...product,
          quantity: newQuantity,
        };
      }
      return product;
    });

    setUserCart([{ products: updatedCart }]);
  };

  return (
    <Router>
      <>
        <div>
          <Header cartItemsCount={cartCount} ></Header>

          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path='/' element={<ProductList addToCart={addToCart} />}></Route>
              {/* <Route path='/update' element={<h1>update component</h1>}></Route> */}
              <Route path='/logout' element={<h1>logout component</h1>}></Route>
              <Route path='/profile' element={<h1>Profile component</h1>}></Route>
              {dataLoaded && ( // Load the Cart route only when data is available
                <Route
                  path="/cart"
                  element={
                    auth !== null ? (
                      <Cart
                        userCarts={userCart}
                        removeFromCart={removeFromCart}
                        updateQuantity={updateQuantity}
                        productList={products}
                      />
                    ) : (
                      <p>No cart items available</p>
                    )
                  }
                />
              )}
              </Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>

        </div></>
    </Router >
  );
};

export default App;
