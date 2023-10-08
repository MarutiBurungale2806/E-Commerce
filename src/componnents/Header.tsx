import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import { HeaderProps } from '../enum';

const Header: React.FC<HeaderProps> = ({ cartItems }) => {
  // Get the current route location
  const location = useLocation(); 
  const [activeNavItem, setActiveNavItem] = useState(''); 

  // Function to handle navigation item click
  const handleNavItemClick = (navItem: string) => {
    setActiveNavItem(navItem);
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              onClick={() => handleNavItemClick('home')}
              className={location.pathname === '/' && activeNavItem === 'home' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li className='cart-item'>
            <Link
              to="/cart"
              onClick={() => handleNavItemClick('cart')}
              className={location.pathname === '/cart' && activeNavItem === 'cart' ? 'active' : ''}
            >
              Cart
              <span className="cart-count cart-icon">{cartItems.length}🛒</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
