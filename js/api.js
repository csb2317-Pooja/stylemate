// StyleMate Backend API Client
// Handles Authentication, Digital Closet Sync, and AI Outfit Combinations Engine

const API_BASE = window.location.origin;

class StyleMateAPI {
  constructor() {
    this.token = localStorage.getItem('stylemate_auth_token') || 'token-elena-session-vip';
    this.isOnline = false;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('stylemate_auth_token', token);
    } else {
      localStorage.removeItem('stylemate_auth_token');
    }
  }

  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/api/health`);
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch (e) {
      this.isOnline = false;
    }
    return { status: 'offline' };
  }

  // --- Auth APIs ---

  async register(name, email, password, profile) {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, profile })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    if (data.token) this.setToken(data.token);
    return data;
  }

  async login(email, password) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    if (data.token) this.setToken(data.token);
    return data;
  }

  async getMe() {
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: this.getHeaders()
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API getMe offline, using fallback state');
    }
    return null;
  }

  async updateProfile(profileUpdates) {
    const res = await fetch(`${API_BASE}/api/auth/profile`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(profileUpdates)
    });
    return await res.json();
  }

  async switchDemoPersona(persona) {
    const res = await fetch(`${API_BASE}/api/auth/switch-demo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ persona })
    });
    const data = await res.json();
    if (data.token) this.setToken(data.token);
    return data;
  }

  logout() {
    this.setToken(null);
  }

  // --- Digital Closet APIs ---

  async getWardrobe() {
    try {
      const res = await fetch(`${API_BASE}/api/wardrobe`, {
        headers: this.getHeaders()
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Wardrobe fetch fallback');
    }
    return null;
  }

  async addWardrobeItem(item) {
    const res = await fetch(`${API_BASE}/api/wardrobe/items`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(item)
    });
    return await res.json();
  }

  async deleteWardrobeItem(itemId) {
    const res = await fetch(`${API_BASE}/api/wardrobe/items/${itemId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return await res.json();
  }

  async recordItemWorn(itemId) {
    const res = await fetch(`${API_BASE}/api/wardrobe/items/${itemId}/wear`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    return await res.json();
  }

  // --- AI Set Combinations APIs ---

  async generateCombinations({ occasion, weather, anchorItemId, styleVibe }) {
    const res = await fetch(`${API_BASE}/api/ai/combinations/generate`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ occasion, weather, anchorItemId, styleVibe })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to generate combinations');
    return data;
  }

  async critiqueCombination({ itemIds, occasion, weather }) {
    const res = await fetch(`${API_BASE}/api/ai/combinations/critique`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ itemIds, occasion, weather })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to critique combination');
    return data;
  }

  // --- Saved Sets / Lookbook APIs ---

  async getSavedSets() {
    try {
      const res = await fetch(`${API_BASE}/api/outfit-sets`, {
        headers: this.getHeaders()
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Saved sets fallback');
    }
    return { savedSets: [] };
  }

  async saveOutfitSet(outfitSet) {
    const res = await fetch(`${API_BASE}/api/outfit-sets`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(outfitSet)
    });
    return await res.json();
  }

  async deleteOutfitSet(setId) {
    const res = await fetch(`${API_BASE}/api/outfit-sets/${setId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return await res.json();
  }
}

// Global API instance
const api = new StyleMateAPI();
