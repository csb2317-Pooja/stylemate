// StyleMate Application Logic & Recommendation Engine

// State Management
const STATE = {
  activeScreen: 'screen-recs',
  hasOnboarded: true,
  theme: 'dark',
  viewMode: 'phone', // 'phone' or 'expanded'
  currentOccasion: 'office',
  currentWeather: 'pleasant_sunny',
  selectedVariation: 0,
  currentGeneratedLooks: [],
  comparisonOutfits: [],
  equippedTryon: {
    top: 'item-2',
    bottom: 'item-3',
    outerwear: 'item-1',
    footwear: 'item-4',
    accessory: 'item-5'
  },
  tryonViewMode: 'editorial', // 'editorial' or 'mannequin'
  userProfile: {
    name: 'Elena Rostova',
    gender: 'female',
    age: 26,
    height: 172,
    bodyStructure: 'hourglass',
    skinTone: 'neutral_beige',
    faceShape: 'oval',
    hairType: 'wavy_chestnut',
    stylePersona: 'old_money'
  },
  wardrobe: [...INITIAL_WARDROBE],
  savedLooks: [
    {
      id: 'look-fav-1',
      title: 'Boardroom Elegance',
      occasion: 'Office / Executive',
      matchRate: 100,
      image: 'assets/images/flatlay.jpg',
      date: 'Yesterday',
      vibe: 'Tailored Minimalist'
    }
  ],
  selectedBoutiqueCategory: 'bags',
  selectedBoutiqueItem: null
};

// SVG Icon Helpers
const ICONS = {
  briefcase: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
  'book-open': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
  award: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
  heart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  sparkles: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 15px; height: 15px; flex-shrink: 0;"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`,
  'glass-water': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15.2 22H8.8a2 2 0 0 1-2-1.79L5 3h14l-1.81 17.21A2 2 0 0 1 15.2 22Z"></path><path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0"></path></svg>`,
  palmtree: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h11Z"></path><path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-9"></path><path d="M5.8 21a9.07 9.07 0 0 1 2.2-6.5c1.4-1.6 3.2-2.5 5-2.5 3 0 5 2 5 5"></path><path d="M12 21V12"></path></svg>`,
  activity: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
  coffee: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`,
  crown: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path></svg>`,
  sun: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  'cloud-rain': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path></svg>`,
  wind: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>`,
  'sun-dim': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line></svg>`,
  snowflake: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line><line x1="4.93" y1="19.07" x2="19.07" y2="4.93"></line></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  hanger: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3c0 .8.3 1.5.8 2L2 14v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4L14.2 7A3 3 0 0 0 12 2Z"></path></svg>`
};

// Item Graphic SVG Generator for Closet Items
function getItemIconSVG(type, color = '#AAA') {
  switch (type) {
    case 'blazer':
    case 'outerwear':
    case 'trench':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8"><path d="M6 3 2 9v12h7v-7h6v7h7V9l-4-6-6 4Z"/></svg>`;
    case 'blouse':
    case 'tops':
    case 'knit':
    case 'tee':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8"><path d="M8 2h8l3 5-3 3-1-1v12H9V9L8 10 5 7Z"/></svg>`;
    case 'trousers':
    case 'bottoms':
    case 'jeans':
    case 'linen_pants':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8"><path d="M5 2h14v7l-2 13h-4l-1-10-1 10H7L5 9Z"/></svg>`;
    case 'dress':
    case 'dresses':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8"><path d="M8 2h8l2 5-3 2 4 13H5l4-13-3-2Z"/></svg>`;
    case 'loafers':
    case 'footwear':
    case 'sneakers':
    case 'heels':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8"><path d="M2 17h18a2 2 0 0 0 2-2v-3l-7-3-5 3-4 1H2v4Z"/><path d="M2 17v3h6v-3"/></svg>`;
    case 'bag':
    case 'accessories':
    case 'jewelry':
    case 'sunglasses':
    default:
      return `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8"><path d="M6 8h12v13H6Z"/><path d="M9 8V5a3 3 0 0 1 6 0v3"/></svg>`;
  }
}

// ==========================================================================
// AI RECOMMENDATION ENGINE (ALGORITHM)
// ==========================================================================

