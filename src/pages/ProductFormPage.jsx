import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, addProduct, updateProduct, clearSelectedProduct, fetchCategories } from '../store/productSlice';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import './ProductFormPage.css';

const ProductFormPage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedProduct, loading, error, categories } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
    category: '',
    stock: '',
    thumbnail: ''
  });

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
    if (isEditMode) {
      dispatch(fetchProductById(id));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id, isEditMode, categories.length]);

  useEffect(() => {
    if (isEditMode && selectedProduct) {
      setFormData({
        title: selectedProduct.title || '',
        description: selectedProduct.description || '',
        price: selectedProduct.price || '',
        brand: selectedProduct.brand || '',
        category: selectedProduct.category || '',
        stock: selectedProduct.stock || '',
        thumbnail: selectedProduct.thumbnail || ''
      });
    }
  }, [isEditMode, selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Parse numeric fields
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
    };

    let resultAction;
    if (isEditMode) {
      resultAction = await dispatch(updateProduct({ id, ...productData }));
    } else {
      resultAction = await dispatch(addProduct(productData));
    }

    if (!resultAction.error) {
      alert(`Product successfully ${isEditMode ? 'updated' : 'added'}! (Mock API)`);
      navigate('/products');
    }
  };


  if (loading && isEditMode && !selectedProduct) {
    return (
      <div className="product-form-page">
        <div className="form-header">
          <div className="skeleton" style={{ width: '150px', height: '36px' }}></div>
          <div className="skeleton" style={{ width: '200px', height: '40px' }}></div>
        </div>
        <div className="form-content glass" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div className="skeleton" style={{ width: '100px', height: '16px', marginBottom: '8px' }}></div>
              <div className="skeleton" style={{ width: '100%', height: '48px', borderRadius: '8px' }}></div>
            </div>
          ))}
          <div className="skeleton" style={{ width: '150px', height: '48px', alignSelf: 'flex-end', marginTop: '16px' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-form-page">
      <div className="form-header">
        <Button variant="ghost" onClick={() => navigate('/products')} icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        }>
          Back
        </Button>
        <h1 className="form-title">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
      </div>

      {error && <div className="form-error">Error: {error}</div>}

      <div className="form-container glass">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            <Input
              label="Product Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. iPhone 14 Pro"
              required
            />
            
            <Input
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g. Apple"
              required
            />

            <div className="form-group">
              <label className="input-label">Category <span className="text-danger">*</span></label>
              <select
                className="input-field"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat.slug || cat}>
                    {cat.name || cat}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Price ($)"
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
            />

            <Input
              label="Stock Quantity"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              required
            />

            <Input
              label="Thumbnail URL"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-full-width">
            <label className="textarea-label">Description <span className="text-danger">*</span></label>
            <textarea
              className="textarea-field"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed product description..."
              rows="5"
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <Button variant="secondary" onClick={() => navigate('/products')}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              {isEditMode ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormPage;
