# Bloggerzine

![Bloggerzine Logo](/public/logo.png)

Bloggerzine is a modern, sleek, and fully responsive blogging platform built with **Next.js 14**, **Supabase**, and **Tailwind CSS**. The platform allows users to read, write, and engage with articles on various topics. This project was developed as part of an internship at ABR Technologies LTD.

## Demo

Check out the live demo: [bloggerzine.vercel.app](https://bloggerzine.vercel.app)

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🔥 **Next.js 14**: Built with the latest version of Next.js for optimized performance and SEO.
- 📝 **Post Management**: Users can create, view, edit, and delete articles.
- 💾 **Supabase Integration**: Real-time data storage and authentication powered by Supabase.
- 🎨 **Tailwind CSS**: Custom, responsive, and utility-first design using Tailwind CSS.
- 📱 **Responsive Design**: Optimized for all devices, including mobile and desktop.
- 🌐 **SEO-Friendly**: Optimized for search engines with meta tags and dynamic titles.
- ⚡ **Fast and Scalable**: Deployed on Vercel for fast, scalable performance.

## Technologies Used

- **Frontend**: [Next.js 14](https://nextjs.org)
- **Backend**: [Supabase](https://supabase.io)
- **Authentication**: [JWT](https://jwt.io) 
- **Styling**: [CSS Modules](https://github.com/css-modules/css-modules)
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org) v14 or higher
- [Git](https://git-scm.com)
- [Supabase](https://supabase.io) account for database and authentication setup

### Project Structure

```bash
.
├── public/              # Static files
├── src/
│   ├── actions/             # Server actions
│   ├── app/                 # Next.js pages
│   ├── components/          # Reusable components
│   ├── services/            # Supabase services
│   ├── styles/              # Global styles using Tailwind CSS
│   ├── utils/               # Utility functions
├── .env.local           # Local environment variables
└── README.md            # This file
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/greatochuko/bloggerzine.git
   cd bloggerzine
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Rename `.env.example` to `.env` and update it with your Supabase credentials and other environment variables.

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_ORIGIN=http://localhost:3000
   JWT_SECRET=your-jwt-secret
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

- **Home Page**: Browse the latest blog posts.
- **Post Detail**: Click on a post to read more.
- **Dashboard**: Users can log in to create, edit, and manage their blog posts.
- **Real-time Features**: Changes made in the app are reflected instantly, thanks to Supabase's real-time capabilities.

## Deployment

Bloggerzine is deployed on [Vercel](https://vercel.com).

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. For major changes, open an issue first to discuss what you would like to change.

1. Fork the project
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

Made with ❤️ by [Great Ogheneochuko](https://github.com/greatochuko).