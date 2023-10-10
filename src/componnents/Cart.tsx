import React, { useEffect, useState } from 'react';
import '../styles/Cart.css'
import { CartProps, Product } from '../enum';

const Cart: React.FC<CartProps> = ({userCarts, removeFromCart,productList, updateQuantity }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);

  const itemsPerPage = 5;
  useEffect(() => {
    // getUserCart()

    // Function to extract product details with quantity
    function getProductsFromCart(cart:any, productList:any) {
        const result = [];
  
        for (const item of cart[0].products) {
            const product = productList.find((p:any) => p.id === item.productId);
            if (product) {
              result.push({
                ...product,
                quantity: item.quantity,
              });
            }
          }
  
        return result;
      }

    // Get the new array of product objects with quantity
    const productsInCart = getProductsFromCart(userCarts, productList);
    setProductsInCart(productsInCart);
  }, [userCarts, productList]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsInCart.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(productsInCart.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };
  return (
  <>{ productsInCart.length >= 1 ? (
    <div className="cart-container">
        {/* <div><h2>Total Cart items :{cartItems.length}</h2></div> */}
      {currentItems.map((product:Product, index:number) => (
        <div key={product.id} className="cart-product-list ">
          <div className="cart-item-data">
            <div>
              <img src={product.image} alt={product.title} className="cart-product-image" />
            </div>
            <div className="cart-product-details">
              <div className="cart-product-title"><h4>{product.title}</h4></div>
              <div className="cart-product-price"><p>${product.price.toFixed(2)}</p></div>
            </div>
          </div>
          <div className="cart-item-data">
          <div className="cart-product-count">
                  <label>Quantity: </label>
                  <select
                    value={product.quantity}
                    onChange={(e) => handleUpdateQuantity(product.id, Number(e.target.value))}
                  >
                    {/* Generate options for quantity */}
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
            <div className="cart-remove-from-cart">
              <div className="cart-remove-from-cart-button">
                <button onClick={() => removeFromCart(product.id)}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="cart-pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`page-number ${currentPage === index + 1 ? 'active-page' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>) : (<h2>Your cart is empty...</h2>)}</>)
};

export default Cart;