function runAIRecommendationEngine(occasionId, weatherId, userProfile) {
  const occasion = OCCASIONS_DATA.find(o => o.id === occasionId) || OCCASIONS_DATA[0];
  const weather = WEATHER_PRESETS.find(w => w.id === weatherId) || WEATHER_PRESETS[0];

  // Variations 1, 2, 3 tailored to the occasion and weather
  let var1, var2, var3;

  if (occasionId === 'office' || occasionId === 'interview' || occasionId === 'formal') {
    var1 = {
      title: "The Timeless Power Ensemble",
      vibe: "Crisp Executive Minimalism",
      matchRate: 100,
      image: "assets/images/flatlay.jpg",
      items: [
        { cat: "Top", name: "Silk-Touch Ivory Button Blouse", color: "#F8F6F0", owned: true },
        { cat: "Outerwear", name: "Classic Charcoal Tailored Blazer", color: "#2C2F36", owned: true },
        { cat: "Bottom", name: "High-Waist Tailored Trousers", color: "#24262B", owned: true },
        { cat: "Footwear", name: "Italian Leather Bit Loafers", color: "#4A2E1B", owned: true },
        { cat: "Bag", name: "Minimalist Structured Leather Tote", color: "#3D2619", owned: true }
      ],
      palette: ["#2C2F36", "#F8F6F0", "#4A2E1B", "#D4AF37"],
      hairstyle: "Sleek low chignon with a sharp center parting",
      grooming: "Matte rosewood lip with clean brushed brows",
      stylistNote: `Charcoal creates high visual authority while the silk ivory softens contrast against your ${userProfile.skinTone} undertone. Tailored high-rise lines highlight waist definition for ${userProfile.bodyStructure} figures.`,
      scores: { formality: 96, comfort: 88, weather: 94, harmony: 98 }
    };

    var2 = {
      title: "Elevated Smart Drape",
      vibe: "Modern European Monolith",
      matchRate: 80,
      image: "assets/images/tryon_model.jpg",
      items: [
        { cat: "Top", name: "Cashmere Ribbed Mockneck Knit", color: "#D8C7B5", owned: true },
        { cat: "Outerwear", name: "Double-Breasted Wool Trench Coat", color: "#BCA88E", owned: true },
        { cat: "Bottom", name: "Wide-Leg Structured Wool Pants", color: "#3A3530", owned: false, alt: "In Closet: Charcoal Trousers work gracefully" },
        { cat: "Footwear", name: "Pointed Ankle Strap Stiletto Pumps", color: "#1A1A1A", owned: true },
        { cat: "Jewelry", name: "18K Gold Herringbone Chain & Watch", color: "#D4AF37", owned: true }
      ],
      palette: ["#D8C7B5", "#BCA88E", "#3A3530", "#D4AF37"],
      hairstyle: "Soft face-framing curtain wave blowout",
      grooming: "Warm champagne highlighter & satin nude tint",
      stylistNote: `Tonal monochrome in camel and oatmeal adds quiet luxury sophistication. The open trench length elongates stature while keeping comfortable in ${weather.temp}°C ambient conditions.`,
      scores: { formality: 90, comfort: 92, weather: 96, harmony: 95 }
    };

    var3 = {
      title: "Contemporary Casual Friday",
      vibe: "Tailored Ease & Texture",
      matchRate: 100,
      image: "assets/images/hero.jpg",
      items: [
        { cat: "Top", name: "Cashmere Ribbed Mockneck Knit", color: "#D8C7B5", owned: true },
        { cat: "Outerwear", name: "Classic Charcoal Tailored Blazer", color: "#2C2F36", owned: true },
        { cat: "Bottom", name: "Straight-Leg Selvedge Indigo Denim", color: "#1E2A4A", owned: true },
        { cat: "Footwear", name: "Italian Leather Bit Loafers", color: "#4A2E1B", owned: true },
        { cat: "Accessories", name: "Tortoiseshell Cat-Eye Sunglasses", color: "#6F4E37", owned: true }
      ],
      palette: ["#2C2F36", "#D8C7B5", "#1E2A4A", "#4A2E1B"],
      hairstyle: "Textured French twist secured with tortoise claw clip",
      grooming: "Sun-kissed tinted serum & berry lip oil",
      stylistNote: `Dark indigo selvedge pairs seamlessly with formal tailoring without looking underdressed. Balanced for effortless transitions from desk to dinner.`,
      scores: { formality: 82, comfort: 95, weather: 92, harmony: 91 }
    };
  } else if (occasionId === 'party' || occasionId === 'wedding' || occasionId === 'festival') {
    var1 = {
      title: "Emerald Satin Silhouette",
      vibe: "Midnight Soirée Glamour",
      matchRate: 85,
      image: "assets/images/tryon_model.jpg",
      items: [
        { cat: "Dress", name: "Pleated Emerald Cocktail Dress", color: "#1B4332", owned: true },
        { cat: "Footwear", name: "Pointed Ankle Strap Stiletto Pumps", color: "#1A1A1A", owned: true },
        { cat: "Outerwear", name: "Structured Cropped Tuxedo Cape", color: "#111111", owned: false, alt: "Closet Charcoal Blazer can be draped over shoulders" },
        { cat: "Jewelry", name: "18K Gold Herringbone Chain & Watch", color: "#D4AF37", owned: true },
        { cat: "Bag", name: "Metallic Gold Minaudière Clutch", color: "#D4AF37", owned: false, alt: "Smart Alternative: Compact leather shoulder strap" }
      ],
      palette: ["#1B4332", "#111111", "#D4AF37", "#1A1A1A"],
      hairstyle: "Glossy Old Hollywood waves with deep side sweep",
      grooming: "Glow foundation, soft smoked eyeliner & velvet scarlet lip",
      stylistNote: `Jewel tone emerald green provides rich contrast and radiant luminance. Fluid draping complements ${userProfile.bodyStructure} contours with dramatic movement.`,
      scores: { formality: 98, comfort: 84, weather: 88, harmony: 99 }
    };

    var2 = {
      title: "Silk Tuxedo Evening Luxe",
      vibe: "Androgynous High Glamour",
      matchRate: 100,
      image: "assets/images/flatlay.jpg",
      items: [
        { cat: "Top", name: "Silk-Touch Ivory Button Blouse", color: "#F8F6F0", owned: true },
        { cat: "Outerwear", name: "Classic Charcoal Tailored Blazer", color: "#2C2F36", owned: true },
        { cat: "Bottom", name: "High-Waist Tailored Trousers", color: "#24262B", owned: true },
        { cat: "Footwear", name: "Pointed Ankle Strap Stiletto Pumps", color: "#1A1A1A", owned: true },
        { cat: "Jewelry", name: "18K Gold Herringbone Chain & Watch", color: "#D4AF37", owned: true }
      ],
      palette: ["#24262B", "#F8F6F0", "#D4AF37", "#1A1A1A"],
      hairstyle: "High wet-look ponytail with sleek baby hair accents",
      grooming: "Cat-eye flick & luminous champagne cheek glaze",
      stylistNote: `A razor-sharp tailored evening tuxedo alternative using 100% existing wardrobe pieces. Unbutton the silk shirt two buttons down for effortless evening sensuality.`,
      scores: { formality: 95, comfort: 89, weather: 92, harmony: 96 }
    };

    var3 = {
      title: "Modern Bohemian Festival",
      vibe: "Artisanal Textures & Warm Gold",
      matchRate: 80,
      image: "assets/images/hero.jpg",
      items: [
        { cat: "Top", name: "Cashmere Ribbed Mockneck Knit", color: "#D8C7B5", owned: true },
        { cat: "Bottom", name: "Wide-Leg Linen Summer Pants", color: "#E6DFD5", owned: true },
        { cat: "Outerwear", name: "Embroidered Artisanal Duster", color: "#784A34", owned: false, alt: "Double-Breasted Wool Trench adds regal drape" },
        { cat: "Footwear", name: "Italian Leather Bit Loafers", color: "#4A2E1B", owned: true },
        { cat: "Accessories", name: "Tortoiseshell Cat-Eye Sunglasses", color: "#6F4E37", owned: true }
      ],
      palette: ["#D8C7B5", "#E6DFD5", "#784A34", "#D4AF37"],
      hairstyle: "Half-up fishtail braids woven with gold thread",
      grooming: "Terracotta blush and glowing dewy skin",
      stylistNote: `Earth tones harmonize with sun-drenched festival lighting. Layering natural fibers ensures maximum breathability during long outdoor celebrations.`,
      scores: { formality: 78, comfort: 96, weather: 90, harmony: 94 }
    };
  } else {
    // Casual / College / Vacation / Sports
    var1 = {
      title: "Parisian Riviera Casual",
      vibe: "Effortless Maritime Minimal",
      matchRate: 100,
      image: "assets/images/hero.jpg",
      items: [
        { cat: "Top", name: "Breton Striped Heavy Cotton Tee", color: "#2C3E50", owned: true },
        { cat: "Bottom", name: "Wide-Leg Linen Summer Pants", color: "#E6DFD5", owned: true },
        { cat: "Footwear", name: "Clean Minimalist Leather Sneakers", color: "#FDFCFA", owned: true },
        { cat: "Accessories", name: "Tortoiseshell Cat-Eye Sunglasses", color: "#6F4E37", owned: true },
        { cat: "Bag", name: "Minimalist Structured Leather Tote", color: "#3D2619", owned: true }
      ],
      palette: ["#2C3E50", "#E6DFD5", "#FDFCFA", "#6F4E37"],
      hairstyle: "Breezy natural waves with sea-salt texture",
      grooming: "Hydrating tinted lip balm & mineral SPF 50 shield",
      stylistNote: `Breton stripes draw gentle horizontal balance at the collarbones while linen flares streamline lower body proportions. Ideal for warm breezy strolls at ${weather.temp}°C.`,
      scores: { formality: 65, comfort: 98, weather: 96, harmony: 94 }
    };

    var2 = {
      title: "Urban Capsule Streetwear",
      vibe: "Elevated Denim & Knit",
      matchRate: 100,
      image: "assets/images/flatlay.jpg",
      items: [
        { cat: "Top", name: "Cashmere Ribbed Mockneck Knit", color: "#D8C7B5", owned: true },
        { cat: "Bottom", name: "Straight-Leg Selvedge Indigo Denim", color: "#1E2A4A", owned: true },
        { cat: "Outerwear", name: "Double-Breasted Wool Trench Coat", color: "#BCA88E", owned: true },
        { cat: "Footwear", name: "Clean Minimalist Leather Sneakers", color: "#FDFCFA", owned: true },
        { cat: "Jewelry", name: "18K Gold Herringbone Chain & Watch", color: "#D4AF37", owned: true }
      ],
      palette: ["#BCA88E", "#D8C7B5", "#1E2A4A", "#FDFCFA"],
      hairstyle: "Casual messy topknot with loose tendrils",
      grooming: "Clean no-makeup look with fluffy feathered brows",
      stylistNote: `Layering lightweight cashmere under an open camel trench coat prevents temperature shock if winds rise to ${weather.wind}. Selvedge denim adds structured heritage texture.`,
      scores: { formality: 74, comfort: 96, weather: 95, harmony: 97 }
    };

    var3 = {
      title: "Athleisure Tech Dynamic",
      vibe: "Ergonomic Sculpt & Motion",
      matchRate: 80,
      image: "assets/images/tryon_model.jpg",
      items: [
        { cat: "Top", name: "Breton Striped Heavy Cotton Tee", color: "#2C3E50", owned: true },
        { cat: "Outerwear", name: "Tech-Fleece Training Zip Hoodie", color: "#4A5568", owned: true },
        { cat: "Bottom", name: "Performance Compression Tights", color: "#1A1A1A", owned: false, alt: "Closet Straight Denim handles casual travel well" },
        { cat: "Footwear", name: "Clean Minimalist Leather Sneakers", color: "#FDFCFA", owned: true },
        { cat: "Bag", name: "Minimalist Structured Leather Tote", color: "#3D2619", owned: true }
      ],
      palette: ["#4A5568", "#2C3E50", "#1A1A1A", "#FDFCFA"],
      hairstyle: "Braided high athletic ponytail",
      grooming: "Matte sweat-resistant gel & clear lip gloss",
      stylistNote: `Engineered fleece regulates core heat while giving flexible mobility. Monochrome charcoal tones keep the sportswear refined rather than gym-casual.`,
      scores: { formality: 55, comfort: 99, weather: 91, harmony: 88 }
    };
  }

  // Weather Adaptation adjustments
  if (weather.condition.includes("Rain")) {
    var1.stylistNote += ` [Weather Alert: Rain detected! Switch to water-resistant outerwear and leather footwear with grip.]`;
    var2.stylistNote += ` [Weather Alert: Wet streets expected; keep hems ankle-length to avoid splash.]`;
  } else if (weather.temp > 28) {
    var1.stylistNote += ` [Heat Index: High temperature alert (${weather.temp}°C). Choose breathable weaves and UV shielding.]`;
  }

  return [var1, var2, var3];
}

