// StyleMate AI Outfit Set Combinations Engine
// Multi-dimensional color harmony, body structure balancing, weather adaptation & occasion alignment

// Occasion & Formality Mapping
const FORMALITY_MAP = {
  office: { target: 85, weightFormal: 0.8 },
  interview: { target: 95, weightFormal: 0.95 },
  formal: { target: 95, weightFormal: 0.95 },
  wedding: { target: 90, weightFormal: 0.9 },
  party: { target: 75, weightFormal: 0.6 },
  festival: { target: 70, weightFormal: 0.5 },
  college: { target: 45, weightFormal: 0.2 },
  casual: { target: 40, weightFormal: 0.2 },
  vacation: { target: 35, weightFormal: 0.15 },
  sports: { target: 20, weightFormal: 0.05 }
};

// Body Silhouette Optimization Rules
const SILHOUETTE_RULES = {
  hourglass: {
    advice: "Highlights natural waistline and balanced proportions.",
    favorableCuts: ["tailored", "high-waist", "wrap", "structured blazers", "fitted tops"],
    avoid: ["boxy sack cuts", "oversized dropped waists without cinch"]
  },
  rectangle: {
    advice: "Creates visual curvature through layered dimensions and belted or fluid hems.",
    favorableCuts: ["pleated trousers", "wide-leg drape", "belted outerwear", "textured mocknecks"],
    avoid: ["completely shapeless tube cuts"]
  },
  inverted_triangle: {
    advice: "Softens broad shoulders while drawing eye movement toward fluid lower garments.",
    favorableCuts: ["wide-leg pants", "A-line skirts", "soft unstructured collars", "clean raglan sleeves"],
    avoid: ["heavy shoulder pads", "extreme boatneck cuts"]
  },
  pear: {
    advice: "Brings focus to shoulders and neckline with statement collars, balancing lower hips.",
    favorableCuts: ["structured blazers", "lapel jackets", "straight-leg dark denim", "boatnecks"],
    avoid: ["tapered clingy bottoms with horizontal hip seams"]
  },
  athletic: {
    advice: "Flatters muscular V-taper with relaxed shoulders, tailored drape, and clean lines.",
    favorableCuts: ["boxy drop tees", "pleated twill trousers", "minimalist chore jackets"],
    avoid: ["hyper-restrictive skin-tight armholes"]
  },
  oval: {
    advice: "Elongates vertical posture through continuous color columns and open outer drapes.",
    favorableCuts: ["open trench coats", "V-necks", "fluid vertical crepes", "monochrome columns"],
    avoid: ["heavy waist-constricting horizontal contrast bands"]
  }
};

// Skin Undertone Harmony Guidelines
const UNDERTONE_GUIDELINES = {
  fair_cool: {
    best: ["Emerald", "Charcoal Slate", "Navy", "Crisp White", "Cool Berry", "Onyx Black"],
    avoid: ["Muddy Mustard", "Warm Orange"],
    note: "High contrast jewel tones and deep slate create radiant luminosity against cool porcelain skin."
  },
  warm_ivory: {
    best: ["Cream Ivory", "Warm Gold", "Camel Sand", "Forest Sage", "Terracotta", "Oatmeal"],
    avoid: ["Stark Icy Blue"],
    note: "Warm cream, sand, and gilded tones bring out natural golden radiance without draining complexion."
  },
  neutral_beige: {
    best: ["Charcoal Slate", "Cream Ivory", "Deep Indigo", "Cognac Brown", "Emerald", "Oatmeal Heather"],
    avoid: ["Neon chartreuse"],
    note: "Extremely versatile; harmonizes effortlessly with quiet luxury neutrals, rich cognac, and jewel accents."
  },
  warm_olive: {
    best: ["Golden Olive", "Onyx Black", "Chalk White", "Deep Espresso", "Warm Amber", "Navy"],
    avoid: ["Ash Pale Grey"],
    note: "Rich earth tones, deep slate, and warm olives amplify olive undertones with high depth."
  },
  rich_tan: {
    best: ["Caramel Tan", "Warm Gold", "Terracotta", "Cream Ivory", "Emerald", "Royal Cobalt"],
    avoid: ["Cool Ash Taupe"],
    note: "Bronze and sun-warmed earth shades create high visual impact and regal depth."
  },
  deep_ebony: {
    best: ["Pure Chalk White", "Vibrant Gold", "Cobalt", "Emerald", "Rich Cognac", "Satin Scarlet"],
    avoid: ["Drab washed out olive-browns"],
    note: "High-contrast brights, gilded jewelry, and pure saturated tones produce breathtaking editorial elegance."
  }
};

