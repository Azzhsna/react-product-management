import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  fetchProducts,
  searchProducts,
  setSearchQuery,
  deleteProduct,
  fetchCategories,
  fetchProductsByCategory,
  setSelectedCategory,
  setSortParams,
  setSkip,
  setLimit,
} from "../store/productSlice";
import SearchBar from "../components/shared/SearchBar";
import Pagination from "../components/shared/Pagination";
import Button from "../components/shared/Button";
import Dropdown from "../components/shared/Dropdown";
import ConfirmDialog from "../components/shared/ConfirmDialog";
import "./ProductListPage.css";

const BADGE_PALETTE = ["violet", "teal", "coral", "amber", "rose", "sky"];

const getBadgeTone = (category) => {
  if (!category) return BADGE_PALETTE[0];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = (hash * 31 + category.charCodeAt(i)) % BADGE_PALETTE.length;
  }
  return BADGE_PALETTE[Math.abs(hash)];
};

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    products,
    total,
    skip,
    limit,
    loading,
    error,
    searchQuery,
    categories,
    selectedCategory,
    sortBy,
    order,
  } = useSelector((state) => state.products);

  const currentPage = Math.floor(skip / limit) + 1;

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      dispatch(
        searchProducts({ query: searchQuery, limit, skip, sortBy, order })
      );
    } else if (selectedCategory) {
      dispatch(
        fetchProductsByCategory({
          category: selectedCategory,
          limit,
          skip,
          sortBy,
          order,
        })
      );
    } else {
      dispatch(fetchProducts({ limit, skip, sortBy, order }));
    }
  }, [dispatch, skip, limit, searchQuery, selectedCategory, sortBy, order]);

  const handlePageChange = (page) => {
    const newSkip = (page - 1) * limit;
    dispatch(setSkip(newSkip));
  };

  const handleSearch = React.useCallback(
    (query) => {
      dispatch(setSearchQuery(query));
      dispatch(setSkip(0));
    },
    [dispatch]
  );

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    dispatch(setSelectedCategory(category));
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    dispatch(setSortParams({ sortBy: newSortBy, order }));
  };

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    dispatch(setSortParams({ sortBy, order: newOrder }));
  };

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);
    dispatch(setLimit(newLimit));
  };

  const handleDeleteClick = (product) => {
    setDeleteTarget(product);
  };

  const handleCancelDelete = () => {
    if (deleting) return;
    setDeleteTarget(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await dispatch(deleteProduct(deleteTarget.id));
    setDeleting(false);
    setDeleteTarget(null);
  };

  return (
    <div className="product-list-page">
      <div className="list-heading">
        <div>
          <h1 className="list-title">Products</h1>
          <p className="list-subtitle">
            {total > 0
              ? `${total} products in your catalog`
              : "Manage your product catalog"}
          </p>
        </div>
      </div>

      <div className="page-header">
        <SearchBar
          value={searchQuery}
          onSearch={handleSearch}
          placeholder="Search products by name"
          style={{ flex: 1 }}
        />
        <Button
          variant="primary"
          style={{ flexShrink: 0 }}
          onClick={() => navigate("/products/add")}
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          }
        >
          Add Product
        </Button>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <span className="filter-icon">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </span>
          <label>Category</label>
          <Dropdown
            value={selectedCategory}
            onChange={handleCategoryChange}
            placeholder="All Categories"
            options={[
              { value: "", label: "All Categories" },
              ...categories.map((cat) => ({
                value: cat.slug || cat,
                label: cat.name || cat,
              })),
            ]}
          />
        </div>

        <div className="filter-group">
          <span className="filter-icon">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="9" x2="20" y2="9"></line>
              <line x1="4" y1="15" x2="20" y2="15"></line>
              <line x1="10" y1="3" x2="8" y2="21"></line>
              <line x1="16" y1="3" x2="14" y2="21"></line>
            </svg>
          </span>
          <label>Sort by</label>
          <Dropdown
            value={sortBy}
            onChange={handleSortChange}
            options={[
              { value: "title", label: "Title" },
              { value: "price", label: "Price" },
              { value: "rating", label: "Rating" },
              { value: "stock", label: "Stock" },
            ]}
          />
        </div>

        <div className="filter-group">
          <span className="filter-icon">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </span>
          <label>Order</label>
          <Dropdown
            value={order}
            onChange={handleOrderChange}
            options={[
              { value: "asc", label: "(A-Z / Low-High)" },
              { value: "desc", label: "(Z-A / High-Low)" },
            ]}
          />
        </div>

        <div className="filter-group">
          <span className="filter-icon">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </span>
          <label>Show</label>
          <Dropdown
            value={limit}
            onChange={handleLimitChange}
            options={[
              { value: 10, label: "10 per page" },
              { value: 15, label: "15 per page" },
              { value: 20, label: "20 per page" },
              { value: 30, label: "30 per page" },
              { value: 50, label: "50 per page" },
            ]}
          />
        </div>
      </div>

      {error && (
        <div className="error-message">Failed to load products: {error}</div>
      )}

      <div className="table-container">
        <div className="table-container-accent" aria-hidden="true"></div>
        <table className="product-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Rating</th>
              <th className="actions-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: Math.min(limit, 10) }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="skeleton-row">
                  <td>
                    <div className="product-cell-info">
                      <div className="skeleton skeleton-thumb"></div>
                      <div className="skeleton-text-group">
                        <div className="skeleton skeleton-text skeleton-title"></div>
                        <div className="skeleton skeleton-text skeleton-brand"></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="skeleton skeleton-badge"></div>
                  </td>
                  <td>
                    <div className="skeleton skeleton-text skeleton-price"></div>
                  </td>
                  <td>
                    <div className="skeleton skeleton-text skeleton-stock"></div>
                  </td>
                  <td>
                    <div className="skeleton skeleton-text skeleton-rating"></div>
                  </td>
                  <td>
                    <div className="skeleton skeleton-action"></div>
                  </td>
                </tr>
              ))
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-cell">
                  <div className="empty-state">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="7"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <p>No products found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const tone = getBadgeTone(product.category);
                return (
                  <tr key={product.id}>
                    <td>
                      <div className="product-cell-info">
                        <div className="product-thumb">
                          <img src={product.thumbnail} alt={product.title} />
                        </div>
                        <div>
                          <div className="product-title">{product.title}</div>
                          <div className="product-brand">
                            {product.brand || "No Brand"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`category-badge badge-${tone}`}>
                        {product.category}
                      </span>
                    </td>
                    <td className="price-cell">${product.price.toFixed(2)}</td>
                    <td>
                      <span
                        className={`stock-status ${
                          product.stock < 10 ? "low" : ""
                        }`}
                      >
                        {product.stock < 10 && (
                          <span className="stock-dot" aria-hidden="true"></span>
                        )}
                        {product.stock} in stock
                      </span>
                    </td>
                    <td>
                      <div className="rating-cell">
                        <svg
                          viewBox="0 0 24 24"
                          fill="var(--warning)"
                          stroke="var(--warning)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        {product.rating}
                      </div>
                    </td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <Link
                          to={`/products/${product.id}`}
                          className="action-btn view"
                          title="View"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </Link>
                        <Link
                          to={`/products/edit/${product.id}`}
                          className="action-btn edit"
                          title="Edit"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </Link>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDeleteClick(product)}
                          title="Delete"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {!loading && total > 0 && (
          <div className="table-pagination">
            <Pagination
              totalItems={total}
              itemsPerPage={limit}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete this product?"
        message={
          deleteTarget
            ? `"${deleteTarget.title}" will be permanently removed. This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ProductListPage;
