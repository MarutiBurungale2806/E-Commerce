import React, { useState, useEffect } from 'react';
import '../styles/Product.css';
import { Product, ProductListProps } from '../enum';
import StarRating from './StarRating';
import { fetchProducts } from '../services/apiService';

const ProductList = ({ addToCart }: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [expandedDescriptions, setExpandedDescriptions] = useState<boolean[]>([]);
    const productsPerPage = 5;

    useEffect(() => {
        // Used fetchProducts function to fetch data
        fetchProducts()
            .then((data) => {
                setProducts(data);
                setExpandedDescriptions(new Array(data.length).fill(false));
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);


    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const toggleDescription = (index: number) => {
        const newExpandedDescriptions = [...expandedDescriptions];
        newExpandedDescriptions[index] = !newExpandedDescriptions[index];
        setExpandedDescriptions(newExpandedDescriptions);
    };

    return (
        <>
            {products.length >= 1 ? (
                <div className="product-list-container">
                    {currentProducts.map((product, index) => (
                        <div key={product.id} className="product-card">
                            <div className="product-data">
                                <div className="image-container">
                                    <img src={product.image} alt={product.title} className="product-image" />
                                    <div className="product-image-back"></div>
                                </div>
                                <div className="product-details">
                                    <div className="product-title">
                                        <h4>{product.title}</h4>
                                    </div>
                                    <div className="product-price">
                                        <p>${product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="product-rating">
                                        <p>Rating:
                                            {product.rating.rate} <StarRating rating={product.rating.rate} /></p>
                                        <p>Reviews: {product.rating.count}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="product-data">
                                <div className="product-description">
                                    <p>
                                        {expandedDescriptions[index]
                                            ? product.description 
                                            : `${product.description.slice(0, 70)}...`}
                                        {product.description.length > 70 && (
                                            <span
                                                onClick={() => toggleDescription(index)}
                                                className="see-more-button"
                                            >
                                                {expandedDescriptions[index] ? 'See Less' : 'See More'}
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <div className="add-to-cart">
                                    <div className="add-to-cart-button">
                                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="pagination">
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
                </div>
            ) : (
                <p>Loading products...</p>
            )}
        </>
    );
};

export default ProductList;
