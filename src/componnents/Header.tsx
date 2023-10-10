import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { HeaderProps, } from '../enum';

const Header: React.FC<HeaderProps> = ({ cartItemsCount }) => {
  // Get the current route location
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState('');

  const auth = localStorage.getItem('user');


  // Function to handle navigation item click
  const handleNavItemClick = (navItem: string) => {
    setActiveNavItem(navItem);
  };

  const navigate = useNavigate()


  const logOut = () => {
    localStorage.clear();
    navigate('/login');

  }

  return (
    <header>
      <nav>
        <ul>
          {auth ? (
            <>
              <li>
                <Link
                  to="/"
                  onClick={() => handleNavItemClick('home')}
                  className={location.pathname === '/' && activeNavItem === 'home' ? 'active' : ''}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link onClick={logOut} to="/login">
                  Logout
                </Link>
              </li>
              <li className='cart-item'>
                <Link
                  to="/cart"
                  onClick={() => handleNavItemClick('cart')}
                  className={location.pathname === '/cart' && activeNavItem === 'cart' ? 'active' : ''}
                >
                  Cart
                  <span className="cart-count cart-icon">{cartItemsCount}🛒</span>
                </Link>
              </li>
              
            </>) : (<><li>Well-Come to E-Commerce website</li></>)}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
