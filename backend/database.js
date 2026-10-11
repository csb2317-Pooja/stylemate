// StyleMate Backend Database Management & Local Persistence
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Helper to hash passwords securely
function hashPassword(password) {
  return crypto.createHash('sha256').update(password + '_stylemate_salt_2026').digest('hex');
}

// Generate secure session token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Default Seed Data
const DEFAULT_WARDROBE_ELENA = [
  {
    id: "item-1",
    name: "Classic Charcoal Tailored Blazer",
    category: "outerwear",
    color: "#2C2F36",
    colorName: "Charcoal Slate",
    fabric: "Wool Blend",
    season: ["autumn", "winter", "spring"],
    formality: "formal",
    occasions: ["office", "interview", "formal", "wedding"],
    imageType: "blazer",
    inCloset: true,
    timesWorn: 14
  },
  {
    id: "item-2",
    name: "Silk-Touch Ivory Button Blouse",
    category: "tops",
    color: "#F8F6F0",
    colorName: "Cream Ivory",
    fabric: "Mulberry Silk",
    season: ["spring", "summer", "autumn"],
    formality: "smart_casual",
    occasions: ["office", "interview", "casual", "formal", "wedding"],
    imageType: "blouse",
    inCloset: true,
    timesWorn: 22
  },
  {
    id: "item-3",
    name: "High-Waist Tailored Trousers",
    category: "bottoms",
    color: "#24262B",
    colorName: "Midnight Espresso",
    fabric: "Structured Twill",
    season: ["all"],
    formality: "formal",
    occasions: ["office", "interview", "formal", "wedding"],
    imageType: "trousers",
    inCloset: true,
    timesWorn: 19
  },
  {
    id: "item-4",
    name: "Italian Leather Bit Loafers",
    category: "footwear",
    color: "#4A2E1B",
    colorName: "Cognac Brown",
    fabric: "Full Grain Leather",
    season: ["all"],
    formality: "smart_casual",
    occasions: ["office", "casual", "interview", "formal"],
    imageType: "loafers",
    inCloset: true,
    timesWorn: 31
  },
  {
    id: "item-5",
    name: "Minimalist Structured Leather Tote",
    category: "accessories",
    color: "#3D2619",
    colorName: "Espresso Brown",
    fabric: "Pebbled Leather",
    season: ["all"],
    formality: "smart_casual",
    occasions: ["office", "college", "casual", "vacation"],
    imageType: "bag",
    inCloset: true,
    timesWorn: 28
  },
  {
    id: "item-6",
    name: "Cashmere Ribbed Mockneck Knit",
    category: "tops",
    color: "#D8C7B5",
    colorName: "Oatmeal Heather",
    fabric: "Pure Cashmere",
    season: ["autumn", "winter"],
    formality: "smart_casual",
    occasions: ["college", "office", "casual", "vacation"],
    imageType: "knit",
    inCloset: true,
    timesWorn: 11
  },
  {
    id: "item-7",
    name: "Straight-Leg Selvedge Indigo Denim",
    category: "bottoms",
    color: "#1E2A4A",
    colorName: "Deep Indigo",
    fabric: "13oz Organic Cotton",
    season: ["all"],
    formality: "casual",
    occasions: ["casual", "college", "sports", "vacation"],
    imageType: "jeans",
    inCloset: true,
    timesWorn: 45
  },
  {
    id: "item-8",
    name: "Clean Minimalist Leather Sneakers",
    category: "footwear",
    color: "#FDFCFA",
    colorName: "Chalk White",
    fabric: "Calfskin",
    season: ["spring", "summer", "autumn"],
    formality: "casual",
    occasions: ["casual", "college", "vacation", "sports"],
    imageType: "sneakers",
    inCloset: true,
    timesWorn: 50
  },
  {
    id: "item-9",
    name: "Double-Breasted Wool Trench Coat",
    category: "outerwear",
    color: "#BCA88E",
    colorName: "Sand Camel",
    fabric: "Water-Resistant Wool",
    season: ["autumn", "winter", "spring"],
    formality: "smart_casual",
    occasions: ["office", "casual", "interview", "formal", "vacation"],
    imageType: "trench",
    inCloset: true,
    timesWorn: 16
  },
  {
    id: "item-10",
    name: "Pleated Emerald Cocktail Dress",
    category: "dresses",
    color: "#1B4332",
    colorName: "Deep Emerald",
    fabric: "Satin Georgette",
    season: ["all"],
    formality: "formal",
    occasions: ["wedding", "festival", "party", "formal"],
    imageType: "dress",
    inCloset: true,
    timesWorn: 6
  },
  {
    id: "item-11",
    name: "Pointed Ankle Strap Stiletto Pumps",
    category: "footwear",
    color: "#1A1A1A",
    colorName: "Onyx Black",
    fabric: "Patent Leather",
    season: ["all"],
    formality: "formal",
    occasions: ["party", "wedding", "formal", "interview"],
    imageType: "heels",
    inCloset: true,
    timesWorn: 8
  },
  {
    id: "item-12",
    name: "Breton Striped Heavy Cotton Tee",
    category: "tops",
    color: "#2C3E50",
    colorName: "Navy & Ecru Stripe",
    fabric: "Combed Cotton",
    season: ["spring", "summer"],
    formality: "casual",
    occasions: ["casual", "college", "vacation"],
    imageType: "tee",
    inCloset: true,
    timesWorn: 34
  },
  {
    id: "item-13",
    name: "Wide-Leg Linen Summer Pants",
    category: "bottoms",
    color: "#E6DFD5",
    colorName: "Raw Ecru",
    fabric: "100% French Linen",
    season: ["summer", "spring"],
    formality: "casual",
    occasions: ["vacation", "casual", "college"],
    imageType: "linen_pants",
    inCloset: true,
    timesWorn: 18
  },
  {
    id: "item-14",
    name: "18K Gold Herringbone Chain & Watch",
    category: "accessories",
    color: "#D4AF37",
    colorName: "Warm Gold",
    fabric: "Gilded Brass & Sapphire Glass",
    season: ["all"],
    formality: "smart_casual",
    occasions: ["all"],
    imageType: "jewelry",
    inCloset: true,
    timesWorn: 60
  },
  {
    id: "item-15",
    name: "Tortoiseshell Cat-Eye Sunglasses",
    category: "accessories",
    color: "#6F4E37",
    colorName: "Amber Tortoise",
    fabric: "Acetate UV400",
    season: ["summer", "spring", "autumn"],
    formality: "casual",
    occasions: ["casual", "vacation", "college", "party"],
    imageType: "sunglasses",
    inCloset: true,
    timesWorn: 42
  },
  {
    id: "item-16",
    name: "Tech-Fleece Training Zip Hoodie",
    category: "outerwear",
    color: "#4A5568",
    colorName: "Heather Slate",
    fabric: "Thermal Tech Fleece",
    season: ["all"],
    formality: "sport",
    occasions: ["sports", "casual", "college"],
    imageType: "hoodie",
    inCloset: true,
    timesWorn: 27
  }
];

