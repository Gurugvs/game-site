const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Paths
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'games.json');
const SEED_FILE = path.join(__dirname, 'public', 'games.json');

// Detect Netlify environment
const IS_NETLIFY = process.env.NETLIFY === 'true' || !!process.env.NETLIFY_DEV;

let blobStore = null;
if (IS_NETLIFY) {
    try {
        const { getStore } = require('@netlify/blobs');
        blobStore = getStore('gamevault-store');
        console.log('Netlify environment detected. Initialized Netlify Blobs Store.');
    } catch (e) {
        console.error('Failed to initialize Netlify Blobs. Storage will fallback to seed files.', e);
    }
}

// Seed helper
function loadSeedData() {
    try {
        if (fs.existsSync(SEED_FILE)) {
            return JSON.parse(fs.readFileSync(SEED_FILE, 'utf8'));
        }
    } catch (e) {
        console.error('Failed to read seed file:', e);
    }
    return [];
}

// Local filesystem init database
function initLocalDatabase() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    if (!fs.existsSync(DATA_FILE)) {
        if (fs.existsSync(SEED_FILE)) {
            console.log('Seeding database from public/games.json...');
            try {
                fs.copyFileSync(SEED_FILE, DATA_FILE);
            } catch (err) {
                console.error('Failed to copy seed file:', err);
                fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 4));
            }
        } else {
            console.log('No seed file found. Initializing empty library...');
            fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 4));
        }
    }
}

if (!IS_NETLIFY) {
    initLocalDatabase();
}

// Unified async read function
async function readGames() {
    if (IS_NETLIFY && blobStore) {
        try {
            let games = await blobStore.getJSON('games');
            if (!games) {
                console.log('Seeding Netlify Blobs with default games list...');
                const seedData = loadSeedData();
                await blobStore.setJSON('games', seedData);
                return seedData;
            }
            return games;
        } catch (err) {
            console.error('Failed to read from Netlify Blobs:', err);
            return loadSeedData();
        }
    } else {
        // Local file read
        try {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Failed to read database file, returning seed data:', err);
            return loadSeedData();
        }
    }
}

// Unified async write function
async function writeGames(games) {
    if (IS_NETLIFY && blobStore) {
        try {
            await blobStore.setJSON('games', games);
            return true;
        } catch (err) {
            console.error('Failed to write to Netlify Blobs:', err);
            return false;
        }
    } else {
        // Local file write
        try {
            fs.writeFileSync(DATA_FILE, JSON.stringify(games, null, 4), 'utf8');
            return true;
        } catch (err) {
            console.error('Failed to write database file:', err);
            return false;
        }
    }
}

// Helper to validate and sanitize a game object
function sanitizeGame(g) {
    return {
        id: g.id || Date.now() + Math.floor(Math.random() * 1000),
        name: (g.name || 'Untitled Game').trim(),
        coverUrl: g.coverUrl || "",
        bannerUrl: g.bannerUrl || "",
        genre: g.genre || "Action",
        subgenre: g.subgenre || "",
        platform: g.platform || "PC",
        store: g.store || "",
        developer: g.developer || "",
        publisher: g.publisher || "",
        releaseDate: g.releaseDate || "",
        engine: g.engine || "",
        version: g.version || "",
        language: g.language || "",
        size: parseFloat(g.size) || 0,
        rating: parseFloat(g.rating) || 0,
        playtime: parseInt(g.playtime) || 0,
        status: ["Wishlist", "Backlog", "Playing", "Completed"].includes(g.status) ? g.status : "Backlog",
        installed: !!g.installed,
        completed: !!g.completed,
        favorite: !!g.favorite,
        websiteUrl: g.websiteUrl || "",
        trailerUrl: g.trailerUrl || "",
        downloadUrl: g.downloadUrl || "",
        description: g.description || "",
        notes: g.notes || "",
        tags: g.tags || "",
        minRequirements: g.minRequirements || { os: "", cpu: "", ram: "", gpu: "", storage: "" },
        recRequirements: g.recRequirements || { os: "", cpu: "", ram: "", gpu: "", storage: "" },
        addedAt: g.addedAt || new Date().toISOString()
    };
}

// REST API Endpoints

// 1. Get all games
app.get('/api/games', async (req, res) => {
    const games = await readGames();
    res.json(games);
});