// ==========================================================================
// RENDERERS & UI COMPONENT MOUNTING
// ==========================================================================

function renderWeatherWidget() {
  const weather = WEATHER_PRESETS.find(w => w.id === STATE.currentWeather) || WEATHER_PRESETS[0];
  const container = document.getElementById('weather-widget-container');
  if (!container) return;

  container.innerHTML = `
    <div class="weather-card">
      <div class="weather-header">
        <div class="weather-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          Milan, Fashion District (Simulated)
        </div>
        <select class="weather-sim-select" id="weather-selector" onchange="changeWeather(this.value)">
          ${WEATHER_PRESETS.map(w => `<option value="${w.id}" ${w.id === STATE.currentWeather ? 'selected' : ''}>${w.title} (${w.temp}°C)</option>`).join('')}
        </select>
      </div>
      <div class="weather-body">
        <div>
          <div class="weather-temp">${weather.temp}°C</div>
          <div class="weather-condition">${weather.condition}</div>
        </div>
        <div style="color: var(--accent-gold); width: 36px; height: 36px;">
          ${ICONS[weather.icon] || ICONS.sun}
        </div>
      </div>
      <div class="weather-meta">
        <span>Humidity: ${weather.humidity}%</span>
        <span>Wind: ${weather.wind}</span>
        <span>Styling: Weather-Aware Active</span>
      </div>
      <div class="weather-advice">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <span>${weather.advice}</span>
      </div>
    </div>
  `;
}

function renderOccasionPills() {
  const container = document.getElementById('occasion-pills-container');
  if (!container) return;

  container.innerHTML = OCCASIONS_DATA.map(occ => {
    const isActive = occ.id === STATE.currentOccasion;
    return `
      <div class="occasion-pill ${isActive ? 'active' : ''}" onclick="selectOccasion('${occ.id}')">
        ${ICONS[occ.icon] || ICONS.briefcase}
        <span>${occ.name.split('/')[0].trim()}</span>
      </div>
    `;
  }).join('');
}

