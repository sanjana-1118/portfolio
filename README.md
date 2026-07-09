# Sanjana's  Portfolio 🚀

A premium, high-performance personal portfolio built with React, Vite, and Tailwind CSS. Designed with a focus on editorial typography, generous whitespace, smooth animations, and a handcrafted user experience.

---

## 🌟 Features

- **Premium UI/UX**: Custom design system featuring modern typography, tailored colors, and sleek aesthetics.
- **Fluid Animations**: Utilizing GSAP and Framer Motion for scroll-triggered reveals, staggered entrances, and seamless interactive UI elements.
- **Lenis Smooth Scrolling**: Buttery smooth 60fps scrolling experience across the entire page.
- **Scalable Architecture**: Highly modular component design built with React and strict TypeScript.
- **Data-Driven Content**: All content (Profile, Experience, Education, Projects, Certificates) is centrally managed in `src/data`, simulating a backend fetch for easy, scalable updates.
- **Fully Responsive**: Pixel-perfect layouts adapted for mobile phones, tablets, and large desktop screens via Tailwind's responsive utilities.

---

## 🛠️ Technology Stack

- **Core**: React.js 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion, GSAP (with ScrollTrigger)
- **Scrolling Experience**: @studio-freight/lenis
- **Carousels/Sliders**: Embla Carousel React
- **Icons**: Lucide React
- **SEO/Meta**: React Helmet Async

---

## ⚙️ Local Development Setup

### 1. Clone & Install Dependencies

Open your terminal, navigate into the `client` folder, and install the required npm packages:

```bash
cd client
npm install
```

### 2. Run the Application

Start the Vite local development server:

```bash
npm run dev
```

*The application will launch and be accessible at http://localhost:5173*

---

## 📝 Managing Your Content

Because this portfolio uses a frontend-only architecture, you don't need a complex database to update your site. 

To update your personal details, jobs, projects, or certificates, simply modify the TypeScript data files located in the `src/data/` directory:
- `src/data/profile.ts`
- `src/data/projects.ts`
- `src/data/certificates.ts`

The application uses standard service files (`src/services/`) to simulate data fetching, seamlessly passing your updated content down to all UI components.

---

## 🚀 Deployment Guide

Since this is a standard Vite static application, it is exceptionally fast and free to deploy on modern platforms.

### Option A: Vercel (Highly Recommended)
1. Push your code to a GitHub repository.
2. Go to Vercel and import your repository.
3. **Important**: Set the **Root Directory** to `client`.
4. Vercel will automatically detect `Vite`. Ensure the Build Command is `npm run build` and Output Directory is `dist`.
5. Click **Deploy**.

### Option B: Netlify
1. Log in to Netlify and import your GitHub repository.
2. Set the **Base directory** to `client`.
3. Set the **Build command** to `npm run build`.
4. Set the **Publish directory** to `client/dist`.
5. Click **Deploy**.

---
*Crafted with precision for Sanjana's Master Project.*
