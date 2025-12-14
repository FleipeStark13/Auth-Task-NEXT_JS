# 🚀 Authentication Task with Next.js (TypeScript)

Welcome! This repository contains my **first fully completed personal authentication project**, built with **Next.js and TypeScript**.

The main purpose of this project was **learning by doing**: understanding and implementing a complete authentication flow from scratch — including login, registration, middleware protection, and database connection — using modern web development practices.

This project is **educational**, not production-ready, and was intentionally kept simple to focus on core concepts.

---

## 🎯 Project Goal

The primary goal was to **build a complete and functional authentication system**, covering the full user journey:

- **User Registration** – Create a new account with encrypted passwords  
- **User Login** – Authenticate users using credentials  
- **JWT Authentication** – Generate and validate tokens  
- **Protected Routes** – Restrict access to private pages (e.g. dashboard)  
- **Middleware Authorization** – Secure routes at request level  
- **Logout Flow** – End user sessions securely  
- **Database Integration** – Persist users and data  

This project helped me understand how authentication works **end-to-end**, both on the client and server side.

---

## 🧠 Key Concepts Practiced

- Authentication flow (register → login → token → protected route)
- Password hashing with **bcrypt**
- JWT creation and validation
- HTTP-only cookies for session security
- Middleware-based route protection
- Separation of concerns (routes, services, middleware)
- Environment variables and configuration
- Type safety with TypeScript

---

## 🛠️ Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **React**
- **JWT (JSON Web Tokens)**
- **bcrypt**
- **Cookies (HTTP-only)**
- **Next.js API Routes**
- **Middleware**
- **Database connection** (for user persistence)

---

## 🔐 Authentication Flow Overview

1. **Register**
   - User submits email and password
   - Password is hashed using bcrypt
   - User is stored in the database

2. **Login**
   - Credentials are validated
   - Password hash is compared
   - JWT token is generated
   - Token is stored in an HTTP-only cookie

3. **Protected Routes**
   - Middleware checks for a valid JWT
   - Unauthorized users are redirected

4. **Logout**
   - Authentication cookie is removed
   - Session is invalidated

---

## 🚧 Challenges Faced & Learnings

### 1. Implementing Secure Authentication
Understanding how to securely handle passwords, tokens, and cookies was one of the biggest challenges.

**Learning:**  
I learned why passwords should never be stored in plain text and how JWT + HTTP-only cookies improve security.

---

### 2. Middleware-Based Route Protection
Protecting routes at the middleware level was new to me.

**Learning:**  
Middleware allows authentication checks **before** the page loads, which is more secure and scalable than client-only checks.

---

### 3. TypeScript with Authentication Logic
Typing JWT payloads, request bodies, and service functions required extra attention.

**Learning:**  
TypeScript forces clarity and prevents many runtime errors — especially important in authentication systems.

---

## 📌 Project Limitations

This project was built **for learning purposes**, so some aspects are intentionally simplified:

- Basic input validation
- Simplified error handling
- Single protected route example
- No refresh token implementation

These trade-offs allowed me to focus on understanding the fundamentals.

---

## 🔮 Future Improvements

Planned enhancements for future versions:

- Better input validation (e.g. Zod or Yup)
- Improved error handling and responses
- Refresh token strategy
- Role-based authorization
- Better project structure (separating auth/user services)
- UI feedback (toasts, loading states)
- Tests (unit & integration)

---

## 📚 What This Project Represents

This repository represents:
- My first complete authentication implementation
- Hands-on experience with real-world concepts
- A solid foundation for more advanced applications

---

## 🏷️ Tags

`#NextJS` `#TypeScript` `#Authentication` `#JWT` `#WebDevelopment`  
`#BeginnerProject` `#LearningByDoing` `#FullStack` `#Middleware`
