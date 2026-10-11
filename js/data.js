// StyleMate Master Fashion Data & Engine Knowledge Base

const INITIAL_WARDROBE = [
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

const OCCASIONS_DATA = [
  {
    id: "office",
    name: "Office / Work",
    icon: "briefcase",
    desc: "Polished, competent, professional & sharp tailored",
    defaultFormality: "formal",
    vibe: "Sophisticated Executive"
  },
  {
    id: "college",
    name: "College / Campus",
    icon: "book-open",
    desc: "Effortless, comfortable, trendy & practical",
    defaultFormality: "casual",
    vibe: "Contemporary Campus Cool"
  },
  {
    id: "interview",
    name: "Job Interview",
    icon: "award",
    desc: "Authoritative, neat, confident & impeccably groomed",
    defaultFormality: "formal",
    vibe: "High Impact Professional"
  },
  {
    id: "wedding",
    name: "Wedding Guest",
    icon: "heart",
    desc: "Celebratory, elevated elegance, rich textures",
    defaultFormality: "festive",
    vibe: "Refined Gala Chic"
  },
  {
    id: "festival",
    name: "Festival & Cultural",
    icon: "sparkles",
    desc: "Vibrant palettes, heritage silhouettes, expressive flair",
    defaultFormality: "festive",
    vibe: "Artisanal Celebration"
  },
  {
    id: "party",
    name: "Party / Night Out",
    icon: "glass-water",
    desc: "Bold accents, evening glamour, stylish silhouettes",
    defaultFormality: "party",
    vibe: "Modern Twilight Glamour"
  },
  {
    id: "vacation",
    name: "Resort / Vacation",
    icon: "palmtree",
    desc: "Breathable natural fabrics, relaxed flow, sun-kissed shades",
    defaultFormality: "casual",
    vibe: "Riviera Leisure"
  },
  {
    id: "sports",
    name: "Sports & Active",
    icon: "activity",
    desc: "Performance fabrics, ergonomic stretch, athletic aesthetics",
    defaultFormality: "sport",
    vibe: "Athleisure Dynamic"
  },
  {
    id: "casual",
    name: "Casual Outing",
    icon: "coffee",
    desc: "Comfort-first, versatile layering, off-duty chic",
    defaultFormality: "casual",
    vibe: "Urban Minimalist"
  },
  {
    id: "formal",
    name: "Formal Gala / Meeting",
    icon: "crown",
    desc: "Sharp tuxedo or gown accents, timeless luxury",
    defaultFormality: "formal",
    vibe: "Haute Black-Tie"
  }
];

const WEATHER_PRESETS = [
  {
    id: "pleasant_sunny",
    title: "Mild & Sunny",
    temp: 24,
    condition: "Sunny",
    icon: "sun",
    humidity: 45,
    wind: "8 km/h",
    advice: "Optimal weather for breathable cotton, silk, and lightweight linen layering."
  },
  {
    id: "rainy_humid",
    title: "Rainy & Humid",
    temp: 19,
    condition: "Rain Shower",
    icon: "cloud-rain",
    humidity: 88,
    wind: "18 km/h",
    advice: "Prioritize water-resistant outer layers, closed-toe leather or treated boots, avoiding puddle-drag hems."
  },
  {
    id: "crisp_breeze",
    title: "Crisp & Chilly",
    temp: 13,
    condition: "Breezy / Overcast",
    icon: "wind",
    humidity: 58,
    wind: "22 km/h",
    advice: "Thermal knit underlayers, structured wool coat or trench, and silk scarf for neck protection."
  },
  {
    id: "hot_summer",
    title: "Warm & Sunlit",
    temp: 32,
    condition: "High Heat",
    icon: "sun-dim",
    humidity: 65,
    wind: "6 km/h",
    advice: "Ultra-breathable open-weave linens, light reflective tones, UV-shield sunglasses and airy footwear."
  },
  {
    id: "cold_winter",
    title: "Winter Frost",
    temp: 4,
    condition: "Cold & Foggy",
    icon: "snowflake",
    humidity: 72,
    wind: "15 km/h",
    advice: "Heavy gauge cashmere knits, wool overcoats, insulated boots, and rich warm jewel or neutral tones."
  }
];

const BODY_STRUCTURES = [
  { id: "hourglass", label: "Hourglass", desc: "Balanced shoulders & hips with defined waistline" },
  { id: "rectangle", label: "Rectangle / Athletic", desc: "Balanced proportions with uniform silhouette" },
  { id: "inverted_triangle", label: "Inverted Triangle", desc: "Broader shoulders with tapering hips" },
  { id: "pear", label: "Pear / Triangle", desc: "Narrower shoulders with fuller hips and thighs" },
  { id: "athletic", label: "Athletic V-Taper", desc: "Muscular frame with tapered midsection" },
  { id: "oval", label: "Oval / Soft Curves", desc: "Gentle rounded torso with balanced limbs" }
];

const SKIN_TONES = [
  { id: "fair_cool", label: "Fair Porcelein (Cool)", hex: "#F7ECE1", undertone: "Cool Pink/Rose" },
  { id: "warm_ivory", label: "Warm Ivory", hex: "#F3DFC6", undertone: "Warm Golden" },
  { id: "neutral_beige", label: "Neutral Beige", hex: "#DEC1A5", undertone: "Neutral Honey" },
  { id: "warm_olive", label: "Golden Olive", hex: "#C79E78", undertone: "Olive / Warm" },
  { id: "rich_tan", label: "Caramel Tan", hex: "#9E6F4B", undertone: "Warm Bronze" },
  { id: "deep_ebony", label: "Deep Espresso", hex: "#4C3122", undertone: "Cool / Rich Deep" }
];

const FACE_SHAPES = [
  { id: "oval", label: "Oval", tip: "Versatile; suits almost all collars, lapels, and neckline depths." },
  { id: "round", label: "Round", tip: "V-necks and elongated lapels flatter by adding vertical definition." },
  { id: "square", label: "Square", tip: "Soft rounded collars, drape fabrics, and scoop necks soften angular jaws." },
  { id: "heart", label: "Heart", tip: "Boat necks, crew necks, and statement earrings balance a slender chin." },
  { id: "diamond", label: "Diamond", tip: "Flared open collars and wide lapels accentuate high cheekbones." }
];

const FASHION_STYLES = [
  { id: "old_money", label: "Old Money / Quiet Luxury", desc: "Monochrome neutrals, cashmere, tailored cuts, understated opulence" },
  { id: "minimalist", label: "Minimalist Chic", desc: "Clean lines, functional cuts, capsule silhouettes, zero clutter" },
  { id: "streetwear", label: "Elevated Streetwear", desc: "Oversized proportions, graphic elements, designer sneakers, tech accents" },
  { id: "classic_chic", label: "Classic French Chic", desc: "Breton stripes, trench coats, silk scarves, effortless Parisian elegance" },
  { id: "bohemian", label: "Modern Bohemian", desc: "Rich artisanal textures, fluid drapes, organic earth tones, statement jewelry" },
  { id: "smart_casual", label: "Nordic Smart Casual", desc: "Layered knitwear, selvedge denim, Chelsea boots, earthy calm tones" }
];

// Luxury Fashion Boutique Catalog (High-End Designer Pieces)
const BOUTIQUE_PRODUCTS = [
  // --- BAGS (Handbags, Crossbody, Backpacks) ---
  {
    id: "boutique-bag-1",
    name: "Kisslock Barrel Bag",
    brand: "BALENCIAGA",
    category: "bags",
    price: "₹290.00",
    priceNum: 290,
    image: "assets/images/shop_balenciaga_blue.jpg",
    spriteCoord: { x: "0%", y: "0%" },
    color: "#4A607A",
    colorName: "Slate Blue",
    fabric: "Crinkled Arena Leather",
    badge: "₹",
    description: "Iconic Balenciaga City silhouette in vintage-washed blue-gray leather with silver hardware studs and whipstitched dual handles."
  },
  {
    id: "boutique-bag-2",
    name: "Neo Classic City Mini",
    brand: "BALENCIAGA",
    category: "bags",
    price: "₹295.00",
    priceNum: 295,
    image: "assets/images/shop_balenciaga_pink.jpg",
    spriteCoord: { x: "50%", y: "0%" },
    color: "#E03B8B",
    colorName: "Magenta Pink",
    fabric: "Grained Calfskin",
    badge: "₹",
    description: "Vibrant high-contrast magenta leather with structural trapezoid profile, edge tassels, and ruthenium metal hardware."
  },
  {
    id: "boutique-bag-3",
    name: "Metallic Arena City Tote",
    brand: "BALENCIAGA",
    category: "bags",
    price: "₹310.00",
    priceNum: 310,
    image: "assets/images/shop_balenciaga_silver.jpg",
    spriteCoord: { x: "100%", y: "0%" },
    color: "#70737C",
    colorName: "Metallic Silver",
    fabric: "Crinkled Foil Lambskin",
    badge: "₹",
    description: "Futuristic dark gunmetal metallic leather with tonal studs, detachable shoulder strap, and rebel luxury aesthetic."
  },
  {
    id: "boutique-bag-4",
    name: "La Medusa Bucket Handbag",
    brand: "VERSACE",
    category: "bags",
    price: "₹245.00",
    priceNum: 245,
    image: "assets/images/shop_versace_tan.jpg",
    spriteCoord: { x: "0%", y: "33.333%" },
    color: "#C18349",
    colorName: "Caramel Tan",
    fabric: "Supple Calfskin",
    badge: "₹",
    description: "Signature Versace Medusa plaque in gilded gold with thick gourmette chain strap and caramel smooth calf leather body."
  },
  {
    id: "boutique-bag-5",
    name: "La Medusa Chain Crossbody",
    brand: "VERSACE",
    category: "bags",
    price: "₹260.00",
    priceNum: 260,
    image: "assets/images/shop_versace_black.jpg",
    spriteCoord: { x: "50%", y: "33.333%" },
    color: "#18181B",
    colorName: "Noir Black",
    fabric: "Polished Italian Leather",
    badge: "₹",
    description: "Timeless midnight black shoulder bag accented with iconic central 3D Medusa emblem and heavy golden curb link chain."
  },
  {
    id: "boutique-bag-6",
    name: "La Medusa Structured Satchel",
    brand: "VERSACE",
    category: "bags",
    price: "₹255.00",
    priceNum: 255,
    spriteCoord: { x: "100%", y: "33.333%" },
    color: "#B22234",
    colorName: "Ruby Crimson",
    fabric: "Hand-Buffed Calfskin",
    badge: "₹",
    description: "Striking bold red leather finish with gold Medusa head centerpiece and dual modular carry straps."
  },
  {
    id: "boutique-bag-7",
    name: "Re-Nylon Drawstring Backpack",
    brand: "PRADA",
    category: "bags",
    price: "₹220.00",
    priceNum: 220,
    spriteCoord: { x: "0%", y: "100%" },
    color: "#1E58B0",
    colorName: "Cobalt Blue",
    fabric: "Regenerated Ocean Nylon",
    badge: "₹",
    description: "Milano triangle enamel plaque with technical drawstring closure and ergonomic padded leather-trimmed straps."
  },
  {
    id: "boutique-bag-8",
    name: "Re-Nylon Utility Pack",
    brand: "PRADA",
    category: "bags",
    price: "₹220.00",
    priceNum: 220,
    spriteCoord: { x: "50%", y: "100%" },
    color: "#E5CF32",
    colorName: "Solar Yellow",
    fabric: "ECONYL® Regenerated Nylon",
    badge: "₹",
    description: "High-visibility vibrant yellow technical backpack with saffiano leather pull tabs and front zip cargo pocket."
  },
  {
    id: "boutique-bag-9",
    name: "Re-Nylon Alpine Knapsack",
    brand: "PRADA",
    category: "bags",
    price: "₹220.00",
    priceNum: 220,
    spriteCoord: { x: "100%", y: "100%" },
    color: "#109856",
    colorName: "Emerald Green",
    fabric: "Regenerated Nylon Gabardine",
    badge: "₹",
    description: "Iconic deep emerald green utilitarian backpack with polished steel buckle snaps and enamel triangle insignia."
  },
  {
    id: "boutique-bag-10",
    name: "Vela Drawstring Pouch",
    brand: "PRADA",
    category: "bags",
    price: "₹180.00",
    priceNum: 180,
    spriteCoord: { x: "0%", y: "66.666%" },
    color: "#2980B9",
    colorName: "Aegean Blue",
    fabric: "Ultralight Technical Vela",
    badge: "₹",
    description: "Minimalist drawstring bucket silhouette with tone-on-tone cord straps and water-repellent finish."
  },
  {
    id: "boutique-bag-11",
    name: "Vela Drawstring Bucket",
    brand: "PRADA",
    category: "bags",
    price: "₹180.00",
    priceNum: 180,
    spriteCoord: { x: "50%", y: "66.666%" },
    color: "#F1C40F",
    colorName: "Sunburst Yellow",
    fabric: "Ultralight Technical Vela",
    badge: "₹",
    description: "Vibrant yellow sporty drawstring sack featuring front zipper quick-access compartment."
  },
  {
    id: "boutique-bag-12",
    name: "Vela Drawstring Sack",
    brand: "PRADA",
    category: "bags",
    price: "₹180.00",
    priceNum: 180,
    spriteCoord: { x: "100%", y: "66.666%" },
    color: "#27AE60",
    colorName: "Kelly Green",
    fabric: "Ultralight Technical Vela",
    badge: "₹",
    description: "Fresh vivid green nylon sack with signature triangle emblem and featherweight drape."
  },

  // --- PANTS / TROUSERS ---
  {
    id: "boutique-pants-1",
    name: "Wide-Leg Wool Twill Trousers",
    brand: "BOTTEGA VENETA",
    category: "pants",
    price: "₹190.00",
    priceNum: 190,
    color: "#2C2D30",
    colorName: "Anthracite",
    fabric: "100% Virgin Wool",
    badge: "₹",
    description: "Impeccably tailored double-pleated trousers with elongated silhouette and concealed horn buttoning."
  },
  {
    id: "boutique-pants-2",
    name: "Fisherman Turn-Up Denim",
    brand: "LOEWE",
    category: "pants",
    price: "₹145.00",
    priceNum: 145,
    color: "#1F3A60",
    colorName: "Deep Indigo",
    fabric: "Raw Japanese Denim",
    badge: "₹",
    description: "Architectural cuffed wide-leg jeans with contrasting white calfskin anagram patch."
  },
  {
    id: "boutique-pants-3",
    name: "Silk-Blend Velvet Tuxedo Slacks",
    brand: "SAINT LAURENT",
    category: "pants",
    price: "₹210.00",
    priceNum: 210,
    color: "#161618",
    colorName: "Jet Black",
    fabric: "Silk Velvet",
    badge: "₹",
    description: "Ultra-sleek satin side-striped formal evening trousers tailored to perfection."
  },
  {
    id: "boutique-pants-4",
    name: "Igor Pleated Trousers",
    brand: "THE ROW",
    category: "pants",
    price: "₹230.00",
    priceNum: 230,
    color: "#DFD7CA",
    colorName: "Oatmeal Beige",
    fabric: "Cashmere Wool Blend",
    badge: "₹",
    description: "Quiet luxury relaxed-leg tailoring with exquisite drape and invisible stitching."
  },

  // --- DRESSES ---
  {
    id: "boutique-dress-1",
    name: "Sculptural Keyhole Gown",
    brand: "SCHIAPARELLI",
    category: "dresses",
    price: "₹490.00",
    priceNum: 490,
    color: "#141416",
    colorName: "Midnight Black",
    fabric: "Silk Crepe & Hammered Brass",
    badge: "₹",
    description: "High couture silhouette with anatomical gilded brass keyhole brooch clasp."
  },
  {
    id: "boutique-dress-2",
    name: "Corset Drape Evening Dress",
    brand: "ALEXANDER MCQUEEN",
    category: "dresses",
    price: "₹520.00",
    priceNum: 520,
    color: "#800020",
    colorName: "Bordeaux Wine",
    fabric: "Asymmetric Silk Taffeta",
    badge: "₹",
    description: "Dramatic boned internal corset with sculpted waterfall asymmetric hemline."
  },
  {
    id: "boutique-dress-3",
    name: "La Robe Saudade Backless Slip",
    brand: "JACQUEMUS",
    category: "dresses",
    price: "₹215.00",
    priceNum: 215,
    color: "#F9F5EC",
    colorName: "Ivory Ecru",
    fabric: "Viscose Twill",
    badge: "₹",
    description: "Provencal draped cowl neck gown with open back lace-up detail and side slit."
  },

  // --- SHOES ---
  {
    id: "boutique-shoes-1",
    name: "So Kate 120 Stiletto Pumps",
    brand: "CHRISTIAN LOUBOUTIN",
    category: "shoes",
    price: "₹280.00",
    priceNum: 280,
    color: "#0F0F10",
    colorName: "Glossy Black",
    fabric: "Patent Calfskin & Red Sole",
    badge: "₹",
    description: "Legendary point-toe silhouette with 120mm stiletto heel and scarlet lacquered sole."
  },
  {
    id: "boutique-shoes-2",
    name: "Monolith Lug-Sole Loafers",
    brand: "PRADA",
    category: "shoes",
    price: "₹265.00",
    priceNum: 265,
    color: "#1E1E20",
    colorName: "Polished Black",
    fabric: "Brushed Spazzolato Leather",
    badge: "₹",
    description: "Chunky platform tread sole with signature enamel triangle logo strap."
  },
  {
    id: "boutique-shoes-3",
    name: "Begum Crystal Glass Slingbacks",
    brand: "AMINA MUADDI",
    category: "shoes",
    price: "₹320.00",
    priceNum: 320,
    color: "#E2E8F0",
    colorName: "Crystal Clear",
    fabric: "PVC & Swarovski Crystal Brooch",
    badge: "₹",
    description: "Fairy-tale flared architectural martini heel with sunburst crystal embellishment."
  },

  // --- JACKETS / OUTERWEAR ---
  {
    id: "boutique-outer-1",
    name: "Bouclé Tweed Trophy Jacket",
    brand: "CHANEL",
    category: "outerwear",
    price: "₹590.00",
    priceNum: 590,
    color: "#FAF8F5",
    colorName: "Ivory & Black",
    fabric: "Woven Wool Bouclé",
    badge: "₹",
    description: "Timeless Parisian collarless crop jacket with lion-head buttons and silk camellia lining."
  },
  {
    id: "boutique-outer-2",
    name: "Hourglass Sculpted Blazer",
    brand: "BALENCIAGA",
    category: "outerwear",
    price: "₹440.00",
    priceNum: 440,
    color: "#222429",
    colorName: "Charcoal Slate",
    fabric: "Structured Wool Gabardine",
    badge: "₹",
    description: "Cinched waist architectural blazer with dramatic pagoda shoulder pads."
  },
  {
    id: "boutique-outer-3",
    name: "Kensington Heritage Trench",
    brand: "BURBERRY",
    category: "outerwear",
    price: "₹410.00",
    priceNum: 410,
    color: "#C2A882",
    colorName: "Honey Khaki",
    fabric: "Waterproof Cotton Gabardine",
    badge: "₹",
    description: "Classic double-breasted trench with epaulettes, storm flap, and vintage check undercollar."
  },

  // --- HATS ---
  {
    id: "boutique-hat-1",
    name: "Re-Nylon Triangle Bucket Hat",
    brand: "PRADA",
    category: "hats",
    price: "₹120.00",
    priceNum: 120,
    color: "#18181A",
    colorName: "Nero Black",
    fabric: "Regenerated Nylon",
    badge: "₹",
    description: "Street-luxe icon bucket hat featuring the enamelled metal triangle logo."
  },
  {
    id: "boutique-hat-2",
    name: "Le Bob Gadjo Sun Hat",
    brand: "JACQUEMUS",
    category: "hats",
    price: "₹95.00",
    priceNum: 95,
    color: "#E8D8C3",
    colorName: "Desert Sand",
    fabric: "100% Cotton Canvas",
    badge: "₹",
    description: "Relaxed French riviera bucket hat with rear drawstring tie and silver hardware lettering."
  },

  // --- BEAUTY / ACCESSORIES ---
  {
    id: "boutique-beauty-1",
    name: "Rouge Allure Velvet Lip Colour",
    brand: "CHANEL",
    category: "beauty",
    price: "₹75.00",
    priceNum: 75,
    color: "#A91D22",
    colorName: "Rouge Charnel",
    fabric: "Luminous Matte Formula",
    badge: "₹",
    description: "Ultra-pigmented velvet formula in iconic click-open gold and black lacquer case."
  },
  {
    id: "boutique-beauty-2",
    name: "Panthère Link Gold Cuff",
    brand: "CARTIER",
    category: "beauty",
    price: "₹680.00",
    priceNum: 680,
    color: "#D4AF37",
    colorName: "18K Yellow Gold",
    fabric: "Solid 18K Gold & Tsavorite",
    badge: "₹",
    description: "Sculpted panthère head cuff bracelet set with brilliant-cut tsavorite garnet eyes."
  }
];