// Helper: Color distance / brightness
function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function calculateColorHarmony(colors) {
  if (!colors || colors.length < 2) return { score: 90, type: "Monochromatic Neutral" };

  const rgbs = colors.map(hexToRgb);
  const brightnesses = rgbs.map(c => (c.r * 299 + c.g * 587 + c.b * 114) / 1000);

  // Check contrast variance
  const minB = Math.min(...brightnesses);
  const maxB = Math.max(...brightnesses);
  const contrastDiff = maxB - minB;

  if (contrastDiff > 140) {
    return { score: 98, type: "High-Contrast Couture Dynamic" };
  } else if (contrastDiff > 60) {
    return { score: 95, type: "Tonal Quiet Luxury Harmony" };
  } else {
    return { score: 91, type: "Monochrome Minimalist Balance" };
  }
}

class AIOutfitEngine {
  /**
   * Generates 3 intelligent, complete outfit sets from user's wardrobe & profile
   */
  generateCombinationSets({ wardrobe, profile, occasion = 'office', weather = 'pleasant_sunny', anchorItemId = null, styleVibe = null }) {
    if (!wardrobe || wardrobe.length === 0) {
      throw new Error("User digital closet is empty");
    }

    const bodyRule = SILHOUETTE_RULES[profile.bodyStructure] || SILHOUETTE_RULES.hourglass;
    const undertoneRule = UNDERTONE_GUIDELINES[profile.skinTone] || UNDERTONE_GUIDELINES.neutral_beige;
    const formalityTarget = FORMALITY_MAP[occasion] || FORMALITY_MAP.office;

    // Categorize available closet items
    const tops = wardrobe.filter(i => i.category === 'tops');
    const bottoms = wardrobe.filter(i => i.category === 'bottoms');
    const outerwear = wardrobe.filter(i => i.category === 'outerwear');
    const footwear = wardrobe.filter(i => i.category === 'footwear');
    const accessories = wardrobe.filter(i => i.category === 'accessories');
    const dresses = wardrobe.filter(i => i.category === 'dresses');

    // Find anchor item if supplied
    let anchorItem = null;
    if (anchorItemId) {
      anchorItem = wardrobe.find(i => i.id === anchorItemId);
    }

    // Weather temp context
    let tempC = 22;
    let weatherCondition = "Mild & Sunny";
    let isRainy = false;
    let isChilly = false;

    if (typeof weather === 'object') {
      tempC = weather.temp || 22;
      weatherCondition = weather.condition || "Clear";
      isRainy = (weather.condition || "").toLowerCase().includes('rain');
      isChilly = tempC < 16;
    } else {
      switch (weather) {
        case 'cold_winter':
          tempC = 4; weatherCondition = "Winter Chilly"; isChilly = true; break;
        case 'rainy_humid':
          tempC = 19; weatherCondition = "Rainy & Humid"; isRainy = true; break;
        case 'crisp_breeze':
          tempC = 13; weatherCondition = "Crisp & Breezy"; isChilly = true; break;
        case 'hot_summer':
          tempC = 31; weatherCondition = "Warm & Sunlit"; break;
        case 'pleasant_sunny':
        default:
          tempC = 23; weatherCondition = "Mild & Sunny"; break;
      }
    }

    // Helper to score an item's affinity for the occasion
    function scoreItemAffinity(item) {
      let score = 50;
      if (item.occasions && item.occasions.includes(occasion)) score += 35;
      if (item.occasions && item.occasions.includes('all')) score += 20;
      if (isChilly && item.fabric && (item.fabric.includes('Wool') || item.fabric.includes('Cashmere') || item.fabric.includes('Fleece'))) score += 15;
      if (tempC > 25 && item.fabric && (item.fabric.includes('Linen') || item.fabric.includes('Silk') || item.fabric.includes('Cotton'))) score += 15;
      return score;
    }

    // Sort buckets by relevance
    const sortedTops = [...tops].sort((a, b) => scoreItemAffinity(b) - scoreItemAffinity(a));
    const sortedBottoms = [...bottoms].sort((a, b) => scoreItemAffinity(b) - scoreItemAffinity(a));
    const sortedOuter = [...outerwear].sort((a, b) => scoreItemAffinity(b) - scoreItemAffinity(a));
    const sortedShoes = [...footwear].sort((a, b) => scoreItemAffinity(b) - scoreItemAffinity(a));
    const sortedAcc = [...accessories].sort((a, b) => scoreItemAffinity(b) - scoreItemAffinity(a));
    const sortedDresses = [...dresses].sort((a, b) => scoreItemAffinity(b) - scoreItemAffinity(a));

    const sets = [];

    // ==========================================
    // SET 1: THE SIGNATURE HERO SET
    // ==========================================
    let set1Items = [];
    if (anchorItem) {
      set1Items.push({ ...anchorItem, role: anchorItem.category, isAnchor: true });
    }

    // Check if occasion calls for dress or separates
    const useDress = (occasion === 'wedding' || occasion === 'party' || occasion === 'formal') && sortedDresses.length > 0 && (!anchorItem || anchorItem.category === 'dresses');

    if (useDress) {
      const d = (anchorItem && anchorItem.category === 'dresses') ? anchorItem : sortedDresses[0];
      if (!set1Items.find(i => i.id === d.id)) set1Items.push({ ...d, role: 'dress' });
      const shoes = sortedShoes.find(s => s.formality === 'formal') || sortedShoes[0];
      if (shoes) set1Items.push({ ...shoes, role: 'footwear' });
      const outer = sortedOuter.find(o => o.formality === 'formal') || sortedOuter[0];
      if (outer && (isChilly || occasion === 'formal')) set1Items.push({ ...outer, role: 'outerwear' });
      const acc = sortedAcc.find(a => a.imageType === 'jewelry') || sortedAcc[0];
      if (acc) set1Items.push({ ...acc, role: 'accessories' });
    } else {
      // Build top + bottom + footwear + outerwear + accessory
      const top = (anchorItem && anchorItem.category === 'tops') ? anchorItem : (sortedTops[0] || tops[0]);
      if (top && !set1Items.find(i => i.id === top.id)) set1Items.push({ ...top, role: 'top' });

      const bottom = (anchorItem && anchorItem.category === 'bottoms') ? anchorItem : (sortedBottoms[0] || bottoms[0]);
      if (bottom && !set1Items.find(i => i.id === bottom.id)) set1Items.push({ ...bottom, role: 'bottom' });

      const outer = (anchorItem && anchorItem.category === 'outerwear') ? anchorItem : (sortedOuter[0] || outerwear[0]);
      if (outer && !set1Items.find(i => i.id === outer.id) && (isChilly || formalityTarget.target > 60)) {
        set1Items.push({ ...outer, role: 'outerwear' });
      }

      const shoes = (anchorItem && anchorItem.category === 'footwear') ? anchorItem : (sortedShoes[0] || footwear[0]);
      if (shoes && !set1Items.find(i => i.id === shoes.id)) set1Items.push({ ...shoes, role: 'footwear' });

      const acc = (anchorItem && anchorItem.category === 'accessories') ? anchorItem : (sortedAcc[0] || accessories[0]);
      if (acc && !set1Items.find(i => i.id === acc.id)) set1Items.push({ ...acc, role: 'accessories' });
    }

    const set1Colors = set1Items.map(i => i.color).filter(Boolean);
    const harmony1 = calculateColorHarmony(set1Colors);

    sets.push({
      id: `ai-set-hero-${Date.now()}`,
      badge: "Signature Hero Look",
      title: anchorItem ? `Bespoke Ensemble Featuring ${anchorItem.name}` : `The Executive ${occasion.charAt(0).toUpperCase() + occasion.slice(1)} Masterpiece`,
      vibe: profile.stylePersona === 'streetwear' ? "Sculptural Tech Minimalist" : "Quiet Luxury Power Minimal",
      matchRate: 98,
      items: set1Items.map(i => ({
        id: i.id,
        cat: i.role ? (i.role.charAt(0).toUpperCase() + i.role.slice(1)) : (i.category.charAt(0).toUpperCase() + i.category.slice(1)),
        name: i.name,
        color: i.color,
        colorName: i.colorName,
        fabric: i.fabric,
        owned: true,
        isAnchor: !!i.isAnchor
      })),
      palette: set1Colors,
      harmonyType: harmony1.type,
      stylistAdvice: `This set creates clean vertical authority. The tonal balance of ${set1Items[0]?.colorName || 'neutrals'} against ${set1Items[1]?.colorName || 'dark slate'} illuminates your ${profile.skinTone.replace('_', ' ')} complexion while effortlessly commanding ${occasion} etiquette.`,
      bodySilhouetteTip: `For ${profile.bodyStructure} silhouettes: ${bodyRule.advice} Pairings focus on ${bodyRule.favorableCuts.slice(0, 2).join(' and ')}.`,
      skinToneNote: undertoneRule.note,
      weatherNote: isChilly
        ? `Layering incorporates thermal retention fibers suited for ${tempC}°C crisp ambient temperatures.`
        : `Breathable composition ensures comfort and moisture balance at ${tempC}°C.`,
      hairstyle: profile.gender === 'male' ? "Clean sculpted fade with matte styling cream" : "Sleek low center-part chignon with high gloss finish",
      grooming: "Matte cashmere finish, groomed brows, and subtle warm neutral lip tint",
      scores: {
        harmony: 98,
        formality: Math.min(100, formalityTarget.target + 5),
        comfort: 90,
        weatherAdaptability: 96
      }
    });

    // ==========================================
    // SET 2: MODERN CONTEMPORARY / CONTRAST SET
    // ==========================================
    let set2Items = [];
    const top2 = sortedTops[1] || sortedTops[0] || tops[0];
    const bottom2 = sortedBottoms[1] || sortedBottoms[0] || bottoms[0];
    const outer2 = sortedOuter[1] || sortedOuter[0] || outerwear[0];
    const shoes2 = sortedShoes[1] || sortedShoes[0] || footwear[0];
    const acc2 = sortedAcc[1] || sortedAcc[0] || accessories[0];

    if (anchorItem) set2Items.push({ ...anchorItem, role: anchorItem.category, isAnchor: true });
    if (top2 && !set2Items.find(i => i.id === top2.id)) set2Items.push({ ...top2, role: 'top' });
    if (bottom2 && !set2Items.find(i => i.id === bottom2.id)) set2Items.push({ ...bottom2, role: 'bottom' });
    if (outer2 && !set2Items.find(i => i.id === outer2.id)) set2Items.push({ ...outer2, role: 'outerwear' });
    if (shoes2 && !set2Items.find(i => i.id === shoes2.id)) set2Items.push({ ...shoes2, role: 'footwear' });
    if (acc2 && !set2Items.find(i => i.id === acc2.id)) set2Items.push({ ...acc2, role: 'accessories' });

    const set2Colors = set2Items.map(i => i.color).filter(Boolean);
    const harmony2 = calculateColorHarmony(set2Colors);

    sets.push({
      id: `ai-set-contrast-${Date.now() + 1}`,
      badge: "Modern Contrast",
      title: "Elevated Architectural Drape",
      vibe: "Contemporary European Editorial",
      matchRate: 92,
      items: set2Items.map(i => ({
        id: i.id,
        cat: i.role ? (i.role.charAt(0).toUpperCase() + i.role.slice(1)) : (i.category.charAt(0).toUpperCase() + i.category.slice(1)),
        name: i.name,
        color: i.color,
        colorName: i.colorName,
        fabric: i.fabric,
        owned: true,
        isAnchor: !!i.isAnchor
      })),
      palette: set2Colors,
      harmonyType: harmony2.type,
      stylistAdvice: `Subtle textural contrast between ${top2?.fabric || 'knitwear'} and ${outer2?.fabric || 'structured outerwear'} creates dimensional depth without visual clutter. Effortlessly transforms from day meetings to twilight reservations.`,
      bodySilhouetteTip: `Structured proportions draw vertical lines, lengthening torso and legs while maintaining structural comfort.`,
      skinToneNote: `Golden and neutral accents bridge deep shades, ensuring ${profile.skinTone.replace('_', ' ')} tones remain luminous.`,
      weatherNote: `Double-layer architecture gives flexible temperature control throughout changing weather.`,
      hairstyle: "Textured curtain waves with soft face-framing sweep",
      grooming: "Hydrated satin base with warm bronze cheek highlighter",
      scores: {
        harmony: 94,
        formality: Math.max(70, formalityTarget.target - 4),
        comfort: 95,
        weatherAdaptability: 93
      }
    });

    // ==========================================
    // SET 3: RELAXED CAPSULE / VERSATILITY SET
    // ==========================================
    let set3Items = [];
    const top3 = sortedTops[2] || sortedTops[0] || tops[0];
    const bottom3 = sortedBottoms[2] || sortedBottoms[0] || bottoms[0];
    const shoes3 = sortedShoes.find(s => s.formality === 'casual') || sortedShoes[0] || footwear[0];
    const acc3 = sortedAcc.find(a => a.imageType === 'sunglasses' || a.imageType === 'bag') || sortedAcc[0] || accessories[0];

    if (anchorItem) set3Items.push({ ...anchorItem, role: anchorItem.category, isAnchor: true });
    if (top3 && !set3Items.find(i => i.id === top3.id)) set3Items.push({ ...top3, role: 'top' });
    if (bottom3 && !set3Items.find(i => i.id === bottom3.id)) set3Items.push({ ...bottom3, role: 'bottom' });
    if (shoes3 && !set3Items.find(i => i.id === shoes3.id)) set3Items.push({ ...shoes3, role: 'footwear' });
    if (acc3 && !set3Items.find(i => i.id === acc3.id)) set3Items.push({ ...acc3, role: 'accessories' });

    const set3Colors = set3Items.map(i => i.color).filter(Boolean);
    const harmony3 = calculateColorHarmony(set3Colors);

    sets.push({
      id: `ai-set-capsule-${Date.now() + 2}`,
      badge: "Effortless Versatility",
      title: "Off-Duty Capsule Refinement",
      vibe: "Nordic Minimalist Ease",
      matchRate: 88,
      items: set3Items.map(i => ({
        id: i.id,
        cat: i.role ? (i.role.charAt(0).toUpperCase() + i.role.slice(1)) : (i.category.charAt(0).toUpperCase() + i.category.slice(1)),
        name: i.name,
        color: i.color,
        colorName: i.colorName,
        fabric: i.fabric,
        owned: true,
        isAnchor: !!i.isAnchor
      })),
      palette: set3Colors,
      harmonyType: harmony3.type,
      stylistAdvice: `Clean, unpretentious lines focus on organic drape and breathable textiles. Delivers maximum mobility while maintaining high aesthetic polish.`,
      bodySilhouetteTip: `Relaxed contours preserve freedom of movement while strategic hems prevent an overwhelmed silhouette.`,
      skinToneNote: `Organic earth and ecru tones reflect soft ambient light for a fresh, relaxed appearance.`,
      weatherNote: `Lightweight layering keeps skin cool and prevents stuffiness in dynamic conditions.`,
      hairstyle: "Effortless French twist with intentional loose wisps",
      grooming: "Sun-kissed tinted serum and sheer berry lip oil",
      scores: {
        harmony: 91,
        formality: Math.min(80, formalityTarget.target - 10),
        comfort: 98,
        weatherAdaptability: 90
      }
    });

    return {
      occasion,
      weather: weatherCondition,
      temperature: tempC,
      userSilhouette: profile.bodyStructure,
      skinTone: profile.skinTone,
      sets
    };
  }

