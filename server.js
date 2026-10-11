// StyleMate Backend Server
// Express REST API + Static Asset Serving for AI Fashion Assistant

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./backend/database');
const aiEngine = require('./backend/aiEngine');

const app = express();
const PORT = process.env.PORT || 3456;

app.use(cors());
app.use(express.json());

// Serve static frontend files (HTML, CSS, JS, Assets)
app.use(express.static(__dirname));

// Auth Middleware: Extracts user from Bearer Token
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // If not supplied, fallback to default user (Elena) for seamless experience
    req.user = db.getUserById('user-elena');
    return next();
  }

  const token = authHeader.split(' ')[1];
  const user = db.getUserByToken(token);
  if (!user) {
    req.user = db.getUserById('user-elena');
    return next();
  }

  req.user = user;
  next();
}

// Strict Auth Middleware (requires valid user)
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Authentication token required" });
  }

  const token = authHeader.split(' ')[1];
  const user = db.getUserByToken(token);
  if (!user) {
    return res.status(401).json({ error: "Invalid or expired session token" });
  }

  req.user = user;
  next();
}

// ==========================================
// 1. HEALTH & STATUS ENDPOINTS
// ==========================================
app.get('/api/health', (req, res) => {
  const data = db.read();
  res.json({
    status: 'ok',
    system: 'StyleMate Couture Intelligence Engine 2.5',
    uptime: process.uptime(),
    activeUsersCount: data.users ? data.users.length : 0,
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// 2. AUTHENTICATION & PROFILE ENDPOINTS
// ==========================================

// Register new user
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, profile } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const newUser = db.createUser({ name, email, password, profile });
    res.status(201).json({
      message: "Account registered successfully",
      token: newUser.token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        tier: newUser.tier,
        styleStreak: newUser.styleStreak,
        profile: newUser.profile,
        wardrobeCount: newUser.wardrobe.length
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Registration failed" });
  }
});

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = db.authenticate(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password credentials" });
    }

    res.json({
      message: "Login successful",
      token: user.token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tier: user.tier,
        styleStreak: user.styleStreak,
        profile: user.profile,
        wardrobe: user.wardrobe,
        savedSets: user.savedSets || []
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Login server error" });
  }
});

// Current Authenticated User (Profile & Session)
app.get('/api/auth/me', authMiddleware, (req, res) => {
  if (!req.user) {
    return res.status(404).json({ error: "User session not found" });
  }

  res.json({
    token: req.user.token,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      tier: req.user.tier,
      styleStreak: req.user.styleStreak,
      profile: req.user.profile,
      wardrobeCount: req.user.wardrobe.length,
      savedSetsCount: (req.user.savedSets || []).length
    }
  });
});

