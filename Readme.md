# SvyaM

SvyaM is a full-stack MERN application designed to empower citizens by providing a direct line to report and track civic issues.

## 🚀 Empowering Citizens. Improving Communities

SvyaM is your direct line to real change. From potholes and littering to public safety concerns, report issues directly to the concerned authorities. Submit your complaint, upload a photo, and track its progress from submission to resolution.

-----

## ✨ Features

### **Citizen (User) Features**

* **Authentication:** Secure user registration and login.
* **Submit Complaint:** A clean, easy-to-use form to submit a new complaint, including:
* Title
* Description
* Location
* Concerned Authority
* **Image Upload**
* **Track Status:** A dedicated page where users can view all their submitted complaints and track their current status (e.g., "Submitted," "Started Working," "Complain Resolved").

### **Administrator Features**

* **Secure Admin Login:** Admins use the same login page but have elevated privileges.
* **Admin Dashboard:** A comprehensive, table-based view of **all** complaints submitted by **all** users.
* **Filter & Sort:** Admins can filter all complaints by their status (e.g., "Submitted," "Resolved") and sort by date.
* **Update Status:** Admins can directly update the status of any complaint. The system enforces a one-way status progression (e.g., "Submitted" can only be moved to "Registered," not backward).

-----

## 🛠️ Tech Stack

This project is a complete MERN stack application built with modern tools.

### **Frontend**

* **React:** A JavaScript library for building user interfaces.
* **Vite:** A next-generation frontend build tool for blazing-fast development.
* **Tailwind CSS:** A utility-first CSS framework for rapid, custom UI design.
* **Axios:** A promise-based HTTP client for making requests to the backend API.
* **React Context:** Used for global state management (e.g., user authentication).

### **Backend**

* **Node.js:** A JavaScript runtime for the server.
* **Express.js:** A minimal and flexible Node.js web application framework for building the REST API.
* **MongoDB:** A NoSQL, document-oriented database used to store user and complaint data.
* **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js.

### **Authentication & File Handling**

* **JSON Web Tokens (JWT):** Used for creating secure, signed tokens to manage user sessions.
* **`bcryptjs`:** For hashing user passwords before storing them in the database.
* **`cookie-parser`:** For securely storing the JWT in an `httpOnly` cookie.
* **`multer`:** A middleware for handling `multipart/form-data`, used for file uploads.

-----

## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### **Prerequisites**

* **Node.js** (v16 or later)
* **MongoDB Atlas Account** (for your cloud database) or a local MongoDB instance.

### **1. Clone the Repository**

```sh
git clone https://github.com/your-username/svyam.git
cd svyam
```

### **2. Backend Setup**

1. Navigate to the backend folder:

    ```sh
    cd backend
   ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following variables:

    ```env
    # Your MongoDB connection string
    MONGO_URI=mongodb+srv://<username>:<password>@cluster...

    # Your server port
    PORT=5000

    # A strong, random string for signing JWTs
    JWT_SECRET=your_super_secret_key_here
    ```

4. Run the backend server:

    ```sh
    npm run dev
    ```

    The server will be running on `http://localhost:5000`.

### **3. Frontend Setup**

1. Open a new terminal and navigate to the frontend folder:

    ```sh
    cd frontend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Run the frontend development server:

    ```sh
    npm run dev
    ```

    The app will be running on `http://localhost:5173` (or a similar port). The Vite proxy in `vite.config.js` will automatically forward API requests to your backend.

-----

## Usage

### **Creating an Admin User**

1. **Register** a new user (e.g., `admin@example.com`) through the frontend "Sign Up" page.
2. **Log in** to your MongoDB Atlas account and "Browse Collections."
3. Find the new user you just created in the **`users`** collection.
4. **Edit** the user document and change the `role` field from `"user"` to `"admin"`.
5. **Save** the document.
6. You can now log in with this account to access the **Admin Dashboard**.
