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

// Ensure data folder and games.json exist
function initDatabase() {
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

initDatabase();

// Helper to read games
function readGames() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Failed to read database file, returning empty array:', err);
        return [];
    }
}

// Helper to write games
function writeGames(games) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(games, null, 4), 'utf8');
        return true;
    } catch (err) {
        console.error('Failed to write database file:', err);
        return false;
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
app.get('/api/games', (req, res) => {
    const games = readGames();
    res.json(games);
});

// 2. Add a new game
app.post('/api/games', (req, res) => {
    const newGameData = req.body;
    if (!newGameData.name) {
        return res.status(400).json({ error: 'Game name is required' });
    }
    
    const games = readGames();
    const sanitized = sanitizeGame(newGameData);
    
    // Explicitly set ID as unique timestamp
    sanitized.id = Date.now() + Math.floor(Math.random() * 100);
    sanitized.addedAt = new Date().toISOString();
    
    games.push(sanitized);
    
    if (writeGames(games)) {
        res.status(201).json(sanitized);
    } else {
        res.status(500).json({ error: 'Failed to write database file' });
    }
});

// 3. Update a game
app.put('/api/games/:id', (req, res) => {
    const gameId = parseInt(req.params.id);
    const updatedData = req.body;
    
    const games = readGames();
    const index = games.findIndex(g => g.id === gameId);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Game not found' });
    }
    
    const sanitized = sanitizeGame({ ...updatedData, id: gameId });
    sanitized.addedAt = games[index].addedAt || sanitized.addedAt;
    
    games[index] = sanitized;
    
    if (writeGames(games)) {
        res.json(sanitized);
    } else {
        res.status(500).json({ error: 'Failed to write database file' });
    }
});

// 4. Delete a game
app.delete('/api/games/:id', (req, res) => {
    const gameId = parseInt(req.params.id);
    const games = readGames();
    const initialLength = games.length;
    const filtered = games.filter(g => g.id !== gameId);
    
    if (filtered.length === initialLength) {
        return res.status(404).json({ error: 'Game not found' });
    }
    
    if (writeGames(filtered)) {
        res.json({ success: true, deletedId: gameId });
    } else {
        res.status(500).json({ error: 'Failed to write database file' });
    }
});

// 5. Reset database to sample seed data
app.post('/api/games/reset', (req, res) => {
    if (fs.existsSync(SEED_FILE)) {
        try {
            fs.copyFileSync(SEED_FILE, DATA_FILE);
            const games = readGames();
            res.json(games);
        } catch (err) {
            console.error('Failed to copy seed file during reset:', err);
            res.status(500).json({ error: 'Failed to copy seed file during database reset' });
        }
    } else {
        res.status(404).json({ error: 'Seed file not found' });
    }
});

// 6. Wipe database (clear all)
app.post('/api/games/wipe', (req, res) => {
    if (writeGames([])) {
        res.json({ success: true });
    } else {
        res.status(500).json({ error: 'Failed to wipe database' });
    }
});

// 7. Bulk import / overwrite games
app.post('/api/games/import', (req, res) => {
    const importedGames = req.body;
    if (!Array.isArray(importedGames)) {
        return res.status(400).json({ error: 'Import data must be an array' });
    }
    
    const games = readGames();
    let addedCount = 0;
    let updatedCount = 0;
    
    importedGames.forEach(importedGame => {
        if (!importedGame.name) return; // Skip invalid entries
        
        const existingIndex = games.findIndex(g => g.name.toLowerCase() === importedGame.name.toLowerCase());
        const sanitized = sanitizeGame(importedGame);
        
        if (existingIndex !== -1) {
            // Keep the original ID and addedAt timestamp
            sanitized.id = games[existingIndex].id;
            sanitized.addedAt = games[existingIndex].addedAt || sanitized.addedAt;
            games[existingIndex] = sanitized;
            updatedCount++;
        } else {
            games.push(sanitized);
            addedCount++;
        }
    });
    
    if (writeGames(games)) {
        res.json({ success: true, addedCount, updatedCount, games });
    } else {
        res.status(500).json({ error: 'Failed to save imported games to database' });
    }
});

// 7b. Full database restore (replaces all games)
app.post('/api/games/restore', (req, res) => {
    const gamesToRestore = req.body;
    if (!Array.isArray(gamesToRestore)) {
        return res.status(400).json({ error: 'Restore data must be an array' });
    }
    
    const sanitizedGames = gamesToRestore.map(g => sanitizeGame(g));
    
    if (writeGames(sanitizedGames)) {
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

// Start Server
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`  GameVault Backend Server running on port ${PORT}`);
    console.log(`  Access dashboard: http://localhost:${PORT}`);
    console.log(`==================================================`);
});
