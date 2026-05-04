# 🌞 SunCart – Summer Essentials Store

> A modern summer eCommerce platform for sunglasses, beach gear, skincare & more.

## 🚀 Live URL
**[https://suncart.vercel.app](https://suncart.vercel.app)**

## 🎯 Purpose
SunCart is a full-stack summer eCommerce app with Next.js 16 App Router. Users browse products, view detailed pages (authenticated), and manage accounts via Google OAuth or email/password through BetterAuth.

## ✨ Key Features
- 🏠 Auto-advancing Hero Slider with summer sale highlights
- 🛍️ Product Catalog with search, filter, and sort
- 🔒 Protected product detail routes (login required)
- 🔐 BetterAuth: email/password + Google OAuth
- 👤 User Profile view and update (name + photo)
- 📱 Fully responsive on mobile, tablet, desktop
- ✨ Animate.css animations throughout
- 🌙 Premium dark theme with amber/gold accents

## 📦 NPM Packages
| Package | Purpose |
|---|---|
| `next` v16 | React framework + App Router |
| `better-auth` | Authentication system |
| `@neondatabase/serverless` | Neon PostgreSQL driver |
| `react-hot-toast` | Toast notifications |
| `react-icons` | Icon library |
| `animate.css` | CSS animations (Bonus) |
| `tailwindcss` v4 | Utility CSS framework |

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + Custom CSS
- **Authentication**: BetterAuth v1
- **Database**: Neon PostgreSQL (serverless)
- **Fonts**: Playfair Display + DM Sans

## 🚀 Local Setup
```bash
git clone https://github.com/yourusername/suncart
cd suncart
npm install
cp .env.example .env.local
# Fill in .env.local with your keys
npm run dev
```

## 🗂️ Pages
- `/` — Home (Hero, Popular Products, Care Tips, Brands)
- `/products` — All products with search/filter
- `/products/[id]` — Product detail (Protected)
- `/login` — Login page
- `/register` — Register page
- `/my-profile` — View profile (Protected)
- `/my-profile/update` — Update profile (Protected)

*Made with ☀️ — SunCart Summer Essentials Store*