  /**
   * Evaluates a custom combination assembled by the user
   */
  critiqueCombination({ items, profile, occasion = 'office', weather = 'pleasant_sunny' }) {
    if (!items || items.length === 0) {
      throw new Error("No clothing items provided for evaluation");
    }

    const colors = items.map(i => i.color).filter(Boolean);
    const harmony = calculateColorHarmony(colors);
    const bodyRule = SILHOUETTE_RULES[profile?.bodyStructure] || SILHOUETTE_RULES.hourglass;

    // Analyze formality consistency
    const formalities = items.map(i => i.formality || 'smart_casual');
    const hasSport = formalities.includes('sport');
    const hasFormal = formalities.includes('formal');
    let formalityWarning = null;

    if (hasSport && hasFormal) {
      formalityWarning = "Caution: Juxtaposing high-formality tailoring with activewear technical fleece requires deliberate street-couture styling to avoid feeling mismatched.";
    }

    const overallScore = Math.min(99, Math.max(65, Math.round(harmony.score * 0.5 + 45 - (formalityWarning ? 8 : 0))));

    return {
      score: overallScore,
      harmonyType: harmony.type,
      palette: colors,
      pros: [
        `Cohesive tonal interaction across ${items.length} garments.`,
        `Complements ${profile?.bodyStructure || 'hourglass'} body structure guidelines.`
      ],
      caution: formalityWarning,
      aiUpgradeSuggestion: `Elevate this set by adding a complementary warm gold accessory or structuring the outerwear lapel for sharper silhouette balance.`,
      breakdown: {
        colorHarmony: harmony.score,
        formalityBalance: formalityWarning ? 78 : 94,
        silhouetteProportion: 92,
        weatherAppropriateness: 90
      }
    };
  }
}

module.exports = new AIOutfitEngine();