// 2. Add a new game
app.post('/api/games', async (req, res) => {
    const newGameData = req.body;
    if (!newGameData.name) {
        return res.status(400).json({ error: 'Game name is required' });
    }
    
    const games = await readGames();
    const sanitized = sanitizeGame(newGameData);
    
    sanitized.id = Date.now() + Math.floor(Math.random() * 100);
    sanitized.addedAt = new Date().toISOString();
    
    games.push(sanitized);
    
    if (await writeGames(games)) {
        res.status(201).json(sanitized);
    } else {
        res.status(500).json({ error: 'Failed to write data' });
    }
});

// 3. Update a game
app.put('/api/games/:id', async (req, res) => {
    const gameId = parseInt(req.params.id);
    const updatedData = req.body;
    
    const games = await readGames();
    const index = games.findIndex(g => g.id === gameId);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Game not found' });
    }
    
    const sanitized = sanitizeGame({ ...updatedData, id: gameId });
    sanitized.addedAt = games[index].addedAt || sanitized.addedAt;
    
    games[index] = sanitized;
    
    if (await writeGames(games)) {
        res.json(sanitized);
    } else {
        res.status(500).json({ error: 'Failed to write data' });
    }
});

// 4. Delete a game
app.delete('/api/games/:id', async (req, res) => {
    const gameId = parseInt(req.params.id);
    const games = await readGames();
    const initialLength = games.length;
    const filtered = games.filter(g => g.id !== gameId);
    
    if (filtered.length === initialLength) {
        return res.status(404).json({ error: 'Game not found' });
    }
    
    if (await writeGames(filtered)) {
        res.json({ success: true, deletedId: gameId });
    } else {
        res.status(500).json({ error: 'Failed to write data' });
    }
});

// 5. Reset database to sample seed data
app.post('/api/games/reset', async (req, res) => {
    const seedData = loadSeedData();
    if (await writeGames(seedData)) {
        res.json(seedData);
    } else {
        res.status(500).json({ error: 'Failed to reset database' });
    }
});

// 6. Wipe database (clear all)
app.post('/api/games/wipe', async (req, res) => {
    if (await writeGames([])) {
        res.json({ success: true });
    } else {
        res.status(500).json({ error: 'Failed to wipe database' });
    }
});

// 7. Bulk import / overwrite games
app.post('/api/games/import', async (req, res) => {
    const importedGames = req.body;
    if (!Array.isArray(importedGames)) {
        return res.status(400).json({ error: 'Import data must be an array' });
    }
    
    const games = await readGames();
    let addedCount = 0;
    let updatedCount = 0;
    
    importedGames.forEach(importedGame => {
        if (!importedGame.name) return;
        
        const existingIndex = games.findIndex(g => g.name.toLowerCase() === importedGame.name.toLowerCase());
        const sanitized = sanitizeGame(importedGame);
        
        if (existingIndex !== -1) {
            sanitized.id = games[existingIndex].id;
            sanitized.addedAt = games[existingIndex].addedAt || sanitized.addedAt;
            games[existingIndex] = sanitized;
            updatedCount++;
        } else {
            games.push(sanitized);
            addedCount++;
        }
    });
    
    if (await writeGames(games)) {
        res.json({ success: true, addedCount, updatedCount, games });
    } else {
        res.status(500).json({ error: 'Failed to save imported games' });
    }
});

// 7b. Full database restore (replaces all games)
app.post('/api/games/restore', async (req, res) => {
    const gamesToRestore = req.body;
    if (!Array.isArray(gamesToRestore)) {
        return res.status(400).json({ error: 'Restore data must be an array' });
    }
    
    const sanitizedGames = gamesToRestore.map(g => sanitizeGame(g));
    
    if (await writeGames(sanitizedGames)) {
        res.json({ success: true, count: sanitizedGames.length, games: sanitizedGames });
    } else {
        res.status(500).json({ error: 'Failed to write restore data' });
    }
});

// 8. Admin login validation
app.post('/api/auth/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, isAdmin: true });
    } else {
        res.status(401).json({ success: false, error: 'Incorrect password' });
    }
});

// Serve frontend static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve the frontend homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server locally if not running on Netlify
if (!IS_NETLIFY) {
    app.listen(PORT, () => {
        console.log(`==================================================`);
        console.log(`  GameVault Backend Server running on port ${PORT}`);
        console.log(`  Access dashboard: http://localhost:${PORT}`);
        console.log(`==================================================`);
    });
}

// Export app for serverless function use
module.exports = app;
