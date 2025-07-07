📦 Simple E-commerce App
------------------------

A full-stack e-commerce application built with:

*   ⚙️ **Node.js + Express + TypeScript** (Backend)
    
*   🛢️ **MongoDB** (Database)
    
*   🌐 **React + Tailwind CSS + Vite** (Frontend)
    
*   🔐 **JWT Authentication**
    
*   👥 **User Roles**: Customer & Admin

---

🗂️ Project Structure

```
ecommerce-monorepo/
├── backend/         # Node.js + Express API
├── frontend/        # React + Tailwind frontend
├── .gitignore
└── README.md
```

---

🚀 Features
-----------

### 👤 Authentication

*   Signup/Login with JWT
    
*   Roles: Customer and Admin
    
*   Auth tokens stored in cookies (via js-cookie)
    

### 🛍️ Customer Features

*   View products
    
*   Filter by category
    
*   Add to cart
    
*   Place orders
    
*   View past orders
    

### 🛒 Admin Features

*   Add / Delete / Update products
    
*   View product list
    
*   Manage inventory
    

### 🧩 Additional

*   Pagination support
    
*   Protected routes via role-based access

---

📡 API Endpoints – Simple E-commerce Backend
--------------------------------------------

Base URL: http://localhost:5000/api

🧑‍💻 Auth

| Method | Endpoint       | Access | Description       |
| ------ | -------------- | ------ | ----------------- |
| POST   | `/auth/register` | Public | Register new user |
| POST   | `/auth/login`  | Public | Login + get JWT   |

🛍️ Products

| Method | Endpoint        | Access | Description                                               |
| ------ | --------------- | ------ | --------------------------------------------------------- |
| GET    | `/products`     | Public | List all products (supports pagination + category search) |
| POST   | `/products`     | Admin  | Create a new product                                      |
| PUT    | `/products/:id` | Admin  | Update a product                                          |
| DELETE | `/products/:id` | Admin  | Delete a product                                          |

🔎 Query Parameters (for GET /products):

- page – optional, e.g. ?page=1

- limit – optional, e.g. ?limit=10

- category – optional, e.g. ?category=Electronics

🛒 Cart

| Method | Endpoint    | Access   | Description                  |
| ------ | ----------- | -------- | ---------------------------- |
| GET    | `/cart`     | Customer | Get current user's cart      |
| POST   | `/cart`     | Customer | Add product to cart          |
| DELETE | `/cart/:productId` | Customer | Remove product from cart     |

📦 Orders

| Method | Endpoint  | Access   | Description                |
| ------ | --------- | -------- | -------------------------- |
| POST   | `/orders` | Customer | Place order from cart      |
| GET    | `/orders` | Customer | View current user's orders |

---

⚙️ Setup Instructions
---------------------

### 📌 Prerequisites

*   Node.js (v18+ recommended)
    
*   MongoDB (local or Atlas)
    
*   pnpm or npm


---

🧰 Backend Setup
----------------

```bash
cd backend
cp .env.example .env
npm install
npm run dev 
```

### .env sample:

```bash
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/e-commerce?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

💻 Frontend Setup
-----------------

```bash
cd frontend
cp .env.example .env
npm install
npm run dev 
```

### frontend/.env sample:

```bash
VITE_API_URL=http://localhost:5000/api
```

---