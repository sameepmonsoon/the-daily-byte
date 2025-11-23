# The Daily Byte

A modern Next.js 16 application for blogging and content management, featuring both public blogs and a private dashboard for managing posts.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

The Daily Byte is a blogging platform built with Next.js 16, Supabase as backend, and TailwindCSS for UI.  
It features:
- Public-facing blog listing
- Blog categories and search
- Private dashboard for creating, editing, and managing blogs
- User authentication with NextAuth.js
- Image uploads for blogs

---

## Features

### Public
- Browse blogs
- Filter by categories
- Search blogs
- Pagination

### Dashboard
- Create, edit, delete blogs
- Upload featured images
- View latest posts and blog categories

---

## Tech Stack
- **Frontend:** Next.js 16, React, TailwindCSS, ShadCN UI
- **Backend / DB:** Supabase (PostgreSQL)
- **Authentication:** NextAuth.js
- **State Management:** React Query / TanStack Query
- **Form Handling & Validation:** React Hook Form + Zod
- **Deployment:** Vercel or Netlify (free tier)

---

## Getting Started

### 1. Clone repository
```bash
git clone git@github.com:sameepmonsoon/the-daily-byte.git
cd the-daily-byte
