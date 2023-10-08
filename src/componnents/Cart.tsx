import React, { useState } from 'react';
import '../styles/Cart.css'
import { CartProps } from '../enum';

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
  <>{ cartItems.length >= 1 ? (
    <div className="cart-container">
        {/* <div><h2>Total Cart items :{cartItems.length}</h2></div> */}
      {currentItems.map((product, index) => (
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
              <p>Quantity: {product.rating.count}</p>
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
