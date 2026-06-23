import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearSelectedProduct, setSelectedProductFromCache } from '../store/productSlice';
import Button from '../components/shared/Button';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProduct: product, products, loading, error } = useSelector((state) => state.products);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const existingProduct = products.find(p => p.id === Number(id));
    if (existingProduct && existingProduct.images && existingProduct.reviews) {
      dispatch(setSelectedProductFromCache(existingProduct));
    } else {
      dispatch(fetchProductById(id));
    }
    
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id, products]);

  useEffect(() => {
    if (product?.thumbnail) {
      setActiveImage(product.thumbnail);
    }
  }, [product]);

  if (error) {
    return <div className="detail-error">Error: {error}</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="detail-header">
        <Button variant="ghost" onClick={() => navigate('/products')} icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        }>
          Back to Products
        </Button>
        {!loading && product && (
          <Button variant="primary" onClick={() => navigate(`/products/edit/${product.id}`)}>
            Edit Product
          </Button>
        )}
      </div>

      <div className="detail-content glass">
        {loading || !product ? (
          <>
            <div className="product-gallery">
              <div className="main-image skeleton" style={{ width: '100%', aspectRatio: '1/1' }}></div>
              <div className="image-thumbnails">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="thumb skeleton" style={{ border: 'none' }}></div>
                ))}
              </div>
            </div>
            <div className="product-info">
              <div className="skeleton" style={{ width: '120px', height: '20px', marginBottom: '12px' }}></div>
              <div className="skeleton" style={{ width: '80%', height: '40px', marginBottom: '16px' }}></div>
              <div className="skeleton" style={{ width: '60%', height: '24px', marginBottom: '24px' }}></div>
              
              <div className="price-section" style={{ border: 'none', padding: '0 0 24px 0' }}>
                <div className="skeleton" style={{ width: '150px', height: '40px' }}></div>
              </div>
              
              <div className="skeleton" style={{ width: '100%', height: '100px', marginBottom: '24px' }}></div>
              <div className="skeleton" style={{ width: '100%', height: '150px' }}></div>
            </div>
          </>
        ) : (
          <>
            <div className="product-gallery">
              <div className="main-image">
                <img src={activeImage || product.thumbnail} alt={product.title} />
              </div>
              <div className="image-thumbnails">
                <div 
                  className={`thumb ${activeImage === product.thumbnail ? 'active' : ''}`}
                  onClick={() => setActiveImage(product.thumbnail)}
                >
                  <img src={product.thumbnail} alt={`${product.title} thumbnail`} />
                </div>
                {product.images?.filter(img => img !== product.thumbnail).map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`thumb ${activeImage === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={img} alt={`${product.title} ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>

        <div className="product-info">
          <div className="info-header">
            <div className="brand-category">
              <span className="brand">{product.brand || 'No Brand'}</span>
              <span className="category-badge">{product.category}</span>
            </div>
            <h1 className="title">{product.title}</h1>
            
            <div className="rating-wrap">
              <div className="stars">
                <svg viewBox="0 0 24 24" fill="var(--warning)" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>{product.rating}</span>
              </div>
              <span className="reviews-count">({product.reviews?.length || 0} reviews)</span>
            </div>
          </div>

          <div className="price-section">
            <div className="price">${product.price.toFixed(2)}</div>
            {product.discountPercentage > 0 && (
              <div className="discount">-{product.discountPercentage}% OFF</div>
            )}
          </div>

          <p className="description">{product.description}</p>

          <div className="meta-grid">
            <div className="meta-item">
              <span className="meta-label">Stock Status</span>
              <span className={`meta-value ${product.stock < 10 ? 'text-danger' : ''}`}>
                {product.stock} units ({product.availabilityStatus})
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">SKU</span>
              <span className="meta-value">{product.sku}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Weight</span>
              <span className="meta-value">{product.weight} oz</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Dimensions</span>
              <span className="meta-value">
                {product.dimensions?.width} x {product.dimensions?.height} x {product.dimensions?.depth} cm
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Warranty</span>
              <span className="meta-value">{product.warrantyInformation}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Shipping</span>
              <span className="meta-value">{product.shippingInformation}</span>
            </div>
          </div>
          
          <div className="tags-section">
            <h4>Tags</h4>
            <div className="tags-list">
              {product.tags?.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