function renderRecommendations() {
  const container = document.getElementById('recommendations-container');
  if (!container) return;

  STATE.currentGeneratedLooks = runAIRecommendationEngine(STATE.currentOccasion, STATE.currentWeather, STATE.userProfile);
  const look = STATE.currentGeneratedLooks[STATE.selectedVariation] || STATE.currentGeneratedLooks[0];

  const html = `
    <!-- Variation Selector Tabs -->
    <div class="variation-tabs">
      ${STATE.currentGeneratedLooks.map((l, idx) => `
        <button class="variation-tab ${idx === STATE.selectedVariation ? 'active' : ''}" onclick="selectVariation(${idx})">
          Look 0${idx + 1}: ${l.title.split(' ')[0]}
        </button>
      `).join('')}
    </div>

    <!-- Active Outfit Card -->
    <div class="outfit-card">
      <div class="outfit-card-header">
        <div class="outfit-title-group">
          <h3>${look.title}</h3>
          <div class="outfit-vibe">Vibe: ${look.vibe}</div>
        </div>
        <div class="outfit-match-badge">
          ${ICONS.check}
          ${look.matchRate}% In Closet
        </div>
      </div>

      <!-- Flat Lay or Lookbook Preview -->
      <div class="outfit-media-preview">
        <img src="${look.image}" alt="${look.title}" />
        <div class="media-tag">AI Styled Look</div>
      </div>

      <!-- Color Harmony Swatches -->
      <div class="color-harmony-bar">
        <span class="harmony-label">Color Palette:</span>
        <div class="harmony-swatches">
          ${look.palette.map(hex => `
            <div class="harmony-dot" style="background-color: ${hex};" title="${hex}"></div>
          `).join('')}
        </div>
      </div>

      <!-- Items Breakdown -->
      <div class="outfit-items-list">
        ${look.items.map(item => `
          <div class="outfit-item-row">
            <div class="item-category-info">
              <span class="item-swatch" style="background-color: ${item.color};"></span>
              <div class="item-text">
                <h4>${item.name}</h4>
                <span>${item.cat}${item.alt ? ` • <em style="color: #FBBF24;">${item.alt}</em>` : ''}</span>
              </div>
            </div>
            <span class="item-status-pill ${item.owned ? 'owned' : 'alternative'}">
              ${item.owned ? 'In Wardrobe' : 'Smart Alternative'}
            </span>
          </div>
        `).join('')}
      </div>

      <!-- AI Stylist Note -->
      <div class="stylist-note-box">
        <div class="stylist-note-title">
          ${ICONS.sparkles}
          Why This Works For You
        </div>
        <p class="stylist-note-text">${look.stylistNote}</p>
      </div>

      <!-- Hairstyle & Grooming Advice -->
      <div class="grooming-tag">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z"></path><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><path d="M9 9h.01"></path><path d="M15 9h.01"></path></svg>
        <div>
          <strong>Hair & Grooming:</strong> ${look.hairstyle}. Accent: ${look.grooming}.
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="outfit-card-actions">
        <button class="btn-tryon" onclick="openTryonWithLook(${STATE.selectedVariation})">
          ${ICONS.hanger}
          Virtual Try-On
        </button>
        <button class="btn-compare-add" onclick="addToComparison(${STATE.selectedVariation})">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Compare
        </button>
        <button class="btn-favorite" id="fav-btn-${STATE.selectedVariation}" onclick="toggleFavoriteCurrentLook(${STATE.selectedVariation})">
          ${ICONS.heart}
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// ==========================================================================
// WARDROBE RENDERER
// ==========================================================================

let activeCategoryFilter = 'all';

function renderWardrobe(category = 'all', searchQuery = '') {
  const container = document.getElementById('wardrobe-grid-container');
  if (!container) return;

  activeCategoryFilter = category;

  let items = STATE.wardrobe;
  if (category !== 'all') {
    items = items.filter(it => it.category === category);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    items = items.filter(it => it.name.toLowerCase().includes(q) || it.fabric.toLowerCase().includes(q) || it.colorName.toLowerCase().includes(q));
  }

  // Render stats
  const totalCount = STATE.wardrobe.length;
  const totalWorn = STATE.wardrobe.reduce((acc, curr) => acc + curr.timesWorn, 0);
  const mostWorn = [...STATE.wardrobe].sort((a, b) => b.timesWorn - a.timesWorn)[0];

  const statsBox = document.getElementById('wardrobe-stats-box');
  if (statsBox) {
    statsBox.innerHTML = `
      <div class="wardrobe-stat-item">
        <div class="stat-val">${totalCount}</div>
        <div class="stat-lbl">Pieces</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item wardrobe-stat-item">
        <div class="stat-val">${totalWorn}</div>
        <div class="stat-lbl">Total Wears</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item wardrobe-stat-item">
        <div class="stat-val" style="color: var(--accent-gold); font-size: 1.15rem;">${mostWorn ? mostWorn.name.split(' ')[0] : 'N/A'}</div>
        <div class="stat-lbl">Most Worn</div>
      </div>
    `;
  }

  // Render Categories Filter
  const cats = [
    { id: 'all', label: 'All Items' },
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'footwear', label: 'Shoes' },
    { id: 'accessories', label: 'Accessories' }
  ];

  const catContainer = document.getElementById('wardrobe-categories-container');
  if (catContainer) {
    catContainer.innerHTML = cats.map(c => `
      <button class="cat-pill ${c.id === category ? 'active' : ''}" onclick="filterWardrobeCategory('${c.id}')">
        ${c.label}
      </button>
    `).join('');
  }

  // Render Item Cards
  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: span 2; text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <p style="font-size: 0.88rem;">No clothing items found in this category.</p>
        <button class="btn-primary" style="width: auto; margin: 12px auto; padding: 8px 18px; font-size: 0.8rem;" onclick="openAddWardrobeModal()">+ Add New Piece</button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(it => `
    <div class="wardrobe-item-card" onclick="openItemDetails('${it.id}')">
      <div class="item-art-thumb" style="background: radial-gradient(circle, ${it.color}22 0%, #15171F 100%);">
        ${getItemIconSVG(it.imageType, it.color)}
        <span class="item-cat-badge">${it.category}</span>
        <span class="item-worn-count">${it.timesWorn}x worn</span>
      </div>
      <div class="item-details-box">
        <h4 title="${it.name}">${it.name}</h4>
        <div class="item-subtext">
          <span class="item-color-chip" style="background-color: ${it.color};"></span>
          <span>${it.colorName} • ${it.fabric}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// VIRTUAL TRY-ON ENGINE
// ==========================================================================

function renderTryonStudio() {
  const container = document.getElementById('tryon-stage-container');
  if (!container) return;

  const skin = SKIN_TONES.find(s => s.id === STATE.userProfile.skinTone) || SKIN_TONES[2];
  const body = BODY_STRUCTURES.find(b => b.id === STATE.userProfile.bodyStructure) || BODY_STRUCTURES[0];

  const topItem = STATE.wardrobe.find(w => w.id === STATE.equippedTryon.top) || STATE.wardrobe[1];
  const bottomItem = STATE.wardrobe.find(w => w.id === STATE.equippedTryon.bottom) || STATE.wardrobe[2];
  const coatItem = STATE.wardrobe.find(w => w.id === STATE.equippedTryon.outerwear) || STATE.wardrobe[0];

  if (STATE.tryonViewMode === 'editorial') {
    container.innerHTML = `
      <div class="avatar-stage">
        <img class="avatar-graphic" src="assets/images/tryon_model.jpg" alt="Model Try-On" />
        <div class="avatar-spec-overlay">
          Editorial Silhouette: ${body.label}
        </div>
        <div class="avatar-layers-badge">
          <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#10B981;"></span>
          Active Fit: ${coatItem ? coatItem.name.split(' ')[0] : 'Layer'} + ${topItem ? topItem.name.split(' ')[0] : 'Top'}
        </div>
      </div>
    `;
  } else {
    // Dynamic Scalable Vector Mannequin with Live User Skin Tone & Clothes Color
    container.innerHTML = `
      <div class="avatar-stage">
        <svg class="avatar-graphic" viewBox="0 0 200 400" width="180" height="360" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Head & Neck with user's selected skin tone -->
          <ellipse cx="100" cy="55" rx="18" ry="24" fill="${skin.hex}" stroke="#2A2A2A" stroke-width="1.5" />
          <path d="M93 78v16h14v-16" fill="${skin.hex}" />
          <!-- Hair styling -->
          <path d="M78 52c0-16 10-26 22-26s22 10 22 26c0 10-4 18-4 18s-4-10-8-10c-5 0-6 8-10 8s-5-8-10-8c-4 0-8 10-8 10s-4-8-4-18z" fill="#3D2314" />
          
          <!-- Outerwear / Blazer Layer -->
          <path d="M72 94l-14 65 14 18 10-65h36l10 65 14-18-14-65-28-10-28 10z" fill="${coatItem ? coatItem.color : '#2C2F36'}" opacity="0.95" stroke="#111" stroke-width="1.2" />
          
          <!-- Inner Top Layer -->
          <path d="M84 94l-4 56h40l-4-56-16 6-16-6z" fill="${topItem ? topItem.color : '#F8F6F0'}" stroke="#111" stroke-width="1" />
          
          <!-- Bottom / Trousers Layer -->
          <path d="M78 152l-6 130h16l12-100 12 100h16l-6-130H78z" fill="${bottomItem ? bottomItem.color : '#24262B'}" stroke="#111" stroke-width="1.2" />
          
          <!-- Footwear Layer -->
          <path d="M70 282l-8 24h20l4-24H70z" fill="#4A2E1B" />
          <path d="M114 282l4 24h20l-8-24h-16z" fill="#4A2E1B" />
        </svg>

        <div class="avatar-spec-overlay">
          Tone: ${skin.label} • ${body.label}
        </div>
        <div class="avatar-layers-badge">
          Vector Fitting Active
        </div>
      </div>
    `;
  }

  // Render Interactive Closet Rack to live-swap pieces
  const rack = document.getElementById('tryon-rack-container');
  if (rack) {
    rack.innerHTML = STATE.wardrobe.slice(0, 8).map(it => {
      const isEquipped = Object.values(STATE.equippedTryon).includes(it.id);
      return `
        <div class="rack-item ${isEquipped ? 'equipped' : ''}" onclick="equipItemToTryon('${it.id}', '${it.category}')">
          <div class="rack-icon" style="color: ${it.color};">
            ${getItemIconSVG(it.imageType, it.color)}
          </div>
          <span title="${it.name}">${it.name.split(' ')[0]}</span>
        </div>
      `;
    }).join('');
  }
}

function setTryonViewMode(mode) {
  STATE.tryonViewMode = mode;
  document.querySelectorAll('.tryon-mode-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`tryon-btn-${mode}`);
  if (btn) btn.classList.add('active');
  renderTryonStudio();
}

function equipItemToTryon(itemId, category) {
  if (category === 'tops') STATE.equippedTryon.top = itemId;
  else if (category === 'bottoms') STATE.equippedTryon.bottom = itemId;
  else if (category === 'outerwear') STATE.equippedTryon.outerwear = itemId;
  else if (category === 'footwear') STATE.equippedTryon.footwear = itemId;
  else if (category === 'accessories') STATE.equippedTryon.accessory = itemId;

  showToast(`Equipped to Mannequin: ${STATE.wardrobe.find(w => w.id === itemId)?.name.split(' ')[0]}`);
  renderTryonStudio();
}

// ==========================================================================
// SIDE-BY-SIDE COMPARISON ENGINE
// ==========================================================================

function renderComparisonView() {
  const container = document.getElementById('comparison-grid-container');
  if (!container) return;

  // Make sure we have at least 2 looks to compare
  if (STATE.comparisonOutfits.length < 2) {
    const defaultRecs = runAIRecommendationEngine(STATE.currentOccasion, STATE.currentWeather, STATE.userProfile);
    STATE.comparisonOutfits = [defaultRecs[0], defaultRecs[1]];
  }

  container.innerHTML = STATE.comparisonOutfits.slice(0, 2).map((look, idx) => {
    const isRecommended = idx === 0;
    return `
      <div class="compare-col ${isRecommended ? 'recommended' : ''}">
        ${isRecommended ? '<div class="rec-ribbon">Top Match</div>' : ''}
        <h4 class="compare-title">${look.title}</h4>
        <div style="font-size: 0.7rem; color: var(--accent-gold-light); margin-bottom: 6px;">${look.vibe}</div>

        <div style="width: 100%; height: 90px; border-radius: 10px; overflow: hidden; margin-bottom: 10px;">
          <img src="${look.image}" style="width: 100%; height: 100%; object-fit: cover;" alt="${look.title}" />
        </div>

        <div class="compare-metrics">
          <div class="metric-row">
            <div class="metric-header">
              <span>Formality</span>
              <span>${look.scores.formality}%</span>
            </div>
            <div class="metric-bar-bg">
              <div class="metric-bar-fill ${look.scores.formality > 85 ? 'high' : ''}" style="width: ${look.scores.formality}%;"></div>
            </div>
          </div>

          <div class="metric-row">
            <div class="metric-header">
              <span>Weather Defense</span>
              <span>${look.scores.weather}%</span>
            </div>
            <div class="metric-bar-bg">
              <div class="metric-bar-fill ${look.scores.weather > 90 ? 'high' : ''}" style="width: ${look.scores.weather}%;"></div>
            </div>
          </div>

          <div class="metric-row">
            <div class="metric-header">
              <span>Wardrobe Match</span>
              <span>${look.matchRate}%</span>
            </div>
            <div class="metric-bar-bg">
              <div class="metric-bar-fill high" style="width: ${look.matchRate}%;"></div>
            </div>
          </div>

          <div class="metric-row">
            <div class="metric-header">
              <span>Color Harmony</span>
              <span>${look.scores.harmony}%</span>
            </div>
            <div class="metric-bar-bg">
              <div class="metric-bar-fill" style="width: ${look.scores.harmony}%;"></div>
            </div>
          </div>
        </div>

        <button class="btn-wear-now" onclick="wearLookToday('${look.title}')">
          Wear This Today
        </button>
      </div>
    `;
  }).join('');
}

function wearLookToday(lookTitle) {
  showToast(`✨ Outfit logged! Items marked worn.`);
  // Increment timesWorn for closet items in this look
  STATE.wardrobe.forEach(it => {
    it.timesWorn += 1;
  });
  renderWardrobe(activeCategoryFilter);
}

// ==========================================================================
// PROFILE & ATTRIBUTES RENDERER
// ==========================================================================

function renderProfileScreen() {
  const container = document.getElementById('profile-content-container');
  if (!container) return;

  container.innerHTML = `
    <div class="profile-card">
      <div class="profile-avatar-large">
        ${STATE.userProfile.name.charAt(0)}
      </div>
      <div class="profile-info">
        <h3>${STATE.userProfile.name}</h3>
        <p>Style Persona: ${FASHION_STYLES.find(s => s.id === STATE.userProfile.stylePersona)?.label || 'Quiet Luxury'}</p>
        <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">
          ${STATE.userProfile.age} yrs • ${STATE.userProfile.height} cm • ${STATE.wardrobe.length} Wardrobe Pieces
        </div>
      </div>
    </div>

    <!-- Body Structure Selector -->
    <div class="attr-group">
      <h4>Body Structure & Silhouette</h4>
      <div class="pill-grid">
        ${BODY_STRUCTURES.map(b => `
          <div class="attr-pill-choice ${b.id === STATE.userProfile.bodyStructure ? 'active' : ''}" onclick="updateProfileAttr('bodyStructure', '${b.id}')">
            <h5>${b.label}</h5>
            <span>${b.desc}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Skin Undertone Palette -->
    <div class="attr-group">
      <h4>Skin Undertone & Color Palette</h4>
      <div class="skin-tone-picker">
        ${SKIN_TONES.map(s => `
          <div class="tone-swatch ${s.id === STATE.userProfile.skinTone ? 'active' : ''}" style="background-color: ${s.hex};" title="${s.label} (${s.undertone})" onclick="updateProfileAttr('skinTone', '${s.id}')"></div>
        `).join('')}
      </div>
      <div style="font-size: 0.73rem; color: var(--text-secondary); margin-top: 8px;">
        Selected: <strong>${SKIN_TONES.find(s => s.id === STATE.userProfile.skinTone)?.label}</strong> (${SKIN_TONES.find(s => s.id === STATE.userProfile.skinTone)?.undertone})
      </div>
    </div>

    <!-- Face Shape Flattery -->
    <div class="attr-group">
      <h4>Face Shape & Neckline Styling</h4>
      <div class="pill-grid">
        ${FACE_SHAPES.map(f => `
          <div class="attr-pill-choice ${f.id === STATE.userProfile.faceShape ? 'active' : ''}" onclick="updateProfileAttr('faceShape', '${f.id}')">
            <h5>${f.label}</h5>
            <span>${f.tip}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Aesthetic Style Preference -->
    <div class="attr-group">
      <h4>Primary Fashion Aesthetic</h4>
      <div class="pill-grid">
        ${FASHION_STYLES.map(st => `
          <div class="attr-pill-choice ${st.id === STATE.userProfile.stylePersona ? 'active' : ''}" onclick="updateProfileAttr('stylePersona', '${st.id}')">
            <h5>${st.label}</h5>
            <span>${st.desc}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function updateProfileAttr(key, val) {
  STATE.userProfile[key] = val;
  showToast(`Updated ${key} to ${val}`);
  renderProfileScreen();
  // Also refresh recommendations and tryon avatar
  renderRecommendations();
  renderTryonStudio();
}

// ==========================================================================
// SAVED LOOKS / FAVORITES RENDERER
// ==========================================================================

function renderSavedLooks() {
  const container = document.getElementById('saved-looks-container');
  if (!container) return;

  if (STATE.savedLooks.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 10px; color: var(--text-muted);">
        <p>No saved looks yet. Tap the heart on any outfit recommendation to save it.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="saved-looks-grid">
      ${STATE.savedLooks.map(lk => `
        <div class="saved-card">
          <div class="saved-thumb">
            <img src="${lk.image}" alt="${lk.title}" />
          </div>
          <div class="saved-info">
            <h4>${lk.title}</h4>
            <p>${lk.occasion} • ${lk.vibe}</p>
            <span class="saved-tag">${lk.matchRate}% Match</span>
          </div>
          <button class="pill-btn" style="padding: 6px 10px;" onclick="openTryonWithSaved('${lk.title}')">
            Try-On
          </button>
        </div>
      `).join('')}
    </div>
  `;
}

// ==========================================================================
// INTERACTIVE NAVIGATION & CONTROLLER HOOKS
// ==========================================================================

function navigateTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    STATE.activeScreen = screenId;
  }

  // Update nav tabs
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const tab = document.querySelector(`.nav-tab[data-screen="${screenId}"]`);
  if (tab) tab.classList.add('active');

  // Specific screen renders
  if (screenId === 'screen-recs') {
    renderWeatherWidget();
    renderOccasionPills();
    renderRecommendations();
  } else if (screenId === 'screen-wardrobe') {
    renderWardrobe(activeCategoryFilter);
  } else if (screenId === 'screen-tryon') {
    renderTryonStudio();
  } else if (screenId === 'screen-compare') {
    renderComparisonView();
  } else if (screenId === 'screen-profile') {
    renderProfileScreen();
  } else if (screenId === 'screen-saved') {
    renderSavedLooks();
  } else if (screenId === 'screen-login-dashboard') {
    renderLoginDashboard();
  } else if (screenId === 'screen-fashion') {
    renderFashionBoutique();
  }

  // Update top desktop bar fashion button if active
  const topFashionBtn = document.getElementById('btn-top-fashion');
  if (topFashionBtn) {
    topFashionBtn.classList.toggle('active', screenId === 'screen-fashion');
  }
}

function selectOccasion(occId) {
  STATE.currentOccasion = occId;
  renderOccasionPills();
  renderRecommendations();
  showToast(`Occasion set: ${OCCASIONS_DATA.find(o => o.id === occId)?.name.split('/')[0]}`);
}

function changeWeather(wId) {
  STATE.currentWeather = wId;
  renderWeatherWidget();
  renderRecommendations();
  showToast(`Weather conditions updated! AI adapted outfit.`);
}

function selectVariation(idx) {
  STATE.selectedVariation = idx;
  renderRecommendations();
}

function generateNewOutfits() {
  const btn = document.querySelector('.btn-generate');
  if (btn) {
    btn.classList.add('loading');
    btn.innerHTML = `<span>Styling with AI...</span>`;
    setTimeout(() => {
      btn.classList.remove('loading');
      btn.innerHTML = `${ICONS.sparkles} <span>Generate New AI Combinations</span>`;
      renderRecommendations();
      showToast(`✨ Generated 3 fresh couture recommendations!`);
    }, 450);
  }
}

function openTryonWithLook(variationIdx) {
  const look = STATE.currentGeneratedLooks[variationIdx];
  if (look) {
    navigateTo('screen-tryon');
    showToast(`Loaded "${look.title}" into Virtual Try-On`);
  }
}

function addToComparison(variationIdx) {
  const look = STATE.currentGeneratedLooks[variationIdx];
  if (look) {
    if (!STATE.comparisonOutfits.find(c => c.title === look.title)) {
      STATE.comparisonOutfits.unshift(look);
    }
    navigateTo('screen-compare');
    showToast(`Added to side-by-side comparison!`);
  }
}

function toggleFavoriteCurrentLook(variationIdx) {
  const look = STATE.currentGeneratedLooks[variationIdx];
  const btn = document.getElementById(`fav-btn-${variationIdx}`);
  if (!look) return;

  const existsIdx = STATE.savedLooks.findIndex(s => s.title === look.title);
  if (existsIdx >= 0) {
    STATE.savedLooks.splice(existsIdx, 1);
    if (btn) btn.classList.remove('active');
    showToast(`Removed from favorites`);
  } else {
    STATE.savedLooks.unshift({
      id: `look-fav-${Date.now()}`,
      title: look.title,
      occasion: OCCASIONS_DATA.find(o => o.id === STATE.currentOccasion)?.name || 'Custom',
      matchRate: look.matchRate,
      image: look.image,
      date: 'Just now',
      vibe: look.vibe
    });
    if (btn) btn.classList.add('active');
    showToast(`❤️ Look saved to favorites!`);
  }
}

function filterWardrobeCategory(catId) {
  renderWardrobe(catId);
}

// Add New Wardrobe Item Modal
function openAddWardrobeModal() {
  const modal = document.getElementById('add-item-modal');
  if (modal) modal.classList.add('open');
}

function closeAddWardrobeModal() {
  const modal = document.getElementById('add-item-modal');
  if (modal) modal.classList.remove('open');
}

function submitNewWardrobeItem(e) {
  e.preventDefault();
  const name = document.getElementById('new-item-name')?.value || 'Custom Fashion Piece';
  const category = document.getElementById('new-item-cat')?.value || 'tops';
  const color = document.getElementById('new-item-color')?.value || '#2C3E50';
  const colorName = document.getElementById('new-item-color-name')?.value || 'Navy Blue';
  const fabric = document.getElementById('new-item-fabric')?.value || 'Fine Cotton';

  const newItem = {
    id: `item-${Date.now()}`,
    name,
    category,
    color,
    colorName,
    fabric,
    season: ['all'],
    formality: 'smart_casual',
    occasions: ['all'],
    imageType: category,
    inCloset: true,
    timesWorn: 0
  };

  STATE.wardrobe.unshift(newItem);
  closeAddWardrobeModal();
  renderWardrobe(category);
  showToast(`Added "${name}" to your Digital Closet!`);
}

// Item Details Modal
function openItemDetails(itemId) {
  const item = STATE.wardrobe.find(w => w.id === itemId);
  if (!item) return;

  showToast(`${item.name} (${item.fabric}) • ${item.timesWorn} times worn`);
}

// Toast Notifications
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('app-toast');
  if (!toast) return;

  toast.querySelector('.toast-msg').innerText = message;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Device View Mode Toggle (Phone Bezel vs Expanded)
function toggleDeviceView(mode) {
  const wrapper = document.querySelector('.app-wrapper');
  if (!wrapper) return;

  const phoneBtn = document.getElementById('btn-view-phone');
  const expandBtn = document.getElementById('btn-view-expand');

  if (mode === 'expanded') {
    wrapper.classList.add('expanded');
    if (phoneBtn) phoneBtn.classList.remove('active');
    if (expandBtn) expandBtn.classList.add('active');
    STATE.viewMode = 'expanded';
  } else {
    wrapper.classList.remove('expanded');
    if (expandBtn) expandBtn.classList.remove('active');
    if (phoneBtn) phoneBtn.classList.add('active');
    STATE.viewMode = 'phone';
  }
}

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  STATE.theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
}

// Authentication Modal Handlers
let currentAuthTab = 'signin';

function openAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.add('open');
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.remove('open');
}

function switchAuthTab(tab) {
  currentAuthTab = tab;
  const signinBtn = document.getElementById('auth-tab-signin');
  const signupBtn = document.getElementById('auth-tab-signup');
  const nameGroup = document.getElementById('auth-name-group');
  const submitBtn = document.getElementById('auth-submit-btn');

  if (tab === 'signin') {
    signinBtn?.classList.add('active');
    signupBtn?.classList.remove('active');
    if (nameGroup) nameGroup.style.display = 'none';
    if (submitBtn) submitBtn.innerText = 'Sign In to Studio';
  } else {
    signupBtn?.classList.add('active');
    signinBtn?.classList.remove('active');
    if (nameGroup) nameGroup.style.display = 'block';
    if (submitBtn) submitBtn.innerText = 'Create Profile & Continue';
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('auth-name')?.value;
  if (currentAuthTab === 'signup' && name && name.trim()) {
    STATE.userProfile.name = name.trim();
  }
  closeAuthModal();
  navigateTo('screen-recs');
  showToast(`Welcome back, ${STATE.userProfile.name}!`);
}

// ==========================================================================
// LOGIN & MEMBER DASHBOARD LOGIC
// ==========================================================================

let activeDashAuthTab = 'signin';
let activePersonaKey = 'elena';

function renderLoginDashboard() {
  const avatarEl = document.getElementById('dash-avatar');
  const nameEl = document.getElementById('dash-user-name');
  const tierEl = document.getElementById('dash-user-tier');
  const countEl = document.getElementById('dash-wardrobe-count');
  const utilEl = document.getElementById('dash-utilization');

  if (avatarEl) avatarEl.innerText = STATE.userProfile.name.charAt(0);
  if (nameEl) nameEl.innerText = STATE.userProfile.name;
  if (tierEl) {
    const styleLabel = FASHION_STYLES.find(s => s.id === STATE.userProfile.stylePersona)?.label || 'Couture Chic';
    tierEl.innerText = `Couture VIP • ${styleLabel}`;
  }
  if (countEl) countEl.innerText = STATE.wardrobe.length;
  if (utilEl) {
    const wornCount = STATE.wardrobe.filter(w => w.timesWorn > 0).length;
    const rate = Math.round((wornCount / Math.max(1, STATE.wardrobe.length)) * 100);
    utilEl.innerText = `${rate}%`;
  }

  // Update persona card highlight
  ['elena', 'marcus', 'aria'].forEach(p => {
    const card = document.getElementById(`persona-${p}`);
    if (card) {
      if (p === activePersonaKey) {
        card.classList.add('active');
        const badge = card.querySelector('.persona-badge-tag');
        if (badge) badge.innerText = 'Current';
      } else {
        card.classList.remove('active');
        const badge = card.querySelector('.persona-badge-tag');
        if (badge) badge.innerText = 'Switch';
      }
    }
  });
}

function switchLoginPersona(key) {
  activePersonaKey = key;

  if (key === 'elena') {
    STATE.userProfile = {
      name: 'Elena Rostova',
      gender: 'female',
      age: 26,
      height: 172,
      bodyStructure: 'hourglass',
      skinTone: 'neutral_beige',
      faceShape: 'oval',
      hairType: 'wavy_chestnut',
      stylePersona: 'old_money'
    };
    STATE.wardrobe = [...INITIAL_WARDROBE];
    STATE.equippedTryon = {
      top: 'item-2',
      bottom: 'item-3',
      outerwear: 'item-1',
      footwear: 'item-4',
      accessory: 'item-5'
    };
  } else if (key === 'marcus') {
    STATE.userProfile = {
      name: 'Marcus Vance',
      gender: 'male',
      age: 29,
      height: 185,
      bodyStructure: 'athletic',
      skinTone: 'warm_olive',
      faceShape: 'square',
      hairType: 'textured_fade',
      stylePersona: 'streetwear'
    };
    STATE.wardrobe = [
      {
        id: "m-1",
        name: "Vintage Washed Oversized Hoodie",
        category: "outerwear",
        color: "#2C2F36",
        colorName: "Faded Charcoal",
        fabric: "Heavyweight French Terry",
        season: ["autumn", "winter"],
        formality: "casual",
        occasions: ["college", "casual", "vacation"],
        imageType: "hoodie",
        inCloset: true,
        timesWorn: 18
      },
      {
        id: "m-2",
        name: "Drop-Shoulder Boxy Tee",
        category: "tops",
        color: "#F8F6F0",
        colorName: "Raw Chalk",
        fabric: "Combed 260gsm Cotton",
        season: ["all"],
        formality: "casual",
        occasions: ["casual", "college", "sports"],
        imageType: "tee",
        inCloset: true,
        timesWorn: 29
      },
      {
        id: "m-3",
        name: "Relaxed Straight Cargo Trousers",
        category: "bottoms",
        color: "#383E34",
        colorName: "Olive Drab",
        fabric: "Ripstop Cotton",
        season: ["all"],
        formality: "casual",
        occasions: ["casual", "college", "vacation"],
        imageType: "trousers",
        inCloset: true,
        timesWorn: 22
      },
      {
        id: "m-4",
        name: "Retro Leather Low Sneakers",
        category: "footwear",
        color: "#FDFCFA",
        colorName: "Optic White",
        fabric: "Full-Grain Leather",
        season: ["all"],
        formality: "casual",
        occasions: ["casual", "college", "sports"],
        imageType: "sneakers",
        inCloset: true,
        timesWorn: 34
      },
      {
        id: "m-5",
        name: "Technical Water-Repellent Field Jacket",
        category: "outerwear",
        color: "#1E222B",
        colorName: "Midnight Navy",
        fabric: "Gore-Tex Shell",
        season: ["all"],
        formality: "smart_casual",
        occasions: ["office", "casual", "vacation"],
        imageType: "blazer",
        inCloset: true,
        timesWorn: 14
      },
      {
        id: "m-6",
        name: "Matte Black Chronograph Timepiece",
        category: "accessories",
        color: "#181A1F",
        colorName: "Stealth Black",
        fabric: "Ceramic & Sapphire",
        season: ["all"],
        formality: "smart_casual",
        occasions: ["all"],
        imageType: "jewelry",
        inCloset: true,
        timesWorn: 40
      }
    ];
    STATE.equippedTryon = {
      top: 'm-2',
      bottom: 'm-3',
      outerwear: 'm-1',
      footwear: 'm-4',
      accessory: 'm-6'
    };
  } else if (key === 'aria') {
    STATE.userProfile = {
      name: 'Aria Chen',
      gender: 'female',
      age: 24,
      height: 165,
      bodyStructure: 'rectangle',
      skinTone: 'warm_ivory',
      faceShape: 'diamond',
      hairType: 'sleek_bob',
      stylePersona: 'minimalist'
    };
    STATE.wardrobe = [
      {
        id: "a-1",
        name: "Sculptural Collarless Wrap Blazer",
        category: "outerwear",
        color: "#D8C7B5",
        colorName: "Sand Stone",
        fabric: "Japanese Triacetate",
        season: ["all"],
        formality: "formal",
        occasions: ["office", "interview", "formal"],
        imageType: "blazer",
        inCloset: true,
        timesWorn: 15
      },
      {
        id: "a-2",
        name: "Silk High-Neck Shell Top",
        category: "tops",
        color: "#F8F6F0",
        colorName: "Pure Ivory",
        fabric: "100% Habotai Silk",
        season: ["spring", "summer"],
        formality: "smart_casual",
        occasions: ["office", "casual", "wedding"],
        imageType: "blouse",
        inCloset: true,
        timesWorn: 20
      },
      {
        id: "a-3",
        name: "Pleated Wide-Leg Palazzo Pants",
        category: "bottoms",
        color: "#1E2026",
        colorName: "Onyx Slate",
        fabric: "Crepe Twill",
        season: ["all"],
        formality: "smart_casual",
        occasions: ["office", "casual", "party"],
        imageType: "linen_pants",
        inCloset: true,
        timesWorn: 18
      },
      {
        id: "a-4",
        name: "Pointed Leather Architectural Mules",
        category: "footwear",
        color: "#2C221E",
        colorName: "Dark Umber",
        fabric: "Calfskin",
        season: ["all"],
        formality: "smart_casual",
        occasions: ["office", "party", "formal"],
        imageType: "loafers",
        inCloset: true,
        timesWorn: 23
      },
      {
        id: "a-5",
        name: "Geometric Gold Choker & Hoops",
        category: "accessories",
        color: "#D4AF37",
        colorName: "Polished Gold",
        fabric: "Vermeil Gold",
        season: ["all"],
        formality: "smart_casual",
        occasions: ["all"],
        imageType: "jewelry",
        inCloset: true,
        timesWorn: 35
      }
    ];
    STATE.equippedTryon = {
      top: 'a-2',
      bottom: 'a-3',
      outerwear: 'a-1',
      footwear: 'a-4',
      accessory: 'a-5'
    };
  }

  renderLoginDashboard();
  renderProfileScreen();
  renderWardrobe();
  renderRecommendations();
  renderTryonStudio();
  showToast(`✨ Switched to ${STATE.userProfile.name} profile!`);
}

function switchDashAuthTab(tab) {
  activeDashAuthTab = tab;
  const signinBtn = document.getElementById('dash-tab-signin');
  const signupBtn = document.getElementById('dash-tab-signup');
  const nameField = document.getElementById('dash-name-field');
  const submitBtn = document.getElementById('dash-auth-submit-btn');

  if (tab === 'signin') {
    signinBtn?.classList.add('active');
    signupBtn?.classList.remove('active');
    if (nameField) nameField.style.display = 'none';
    if (submitBtn) submitBtn.innerText = 'Sign In to Member Portal';
  } else {
    signupBtn?.classList.add('active');
    signinBtn?.classList.remove('active');
    if (nameField) nameField.style.display = 'block';
    if (submitBtn) submitBtn.innerText = 'Create Account & Continue';
  }
}

function handleDashboardLoginSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('dash-input-name')?.value;

  if (activeDashAuthTab === 'signup' && nameInput && nameInput.trim()) {
    STATE.userProfile.name = nameInput.trim();
  }

  renderLoginDashboard();
  navigateTo('screen-recs');
  showToast(`🎉 Logged in as ${STATE.userProfile.name}! Cloud closet loaded.`);
}

function simulateSocialLogin(provider) {
  showToast(`Connecting to ${provider}...`);
  setTimeout(() => {
    navigateTo('screen-recs');
    showToast(`🎉 Verified via ${provider}! Welcome, ${STATE.userProfile.name}.`);
  }, 350);
}

function handleSignOut() {
  STATE.userProfile.name = 'Guest Stylist';
  renderLoginDashboard();
  showToast(`Signed out. Session reverted to Guest mode.`);
}

// ==========================================================================
// LUXURY FASHION BOUTIQUE CONTROLLERS (Screenshot Replica Engine)
// ==========================================================================

function renderFashionBoutique() {
  const gridContainer = document.getElementById('fashion-product-grid');
  if (!gridContainer) return;

  const currentCat = STATE.selectedBoutiqueCategory || 'bags';

  // Update category filter buttons active state
  document.querySelectorAll('.fashion-cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === currentCat);
  });

  // Filter products by active category
  const filtered = (typeof BOUTIQUE_PRODUCTS !== 'undefined' ? BOUTIQUE_PRODUCTS : []).filter(p => p.category === currentCat);

  gridContainer.innerHTML = filtered.map(item => {
    const isSelected = STATE.selectedBoutiqueItem && STATE.selectedBoutiqueItem.id === item.id;
    let thumbHtml = '';

    if (item.image) {
      thumbHtml = `
        <img src="${item.image}" alt="${item.name}" class="fashion-card-img" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='block';" />
        <div class="fashion-card-sprite" style="display:none; background-position:${item.spriteCoord ? item.spriteCoord.x + ' ' + item.spriteCoord.y : '0% 0%'};"></div>
      `;
    } else if (item.spriteCoord) {
      thumbHtml = `<div class="fashion-card-sprite" style="background-position:${item.spriteCoord.x} ${item.spriteCoord.y};"></div>`;
    } else {
      thumbHtml = `<div class="clothing-swatch" style="background:${item.color || '#2C2F36'}; width:56px; height:56px; border-radius:12px; border:2px solid rgba(255,255,255,0.15); box-shadow: 0 4px 12px rgba(0,0,0,0.4);"></div>`;
    }

    return `
      <div class="fashion-card ${isSelected ? 'selected' : ''}" onclick="selectBoutiqueProduct('${item.id}')" title="${item.name} · ${item.price}">
        <div class="fashion-card-thumb">
          ${thumbHtml}
          <div class="fashion-card-badge">${item.badge || '₹'}</div>
        </div>
        <div class="fashion-card-brand">${item.brand}</div>
      </div>
    `;
  }).join('');

  // Update floating bottom purchase bar
  const purchaseBar = document.getElementById('fashion-purchase-bar');
  const subtitleEl = document.getElementById('purchase-item-subtitle');
  if (purchaseBar) {
    if (STATE.selectedBoutiqueItem) {
      purchaseBar.classList.add('show');
      if (subtitleEl) {
        subtitleEl.innerText = `${STATE.selectedBoutiqueItem.name} · ${STATE.selectedBoutiqueItem.price}`;
      }
    } else {
      purchaseBar.classList.remove('show');
    }
  }
}

function selectBoutiqueCategory(catId) {
  STATE.selectedBoutiqueCategory = catId;
  // If current selected item does not belong to this category, deselect it
  if (STATE.selectedBoutiqueItem && STATE.selectedBoutiqueItem.category !== catId) {
    STATE.selectedBoutiqueItem = null;
  }
  renderFashionBoutique();
}

function selectBoutiqueProduct(prodId) {
  const found = (typeof BOUTIQUE_PRODUCTS !== 'undefined' ? BOUTIQUE_PRODUCTS : []).find(p => p.id === prodId);
  if (found) {
    STATE.selectedBoutiqueItem = found;
    renderFashionBoutique();
  }
}

function deselectBoutiqueProduct() {
  STATE.selectedBoutiqueItem = null;
  renderFashionBoutique();
  showToast('Item selection cleared');
}

async function purchaseBoutiqueProduct() {
  if (!STATE.selectedBoutiqueItem) return;

  const item = STATE.selectedBoutiqueItem;
  const newItem = {
    id: `item-${Date.now()}`,
    name: item.name,
    category: item.category === 'bags' ? 'accessories' : item.category,
    color: item.color || '#2C2F36',
    colorName: item.colorName || 'Luxury Designer',
    fabric: item.fabric || 'Luxury Craftsmanship',
    season: ['all'],
    formality: 'formal',
    occasions: ['party', 'formal', 'office', 'wedding'],
    imageType: item.category === 'bags' ? 'bag' : (item.category === 'shoes' ? 'loafers' : 'blazer'),
    inCloset: true,
    timesWorn: 0,
    brand: item.brand,
    price: item.price
  };

  // Add to local state wardrobe
  STATE.wardrobe.unshift(newItem);

  // Sync with backend API if online
  try {
    if (typeof api !== 'undefined' && api && api.addWardrobeItem) {
      await api.addWardrobeItem(newItem);
    }
  } catch (err) {
    console.warn('Backend sync warning:', err);
  }

  showToast(`✨ Purchased ${item.name} (${item.price})! Added to your Digital Closet.`);

  // Clear purchase selection and navigate to Closet after feedback
  deselectBoutiqueProduct();
  setTimeout(() => {
    navigateTo('screen-wardrobe');
  }, 750);
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // Update live clock in phone status bar
  const clockEl = document.getElementById('phone-clock');
  if (clockEl) {
    const now = new Date();
    clockEl.innerText = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
  }

  // Render initial components
  renderWeatherWidget();
  renderOccasionPills();
  renderRecommendations();
  renderWardrobe();
  renderTryonStudio();
  renderComparisonView();
  renderProfileScreen();
  renderSavedLooks();
  renderFashionBoutique();

  // Search input handler
  const searchInput = document.getElementById('wardrobe-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderWardrobe(activeCategoryFilter, e.target.value);
    });
  }
});