const DEFAULT_WARDROBE_MARCUS = [
  {
    id: "m-1",
    name: "Heavyweight Boxy Drop-Shoulder Tee",
    category: "tops",
    color: "#181A1E",
    colorName: "Onyx Black",
    fabric: "280gsm Compact Cotton",
    season: ["spring", "summer", "autumn"],
    formality: "casual",
    occasions: ["casual", "college", "party"],
    imageType: "tee",
    inCloset: true,
    timesWorn: 30
  },
  {
    id: "m-2",
    name: "Structured French Terry Oversized Hoodie",
    category: "tops",
    color: "#E2DDD7",
    colorName: "Oatmeal Melange",
    fabric: "450gsm Loopback Terry",
    season: ["autumn", "winter", "spring"],
    formality: "casual",
    occasions: ["casual", "college", "vacation"],
    imageType: "knit",
    inCloset: true,
    timesWorn: 25
  },
  {
    id: "m-3",
    name: "Wide-Leg Double Pleated Trousers",
    category: "bottoms",
    color: "#2C313A",
    colorName: "Slate Charcoal",
    fabric: "Technical Wool Twill",
    season: ["all"],
    formality: "smart_casual",
    occasions: ["office", "casual", "interview"],
    imageType: "trousers",
    inCloset: true,
    timesWorn: 18
  },
  {
    id: "m-4",
    name: "Retro Runner Low-Top Chunky Trainers",
    category: "footwear",
    color: "#D8D4CE",
    colorName: "Chalk & Olive",
    fabric: "Suede & Mesh",
    season: ["all"],
    formality: "casual",
    occasions: ["casual", "college", "vacation"],
    imageType: "sneakers",
    inCloset: true,
    timesWorn: 45
  },
  {
    id: "m-5",
    name: "Waterproof Technical Fishtail Parka",
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

const DEFAULT_WARDROBE_ARIA = [
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

class Database {
  constructor() {
    this.ensureDbExists();
  }

  ensureDbExists() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      const initialData = {
        users: [
          {
            id: "user-elena",
            name: "Elena Rostova",
            email: "elena.rostova@couture.ai",
            passwordHash: hashPassword("password123"),
            token: "token-elena-session-vip",
            tier: "Couture VIP • Old Money Persona",
            styleStreak: 5,
            profile: {
              gender: "female",
              age: 26,
              height: 172,
              bodyStructure: "hourglass",
              skinTone: "neutral_beige",
              faceShape: "oval",
              hairType: "wavy_chestnut",
              stylePersona: "old_money"
            },
            wardrobe: DEFAULT_WARDROBE_ELENA,
            savedSets: [
              {
                id: "set-saved-1",
                title: "Boardroom Authority Set",
                occasion: "office",
                vibe: "Crisp Executive Minimalism",
                matchRate: 100,
                createdAt: "2026-10-10T14:30:00Z",
                items: [
                  { cat: "Top", name: "Silk-Touch Ivory Button Blouse", color: "#F8F6F0" },
                  { cat: "Outerwear", name: "Classic Charcoal Tailored Blazer", color: "#2C2F36" },
                  { cat: "Bottom", name: "High-Waist Tailored Trousers", color: "#24262B" },
                  { cat: "Footwear", name: "Italian Leather Bit Loafers", color: "#4A2E1B" },
                  { cat: "Bag", name: "Minimalist Structured Leather Tote", color: "#3D2619" }
                ],
                palette: ["#2C2F36", "#F8F6F0", "#4A2E1B", "#D4AF37"],
                stylistNote: "Classic monochrome neutrals with subtle gold warm tones. Flattering tailored lines balance waist and silhouette."
              }
            ]
          },
          {
            id: "user-marcus",
            name: "Marcus Vance",
            email: "marcus.vance@couture.ai",
            passwordHash: hashPassword("password123"),
            token: "token-marcus-session-vip",
            tier: "Elevated Streetwear • Tech Capsule",
            styleStreak: 8,
            profile: {
              gender: "male",
              age: 28,
              height: 184,
              bodyStructure: "athletic",
              skinTone: "warm_olive",
              faceShape: "square",
              hairType: "textured_fade",
              stylePersona: "streetwear"
            },
            wardrobe: DEFAULT_WARDROBE_MARCUS,
            savedSets: []
          },
          {
            id: "user-aria",
            name: "Aria Chen",
            email: "aria.chen@couture.ai",
            passwordHash: hashPassword("password123"),
            token: "token-aria-session-vip",
            tier: "Capsule Minimalist • Scandinavian Vibe",
            styleStreak: 12,
            profile: {
              gender: "female",
              age: 24,
              height: 165,
              bodyStructure: "rectangle",
              skinTone: "warm_ivory",
              faceShape: "diamond",
              hairType: "sleek_bob",
              stylePersona: "minimalist"
            },
            wardrobe: DEFAULT_WARDROBE_ARIA,
            savedSets: []
          }
        ]
      };

      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    }
  }

  read() {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      console.error('Error reading DB:', e);
      return { users: [] };
    }
  }

  write(data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Error writing DB:', e);
      return false;
    }
  }

  getUserByEmail(email) {
    const data = this.read();
    return data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    const data = this.read();
    return data.users.find(u => u.id === id);
  }

  getUserByToken(token) {
    if (!token) return null;
    const data = this.read();
    return data.users.find(u => u.token === token);
  }

  createUser({ name, email, password, profile = {} }) {
    const data = this.read();
    if (this.getUserByEmail(email)) {
      throw new Error("Email is already registered");
    }

    const token = generateToken();
    const newUser = {
      id: `user-${Date.now()}`,
      name: name || "Fashion Connoisseur",
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
      token: token,
      tier: "Private Client Member",
      styleStreak: 1,
      profile: {
        gender: profile.gender || "female",
        age: profile.age || 26,
        height: profile.height || 170,
        bodyStructure: profile.bodyStructure || "hourglass",
        skinTone: profile.skinTone || "neutral_beige",
        faceShape: profile.faceShape || "oval",
        hairType: profile.hairType || "wavy_chestnut",
        stylePersona: profile.stylePersona || "old_money"
      },
      wardrobe: JSON.parse(JSON.stringify(DEFAULT_WARDROBE_ELENA)),
      savedSets: []
    };

    data.users.push(newUser);
    this.write(data);
    return newUser;
  }

  authenticate(email, password) {
    const user = this.getUserByEmail(email);
    if (!user) return null;

    const hash = hashPassword(password);
    if (user.passwordHash !== hash) return null;

    // Issue refreshed token
    user.token = generateToken();
    const data = this.read();
    const idx = data.users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      data.users[idx] = user;
      this.write(data);
    }
    return user;
  }

  updateProfile(userId, profileUpdates) {
    const data = this.read();
    const user = data.users.find(u => u.id === userId);
    if (!user) return null;

    user.profile = { ...user.profile, ...profileUpdates };
    if (profileUpdates.name) user.name = profileUpdates.name;
    this.write(data);
    return user;
  }

  addWardrobeItem(userId, item) {
    const data = this.read();
    const user = data.users.find(u => u.id === userId);
    if (!user) return null;

    const newItem = {
      id: `item-${Date.now()}`,
      name: item.name,
      category: item.category || "tops",
      color: item.color || "#000000",
      colorName: item.colorName || "Custom",
      fabric: item.fabric || "Premium Textile",
      season: item.season || ["all"],
      formality: item.formality || "smart_casual",
      occasions: item.occasions || ["casual", "office"],
      imageType: item.category || "tops",
      inCloset: true,
      timesWorn: 0
    };

    user.wardrobe.push(newItem);
    this.write(data);
    return newItem;
  }

  deleteWardrobeItem(userId, itemId) {
    const data = this.read();
    const user = data.users.find(u => u.id === userId);
    if (!user) return false;

    const initialLength = user.wardrobe.length;
    user.wardrobe = user.wardrobe.filter(item => item.id !== itemId);
    if (user.wardrobe.length !== initialLength) {
      this.write(data);
      return true;
    }
    return false;
  }

  recordItemWorn(userId, itemId) {
    const data = this.read();
    const user = data.users.find(u => u.id === userId);
    if (!user) return null;

    const item = user.wardrobe.find(i => i.id === itemId);
    if (item) {
      item.timesWorn = (item.timesWorn || 0) + 1;
      user.styleStreak = (user.styleStreak || 0) + 1;
      this.write(data);
      return { item, streak: user.styleStreak };
    }
    return null;
  }

  saveOutfitSet(userId, outfitSet) {
    const data = this.read();
    const user = data.users.find(u => u.id === userId);
    if (!user) return null;

    const newSet = {
      ...outfitSet,
      id: outfitSet.id || `set-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    if (!user.savedSets) user.savedSets = [];
    user.savedSets.unshift(newSet);
    this.write(data);
    return newSet;
  }

  deleteOutfitSet(userId, setId) {
    const data = this.read();
    const user = data.users.find(u => u.id === userId);
    if (!user || !user.savedSets) return false;

    user.savedSets = user.savedSets.filter(s => s.id !== setId);
    this.write(data);
    return true;
  }
}

module.exports = new Database();