// Update Profile
app.put('/api/auth/profile', authMiddleware, (req, res) => {
  try {
    const updated = db.updateProfile(req.user.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      message: "Profile updated successfully",
      profile: updated.profile,
      name: updated.name
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 1-Click Persona Switcher (Instant seamless backend auth)
app.post('/api/auth/switch-demo', (req, res) => {
  const { persona } = req.body;
  const personaMap = {
    elena: 'user-elena',
    marcus: 'user-marcus',
    aria: 'user-aria'
  };

  const userId = personaMap[persona] || 'user-elena';
  const user = db.getUserById(userId);

  if (!user) {
    return res.status(404).json({ error: "Persona not found" });
  }

  res.json({
    message: `Switched to ${user.name} session`,
    token: user.token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      tier: user.tier,
      styleStreak: user.styleStreak,
      profile: user.profile,
      wardrobe: user.wardrobe,
      savedSets: user.savedSets || []
    }
  });
});

// ==========================================
// 3. AI SET COMBINATIONS ENGINE ENDPOINTS
// ==========================================

// Generate complete AI combination sets
app.post('/api/ai/combinations/generate', authMiddleware, (req, res) => {
  try {
    const { occasion, weather, anchorItemId, styleVibe } = req.body;
    const user = req.user;

    const result = aiEngine.generateCombinationSets({
      wardrobe: user.wardrobe,
      profile: user.profile,
      occasion: occasion || 'office',
      weather: weather || 'pleasant_sunny',
      anchorItemId: anchorItemId || null,
      styleVibe: styleVibe || user.profile.stylePersona
    });

    res.json(result);
  } catch (err) {
    console.error("AI Generation Error:", err);
    res.status(500).json({ error: err.message || "Failed to generate outfit sets" });
  }
});

// Critique user-assembled combination
app.post('/api/ai/combinations/critique', authMiddleware, (req, res) => {
  try {
    const { itemIds, occasion, weather } = req.body;
    const user = req.user;

    if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
      return res.status(400).json({ error: "Item IDs array required for critique" });
    }

    const items = user.wardrobe.filter(item => itemIds.includes(item.id));
    const critique = aiEngine.critiqueCombination({
      items,
      profile: user.profile,
      occasion: occasion || 'office',
      weather: weather || 'pleasant_sunny'
    });

    res.json(critique);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to critique outfit set" });
  }
});

// ==========================================
// 4. DIGITAL CLOSET (WARDROBE) ENDPOINTS
// ==========================================

// Get user wardrobe
app.get('/api/wardrobe', authMiddleware, (req, res) => {
  res.json({
    wardrobe: req.user.wardrobe,
    totalPieces: req.user.wardrobe.length
  });
});

// Add new piece to wardrobe
app.post('/api/wardrobe/items', authMiddleware, (req, res) => {
  try {
    const item = req.body;
    if (!item.name || !item.category) {
      return res.status(400).json({ error: "Garment name and category are required" });
    }

    const newItem = db.addWardrobeItem(req.user.id, item);
    res.status(201).json({
      message: "Garment added to digital closet",
      item: newItem
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete piece from wardrobe
app.delete('/api/wardrobe/items/:id', authMiddleware, (req, res) => {
  const success = db.deleteWardrobeItem(req.user.id, req.params.id);
  if (!success) {
    return res.status(404).json({ error: "Item not found in closet" });
  }
  res.json({ message: "Garment deleted from closet" });
});

// Record piece worn & increment streak
app.post('/api/wardrobe/items/:id/wear', authMiddleware, (req, res) => {
  const result = db.recordItemWorn(req.user.id, req.params.id);
  if (!result) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json({
    message: "Wear recorded! Style streak updated 🔥",
    timesWorn: result.item.timesWorn,
    styleStreak: result.streak
  });
});

// ==========================================
// 5. SAVED OUTFIT SETS & LOOKBOOK ENDPOINTS
// ==========================================

// Get saved outfit combination sets
app.get('/api/outfit-sets', authMiddleware, (req, res) => {
  res.json({
    savedSets: req.user.savedSets || []
  });
});

// Save an outfit combination set
app.post('/api/outfit-sets', authMiddleware, (req, res) => {
  try {
    const outfitSet = req.body;
    if (!outfitSet.title || !outfitSet.items) {
      return res.status(400).json({ error: "Set title and items required" });
    }

    const saved = db.saveOutfitSet(req.user.id, outfitSet);
    res.status(201).json({
      message: "Outfit set saved to capsule lookbook",
      outfitSet: saved
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a saved outfit set
app.delete('/api/outfit-sets/:id', authMiddleware, (req, res) => {
  const success = db.deleteOutfitSet(req.user.id, req.params.id);
  if (!success) {
    return res.status(404).json({ error: "Saved set not found" });
  }
  res.json({ message: "Set removed from lookbook" });
});

// Catch-all fallback for single page app
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`✨ StyleMate AI Couture Server listening on port ${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}/index.html`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`🤖 AI Set Engine: http://localhost:${PORT}/api/ai/combinations/generate`);
  console.log(`=======================================================`);
});
