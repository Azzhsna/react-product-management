# 🛍️ Product Dashboard — React 19 + Redux

A mini product management app built with React 19, Redux Toolkit, and DummyJSON API.

---

## ✨ Features

- 🔐 Login with JWT auth (DummyJSON)
- 🏠 Home page with user greeting
- 📦 Product CRUD — List, Search, Detail, Add, Edit, Delete
- 🧭 Sidebar + Navbar layout
- ♻️ Reusable shared components
- 🗃️ Redux Toolkit for state management
- 🔒 Protected routes (redirect to login if unauthenticated)
- ⚡ Skeleton loading & toast notifications

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd product-dashboard
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

---

## 🔑 Demo Credentials

| Field | Value |
|-------|-------|
| Username | `emilys` |
| Password | `emilyspass` |

> Credentials from [DummyJSON Auth](https://dummyjson.com/docs/auth#auth-login)

---

## 🌐 API Endpoints

| Feature | Endpoint |
|---------|----------|
| Login | `POST https://dummyjson.com/auth/login` |
| Get Products | `GET https://dummyjson.com/products` |
| Search Products | `GET https://dummyjson.com/products/search?q={query}` |
| Get by Category | `GET https://dummyjson.com/products/category/{category}` |
| Get Categories | `GET https://dummyjson.com/products/categories` |
| Get Product | `GET https://dummyjson.com/products/{id}` |
| Add Product | `POST https://dummyjson.com/products/add` |
| Update Product | `PUT https://dummyjson.com/products/{id}` |
| Delete Product | `DELETE https://dummyjson.com/products/{id}` |

> ⚠️ DummyJSON is a mock API — add/update/delete operations return simulated responses and do not persist data.

---

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | Auth form |
| Home | `/home` | Dashboard with stats |
| Product List | `/products` | Table with search, filter, sort, pagination |
| Product Detail | `/products/:id` | Full detail with image gallery |
| Add Product | `/products/add` | Create form |
| Edit Product | `/products/edit/:id` | Pre-filled edit form |

---

## 📝 Notes

- All CRUD operations via DummyJSON are **mock** — responses are simulated.
- Token expiry is not handled (DummyJSON tokens expire after 30 minutes by default; refresh token flow is not implemented).
- The app is for demo/portfolio purposes.
