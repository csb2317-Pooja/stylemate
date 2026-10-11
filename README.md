# StyleMate — AI-Powered Fashion Assistant & Luxury Digital Wardrobe

StyleMate is an intelligent fashion companion and virtual wardrobe web application designed to curate personalized outfits, manage digital closets, critique fashion combinations, and preview luxury designer collections.

![StyleMate Preview](assets/images/hero.jpg)

## ✨ Key Features

- **AI Stylist & Occasion Curator**: Generates personalized looks matched to weather conditions, body silhouette, color theory, and events (Office, Galas, Casual, Weddings, etc.).
- **Digital Wardrobe**: Digitize, categorize, and track clothing items with color swatches, wear counters, and formality metrics.
- **Luxury Fashion Boutique**: High-end designer catalog (Balenciaga, Versace, Prada, Chanel, and more) featuring 3-column curated grids, Indian Rupee (`₹`) pricing, deselect controls, and a floating purchase drawer that adds bought pieces directly into your digital closet.
- **Virtual Try-On Studio**: Interactive model fitting and styling rack.
- **Side-by-Side Outfit Comparison**: Contrast silhouette harmony, climate adaptability, and versatility ratings.
- **Backend API & Persistence**: Express REST API with session auth, AI outfit combination engine, and data persistence.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)

### Installation

```bash
# Clone repository
git clone https://github.com/csb2317-Pooja/stylemate.git
cd stylemate

# Install dependencies
npm install

# Start server
npm start
```

Open your browser at `http://localhost:3456` or `http://localhost:3456/index.html`.

## 📁 Project Structure

```text
stylemate-app/
├── assets/images/       # High-definition fashion photography & product images
├── backend/             # Database storage & AI engine logic
├── css/                 # Modern responsive styling & glassmorphism system
├── data/                # Local database storage (db.json)
├── js/                  # Client-side modules (app.js, api.js, data.js)
├── index.html           # Main application interface & mobile bezel viewport
├── package.json         # Project metadata and dependencies
└── server.js            # Express server & REST API
```
