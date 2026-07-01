/* ==========================================================================
   GameVault - Main Application Logic
   Features: Local Storage, SheetJS (XLSX), Chart.js, Real-time Filters & Sort
   ========================================================================== */

// --- Default Categories & Platforms ---
const CATEGORIES = [
    "Action", "Adventure", "Anime", "JRPG", "RPG", "FPS", "TPS", "Open World",
    "Sandbox", "Simulation", "Sports", "Racing", "Fighting", "Strategy", "Puzzle",
    "Visual Novel", "MMORPG", "Survival", "Horror", "Indie", "Platformer"
];

const PLATFORMS = [
    "Steam", "Epic Games", "EA App", "Ubisoft Connect", "Battle.net", "GOG",
    "Xbox", "PlayStation", "Nintendo Switch", "Android", "iOS", "PC"
];

// --- 50 High-Quality Sample Games ---
const SAMPLE_GAMES = [
    {
        id: 1,
        name: "Elden Ring",
        coverUrl: "https://images.unsplash.com/photo-1655821888788-6107699e173b?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&w=1200&q=80",
        genre: "RPG",
        subgenre: "Action RPG, Souls-like",
        platform: "Steam",
        developer: "FromSoftware",
        publisher: "Bandai Namco",
        releaseDate: "2022-02-25",
        engine: "FromSoftware Engine",
        version: "v1.12.3",
        language: "English, Multilingual",
        size: 60.0,
        rating: 4.9,
        playtime: 142,
        status: "Completed",
        installed: true,
        completed: true,
        favorite: true,
        websiteUrl: "https://www.eldenring.com",
        trailerUrl: "https://www.youtube.com/embed/E3Huy2cdih0",
        description: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. An immersive dark-fantasy action RPG developed by FromSoftware and written in collaboration with George R.R. Martin.",
        notes: "Masterpiece. Defeated Malenia after 50 tries! The DLC Shadow of the Erdtree is incredibly difficult but absolutely beautiful.",
        tags: "Souls-like, Open World, Difficult, Dark Fantasy, GOTY",
        minRequirements: { os: "Windows 10", cpu: "Intel Core i5-8400 / AMD Ryzen 3 3300X", ram: "12 GB RAM", gpu: "NVIDIA GTX 1060 3GB / AMD RX 580", storage: "60 GB SSD" },
        recRequirements: { os: "Windows 10/11", cpu: "Intel Core i7-8700K / AMD Ryzen 5 3600X", ram: "16 GB RAM", gpu: "NVIDIA GTX 1070 8GB / AMD RX Vega 56", storage: "60 GB SSD" },
        addedAt: "2026-01-10T12:00:00.000Z"
    },
    {
        id: 2,
        name: "Cyberpunk 2077",
        coverUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        genre: "RPG",
        subgenre: "Action RPG, Cyberpunk",
        platform: "GOG",
        developer: "CD Projekt Red",
        publisher: "CD Projekt",
        releaseDate: "2020-12-10",
        engine: "REDengine 4",
        version: "v2.12",
        language: "English, French, German, Polish",
        size: 70.0,
        rating: 4.7,
        playtime: 98,
        status: "Completed",
        installed: true,
        completed: true,
        favorite: true,
        websiteUrl: "https://www.cyberpunk.net",
        trailerUrl: "https://www.youtube.com/embed/8X2kIfS6fb8",
        description: "Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Upgraded with next-gen features and free additional content.",
        notes: "With the 2.0 update and Phantom Liberty expansion, this game is finally what it was always meant to be. Incredible story and graphics with raytracing.",
        tags: "Sci-Fi, Cyberpunk, Open World, Story Rich, FPS",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i7-6700 / AMD Ryzen 5 1600", ram: "12 GB RAM", gpu: "NVIDIA GTX 1060 6GB / AMD RX 580", storage: "70 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-12700 / AMD Ryzen 7 7800X3D", ram: "16 GB RAM", gpu: "NVIDIA RTX 3070 / AMD RX 6800 XT", storage: "70 GB NVMe SSD" },
        addedAt: "2026-01-12T14:30:00.000Z"
    },
    {
        id: 3,
        name: "Red Dead Redemption 2",
        coverUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&w=1200&q=80",
        genre: "Adventure",
        subgenre: "Open World, Western",
        platform: "Steam",
        developer: "Rockstar Games",
        publisher: "Rockstar Games",
        releaseDate: "2018-10-26",
        engine: "RAGE",
        version: "v1.31",
        language: "English, Multilingual",
        size: 150.0,
        rating: 4.9,
        playtime: 165,
        status: "Completed",
        installed: true,
        completed: true,
        favorite: true,
        websiteUrl: "https://www.rockstargames.com/reddeadredemption2",
        trailerUrl: "https://www.youtube.com/embed/EAwWJyxeT78",
        description: "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive.",
        notes: "The most detailed open world ever created. Arthur Morgan is the best protagonist in gaming history. Cried at the ending.",
        tags: "Western, Open World, Story Rich, Realistic, Masterpiece",
        minRequirements: { os: "Windows 10", cpu: "Intel Core i5-2500K / AMD FX-6300", ram: "8 GB RAM", gpu: "NVIDIA GTX 770 2GB / AMD R9 280", storage: "150 GB HDD" },
        recRequirements: { os: "Windows 10/11", cpu: "Intel Core i7-4770K / AMD Ryzen 5 1500X", ram: "12 GB RAM", gpu: "NVIDIA GTX 1060 6GB / AMD RX 480 4GB", storage: "150 GB SSD" },
        addedAt: "2026-01-15T09:15:00.000Z"
    },
    {
        id: 4,
        name: "Ghost of Tsushima",
        coverUrl: "https://images.unsplash.com/photo-1524413840003-058749e36584?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
        genre: "Action",
        subgenre: "Open World, Samurai",
        platform: "Steam",
        developer: "Sucker Punch Productions",
        publisher: "PlayStation Publishing",
        releaseDate: "2024-05-16",
        engine: "Sucker Punch Engine",
        version: "v1.0.4",
        language: "English, Japanese, Multilingual",
        size: 75.0,
        rating: 4.8,
        playtime: 62,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: true,
        websiteUrl: "https://www.playstation.com/games/ghost-of-tsushima/",
        trailerUrl: "https://www.youtube.com/embed/m7FbfZ8-Wc8",
        description: "In the late 13th century, the Mongol empire has laid waste to entire nations along their campaign to conquer the East. Tsushima Island is all that stands between mainland Japan and a massive Mongol invasion fleet led by the ruthless and cunning general, Khotun Khan.",
        notes: "Stunning PC port! The combat is fluid, and the wind navigation mechanic is extremely immersive. Kurosawa mode is a neat touch.",
        tags: "Samurai, Open World, Action, Cinematic, Swords",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i3-7100 / AMD Ryzen 3 1200", ram: "8 GB RAM", gpu: "NVIDIA GTX 960 4GB / AMD RX 5500 XT", storage: "75 GB HDD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i5-8600 / AMD Ryzen 5 3600", ram: "16 GB RAM", gpu: "NVIDIA RTX 2060 / AMD RX 5600 XT", storage: "75 GB SSD" },
        addedAt: "2026-01-20T16:20:00.000Z"
    },
    {
        id: 5,
        name: "Black Myth: Wukong",
        coverUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
        genre: "Action",
        subgenre: "Action RPG, Mythology",
        platform: "Steam",
        developer: "Game Science",
        publisher: "Game Science",
        releaseDate: "2024-08-20",
        engine: "Unreal Engine 5",
        version: "v1.0.8",
        language: "English, Chinese, Multilingual",
        size: 130.0,
        rating: 4.8,
        playtime: 45,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: true,
        websiteUrl: "https://www.heishenhua.com",
        trailerUrl: "https://www.youtube.com/embed/O2nN27nItbc",
        description: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. The story is based on Journey to the West, one of the Four Great Classical Novels of Chinese literature. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past.",
        notes: "Visuals are mindblowing in UE5. Boss designs are spectacular. Currently stuck on the Tiger Vanguard!",
        tags: "Action RPG, Souls-like, Mythology, Unreal Engine 5, Great Soundtrack",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-8400 / AMD Ryzen 5 1600", ram: "16 GB RAM", gpu: "NVIDIA GTX 1060 6GB / AMD RX 580 8GB", storage: "130 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-9700 / AMD Ryzen 5 5500", ram: "16 GB RAM", gpu: "NVIDIA RTX 2060 / AMD RX 5700 XT", storage: "130 GB SSD" },
        addedAt: "2026-01-22T10:05:00.000Z"
    },
    {
        id: 6,
        name: "Grand Theft Auto V",
        coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
        genre: "Action",
        subgenre: "Open World, Crime",
        platform: "Epic Games",
        developer: "Rockstar North",
        publisher: "Rockstar Games",
        releaseDate: "2015-04-14",
        engine: "RAGE",
        version: "v1.67",
        language: "English, Multilingual",
        size: 110.0,
        rating: 4.6,
        playtime: 250,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: false,
        websiteUrl: "https://www.rockstargames.com/gta-v",
        trailerUrl: "https://www.youtube.com/embed/QkkoHAzjnUs",
        description: "When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the underworld, the U.S. government and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody, least of all each other.",
        notes: "Classic. Played through the campaign three times. GTA Online was fun back in the day but now too grindy.",
        tags: "Open World, Action, Crime, Multiplayer, Comedy",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core 2 Quad Q6600 / AMD Phenom 9850", ram: "4 GB RAM", gpu: "NVIDIA 9800 GT 1GB / AMD HD 4870 1GB", storage: "110 GB HDD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i5 3470 / AMD FX-8350", ram: "8 GB RAM", gpu: "NVIDIA GTX 660 2GB / AMD HD 7870 2GB", storage: "110 GB SSD" },
        addedAt: "2026-01-25T11:40:00.000Z"
    },
    {
        id: 7,
        name: "Minecraft",
        coverUrl: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1607988795691-3d0147b43231?auto=format&fit=crop&w=1200&q=80",
        genre: "Sandbox",
        subgenre: "Survival, Building",
        platform: "PC",
        developer: "Mojang Studios",
        publisher: "Mojang Studios",
        releaseDate: "2011-11-18",
        engine: "Java",
        version: "v1.21",
        language: "English, Multilingual",
        size: 2.0,
        rating: 4.7,
        playtime: 520,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: true,
        websiteUrl: "https://www.minecraft.net",
        trailerUrl: "https://www.youtube.com/embed/MmB9b5njVbA",
        description: "Explore infinite worlds and build everything from the simplest of homes to the grandest of castles. Play in creative mode with unlimited resources or mine deep into the world in survival mode, crafting weapons and armor to fend off dangerous mobs.",
        notes: "Timeless game. Play it with friends on a private server. Heavily modded with shaders makes it look gorgeous.",
        tags: "Sandbox, Survival, Crafting, Multiplayer, Pixel Graphics",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i3-3210 / AMD A8-7600", ram: "4 GB RAM", gpu: "Intel HD 4000 / AMD Radeon R5", storage: "4 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i5-4690 / AMD A10-7800", ram: "8 GB RAM", gpu: "NVIDIA GeForce 700 Series / AMD Radeon Rx 200 Series", storage: "8 GB SSD" },
        addedAt: "2026-01-28T08:30:00.000Z"
    },
    {
        id: 8,
        name: "Forza Horizon 5",
        coverUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
        genre: "Racing",
        subgenre: "Open World, Arcade Racing",
        platform: "Xbox",
        developer: "Playground Games",
        publisher: "Xbox Game Studios",
        releaseDate: "2021-11-09",
        engine: "ForzaTech",
        version: "v1.634",
        language: "English, Multilingual",
        size: 130.0,
        rating: 4.5,
        playtime: 74,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: false,
        websiteUrl: "https://www.xbox.com/games/forza-horizon-5",
        trailerUrl: "https://www.youtube.com/embed/FYH98370yGD",
        description: "Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars.",
        notes: "Great game for relaxing and driving around. Beautiful Mexican scenery. The car sounds and physics are excellent.",
        tags: "Racing, Open World, Driving, Sports, Beautiful",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-4460 / AMD Ryzen 3 1200", ram: "8 GB RAM", gpu: "NVIDIA GTX 970 / AMD RX 470", storage: "130 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-10700 / AMD Ryzen 7 3800X", ram: "16 GB RAM", gpu: "NVIDIA RTX 3060 Ti / AMD RX 6700 XT", storage: "130 GB NVMe SSD" },
        addedAt: "2026-02-01T15:00:00.000Z"
    },
    {
        id: 9,
        name: "Hades II",
        coverUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=1200&q=80",
        genre: "Indie",
        subgenre: "Action, Roguelike",
        platform: "Steam",
        developer: "Supergiant Games",
        publisher: "Supergiant Games",
        releaseDate: "2024-05-06",
        engine: "Supergiant Custom Engine",
        version: "v0.92",
        language: "English, Multilingual",
        size: 10.0,
        rating: 4.8,
        playtime: 55,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: true,
        websiteUrl: "https://www.supergiantgames.com",
        trailerUrl: "https://www.youtube.com/embed/1vRzT4kGv98",
        description: "Battle beyond the Underworld using dark sorcery to confront the Titan of Time in this bewitching sequel to the award-winning rogue-like dungeon crawler. Melinoë, the Princess of the Underworld, must stop Chronos.",
        notes: "Phenomenal early access game. Melinoë plays very differently from Zagreus. The magic system is great.",
        tags: "Roguelike, Indie, Action, Mythology, Female Protagonist",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Dual Core 2.4 GHz", ram: "8 GB RAM", gpu: "GeForce GTX 950 / Radeon R7 360", storage: "10 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Quad Core 3.0 GHz", ram: "16 GB RAM", gpu: "GeForce RTX 2060 / Radeon RX 5600 XT", storage: "10 GB SSD" },
        addedAt: "2026-02-03T18:10:00.000Z"
    },
    {
        id: 10,
        name: "Valorant",
        coverUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&w=1200&q=80",
        genre: "FPS",
        subgenre: "Tactical Shooter",
        platform: "Epic Games",
        developer: "Riot Games",
        publisher: "Riot Games",
        releaseDate: "2020-06-02",
        engine: "Unreal Engine 4",
        version: "Patch 8.08",
        language: "English, Multilingual",
        size: 40.0,
        rating: 4.1,
        playtime: 380,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: false,
        websiteUrl: "https://playvalorant.com",
        trailerUrl: "https://www.youtube.com/embed/e_E9W2vsRbA",
        description: "VALORANT is a character-based 5v5 tactical shooter set on the global stage. Outplay, outwork, and outshine your competition with tactical abilities, precise gunplay, and adaptive teamwork.",
        notes: "My main competitive shooter. Currently ranked Platinum 2. Good gunplay but sometimes toxic matchmaking.",
        tags: "FPS, Tactical, Multiplayer, Competitive, Hero Shooter",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core 2 Duo E8400 / AMD Athlon 200GE", ram: "4 GB RAM", gpu: "Intel HD 4000 / AMD Radeon R5 200", storage: "40 GB HDD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i5-9400F / AMD Ryzen 5 2600X", ram: "8 GB RAM", gpu: "NVIDIA GTX 1050 Ti / AMD RX 570", storage: "40 GB SSD" },
        addedAt: "2026-02-05T12:00:00.000Z"
    },
    {
        id: 11,
        name: "Counter-Strike 2",
        coverUrl: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
        genre: "FPS",
        subgenre: "Tactical Shooter",
        platform: "Steam",
        developer: "Valve",
        publisher: "Valve",
        releaseDate: "2023-09-27",
        engine: "Source 2",
        version: "v2.0",
        language: "English, Multilingual",
        size: 35.0,
        rating: 4.3,
        playtime: 450,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: false,
        websiteUrl: "https://counter-strike.net",
        trailerUrl: "https://www.youtube.com/embed/c80JyColbI4",
        description: "Counter-Strike 2 is the largest technical leap forward in Counter-Strike’s history, enabling new features and updates for years to come. Built on the Source 2 engine, with upgraded graphics and volumetric smoke.",
        notes: "Replaced CS:GO. The smoke physics are incredible, but I miss some of the old maps.",
        tags: "FPS, Multiplayer, Tactical, Shooter, Competitive",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-750 / AMD Phenom II X4 965", ram: "8 GB RAM", gpu: "Hardware compatible with DirectX 11 & Shader Model 5.0", storage: "85 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-9700K / AMD Ryzen 7 3700X", ram: "16 GB RAM", gpu: "NVIDIA GTX 1080 / AMD RX 5700 XT", storage: "85 GB SSD" },
        addedAt: "2026-02-08T09:40:00.000Z"
    },
    {
        id: 12,
        name: "Marvel Rivals",
        coverUrl: "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=1200&q=80",
        genre: "Action",
        subgenre: "Hero Shooter",
        platform: "Steam",
        developer: "NetEase Games",
        publisher: "NetEase Games",
        releaseDate: "2024-12-06",
        engine: "Unreal Engine 5",
        version: "v1.0.2",
        language: "English, Multilingual",
        size: 50.0,
        rating: 4.4,
        playtime: 32,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: false,
        websiteUrl: "https://www.marvelrivals.com",
        trailerUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
        description: "Marvel Rivals is a cooperative, third-person hero shooter. Players select Marvel superheroes and villains to battle in fast-paced 6v6 matches across destructible environments.",
        notes: "Very fun. Playing as Iron Man or Spider-Man feels great. Destructible environments add a lot of strategy.",
        tags: "Hero Shooter, Multiplayer, Sci-Fi, Action, Comic Book",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-6600K / AMD Ryzen 5 1600", ram: "12 GB RAM", gpu: "NVIDIA GTX 1060 / AMD RX 580", storage: "70 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-10700K / AMD Ryzen 5 5600X", ram: "16 GB RAM", gpu: "NVIDIA RTX 3060 / AMD RX 6600 XT", storage: "70 GB SSD" },
        addedAt: "2026-02-10T11:15:00.000Z"
    },
    {
        id: 13,
        name: "League of Legends",
        coverUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
        genre: "Strategy",
        subgenre: "MOBA",
        platform: "PC",
        developer: "Riot Games",
        publisher: "Riot Games",
        releaseDate: "2009-10-27",
        engine: "Riot Custom Engine",
        version: "v14.10",
        language: "English, Multilingual",
        size: 16.0,
        rating: 4.0,
        playtime: 850,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: false,
        websiteUrl: "https://leagueoflegends.com",
        trailerUrl: "https://www.youtube.com/embed/mDYqT0_9VR4",
        description: "League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other's base. Choose from over 140 champions to make epic plays, secure kills, and take down towers.",
        notes: "Love-hate relationship with this game. Played since Season 5. Currently Gold 4.",
        tags: "MOBA, Strategy, Multiplayer, Competitive, PVP",
        minRequirements: { os: "Windows 10", cpu: "Intel Core i3-530 / AMD Phenom II X2 550", ram: "4 GB RAM", gpu: "NVIDIA GeForce 9600GT / AMD HD 4870", storage: "16 GB HDD" },
        recRequirements: { os: "Windows 10/11", cpu: "Intel Core i5-3300 / AMD FX-4350", ram: "8 GB RAM", gpu: "NVIDIA GTX 560 / AMD HD 6950", storage: "16 GB SSD" },
        addedAt: "2026-02-12T10:00:00.000Z"
    },
    {
        id: 14,
        name: "Genshin Impact",
        coverUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        genre: "Anime",
        subgenre: "Action RPG, Gacha",
        platform: "PC",
        developer: "miHoYo",
        publisher: "COGNOSPHERE (HoYoverse)",
        releaseDate: "2020-09-28",
        engine: "Unity",
        version: "v4.7",
        language: "English, Japanese, Chinese, Multilingual",
        size: 85.0,
        rating: 4.4,
        playtime: 320,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: false,
        websiteUrl: "https://genshin.hoyoverse.com",
        trailerUrl: "https://www.youtube.com/embed/HLUY1nIGQTY",
        description: "Step into Teyvat, a vast world teeming with life and flowing with elemental energy. You and your sibling arrived here from another world. Separated by an unknown god, stripped of your powers, and cast into a deep slumber, you now awake to a world very different from when you first arrived.",
        notes: "Beautiful anime visuals and combat. Exploring Fontaine has been amazing. F2P friendly if you save primogems.",
        tags: "Open World, Anime, RPG, Gacha, Fantasy",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5 / AMD Ryzen 5", ram: "8 GB RAM", gpu: "NVIDIA GTX 1030 / AMD RX 550", storage: "100 GB HDD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7 / AMD Ryzen 7", ram: "16 GB RAM", gpu: "NVIDIA GTX 1060 6GB / AMD RX 580 8GB", storage: "100 GB SSD" },
        addedAt: "2026-02-15T13:40:00.000Z"
    },
    {
        id: 15,
        name: "Zenless Zone Zero",
        coverUrl: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        genre: "Anime",
        subgenre: "Urban Action RPG",
        platform: "PC",
        developer: "miHoYo",
        publisher: "COGNOSPHERE (HoYoverse)",
        releaseDate: "2024-07-04",
        engine: "Unity",
        version: "v1.1",
        language: "English, Japanese, Chinese",
        size: 55.0,
        rating: 4.5,
        playtime: 48,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: true,
        websiteUrl: "https://zenless.hoyoverse.com",
        trailerUrl: "https://www.youtube.com/embed/1vRzT4kGv98",
        description: "Zenless Zone Zero is a brand-new urban fantasy action game from HoYoverse. In the story, contemporary civilization has been destroyed by a disaster known as Hollows. New Eridu has risen as the last bastion.",
        notes: "Extremely stylish hack-and-slash combat. The music and UI design are top tier.",
        tags: "Action, Anime, Urban Fantasy, Hack and Slash, Gacha",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5 7th Gen / AMD Ryzen 3 1200", ram: "8 GB RAM", gpu: "NVIDIA GTX 970 / AMD RX 560", storage: "60 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7 10th Gen / AMD Ryzen 5 3600", ram: "16 GB RAM", gpu: "NVIDIA GTX 1660 Super / AMD RX 580", storage: "60 GB SSD" },
        addedAt: "2026-02-18T14:10:00.000Z"
    },
    {
        id: 16,
        name: "Honkai: Star Rail",
        coverUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        genre: "Anime",
        subgenre: "Turn-based RPG",
        platform: "PC",
        developer: "miHoYo",
        publisher: "COGNOSPHERE (HoYoverse)",
        releaseDate: "2023-04-26",
        engine: "Unity",
        version: "v2.2",
        language: "English, Japanese, Chinese, Multilingual",
        size: 38.0,
        rating: 4.6,
        playtime: 145,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: false,
        websiteUrl: "https://hsr.hoyoverse.com",
        trailerUrl: "https://www.youtube.com/embed/w8vP1H6T7mQ",
        description: "Honkai: Star Rail is a turn-based space fantasy RPG. Embark on the Astral Express and experience the galaxy's infinite wonders on this journey filled with adventure and thrills.",
        notes: "Best turn-based combat in a gacha game. The story in Penacony has been absolutely phenomenal.",
        tags: "Turn-Based, Anime, Sci-Fi, Space, RPG",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i3 / AMD Ryzen 3", ram: "8 GB RAM", gpu: "NVIDIA GTX 650 / AMD HD 7750", storage: "40 GB HDD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7 / AMD Ryzen 5", ram: "16 GB RAM", gpu: "NVIDIA GTX 1060 6GB / AMD RX 580 8GB", storage: "40 GB SSD" },
        addedAt: "2026-02-20T11:00:00.000Z"
    },
    {
        id: 17,
        name: "Persona 5 Royal",
        coverUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        genre: "JRPG",
        subgenre: "Social Sim, Turn-based JRPG",
        platform: "Steam",
        developer: "ATLUS",
        publisher: "SEGA",
        releaseDate: "2022-10-21",
        engine: "Atlus Internal Engine",
        version: "v1.0.2",
        language: "English, Japanese, Multilingual",
        size: 41.0,
        rating: 4.9,
        playtime: 120,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: true,
        websiteUrl: "https://atlus.com/p5r/",
        trailerUrl: "https://www.youtube.com/embed/QnDbajbe8Gg",
        description: "Prepare for the award-winning RPG experience in this definitive edition of Persona 5 Royal, featuring a treasure trove of downloadable content! Don the mask of Joker and join the Phantom Thieves of Hearts.",
        notes: "Outstanding soundtrack, visual style, and characters. Best JRPG of the decade. The third semester content is beautiful.",
        tags: "JRPG, Turn-Based, Anime, Story Rich, Great Soundtrack",
        minRequirements: { os: "Windows 10", cpu: "Intel Core i7-4790 / AMD Ryzen 5 1500X", ram: "8 GB RAM", gpu: "NVIDIA GTX 650 Ti / AMD HD 7870 2GB", storage: "41 GB HDD" },
        recRequirements: { os: "Windows 10/11", cpu: "Intel Core i7-8700 / AMD Ryzen 5 3600", ram: "8 GB RAM", gpu: "NVIDIA GTX 760 / AMD RX 560 4GB", storage: "41 GB SSD" },
        addedAt: "2026-02-22T15:20:00.000Z"
    },
    {
        id: 18,
        name: "The Witcher 3: Wild Hunt",
        coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
        genre: "RPG",
        subgenre: "Open World, Action RPG",
        platform: "Steam",
        developer: "CD Projekt Red",
        publisher: "CD Projekt",
        releaseDate: "2015-05-18",
        engine: "REDengine 3",
        version: "v4.04 (Next-Gen)",
        language: "English, Polish, Multilingual",
        size: 50.0,
        rating: 4.9,
        playtime: 185,
        status: "Completed",
        installed: true,
        completed: true,
        favorite: true,
        websiteUrl: "https://www.thewitcher.com/witcher3",
        trailerUrl: "https://www.youtube.com/embed/53MyR_Z3fAY",
        description: "You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.",
        notes: "Next-gen update with raytracing is fantastic. Hearts of Stone and Blood and Wine are the best DLCs ever created.",
        tags: "RPG, Open World, Story Rich, Fantasy, Mature",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-2500K / AMD Phenom II X4 940", ram: "6 GB RAM", gpu: "NVIDIA GTX 660 / AMD HD 7870", storage: "50 GB HDD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-3770 / AMD FX-8350", ram: "8 GB RAM", gpu: "NVIDIA GTX 770 / AMD R9 290", storage: "50 GB SSD" },
        addedAt: "2026-02-25T16:45:00.000Z"
    },
    {
        id: 19,
        name: "Baldur's Gate 3",
        coverUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
        genre: "RPG",
        subgenre: "Turn-based RPG, CRPG",
        platform: "Steam",
        developer: "Larian Studios",
        publisher: "Larian Studios",
        releaseDate: "2023-08-03",
        engine: "Divinity 4.0",
        version: "Patch 6",
        language: "English, Multilingual",
        size: 150.0,
        rating: 5.0,
        playtime: 210,
        status: "Completed",
        installed: true,
        completed: true,
        favorite: true,
        websiteUrl: "https://baldursgate3.game",
        trailerUrl: "https://www.youtube.com/embed/1T22SZ_T9wY",
        description: "Gather your party, and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power. Mysterious abilities are awakening within you, drawn from a mind flayer parasite planted in your brain.",
        notes: "Absolute masterpiece. The sheer amount of choice and voice acting is unmatched. Goty 2023 for a reason.",
        tags: "CRPG, Turn-Based, RPG, Choices Matter, Story Rich, Co-op",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-4690 / AMD FX 4350", ram: "8 GB RAM", gpu: "NVIDIA GTX 970 / AMD RX 480 4GB", storage: "150 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-8700K / AMD Ryzen 5 3600", ram: "16 GB RAM", gpu: "NVIDIA RTX 2060 Super / AMD RX 5700 XT", storage: "150 GB SSD" },
        addedAt: "2026-02-28T09:30:00.000Z"
    },
    {
        id: 20,
        name: "Resident Evil 4",
        coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
        genre: "Horror",
        subgenre: "Action Horror, Third-Person",
        platform: "Steam",
        developer: "Capcom",
        publisher: "Capcom",
        releaseDate: "2023-03-24",
        engine: "RE Engine",
        version: "v1.05",
        language: "English, Japanese, Multilingual",
        size: 56.0,
        rating: 4.8,
        playtime: 38,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: false,
        websiteUrl: "https://www.residentevil.com/re4/",
        trailerUrl: "https://www.youtube.com/embed/j5Xv2lM9W2w",
        description: "Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy, one of the survivors, has been recruited as an agent reporting directly to the president.",
        notes: "Incredible remake. Preserves the spirit of the original while modernizing the gameplay and making it much scarier.",
        tags: "Action, Horror, Survival Horror, Third Person, Remake",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-7500 / AMD Ryzen 3 1200", ram: "8 GB RAM", gpu: "NVIDIA GTX 1056 4GB / AMD RX 560", storage: "56 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-8700 / AMD Ryzen 5 3600", ram: "16 GB RAM", gpu: "NVIDIA GTX 1070 / AMD RX 5700", storage: "56 GB SSD" },
        addedAt: "2026-03-02T14:15:00.000Z"
    },
    {
        id: 21,
        name: "Silent Hill 2",
        coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
        genre: "Horror",
        subgenre: "Psychological Horror",
        platform: "Steam",
        developer: "Bloober Team",
        publisher: "Konami Digital Entertainment",
        releaseDate: "2024-10-08",
        engine: "Unreal Engine 5",
        version: "v1.0.0",
        language: "English, Japanese, Multilingual",
        size: 50.0,
        rating: 4.7,
        playtime: 15,
        status: "Wishlist",
        installed: false,
        completed: false,
        favorite: false,
        websiteUrl: "https://www.konami.com/games/silenthill/",
        trailerUrl: "https://www.youtube.com/embed/78xL72N2aYc",
        description: "Having received a letter from his deceased wife, James heads to where they shared so many memories, in the hope of seeing her one more time: Silent Hill. There, by the lake, he finds a woman eerily similar to her...",
        notes: "Looks incredibly atmospheric in Unreal Engine 5. Eagerly waiting to play this.",
        tags: "Horror, Psychological, Remake, Atmospheric, Story Rich",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-8400 / AMD Ryzen 3 3300X", ram: "12 GB RAM", gpu: "NVIDIA GTX 1080 / AMD RX 5700", storage: "50 GB SSD" },
        recRequirements: { os: "Windows 11 64-bit", cpu: "Intel Core i7-10700 / AMD Ryzen 7 3700X", ram: "16 GB RAM", gpu: "NVIDIA RTX 3070 / AMD RX 6800", storage: "50 GB SSD" },
        addedAt: "2026-03-05T10:00:00.000Z"
    },
    {
        id: 22,
        name: "DOOM: The Dark Ages",
        coverUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
        genre: "FPS",
        subgenre: "Arena Shooter, Action",
        platform: "Steam",
        developer: "id Software",
        publisher: "Bethesda Softworks",
        releaseDate: "2025-06-15",
        engine: "id Tech 8",
        version: "v1.0",
        language: "English, Multilingual",
        size: 80.0,
        rating: 4.8,
        playtime: 12,
        status: "Completed",
        installed: true,
        completed: true,
        favorite: true,
        websiteUrl: "https://slayersclub.com",
        trailerUrl: "https://www.youtube.com/embed/4yZ8L2zQkXw",
        description: "DOOM: The Dark Ages is the single-player action FPS prequel to the critically acclaimed DOOM (2016) and DOOM Eternal. You are the DOOM Slayer, the legendary demon-killing warrior in this untold medieval origin story of his endless rage.",
        notes: "Heavy metal fantasy. The shield-saw is an amazing weapon. Incredible combat loop.",
        tags: "FPS, Action, Gore, Demons, Great Soundtrack",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-8400 / AMD Ryzen 5 2600", ram: "16 GB RAM", gpu: "NVIDIA GTX 1070 / AMD RX 580", storage: "80 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-9700 / AMD Ryzen 7 3700X", ram: "16 GB RAM", gpu: "NVIDIA RTX 3060 / AMD RX 6700 XT", storage: "80 GB SSD" },
        addedAt: "2026-03-08T18:00:00.000Z"
    },
    {
        id: 23,
        name: "Helldivers 2",
        coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        genre: "TPS",
        subgenre: "Co-op Shooter, Sci-Fi",
        platform: "Steam",
        developer: "Arrowhead Game Studios",
        publisher: "PlayStation Publishing",
        releaseDate: "2024-02-08",
        engine: "Autodesk Stingray",
        version: "v1.000.300",
        language: "English, Multilingual",
        size: 70.0,
        rating: 4.6,
        playtime: 115,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: true,
        websiteUrl: "https://www.playstation.com/games/helldivers-2/",
        trailerUrl: "https://www.youtube.com/embed/y29y_46d_Qk",
        description: "The Galaxy’s Last Line of Offense. Enlist in the Helldivers and join the fight for freedom across a hostile galaxy in a fast, frantic, and ferocious third-person shooter. Fight for Super Earth!",
        notes: "Spread democracy! Extremely fun co-op game. Calling in stratagems is a great mechanic.",
        tags: "Co-op, TPS, Sci-Fi, Multiplayer, PvE",
        minRequirements: { os: "Windows 10", cpu: "Intel Core i7-4790K / AMD Ryzen 5 1500X", ram: "8 GB RAM", gpu: "NVIDIA GTX 1050 Ti / AMD RX 470", storage: "100 GB HDD" },
        recRequirements: { os: "Windows 10/11", cpu: "Intel Core i7-9700K / AMD Ryzen 7 3700X", ram: "16 GB RAM", gpu: "NVIDIA RTX 2060 / AMD RX 6600 XT", storage: "100 GB SSD" },
        addedAt: "2026-03-10T12:00:00.000Z"
    },
    {
        id: 24,
        name: "Kingdom Come: Deliverance II",
        coverUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=1200&q=80",
        genre: "RPG",
        subgenre: "Medieval RPG, Realistic",
        platform: "Steam",
        developer: "Warhorse Studios",
        publisher: "Deep Silver",
        releaseDate: "2025-02-11",
        engine: "CryEngine",
        version: "v1.0.1",
        language: "English, German, Czech",
        size: 90.0,
        rating: 4.7,
        playtime: 25,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: false,
        websiteUrl: "https://www.kingdomcomerpg.com",
        trailerUrl: "https://www.youtube.com/embed/8eW7j3h3840",
        description: "Kingdom Come: Deliverance II is a thrilling Action RPG, set amid the chaos of a civil war in 15th Century Bohemia. You are Henry of Skalitz – an ordinary man doing extraordinary things.",
        notes: "Much more polished than the first game. Henry's story continues beautifully. Deeply historical.",
        tags: "Medieval, Realistic, RPG, Open World, First-Person",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-8400 / AMD Ryzen 5 1600", ram: "16 GB RAM", gpu: "NVIDIA GTX 1060 6GB / AMD RX 580", storage: "100 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-10700K / AMD Ryzen 7 5700X", ram: "16 GB RAM", gpu: "NVIDIA RTX 3060 / AMD RX 6700 XT", storage: "100 GB SSD" },
        addedAt: "2026-03-12T15:30:00.000Z"
    },
    {
        id: 25,
        name: "Alan Wake 2",
        coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
        genre: "Horror",
        subgenre: "Survival Horror, Psychological",
        platform: "Epic Games",
        developer: "Remedy Entertainment",
        publisher: "Epic Games Publishing",
        releaseDate: "2023-10-27",
        engine: "Northlight Engine",
        version: "v1.0.16",
        language: "English, Multilingual",
        size: 85.0,
        rating: 4.8,
        playtime: 28,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: true,
        websiteUrl: "https://www.alanwake.com",
        trailerUrl: "https://www.youtube.com/embed/dlQ3FeNu5Yw",
        description: "A string of ritualistic murders threatens Bright Falls, an Alder Cove community surrounded by Pacific Northwest wilderness. Saga Anderson, an accomplished FBI agent, arrives to investigate. Meanwhile, Alan Wake, a trapped writer, writes a dark story to shape reality.",
        notes: "Incredibly creative story telling. The musical section 'Herald of Darkness' is legendary.",
        tags: "Psychological Horror, Story Rich, Narrative, Detective, Visuals",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-7600K / AMD Ryzen 5 3600", ram: "16 GB RAM", gpu: "NVIDIA RTX 2060 / AMD RX 6600", storage: "90 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-10700K / AMD Ryzen 7 3700X", ram: "16 GB RAM", gpu: "NVIDIA RTX 3070 / AMD RX 6700 XT", storage: "90 GB SSD" },
        addedAt: "2026-03-15T11:00:00.000Z"
    },
    {
        id: 26,
        name: "Hogwarts Legacy",
        coverUrl: "https://images.unsplash.com/photo-1598153346810-860daa814c4b?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=1200&q=80",
        genre: "RPG",
        subgenre: "Action RPG, Magic",
        platform: "Steam",
        developer: "Avalanche Software",
        publisher: "Warner Bros. Games",
        releaseDate: "2023-02-10",
        engine: "Unreal Engine 4",
        version: "v1.0.5",
        language: "English, Multilingual",
        size: 85.0,
        rating: 4.5,
        playtime: 54,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: false,
        websiteUrl: "https://www.hogwartslegacy.com",
        trailerUrl: "https://www.youtube.com/embed/1O6Q5wZsPjg",
        description: "Hogwarts Legacy is an immersive, open-world action RPG set in the world first introduced in the Harry Potter books. Now you can take control of the action and be at the center of your own adventure in the wizarding world.",
        notes: "Felt like a kid again exploring Hogwarts. The castle design is incredible. Combat is surprisingly deep.",
        tags: "Magic, Open World, RPG, Fantasy, Singleplayer",
        minRequirements: { os: "Windows 10", cpu: "Intel Core i5-6600 / AMD Ryzen 5 1400", ram: "16 GB RAM", gpu: "NVIDIA GTX 960 / AMD RX 470", storage: "85 GB SSD" },
        recRequirements: { os: "Windows 10/11", cpu: "Intel Core i7-8700 / AMD Ryzen 5 3600", ram: "16 GB RAM", gpu: "NVIDIA GTX 1080 Ti / AMD RX 5700 XT", storage: "85 GB SSD" },
        addedAt: "2026-03-18T14:30:00.000Z"
    },
    {
        id: 27,
        name: "Marvel's Spider-Man 2",
        coverUrl: "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80",
        genre: "Action",
        subgenre: "Open World, Superhero",
        platform: "PlayStation",
        developer: "Insomniac Games",
        publisher: "Sony Interactive Entertainment",
        releaseDate: "2023-10-20",
        engine: "Insomniac Engine",
        version: "v1.002",
        language: "English, Multilingual",
        size: 90.0,
        rating: 4.8,
        playtime: 35,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: true,
        websiteUrl: "https://www.playstation.com/games/marvels-spider-man-2/",
        trailerUrl: "https://www.youtube.com/embed/qDq74X7Z9eQ",
        description: "Spider-Men Peter Parker and Miles Morales return for an exciting new adventure in the critically acclaimed Marvel’s Spider-Man franchise. Swing, jump, and utilize the new Web Wings to travel across Marvel’s New York.",
        notes: "Amazing story. Playing as Venom was a blast. Swinging physics are even faster than the first game.",
        tags: "Superhero, Action, Open World, Singleplayer, Story Rich",
        minRequirements: { os: "PS5 System Software", cpu: "Custom AMD Zen 2", ram: "16 GB GDDR6", gpu: "Custom AMD RDNA 2", storage: "90 GB Custom SSD" },
        recRequirements: { os: "PS5 System Software", cpu: "Custom AMD Zen 2", ram: "16 GB GDDR6", gpu: "Custom AMD RDNA 2", storage: "90 GB Custom SSD" },
        addedAt: "2026-03-20T10:00:00.000Z"
    },
    {
        id: 28,
        name: "Starfield",
        coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=80",
        genre: "RPG",
        subgenre: "Sci-Fi RPG, Space",
        platform: "Steam",
        developer: "Bethesda Game Studios",
        publisher: "Bethesda Softworks",
        releaseDate: "2023-09-06",
        engine: "Creation Engine 2",
        version: "v1.11.36",
        language: "English, Multilingual",
        size: 125.0,
        rating: 3.8,
        playtime: 64,
        status: "Backlog",
        installed: false,
        completed: false,
        favorite: false,
        websiteUrl: "https://starfieldgame.com",
        trailerUrl: "https://www.youtube.com/embed/kfYEiTdsyas",
        description: "Starfield is the first new universe in over 25 years from Bethesda Game Studios, the award-winning creators of The Elder Scrolls V: Skyrim and Fallout 4. In this next generation role-playing game set amongst the stars, create any character you want and explore with unparalleled freedom.",
        notes: "Decent game but feels a bit dated. Loading screens are annoying. Shipbuilding is the best feature.",
        tags: "Space, Sci-Fi, Open World, RPG, Exploration",
        minRequirements: { os: "Windows 10", cpu: "Intel Core i7-6800K / AMD Ryzen 5 2600X", ram: "16 GB RAM", gpu: "NVIDIA GTX 1070 Ti / AMD RX 5700", storage: "125 GB SSD" },
        recRequirements: { os: "Windows 10/11", cpu: "Intel Core i7-10700K / AMD Ryzen 5 3600X", ram: "16 GB RAM", gpu: "NVIDIA RTX 2080 / AMD RX 6800 XT", storage: "125 GB SSD" },
        addedAt: "2026-03-22T09:00:00.000Z"
    },
    {
        id: 29,
        name: "Armored Core VI: Fires of Rubicon",
        coverUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        genre: "Action",
        subgenre: "Mecha, Fast-paced",
        platform: "Steam",
        developer: "FromSoftware",
        publisher: "Bandai Namco",
        releaseDate: "2023-08-25",
        engine: "FromSoftware Engine",
        version: "v1.06",
        language: "English, Japanese, Multilingual",
        size: 60.0,
        rating: 4.7,
        playtime: 42,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: false,
        websiteUrl: "https://www.armoredcore.net",
        trailerUrl: "https://www.youtube.com/embed/vX6yZ8k5U4E",
        description: "A mysterious new substance was discovered on the remote planet, Rubicon 3. As an energy source, this substance was expected to dramatically advance humanity’s technological and communications capabilities. Instead, it caused a catastrophe.",
        notes: "Incredible mech customization. The boss fights are challenging but extremely rewarding. Great story endings.",
        tags: "Mechs, Action, Difficult, Sci-Fi, Customization",
        minRequirements: { os: "Windows 10", cpu: "Intel Core i7-4790K / AMD Ryzen 5 1500X", ram: "12 GB RAM", gpu: "NVIDIA GTX 1650 / AMD RX 480 4GB", storage: "60 GB SSD" },
        recRequirements: { os: "Windows 10/11", cpu: "Intel Core i7-7700 / AMD Ryzen 5 2600", ram: "16 GB RAM", gpu: "NVIDIA GTX 1060 6GB / AMD RX 590", storage: "60 GB SSD" },
        addedAt: "2026-03-25T14:00:00.000Z"
    },
    {
        id: 30,
        name: "Hollow Knight: Silksong",
        coverUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
        genre: "Platformer",
        subgenre: "Metroidvania",
        platform: "Steam",
        developer: "Team Cherry",
        publisher: "Team Cherry",
        releaseDate: "2026-06-01",
        engine: "Unity",
        version: "v1.0",
        language: "English, Multilingual",
        size: 8.0,
        rating: 4.9,
        playtime: 15,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: true,
        websiteUrl: "https://www.hollowknight.com/silksong",
        trailerUrl: "https://www.youtube.com/embed/JSf-tTjT2_I",
        description: "Play as Hornet, princess-protector of Hallownest, and adventure through a whole new kingdom ruled by silk and song! Captured and brought to this unfamiliar world, Hornet must battle foes and solve mysteries.",
        notes: "IT'S FINALLY OUT! Hornet's movement is so fast and acrobatic. Metroidvania perfection.",
        tags: "Metroidvania, Indie, Difficult, Cute, Platformer",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i3 / AMD Athlon", ram: "4 GB RAM", gpu: "NVIDIA GTX 560 / AMD Radeon", storage: "10 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i5 / AMD Ryzen 5", ram: "8 GB RAM", gpu: "NVIDIA GTX 960 / AMD RX 560", storage: "10 GB SSD" },
        addedAt: "2026-03-27T10:00:00.000Z"
    },
    {
        id: 31,
        name: "Diablo IV",
        coverUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
        genre: "RPG",
        subgenre: "Action RPG, Hack & Slash",
        platform: "Battle.net",
        developer: "Blizzard Entertainment",
        publisher: "Blizzard Entertainment",
        releaseDate: "2023-06-06",
        engine: "Blizzard Internal Engine",
        version: "v1.4.1",
        language: "English, Multilingual",
        size: 90.0,
        rating: 4.1,
        playtime: 85,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: false,
        websiteUrl: "https://diablo4.blizzard.com",
        trailerUrl: "https://www.youtube.com/embed/XV4zR7bxyKM",
        description: "The endless battle between the High Heavens and the Burning Hells rages on as chaos threatens to consume Sanctuary. With ceaseless demons to slaughter, countless Abilities to master, and legendary loot, adventure and devastation await.",
        notes: "Great campaign and dark atmosphere, but end game was lacking at launch. Season 4 Loot Reborn update has improved it a lot.",
        tags: "Action RPG, Hack and Slash, Dark Fantasy, Multiplayer, Loot",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-2500K / AMD FX-8350", ram: "8 GB RAM", gpu: "NVIDIA GTX 660 / AMD Radeon R9 280", storage: "90 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i5-4670K / AMD Ryzen 1300X", ram: "16 GB RAM", gpu: "NVIDIA GTX 970 / AMD Radeon RX 470", storage: "90 GB SSD" },
        addedAt: "2026-03-29T12:00:00.000Z"
    },
    {
        id: 32,
        name: "Final Fantasy VII Rebirth",
        coverUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        genre: "JRPG",
        subgenre: "Action RPG",
        platform: "PlayStation",
        developer: "Square Enix",
        publisher: "Square Enix",
        releaseDate: "2024-02-29",
        engine: "Unreal Engine 4",
        version: "v1.02",
        language: "English, Japanese, Multilingual",
        size: 145.0,
        rating: 4.9,
        playtime: 95,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: true,
        websiteUrl: "https://ffvii.square-enix-games.com",
        trailerUrl: "https://www.youtube.com/embed/mG14fP13gX0",
        description: "Cloud and his comrades escape the dystopian city of Midgar and set out on a journey across the planet. New adventures await in a vast, vibrant world — sprint across grassy plains on a Chocobo and explore expansive environments.",
        notes: "Incredible expansion of the original story. The combat system is a perfect blend of real-time action and command menus. Soundtrack is legendary.",
        tags: "JRPG, Story Rich, Fantasy, Open World, Great Soundtrack",
        minRequirements: { os: "PS5 System Software", cpu: "Custom AMD Zen 2", ram: "16 GB GDDR6", gpu: "Custom AMD RDNA 2", storage: "150 GB Custom SSD" },
        recRequirements: { os: "PS5 System Software", cpu: "Custom AMD Zen 2", ram: "16 GB GDDR6", gpu: "Custom AMD RDNA 2", storage: "150 GB Custom SSD" },
        addedAt: "2026-03-31T15:00:00.000Z"
    },
    {
        id: 33,
        name: "Death Stranding 2: On the Beach",
        coverUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        genre: "Adventure",
        subgenre: "Sci-Fi, Cinematic",
        platform: "PlayStation",
        developer: "Kojima Productions",
        publisher: "Sony Interactive Entertainment",
        releaseDate: "2025-10-15",
        engine: "Decima Engine",
        version: "v1.0",
        language: "English, Japanese, Multilingual",
        size: 100.0,
        rating: 4.8,
        playtime: 40,
        status: "Wishlist",
        installed: false,
        completed: false,
        favorite: false,
        websiteUrl: "https://www.kogimaproductions.jp",
        trailerUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
        description: "Hideo Kojima’s next masterpiece. Sam Porter Bridges returns to save humanity from extinction, travelling beyond the UCA to connect a new world.",
        notes: "The trailer looked absolutely insane. Kojima never disappoints with his cinematic vision.",
        tags: "Sci-Fi, Cinematic, Story Rich, Weird, Exploration",
        minRequirements: { os: "PS5 System Software", cpu: "Custom AMD Zen 2", ram: "16 GB GDDR6", gpu: "Custom AMD RDNA 2", storage: "100 GB Custom SSD" },
        recRequirements: { os: "PS5 System Software", cpu: "Custom AMD Zen 2", ram: "16 GB GDDR6", gpu: "Custom AMD RDNA 2", storage: "100 GB Custom SSD" },
        addedAt: "2026-04-02T09:00:00.000Z"
    },
    {
        id: 34,
        name: "Senua's Saga: Hellblade II",
        coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
        genre: "Action",
        subgenre: "Cinematic, Psychological",
        platform: "Steam",
        developer: "Ninja Theory",
        publisher: "Xbox Game Studios",
        releaseDate: "2024-05-21",
        engine: "Unreal Engine 5",
        version: "v1.0.1",
        language: "English, Multilingual",
        size: 50.0,
        rating: 4.6,
        playtime: 8,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: false,
        websiteUrl: "https://www.xbox.com/games/senuas-saga-hellblade-II",
        trailerUrl: "https://www.youtube.com/embed/V6W3oR2D1YQ",
        description: "The sequel to the award-winning Hellblade: Senua's Sacrifice, Senua returns in a brutal journey of survival through the myth and torment of Viking Iceland. Intent on saving those who have fallen victim to the horrors of tyranny.",
        notes: "Visuals are incredibly realistic in UE5. Sound design is amazing, must play with headphones. Short but very intense.",
        tags: "Cinematic, Psychological, Atmospheric, Female Protagonist, Story Rich",
        minRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i5-8400 / AMD Ryzen 5 2600", ram: "16 GB RAM", gpu: "NVIDIA GTX 1070 / AMD RX 5700", storage: "50 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-10700K / AMD Ryzen 7 3700X", ram: "16 GB RAM", gpu: "NVIDIA RTX 3070 / AMD RX 6800 XT", storage: "50 GB SSD" },
        addedAt: "2026-04-05T14:30:00.000Z"
    },
    {
        id: 35,
        name: "Civilization VII",
        coverUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
        genre: "Strategy",
        subgenre: "Turn-based Strategy, 4X",
        platform: "Steam",
        developer: "Firaxis Games",
        publisher: "2K",
        releaseDate: "2025-02-11",
        engine: "Firaxis Custom Engine",
        version: "v1.0.0",
        language: "English, Multilingual",
        size: 30.0,
        rating: 4.5,
        playtime: 60,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: false,
        websiteUrl: "https://civilization.2k.com",
        trailerUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
        description: "The award-winning strategy franchise returns with a revolutionary new chapter. Sid Meier's Civilization VII empowers you to build the greatest empire the world has ever known!",
        notes: "Just one more turn! The new age system completely changes how campaigns progress.",
        tags: "Strategy, 4X, Turn-Based, Historical, Multiplayer",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-4690 / AMD Ryzen 3 1200", ram: "8 GB RAM", gpu: "NVIDIA GTX 970 / AMD RX 470", storage: "30 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-8700K / AMD Ryzen 5 3600", ram: "16 GB RAM", gpu: "NVIDIA RTX 2060 / AMD RX 5600 XT", storage: "30 GB SSD" },
        addedAt: "2026-04-08T10:00:00.000Z"
    },
    {
        id: 36,
        name: "S.T.A.L.K.E.R. 2: Heart of Chornobyl",
        coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
        genre: "FPS",
        subgenre: "Survival FPS, Post-apocalyptic",
        platform: "Steam",
        developer: "GSC Game World",
        publisher: "GSC Game World",
        releaseDate: "2024-11-20",
        engine: "Unreal Engine 5",
        version: "v1.0.2",
        language: "English, Ukrainian, Multilingual",
        size: 150.0,
        rating: 4.6,
        playtime: 35,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: true,
        websiteUrl: "https://www.stalker2.com",
        trailerUrl: "https://www.youtube.com/embed/p1S47Gj645w",
        description: "Discover the Chornobyl Exclusion Zone, full of dangerous enemies, deadly anomalies and powerful artifacts. Uncover your own epic story as you make your way to the Heart of Chornobyl.",
        notes: "Incredibly atmospheric and tense. The AI is brutal. Highly recommend playing on veteran difficulty.",
        tags: "Survival, Post-apocalyptic, FPS, Atmospheric, Open World",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-8400 / AMD Ryzen 5 2600", ram: "16 GB RAM", gpu: "NVIDIA GTX 1060 6GB / AMD RX 580 8GB", storage: "150 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-9700K / AMD Ryzen 7 3700X", ram: "16 GB RAM", gpu: "NVIDIA RTX 2070 Super / AMD RX 5700 XT", storage: "150 GB SSD" },
        addedAt: "2026-04-10T12:00:00.000Z"
    },
    {
        id: 37,
        name: "Dragon Age: The Veilguard",
        coverUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=1200&q=80",
        genre: "RPG",
        subgenre: "Action RPG, Fantasy",
        platform: "Steam",
        developer: "BioWare",
        publisher: "Electronic Arts",
        releaseDate: "2024-10-31",
        engine: "Frostbite",
        version: "v1.0.3",
        language: "English, Multilingual",
        size: 90.0,
        rating: 4.3,
        playtime: 44,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: false,
        websiteUrl: "https://www.ea.com/games/dragon-age/dragon-age-the-veilguard",
        trailerUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
        description: "Enter Thedas, a vibrant world of rugged wilderness, treacherous labyrinths, and glittering cities. But now, corrupt ancient gods have broken free from centuries of darkness and are bent on destroying the world.",
        notes: "Good return to form for BioWare. The combat is fast and fun, and the companions are well written.",
        tags: "RPG, Fantasy, Character Customization, Story Rich, Singleplayer",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-8400 / AMD Ryzen 3 3300X", ram: "16 GB RAM", gpu: "NVIDIA GTX 970 / AMD RX 580", storage: "100 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-8700K / AMD Ryzen 7 3700X", ram: "16 GB RAM", gpu: "NVIDIA RTX 2070 / AMD RX 5700 XT", storage: "100 GB SSD" },
        addedAt: "2026-04-12T11:00:00.000Z"
    },
    {
        id: 38,
        name: "Monster Hunter Wilds",
        coverUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
        genre: "Action",
        subgenre: "Action RPG, Hunting",
        platform: "Steam",
        developer: "Capcom",
        publisher: "Capcom",
        releaseDate: "2025-02-28",
        engine: "RE Engine",
        version: "v1.0.0",
        language: "English, Japanese, Multilingual",
        size: 140.0,
        rating: 4.8,
        playtime: 80,
        status: "Playing",
        installed: true,
        completed: false,
        favorite: true,
        websiteUrl: "https://www.monsterhunter.com/wilds/",
        trailerUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
        description: "The next generation of Monster Hunter. Experience seamless environments, dynamic weather, and massive herds of monsters in this thrilling hunting action game.",
        notes: "Outstanding gameplay loop. The mount mechanics are amazing and the weapon combat feels punchier than ever.",
        tags: "Co-op, Action RPG, Hunting, Multiplayer, Open World",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-11600K / AMD Ryzen 5 3600X", ram: "16 GB RAM", gpu: "NVIDIA GTX 1660 Super / AMD RX 5600 XT", storage: "140 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-12700K / AMD Ryzen 7 5800X", ram: "16 GB RAM", gpu: "NVIDIA RTX 3070 Ti / AMD RX 6800 XT", storage: "140 GB SSD" },
        addedAt: "2026-04-15T15:00:00.000Z"
    },
    {
        id: 39,
        name: "BioShock Infinite",
        coverUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        genre: "FPS",
        subgenre: "Story Rich, Sci-Fi",
        platform: "Steam",
        developer: "Irrational Games",
        publisher: "2K Games",
        releaseDate: "2013-03-25",
        engine: "Unreal Engine 3",
        version: "v1.1.25",
        language: "English, Multilingual",
        size: 20.0,
        rating: 4.8,
        playtime: 32,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: true,
        websiteUrl: "https://www.2k.com/games/bioshock-infinite",
        trailerUrl: "https://www.youtube.com/embed/bLHW78X1XeE",
        description: "Indebted to the wrong people, with his life on the line, veteran of the U.S. Cavalry and now hired gun, Booker DeWitt has only one opportunity to wipe his slate clean. He must rescue Elizabeth, a mysterious girl imprisoned since childhood in the flying city of Columbia.",
        notes: "One of the greatest stories in gaming history. The ending blew my mind. Columbia is a beautiful setting.",
        tags: "FPS, Story Rich, Sci-Fi, Steampunk, Singleplayer",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core 2 DUO 2.4 GHz / AMD Athlon X2 2.7 GHz", ram: "4 GB RAM", gpu: "ATI Radeon HD 3870 / NVIDIA 8800 GT", storage: "20 GB HDD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Quad Core / AMD Ryzen", ram: "4 GB RAM", gpu: "NVIDIA GTX 560 / AMD Radeon HD 6950", storage: "30 GB SSD" },
        addedAt: "2026-04-18T11:00:00.000Z"
    },
    {
        id: 40,
        name: "Skyrim (The Elder Scrolls V)",
        coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
        genre: "RPG",
        subgenre: "Open World RPG, Fantasy",
        platform: "Steam",
        developer: "Bethesda Game Studios",
        publisher: "Bethesda Softworks",
        releaseDate: "2011-11-11",
        engine: "Creation Engine",
        version: "v1.6 (Anniversary)",
        language: "English, Multilingual",
        size: 12.0,
        rating: 4.8,
        playtime: 420,
        status: "Completed",
        installed: true,
        completed: true,
        favorite: true,
        websiteUrl: "https://elderscrolls.bethesda.net/skyrim",
        trailerUrl: "https://www.youtube.com/embed/JSRtYkidj-Y",
        description: "EPIC FANTASY REBORN. The next chapter in the highly anticipated Elder Scrolls saga arrives from the makers of the 2006 and 2008 Games of the Year, Bethesda Game Studios. Skyrim reimagines and revolutionizes the open-world fantasy epic.",
        notes: "Legendary game. Modding it is a game in itself. Visited Bleak Falls Barrow more times than I can count.",
        tags: "Open World, RPG, Fantasy, Moddable, Exploration",
        minRequirements: { os: "Windows 10", cpu: "Intel i5-750 / AMD Phenom II X4-945", ram: "8 GB RAM", gpu: "NVIDIA GTX 470 / AMD HD 7870", storage: "12 GB HDD" },
        recRequirements: { os: "Windows 10/11", cpu: "Intel i7-3770 / AMD FX-8350", ram: "8 GB RAM", gpu: "NVIDIA GTX 780 / AMD R9 290", storage: "12 GB SSD" },
        addedAt: "2026-04-20T10:00:00.000Z"
    },
    {
        id: 41,
        name: "Fallout 4",
        coverUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        genre: "RPG",
        subgenre: "Open World, Post-apocalyptic",
        platform: "Steam",
        developer: "Bethesda Game Studios",
        publisher: "Bethesda Softworks",
        releaseDate: "2015-11-10",
        engine: "Creation Engine",
        version: "v1.10.980 (Next-Gen)",
        language: "English, Multilingual",
        size: 35.0,
        rating: 4.3,
        playtime: 145,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: false,
        websiteUrl: "https://fallout.bethesda.net",
        trailerUrl: "https://www.youtube.com/embed/GE2BkLqMef4",
        description: "Bethesda Game Studios, the award-winning creators of Fallout 3 and The Elder Scrolls V: Skyrim, welcome you to the world of Fallout 4 – their most ambitious game ever, and the next generation of open-world gaming.",
        notes: "Next-gen update fixed many bugs. Love the settlement building and the weapon modification. Diamond City is a cool hub.",
        tags: "Post-apocalyptic, RPG, Open World, Sci-Fi, Crafting",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-2300 / AMD Phenom II X6 1100T", ram: "8 GB RAM", gpu: "NVIDIA GTX 550 Ti / AMD HD 7870", storage: "30 GB HDD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-4790 / AMD FX-9590", ram: "8 GB RAM", gpu: "NVIDIA GTX 780 / AMD R9 290X", storage: "30 GB SSD" },
        addedAt: "2026-04-22T09:00:00.000Z"
    },
    {
        id: 42,
        name: "Portal 2",
        coverUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
        genre: "Puzzle",
        subgenre: "Co-op Puzzle, Sci-Fi",
        platform: "Steam",
        developer: "Valve",
        publisher: "Valve",
        releaseDate: "2011-04-18",
        engine: "Source",
        version: "v2.0",
        language: "English, Multilingual",
        size: 8.0,
        rating: 5.0,
        playtime: 24,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: true,
        websiteUrl: "https://www.thinkwithportals.com",
        trailerUrl: "https://www.youtube.com/embed/tax4e4hBBZc",
        description: "Portal 2 draws from the award-winning formula of innovative gameplay, story, and music that earned the original Portal over 70 industry accolades and created a cult following. Features a deep singleplayer campaign and a separate co-op campaign.",
        notes: "One of the best puzzle games ever made. GLaDOS and Wheatley are legendary characters. Co-op is incredibly fun.",
        tags: "Puzzle, Comedy, Sci-Fi, Co-op, First-Person",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Dual Core / AMD Athlon 64 X2", ram: "2 GB RAM", gpu: "NVIDIA 7600 / ATI X800", storage: "8 GB HDD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core 2 Duo / AMD Athlon 64 X2", ram: "4 GB RAM", gpu: "NVIDIA GTX 240 / ATI Radeon HD 3000", storage: "8 GB SSD" },
        addedAt: "2026-04-25T11:00:00.000Z"
    },
    {
        id: 43,
        name: "Half-Life: Alyx",
        coverUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        genre: "FPS",
        subgenre: "VR, Sci-Fi",
        platform: "Steam",
        developer: "Valve",
        publisher: "Valve",
        releaseDate: "2020-03-23",
        engine: "Source 2",
        version: "v1.5.4",
        language: "English, Multilingual",
        size: 48.0,
        rating: 4.9,
        playtime: 18,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: true,
        websiteUrl: "https://half-life.com/alyx",
        trailerUrl: "https://www.youtube.com/embed/O2W0N3uKXhs",
        description: "Half-Life: Alyx is Valve’s VR return to the Half-Life series. It’s the story of an impossible fight against a vicious alien race known as the Combine, set between the events of Half-Life and Half-Life 2.",
        notes: "The best VR game in existence. Gravity gloves are a genius mechanic. Extremely immersive and sometimes terrifying (Jeff's chapter!).",
        tags: "VR, FPS, Sci-Fi, Horror, Story Rich",
        minRequirements: { os: "Windows 10", cpu: "Intel Core i5-7500 / AMD Ryzen 5 1600", ram: "12 GB RAM", gpu: "NVIDIA GTX 1060 6GB / AMD RX 580 8GB", storage: "48 GB SSD" },
        recRequirements: { os: "Windows 10/11", cpu: "Intel Core i7-9700K / AMD Ryzen 7 3700X", ram: "16 GB RAM", gpu: "NVIDIA RTX 2070 / AMD RX 5700 XT", storage: "48 GB SSD" },
        addedAt: "2026-04-28T10:00:00.000Z"
    },
    {
        id: 44,
        name: "God of War Ragnarök",
        coverUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1200&q=80",
        genre: "Action",
        subgenre: "Action Adventure, Mythology",
        platform: "Steam",
        developer: "Santa Monica Studio",
        publisher: "PlayStation Publishing",
        releaseDate: "2024-09-19",
        engine: "Kinetica",
        version: "v1.0.1",
        language: "English, Multilingual",
        size: 110.0,
        rating: 4.9,
        playtime: 48,
        status: "Completed",
        installed: true,
        completed: true,
        favorite: true,
        websiteUrl: "https://www.playstation.com/games/god-of-war-ragnarok/",
        trailerUrl: "https://www.youtube.com/embed/hfJ4KmIPAIs",
        description: "From Santa Monica Studio comes the sequel to the critically acclaimed God of War (2018). Fimbulwinter is well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers.",
        notes: "Incredible sequel. The relationship between Kratos and Atreus has grown so much. Combat is intense and brutal.",
        tags: "Action, Mythology, Story Rich, Cinematic, Singleplayer",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-4670K / AMD Ryzen 3 1200", ram: "8 GB RAM", gpu: "NVIDIA GTX 1060 6GB / AMD RX 580 8GB", storage: "110 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-7700K / AMD Ryzen 5 2600X", ram: "16 GB RAM", gpu: "NVIDIA RTX 2070 / AMD RX 5700 XT", storage: "110 GB SSD" },
        addedAt: "2026-05-01T12:00:00.000Z"
    },
    {
        id: 45,
        name: "Mass Effect Legendary Edition",
        coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=80",
        genre: "RPG",
        subgenre: "Sci-Fi RPG, Space",
        platform: "EA App",
        developer: "BioWare",
        publisher: "Electronic Arts",
        releaseDate: "2021-05-14",
        engine: "Unreal Engine 3",
        version: "v1.03",
        language: "English, Multilingual",
        size: 120.0,
        rating: 4.9,
        playtime: 110,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: true,
        websiteUrl: "https://www.ea.com/games/mass-effect/mass-effect-legendary-edition",
        trailerUrl: "https://www.youtube.com/embed/n8i53GSdBtg",
        description: "One person is all that stands between humanity and the greatest threat it has ever faced. Relive the legend of Commander Shepard in the highly acclaimed Mass Effect trilogy with the Mass Effect Legendary Edition.",
        notes: "My favorite sci-fi trilogy of all time. Having all three games remastered in one package is fantastic. Choices carrying over is amazing.",
        tags: "Sci-Fi, RPG, Story Rich, Space, Choices Matter",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5 3570 / AMD FX-8350", ram: "8 GB RAM", gpu: "NVIDIA GTX 760 / AMD Radeon HD 7970", storage: "120 GB HDD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-7700 / AMD Ryzen 7 3700X", ram: "16 GB RAM", gpu: "NVIDIA GTX 1070 / AMD Radeon RX Vega 56", storage: "120 GB SSD" },
        addedAt: "2026-05-03T10:00:00.000Z"
    },
    {
        id: 46,
        name: "Horizon Forbidden West",
        coverUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        genre: "Action",
        subgenre: "Open World, Sci-Fi",
        platform: "Steam",
        developer: "Guerrilla Games",
        publisher: "PlayStation Publishing",
        releaseDate: "2024-03-21",
        engine: "Decima Engine",
        version: "v1.2.48",
        language: "English, Multilingual",
        size: 96.0,
        rating: 4.7,
        playtime: 55,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: false,
        websiteUrl: "https://www.playstation.com/games/horizon-forbidden-west/",
        trailerUrl: "https://www.youtube.com/embed/wzx96gAtSqc",
        description: "Join Aloy as she braves the Forbidden West – a majestic but dangerous frontier that conceals mysterious new threats. Explore distant lands, fight bigger and more awe-inspiring machines, and encounter astonishing new tribes.",
        notes: "Visually stunning on PC! Decima engine is incredibly optimized. The combat against giant machine dinosaurs is very fun.",
        tags: "Open World, Action, Sci-Fi, Female Protagonist, Story Rich",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i3-8100 / AMD Ryzen 3 3100", ram: "16 GB RAM", gpu: "NVIDIA GTX 1650 4GB / AMD RX 5500 XT", storage: "150 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i5-8600 / AMD Ryzen 5 3600", ram: "16 GB RAM", gpu: "NVIDIA RTX 3060 / AMD RX 5700", storage: "150 GB SSD" },
        addedAt: "2026-05-05T14:30:00.000Z"
    },
    {
        id: 47,
        name: "Sekiro: Shadows Die Twice",
        coverUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
        genre: "Action",
        subgenre: "Action Adventure, Souls-like",
        platform: "Steam",
        developer: "FromSoftware",
        publisher: "Activision",
        releaseDate: "2019-03-22",
        engine: "FromSoftware Engine",
        version: "v1.06",
        language: "English, Japanese, Multilingual",
        size: 25.0,
        rating: 4.9,
        playtime: 72,
        status: "Completed",
        installed: true,
        completed: true,
        favorite: true,
        websiteUrl: "https://www.sekirothegame.com",
        trailerUrl: "https://www.youtube.com/embed/rXMX4YJ7LGP",
        description: "In Sekiro: Shadows Die Twice you are the 'one-armed wolf', a disgraced and disfigured warrior rescued from the brink of death. Bound to protect a young lord who is the descendant of an ancient bloodline, you become the target of many vicious enemies.",
        notes: "Best combat system ever made. The parry mechanic is incredibly satisfying. Isshin the Sword Saint is the hardest boss I've ever beaten.",
        tags: "Souls-like, Action, Difficult, Samurai, Stealth",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i3-2100 / AMD FX-6300", ram: "4 GB RAM", gpu: "NVIDIA GTX 760 / AMD Radeon HD 7950", storage: "25 GB HDD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i5-2500K / AMD Ryzen 5 1400", ram: "8 GB RAM", gpu: "NVIDIA GTX 970 / AMD Radeon RX 570", storage: "25 GB SSD" },
        addedAt: "2026-05-08T11:00:00.000Z"
    },
    {
        id: 48,
        name: "Deathloop",
        coverUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
        genre: "FPS",
        subgenre: "Action, Time Loop",
        platform: "Steam",
        developer: "Arkane Lyon",
        publisher: "Bethesda Softworks",
        releaseDate: "2021-09-14",
        engine: "Void Engine",
        version: "v1.4",
        language: "English, Multilingual",
        size: 30.0,
        rating: 4.2,
        playtime: 26,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: false,
        websiteUrl: "https://bethesda.net/game/deathloop",
        trailerUrl: "https://www.youtube.com/embed/MXv5IDp8y74",
        description: "DEATHLOOP is a next-gen first-person shooter from Arkane Lyon, the award-winning studio behind Dishonored. In DEATHLOOP, two rival assassins are trapped in a mysterious timeloop on the island of Blackreef, doomed to repeat the same day for eternity.",
        notes: "Very cool concept. Dishonored-style powers but in a time loop. Julianna invasions are extremely fun and tense.",
        tags: "FPS, Time Loop, Action, Stealth, Sci-Fi",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-8400 / AMD Ryzen 5 1600", ram: "12 GB RAM", gpu: "NVIDIA GTX 1060 6GB / AMD RX 580 8GB", storage: "30 GB SSD" },
        recRequirements: { os: "Windows 10/11 64-bit", cpu: "Intel Core i7-9700K / AMD Ryzen 7 2700X", ram: "16 GB RAM", gpu: "NVIDIA RTX 2060 / AMD RX 5700", storage: "30 GB SSD" },
        addedAt: "2026-05-10T12:00:00.000Z"
    },
    {
        id: 49,
        name: "Hades",
        coverUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=1200&q=80",
        genre: "Indie",
        subgenre: "Action, Roguelike",
        platform: "Steam",
        developer: "Supergiant Games",
        publisher: "Supergiant Games",
        releaseDate: "2020-09-17",
        engine: "Supergiant Custom Engine",
        version: "v1.38",
        language: "English, Multilingual",
        size: 15.0,
        rating: 4.9,
        playtime: 112,
        status: "Completed",
        installed: false,
        completed: true,
        favorite: true,
        websiteUrl: "https://www.supergiantgames.com/games/hades/",
        trailerUrl: "https://www.youtube.com/embed/91t0ha9x0Y8",
        description: "Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion and Transistor.",
        notes: "One of the best indie games of all time. The voice acting, story progression, and gameplay loop are flawless.",
        tags: "Roguelike, Indie, Action, Mythology, Great Soundtrack",
        minRequirements: { os: "Windows 10", cpu: "Dual Core 2.4 GHz", ram: "4 GB RAM", gpu: "GeForce GTX 850", storage: "15 GB HDD" },
        recRequirements: { os: "Windows 10/11", cpu: "Quad Core 3.0 GHz", ram: "8 GB RAM", gpu: "GeForce GTX 960", storage: "15 GB SSD" },
        addedAt: "2026-05-12T10:00:00.000Z"
    },
    {
        id: 50,
        name: "Clair Obscur: Expedition 33",
        coverUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=1200&q=80",
        genre: "JRPG",
        subgenre: "Turn-based RPG, Fantasy",
        platform: "Steam",
        developer: "Sandfall Interactive",
        publisher: "Kepler Interactive",
        releaseDate: "2025-05-30",
        engine: "Unreal Engine 5",
        version: "v1.0.0",
        language: "English, French, Multilingual",
        size: 65.0,
        rating: 4.7,
        playtime: 42,
        status: "Completed",
        installed: true,
        completed: true,
        favorite: true,
        websiteUrl: "https://www.expedition33.com",
        trailerUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
        description: "Once a year, the Paintress wakes and paints a monolithic number on her tower. Everyone of that age turns to dust. Tomorrow she wakes to paint '33'. Join Gustave and his expedition on a desperate quest to destroy the Paintress.",
        notes: "A stunning turn-based RPG with real-time reaction mechanics. The art direction and UE5 graphics are absolutely jaw-dropping.",
        tags: "Turn-Based, RPG, Fantasy, Unreal Engine 5, Beautiful",
        minRequirements: { os: "Windows 10 64-bit", cpu: "Intel Core i5-9600K / AMD Ryzen 5 3600", ram: "16 GB RAM", gpu: "NVIDIA RTX 2060 / AMD RX 5700 XT", storage: "70 GB SSD" },
        recRequirements: { os: "Windows 11 64-bit", cpu: "Intel Core i7-11700K / AMD Ryzen 7 5800X", ram: "16 GB RAM", gpu: "NVIDIA RTX 3070 / AMD RX 6800", storage: "70 GB SSD" },
        addedAt: "2026-05-15T12:00:00.000Z"
    }
];

// --- Application State ---
let state = {
    games: [],
    activeSection: "dashboard",
    viewMode: "grid", // "grid" or "list"
    filters: {
        genre: "",
        platform: "",
        developer: "",
        publisher: "",
        status: "",
        installed: "",
        favorite: "",
        rating: "",
        year: "",
        engine: ""
    },
    searchQuery: "",
    sortBy: "name-asc",
    charts: {}, // Store Chart.js instances
    isAdmin: false
};

// --- Initialization ---
document.addEventListener("DOMContentLoaded", async () => {
    await initDatabase();
    initUI();
    setupEventListeners();
    navigate("dashboard");
});

// --- Database Logic ---
async function initDatabase() {
    const storedViewMode = localStorage.getItem("gamevault_view_mode");
    const storedAdmin = localStorage.getItem("gamevault_is_admin");
    
    state.isAdmin = storedAdmin === "true";
    
    try {
        const response = await fetch("/api/games");
        if (!response.ok) throw new Error("Failed to fetch games from backend");
        state.games = await response.json();
    } catch (e) {
        console.error("Error loading games from server, falling back to offline mode.", e);
        showToast("Database server offline. Running in offline/readonly fallback mode.", "warning");
        
        const storedGames = localStorage.getItem("gamevault_games");
        if (storedGames) {
            try {
                state.games = JSON.parse(storedGames);
            } catch (err) {
                state.games = [...SAMPLE_GAMES];
            }
        } else {
            state.games = [...SAMPLE_GAMES];
        }
    }

    if (storedViewMode) {
        state.viewMode = storedViewMode;
    }
}

// Retain this method for offline mode fallback storage
function saveToLocalStorage() {
    localStorage.setItem("gamevault_games", JSON.stringify(state.games));
}

async function resetToSampleData() {
    if (!state.isAdmin) {
        showToast("Access Denied: Administrator privileges required.", "error");
        return;
    }
    if (confirm("Are you sure you want to reset the database? This will overwrite all your custom games with the default games.")) {
        try {
            const response = await fetch("/api/games/reset", { method: "POST" });
            if (!response.ok) throw new Error("Failed to reset database on server");
            state.games = await response.json();
            saveToLocalStorage();
            showToast("Database restored to default games!", "success");
            refreshAllViews();
        } catch (e) {
            console.error("Reset failed:", e);
            showToast("Failed to reset database on server.", "error");
        }
    }
}

async function wipeDatabase() {
    if (!state.isAdmin) {
        showToast("Access Denied: Administrator privileges required.", "error");
        return;
    }
    if (confirm("WARNING: Are you sure you want to wipe the database? This will delete ALL games in your library. This action cannot be undone!")) {
        try {
            const response = await fetch("/api/games/wipe", { method: "POST" });
            if (!response.ok) throw new Error("Failed to wipe database on server");
            state.games = [];
            saveToLocalStorage();
            showToast("All games cleared from database.", "warning");
            refreshAllViews();
        } catch (e) {
            console.error("Wipe failed:", e);
            showToast("Failed to wipe database on server.", "error");
        }
    }
}


// --- UI Controller & Navigation ---
function initUI() {
    // Populate form dropdowns
    populateFormSelects();
    // Populate filter options dynamically
    updateFilterOptions();
    // Setup view buttons
    updateViewToggleUI();
    // Update Admin UI state
    updateAdminUI();
}

function setupEventListeners() {
    // Section target links (Sidebar and others)
    document.querySelectorAll("[data-section-target]").forEach(item => {
        item.addEventListener("click", (e) => {
            const section = item.getAttribute("data-section-target");
            
            // Intercept admin section if not logged in
            if (section === "admin" && !state.isAdmin) {
                openAdminLoginModal();
                return;
            }
            
            navigate(section);
            // Close mobile sidebar if open
            document.getElementById("sidebar").classList.remove("open");
        });
    });

    document.querySelectorAll("[data-section-trigger]").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const section = item.getAttribute("data-section-trigger");
            navigate(section);
        });
    });

    // Home Logo click
    document.getElementById("logo-home").addEventListener("click", () => navigate("dashboard"));

    // Mobile Hamburger
    document.getElementById("btn-hamburger").addEventListener("click", () => {
        document.getElementById("sidebar").classList.toggle("open");
    });

    // Ripple effect on buttons
    document.body.addEventListener("click", (e) => {
        const button = e.target.closest("button, .menu-link, .btn-settings");
        if (!button) return;
        
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const rect = button.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add("ripple");

        const prevRipple = button.getElementsByClassName("ripple")[0];
        if (prevRipple) prevRipple.remove();

        button.appendChild(circle);
    });

    // Search input
    const searchInput = document.getElementById("global-search");
    searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        if (state.activeSection !== "games" && state.activeSection !== "favorites" && state.activeSection !== "completed" && state.activeSection !== "wishlist" && state.activeSection !== "installed") {
            navigate("games");
        } else {
            renderGamesList();
        }
    });

    // Filter Panel Toggle
    const btnFilterPanel = document.getElementById("btn-filter-panel");
    const btnToggleFilters = document.getElementById("btn-toggle-filters");
    const filterPanel = document.getElementById("filter-panel");

    const togglePanel = () => {
        filterPanel.classList.toggle("open");
        btnFilterPanel.classList.toggle("active");
        btnToggleFilters.classList.toggle("active");
    };

    btnFilterPanel.addEventListener("click", togglePanel);
    btnToggleFilters.addEventListener("click", togglePanel);

    // Filter dropdowns
    document.querySelectorAll(".filter-select").forEach(select => {
        select.addEventListener("change", (e) => {
            const filterKey = e.target.id.replace("filter-", "");
            state.filters[filterKey] = e.target.value;
            renderGamesList();
        });
    });

    // Clear filters
    document.getElementById("btn-clear-all-filters").addEventListener("click", clearAllFilters);

    // Sort dropdown
    document.getElementById("select-sort").addEventListener("change", (e) => {
        state.sortBy = e.target.value;
        renderGamesList();
    });

    // View toggles
    document.getElementById("btn-view-grid").addEventListener("click", () => {
        state.viewMode = "grid";
        localStorage.setItem("gamevault_view_mode", "grid");
        updateViewToggleUI();
        renderGamesList();
    });

    document.getElementById("btn-view-list").addEventListener("click", () => {
        state.viewMode = "list";
        localStorage.setItem("gamevault_view_mode", "list");
        updateViewToggleUI();
        renderGamesList();
    });

    // Settings View toggles
    document.getElementById("settings-view-grid").addEventListener("click", (e) => {
        state.viewMode = "grid";
        localStorage.setItem("gamevault_view_mode", "grid");
        updateViewToggleUI();
        document.getElementById("settings-view-grid").style.borderColor = "var(--accent)";
        document.getElementById("settings-view-grid").style.color = "var(--accent)";
        document.getElementById("settings-view-list").style.borderColor = "var(--border-color)";
        document.getElementById("settings-view-list").style.color = "var(--text-primary)";
    });

    document.getElementById("settings-view-list").addEventListener("click", (e) => {
        state.viewMode = "list";
        localStorage.setItem("gamevault_view_mode", "list");
        updateViewToggleUI();
        document.getElementById("settings-view-list").style.borderColor = "var(--accent)";
        document.getElementById("settings-view-list").style.color = "var(--accent)";
        document.getElementById("settings-view-grid").style.borderColor = "var(--border-color)";
        document.getElementById("settings-view-grid").style.color = "var(--text-primary)";
    });

    // Modals open/close
    document.getElementById("btn-add-game").addEventListener("click", () => openGameModal());
    document.getElementById("btn-close-game-modal").addEventListener("click", closeGameModal);
    document.getElementById("btn-cancel-game-modal").addEventListener("click", closeGameModal);

    document.getElementById("btn-open-import").addEventListener("click", openImportModal);
    document.getElementById("btn-close-import-modal").addEventListener("click", closeImportModal);
    document.getElementById("btn-cancel-import-modal").addEventListener("click", closeImportModal);

    // Add/Edit Game Form submit
    document.getElementById("form-game").addEventListener("submit", handleGameFormSubmit);

    // Details page back button
    document.getElementById("btn-details-back").addEventListener("click", () => {
        // Go back to the previous library view
        const prevSection = state.prevSection || "games";
        navigate(prevSection);
    });

    // Details action buttons
    document.getElementById("btn-details-edit").addEventListener("click", () => {
        const gameId = parseInt(document.getElementById("btn-details-edit").getAttribute("data-game-id"));
        openGameModal(gameId);
    });
    
    document.getElementById("btn-details-delete").addEventListener("click", () => {
        const gameId = parseInt(document.getElementById("btn-details-delete").getAttribute("data-game-id"));
        deleteGame(gameId);
    });

    document.getElementById("btn-details-fav").addEventListener("click", () => {
        const gameId = parseInt(document.getElementById("btn-details-fav").getAttribute("data-game-id"));
        toggleGameProperty(gameId, "favorite");
    });

    document.getElementById("btn-details-inst").addEventListener("click", () => {
        const gameId = parseInt(document.getElementById("btn-details-inst").getAttribute("data-game-id"));
        toggleGameProperty(gameId, "installed");
    });

    document.getElementById("btn-details-comp").addEventListener("click", () => {
        const gameId = parseInt(document.getElementById("btn-details-comp").getAttribute("data-game-id"));
        toggleGameProperty(gameId, "completed");
    });

    // Settings actions
    document.getElementById("settings-backup-data").addEventListener("click", exportLibraryJSON);
    
    const restoreInput = document.getElementById("settings-restore-file");
    document.getElementById("settings-btn-restore-trigger").addEventListener("click", () => restoreInput.click());
    restoreInput.addEventListener("change", handleRestoreJSON);

    document.getElementById("settings-reset-db").addEventListener("click", resetToSampleData);
    document.getElementById("settings-clear-db").addEventListener("click", wipeDatabase);

    // Export formats
    document.getElementById("btn-export-excel").addEventListener("click", exportLibraryExcel);
    document.getElementById("settings-export-excel").addEventListener("click", exportLibraryExcel);
    document.getElementById("settings-export-csv").addEventListener("click", exportLibraryCSV);
    document.getElementById("settings-export-json").addEventListener("click", exportLibraryJSON);

    // Import Drag & Drop
    const dropzone = document.getElementById("import-dropzone");
    const fileInput = document.getElementById("import-file-input");
    
    dropzone.addEventListener("click", () => fileInput.click());
    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.style.borderColor = "var(--accent)";
        dropzone.style.background = "rgba(0, 200, 83, 0.05)";
    });
    dropzone.addEventListener("dragleave", () => {
        dropzone.style.borderColor = "var(--border-color)";
        dropzone.style.background = "none";
    });
    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.style.borderColor = "var(--border-color)";
        dropzone.style.background = "none";
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleImportFileSelect();
        }
    });
    fileInput.addEventListener("change", handleImportFileSelect);
    document.getElementById("btn-submit-import").addEventListener("click", processImportFile);

    // Admin Modals & Form Listeners
    document.getElementById("btn-close-admin-modal").addEventListener("click", closeAdminLoginModal);
    document.getElementById("btn-cancel-admin-modal").addEventListener("click", closeAdminLoginModal);
    document.getElementById("form-admin-login").addEventListener("submit", handleAdminLoginSubmit);
    document.getElementById("btn-admin-logout").addEventListener("click", handleAdminLogout);
}

function navigate(section) {
    // Keep track of history
    if (state.activeSection !== "game-details") {
        state.prevSection = state.activeSection;
    }
    
    state.activeSection = section;

    // Update active class in sidebar
    document.querySelectorAll("[data-section-target]").forEach(item => {
        if (item.getAttribute("data-section-target") === section) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Special behavior for sub-filters from sidebar
    if (section === "favorites" || section === "completed" || section === "wishlist" || section === "installed") {
        // We will show the games section but with forced filters
        document.querySelectorAll(".content-section").forEach(s => s.classList.remove("active"));
        document.getElementById("section-games").classList.add("active");
        
        // Update Title on games page
        const titleMap = {
            favorites: "Favorite Games",
            completed: "Completed Games",
            wishlist: "Wishlist Games",
            installed: "Installed Games"
        };
        document.getElementById("games-page-title").innerText = titleMap[section];
        document.getElementById("games-page-subtitle").innerText = `Viewing all games marked as ${section}.`;
        
        renderGamesList();
        return;
    }

    // Normal navigation
    document.getElementById("games-page-title").innerText = "Games Library";
    document.getElementById("games-page-subtitle").innerText = "Browse, search, and manage your games collection.";

    document.querySelectorAll(".content-section").forEach(s => {
        if (s.id === `section-${section}`) {
            s.classList.add("active");
        } else {
            s.classList.remove("active");
        }
    });

    // Load content specific to the section
    if (section === "dashboard") {
        renderDashboard();
    } else if (section === "games") {
        renderGamesList();
    } else if (section === "categories") {
        renderCategories();
    } else if (section === "platforms") {
        renderPlatforms();
    } else if (section === "analytics") {
        renderAnalytics();
    } else if (section === "admin") {
        renderAdminPanel();
    }
}

function refreshAllViews() {
    updateFilterOptions();
    if (state.activeSection === "dashboard") renderDashboard();
    else if (state.activeSection === "games" || state.activeSection === "favorites" || state.activeSection === "completed" || state.activeSection === "wishlist" || state.activeSection === "installed") renderGamesList();
    else if (state.activeSection === "categories") renderCategories();
    else if (state.activeSection === "platforms") renderPlatforms();
    else if (state.activeSection === "analytics") renderAnalytics();
}

function updateViewToggleUI() {
    const gridBtn = document.getElementById("btn-view-grid");
    const listBtn = document.getElementById("btn-view-list");
    
    if (state.viewMode === "grid") {
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    } else {
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    }
}

// --- Dashboard Render ---
function renderDashboard() {
    // 1. Compute Stats
    const totalGames = state.games.length;
    const installedGames = state.games.filter(g => g.installed).length;
    const playingGames = state.games.filter(g => g.status === "Playing").length;
    const completedGames = state.games.filter(g => g.completed || g.status === "Completed").length;
    const wishlistGames = state.games.filter(g => g.status === "Wishlist").length;
    const favoriteGames = state.games.filter(g => g.favorite).length;
    const totalPlaytime = state.games.reduce((sum, g) => sum + (g.playtime || 0), 0);
    
    const ratedGames = state.games.filter(g => g.rating > 0);
    const avgRating = ratedGames.length > 0 
        ? (ratedGames.reduce((sum, g) => sum + g.rating, 0) / ratedGames.length).toFixed(1) 
        : "0.0";

    // 2. Set Stats Text
    document.getElementById("stat-total-games").innerText = totalGames;
    document.getElementById("stat-installed").innerText = installedGames;
    document.getElementById("stat-playing").innerText = playingGames;
    document.getElementById("stat-completed").innerText = completedGames;
    document.getElementById("stat-wishlist").innerText = wishlistGames;
    document.getElementById("stat-favorites").innerText = favoriteGames;
    document.getElementById("stat-playtime").innerText = `${totalPlaytime}h`;
    document.getElementById("stat-avg-rating").innerText = avgRating;

    // 3. Render Hero Banner
    // Pick a featured game (a favorite with cover/banner, or just a high-rated one, or the first)
    const featuredCandidates = state.games.filter(g => g.favorite && g.bannerUrl);
    const heroGame = featuredCandidates.length > 0 
        ? featuredCandidates[Math.floor(Math.random() * featuredCandidates.length)] 
        : (state.games.length > 0 ? state.games[0] : null);

    const heroBanner = document.getElementById("dashboard-hero");
    const heroTitle = document.getElementById("hero-title");
    const heroDesc = document.getElementById("hero-desc");
    const heroBadge = document.getElementById("hero-badge");
    const heroActionBtn = document.getElementById("hero-action-btn");

    if (heroGame) {
        heroBanner.style.backgroundImage = `url('${heroGame.bannerUrl || heroGame.coverUrl}')`;
        heroTitle.innerText = heroGame.name;
        heroDesc.innerText = heroGame.description ? shortenText(heroGame.description, 180) : "No description available.";
        heroBadge.innerText = heroGame.genre;
        heroActionBtn.style.display = "inline-flex";
        heroActionBtn.onclick = () => showGameDetails(heroGame.id);
    } else {
        heroBanner.style.backgroundImage = `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80')`;
        heroTitle.innerText = "Welcome to GameVault";
        heroDesc.innerText = "Add games to your library to start tracking your gaming journey.";
        heroBadge.innerText = "Gaming Portal";
        heroActionBtn.style.display = "none";
    }

    // 4. Render Carousels
    // Recently Added (last 8 added games)
    const recentlyAdded = [...state.games].sort((a, b) => new Date(b.addedAt || 0) - new Date(a.addedAt || 0)).slice(0, 8);
    renderCarousel("carousel-recently-added", recentlyAdded);

    // Continue Playing (status === "Playing", sorted by playtime desc)
    const continuePlaying = state.games.filter(g => g.status === "Playing").sort((a, b) => b.playtime - a.playtime).slice(0, 8);
    renderCarousel("carousel-continue-playing", continuePlaying);

    // Favorites
    const favorites = state.games.filter(g => g.favorite).slice(0, 8);
    renderCarousel("carousel-favorites", favorites);
}

function renderCarousel(containerId, gameList) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (gameList.length === 0) {
        container.innerHTML = `<div class="no-games-placeholder" style="padding: 2rem 0;"><i class="fas fa-gamepad" style="font-size: 2rem;"></i><p style="font-size: 0.85rem; color: var(--text-secondary);">No games in this section.</p></div>`;
        return;
    }

    gameList.forEach(game => {
        const card = createGameCard(game);
        container.appendChild(card);
    });
}

// --- Games List Render ---
function renderGamesList() {
    const grid = document.getElementById("games-grid");
    grid.innerHTML = "";

    // Apply sidebar section filters if active
    let filteredGames = [...state.games];
    
    if (state.activeSection === "favorites") {
        filteredGames = filteredGames.filter(g => g.favorite);
    } else if (state.activeSection === "completed") {
        filteredGames = filteredGames.filter(g => g.completed || g.status === "Completed");
    } else if (state.activeSection === "wishlist") {
        filteredGames = filteredGames.filter(g => g.status === "Wishlist");
    } else if (state.activeSection === "installed") {
        filteredGames = filteredGames.filter(g => g.installed);
    }

    // Apply general search
    if (state.searchQuery.trim() !== "") {
        const query = state.searchQuery.toLowerCase().trim();
        filteredGames = filteredGames.filter(g => 
            g.name.toLowerCase().includes(query) ||
            g.genre.toLowerCase().includes(query) ||
            (g.developer && g.developer.toLowerCase().includes(query)) ||
            (g.publisher && g.publisher.toLowerCase().includes(query)) ||
            g.platform.toLowerCase().includes(query) ||
            (g.engine && g.engine.toLowerCase().includes(query)) ||
            (g.tags && g.tags.toLowerCase().includes(query))
        );
    }

    // Apply filter panel values
    Object.keys(state.filters).forEach(key => {
        const val = state.filters[key];
        if (val !== "") {
            if (key === "installed" || key === "favorite") {
                const boolVal = val === "true";
                filteredGames = filteredGames.filter(g => g[key] === boolVal);
            } else if (key === "rating") {
                const minRating = parseFloat(val);
                filteredGames = filteredGames.filter(g => g.rating >= minRating);
            } else if (key === "year") {
                filteredGames = filteredGames.filter(g => g.releaseDate && g.releaseDate.startsWith(val));
            } else {
                filteredGames = filteredGames.filter(g => g[key] && g[key].toLowerCase() === val.toLowerCase());
            }
        }
    });

    // Apply Sorting
    filteredGames.sort((a, b) => {
        switch (state.sortBy) {
            case "name-asc":
                return a.name.localeCompare(b.name);
            case "name-desc":
                return b.name.localeCompare(a.name);
            case "rating-desc":
                return b.rating - a.rating;
            case "rating-asc":
                return a.rating - b.rating;
            case "release-desc":
                return new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0);
            case "release-asc":
                return new Date(a.releaseDate || 0) - new Date(b.releaseDate || 0);
            case "added-desc":
                return new Date(b.addedAt || 0) - new Date(a.addedAt || 0);
            case "playtime-desc":
                return (b.playtime || 0) - (a.playtime || 0);
            case "size-desc":
                return (b.size || 0) - (a.size || 0);
            default:
                return a.name.localeCompare(b.name);
        }
    });

    // Update Active Filter Tags
    renderActiveFilterTags();

    // Render Grid / List View
    if (state.viewMode === "list") {
        grid.classList.add("list-view");
    } else {
        grid.classList.remove("list-view");
    }

    if (filteredGames.length === 0) {
        grid.innerHTML = `
            <div class="no-games-placeholder">
                <i class="fas fa-search"></i>
                <h3>No Games Found</h3>
                <p>Try adjusting your search query or filters.</p>
            </div>
        `;
        return;
    }

    filteredGames.forEach(game => {
        const card = createGameCard(game);
        grid.appendChild(card);
    });

    // Update admin controls visibility for newly rendered cards
    updateAdminUI();
}

function createGameCard(game) {
    const card = document.createElement("div");
    card.className = "game-card glass";
    
    // Cover and Banner fallback
    const cover = game.coverUrl || "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400";
    const banner = game.bannerUrl || cover;

    // Rating stars HTML
    const ratingStars = `<i class="fas fa-star" style="color: #FFD700;"></i> ${game.rating.toFixed(1)}`;

    card.innerHTML = `
        <div class="card-media-wrapper">
            <img src="${banner}" alt="${game.name} Banner" class="card-banner-img" loading="lazy">
            <div class="card-media-overlay"></div>
            
            <div class="card-cover-wrapper">
                <img src="${cover}" alt="${game.name} Cover" class="card-cover-img" loading="lazy">
            </div>

            <div class="card-quick-indicators">
                <button class="indicator-badge ${game.favorite ? 'active fav' : ''}" onclick="event.stopPropagation(); toggleGameProperty(${game.id}, 'favorite')" title="Favorite">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="indicator-badge ${game.installed ? 'active inst' : ''}" onclick="event.stopPropagation(); toggleGameProperty(${game.id}, 'installed')" title="Installed">
                    <i class="fas fa-download"></i>
                </button>
                <button class="indicator-badge ${game.completed ? 'active comp' : ''}" onclick="event.stopPropagation(); toggleGameProperty(${game.id}, 'completed')" title="Completed">
                    <i class="fas fa-trophy"></i>
                </button>
            </div>
        </div>

        <div class="card-body">
            <div class="card-title-row">
                <h3 class="card-title" title="${game.name}">${game.name}</h3>
                <div class="card-rating-badge">${ratingStars}</div>
            </div>
            
            <div class="card-meta-badges">
                <span class="card-badge">${game.genre}</span>
                <span class="card-badge platform-badge">${game.platform}</span>
            </div>

            <div class="card-specs-grid">
                <div class="spec-item" title="Developer: ${game.developer || '-'}">
                    <i class="fas fa-code-branch"></i> <span>${game.developer || '-'}</span>
                </div>
                <div class="spec-item" title="Playtime: ${game.playtime || 0}h">
                    <i class="fas fa-clock"></i> <span>${game.playtime || 0} hrs</span>
                </div>
                <div class="spec-item" title="Game Size: ${game.size ? game.size + ' GB' : '-'}">
                    <i class="fas fa-hdd"></i> <span>${game.size ? game.size + ' GB' : '-'}</span>
                </div>
                <div class="spec-item" title="Status: ${game.status}">
                    <i class="fas fa-tasks"></i> <span>${game.status}</span>
                </div>
            </div>

            <div class="card-actions">
                <button class="btn-card btn-card-main" onclick="event.stopPropagation(); showGameDetails(${game.id})">
                    <i class="fas fa-info-circle"></i> View
                </button>
                <button class="btn-card admin-only" onclick="event.stopPropagation(); openGameModal(${game.id})" title="Edit Game">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-card btn-card-danger admin-only" onclick="event.stopPropagation(); deleteGame(${game.id})" title="Delete Game">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `;

    // Click card to open details
    card.addEventListener("click", () => showGameDetails(game.id));

    return card;
}

// --- Filter Panel Helpers ---
function updateFilterOptions() {
    const genres = new Set();
    const platforms = new Set();
    const developers = new Set();
    const publishers = new Set();
    const years = new Set();
    const engines = new Set();

    state.games.forEach(g => {
        if (g.genre) genres.add(g.genre);
        if (g.platform) platforms.add(g.platform);
        if (g.developer) developers.add(g.developer);
        if (g.publisher) publishers.add(g.publisher);
        if (g.engine) engines.add(g.engine);
        if (g.releaseDate) {
            const year = g.releaseDate.split("-")[0];
            if (year) years.add(year);
        }
    });

    populateFilterSelect("filter-genre", genres, "All Genres");
    populateFilterSelect("filter-platform", platforms, "All Platforms");
    populateFilterSelect("filter-developer", developers, "All Developers");
    populateFilterSelect("filter-publisher", publishers, "All Publishers");
    populateFilterSelect("filter-engine", engines, "All Engines");
    
    // Years sorted descending
    const sortedYears = Array.from(years).sort((a, b) => b - a);
    const yearSelect = document.getElementById("filter-year");
    yearSelect.innerHTML = '<option value="">All Years</option>';
    sortedYears.forEach(y => {
        const opt = document.createElement("option");
        opt.value = y;
        opt.innerText = y;
        opt.selected = state.filters.year === y;
        yearSelect.appendChild(opt);
    });
}

function populateFilterSelect(elementId, itemSet, defaultText) {
    const select = document.getElementById(elementId);
    const currentVal = state.filters[elementId.replace("filter-", "")];
    
    select.innerHTML = `<option value="">${defaultText}</option>`;
    
    const sortedItems = Array.from(itemSet).sort();
    sortedItems.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item;
        opt.innerText = item;
        opt.selected = currentVal === item;
        select.appendChild(opt);
    });
}

function renderActiveFilterTags() {
    const container = document.getElementById("active-filters-tags");
    const row = document.getElementById("active-filters-row");
    container.innerHTML = "";

    let activeCount = 0;
    
    Object.keys(state.filters).forEach(key => {
        const val = state.filters[key];
        if (val !== "") {
            activeCount++;
            const tag = document.createElement("div");
            tag.className = "active-filter-tag";
            
            let displayVal = val;
            if (key === "installed") displayVal = val === "true" ? "Installed" : "Not Installed";
            if (key === "favorite") displayVal = "Favorite";
            if (key === "rating") displayVal = `${val}+ Stars`;

            tag.innerHTML = `
                <span>${key.toUpperCase()}: ${displayVal}</span>
                <i class="fas fa-times" onclick="removeFilter('${key}')"></i>
            `;
            container.appendChild(tag);
        }
    });

    if (activeCount > 0) {
        row.classList.remove("hidden");
    } else {
        row.classList.add("hidden");
    }
}

function removeFilter(key) {
    state.filters[key] = "";
    const select = document.getElementById(`filter-${key}`);
    if (select) select.value = "";
    renderGamesList();
}

function clearAllFilters() {
    Object.keys(state.filters).forEach(key => {
        state.filters[key] = "";
        const select = document.getElementById(`filter-${key}`);
        if (select) select.value = "";
    });
    document.getElementById("global-search").value = "";
    state.searchQuery = "";
    renderGamesList();
}

// --- Categories and Platforms Grid Render ---
function renderCategories() {
    const grid = document.getElementById("categories-grid");
    grid.innerHTML = "";

    // Count games per category
    const counts = {};
    CATEGORIES.forEach(c => counts[c] = 0);
    state.games.forEach(g => {
        if (counts[g.genre] !== undefined) {
            counts[g.genre]++;
        }
    });

    // Icons map for categories
    const icons = {
        "Action": "fa-fire", "Adventure": "fa-compass", "Anime": "fa-palette", 
        "JRPG": "fa-dragon", "RPG": "fa-shield-alt", "FPS": "fa-crosshairs", 
        "TPS": "fa-bullseye", "Open World": "fa-globe-americas", "Sandbox": "fa-cube", 
        "Simulation": "fa-gamepad", "Sports": "fa-football-ball", "Racing": "fa-car", 
        "Fighting": "fa-fist-raised", "Strategy": "fa-chess", "Puzzle": "fa-puzzle-piece", 
        "Visual Novel": "fa-book", "MMORPG": "fa-users", "Survival": "fa-tombstone", 
        "Horror": "fa-ghost", "Indie": "fa-lightbulb", "Platformer": "fa-shoe-prints"
    };

    CATEGORIES.forEach(cat => {
        const count = counts[cat] || 0;
        const icon = icons[cat] || "fa-tag";
        
        const card = document.createElement("div");
        card.className = "category-item-card glass";
        card.innerHTML = `
            <i class="fas ${icon}"></i>
            <h4>${cat}</h4>
            <span>${count} Games</span>
        `;
        card.addEventListener("click", () => {
            clearAllFilters();
            state.filters.genre = cat;
            navigate("games");
            const select = document.getElementById("filter-genre");
            if (select) select.value = cat;
        });
        grid.appendChild(card);
    });
}

function renderPlatforms() {
    const grid = document.getElementById("platforms-grid");
    grid.innerHTML = "";

    // Count games per platform
    const counts = {};
    PLATFORMS.forEach(p => counts[p] = 0);
    state.games.forEach(g => {
        if (counts[g.platform] !== undefined) {
            counts[g.platform]++;
        }
    });

    // Icons map for platforms
    const icons = {
        "Steam": "fa-brands fa-steam", "Epic Games": "fa-gamepad", "EA App": "fa-brands fa-kickstarter",
        "Ubisoft Connect": "fa-gamepad", "Battle.net": "fa-fire-alt", "GOG": "fa-brands fa-google",
        "Xbox": "fa-brands fa-xbox", "PlayStation": "fa-brands fa-playstation", 
        "Nintendo Switch": "fa-gamepad", "Android": "fa-brands fa-android", 
        "iOS": "fa-brands fa-apple", "PC": "fa-desktop"
    };

    PLATFORMS.forEach(plat => {
        const count = counts[plat] || 0;
        const icon = icons[plat] || "fa-desktop";
        
        const card = document.createElement("div");
        card.className = "platform-item-card glass";
        card.innerHTML = `
            <i class="${icon}"></i>
            <h4>${plat}</h4>
            <span>${count} Games</span>
        `;
        card.addEventListener("click", () => {
            clearAllFilters();
            state.filters.platform = plat;
            navigate("games");
            const select = document.getElementById("filter-platform");
            if (select) select.value = plat;
        });
        grid.appendChild(card);
    });
}

// --- Add/Edit Game Modal Handlers ---
function populateFormSelects() {
    const genreSelect = document.getElementById("form-genre");
    genreSelect.innerHTML = '<option value="">Select Genre</option>';
    CATEGORIES.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.innerText = c;
        genreSelect.appendChild(opt);
    });

    const platSelect = document.getElementById("form-platform");
    platSelect.innerHTML = '<option value="">Select Platform</option>';
    PLATFORMS.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p;
        opt.innerText = p;
        platSelect.appendChild(opt);
    });
}

function openGameModal(gameId = null) {
    if (!state.isAdmin) {
        showToast("Access Denied: Administrator privileges required.", "error");
        return;
    }
    const modal = document.getElementById("modal-game");
    const form = document.getElementById("form-game");
    const title = document.getElementById("modal-game-title");
    
    form.reset();
    document.getElementById("form-game-id").value = "";

    if (gameId) {
        // Edit Mode
        const game = state.games.find(g => g.id === gameId);
        if (!game) return;
        
        title.innerText = `Edit Game: ${game.name}`;
        
        document.getElementById("form-game-id").value = game.id;
        document.getElementById("form-name").value = game.name;
        document.getElementById("form-cover-url").value = game.coverUrl || "";
        document.getElementById("form-banner-url").value = game.bannerUrl || "";
        document.getElementById("form-genre").value = game.genre;
        document.getElementById("form-subgenre").value = game.subgenre || "";
        document.getElementById("form-platform").value = game.platform;
        document.getElementById("form-store").value = game.store || "";
        document.getElementById("form-developer").value = game.developer || "";
        document.getElementById("form-publisher").value = game.publisher || "";
        document.getElementById("form-release-date").value = game.releaseDate || "";
        document.getElementById("form-engine").value = game.engine || "";
        document.getElementById("form-version").value = game.version || "";
        document.getElementById("form-language").value = game.language || "";
        document.getElementById("form-size").value = game.size || "";
        document.getElementById("form-rating").value = game.rating || "";
        document.getElementById("form-playtime").value = game.playtime || 0;
        document.getElementById("form-status").value = game.status;
        document.getElementById("form-website-url").value = game.websiteUrl || "";
        document.getElementById("form-trailer-url").value = game.trailerUrl || "";
        document.getElementById("form-download-url").value = game.downloadUrl || "";

        // Sys Requirements
        if (game.minRequirements) {
            document.getElementById("form-min-os").value = game.minRequirements.os || "";
            document.getElementById("form-min-cpu").value = game.minRequirements.cpu || "";
            document.getElementById("form-min-ram").value = game.minRequirements.ram || "";
            document.getElementById("form-min-gpu").value = game.minRequirements.gpu || "";
            document.getElementById("form-min-storage").value = game.minRequirements.storage || "";
        }
        if (game.recRequirements) {
            document.getElementById("form-rec-os").value = game.recRequirements.os || "";
            document.getElementById("form-rec-cpu").value = game.recRequirements.cpu || "";
            document.getElementById("form-rec-ram").value = game.recRequirements.ram || "";
            document.getElementById("form-rec-gpu").value = game.recRequirements.gpu || "";
            document.getElementById("form-rec-storage").value = game.recRequirements.storage || "";
        }

        // Checkboxes
        document.getElementById("form-favorite").checked = !!game.favorite;
        document.getElementById("form-installed").checked = !!game.installed;
        document.getElementById("form-completed").checked = !!game.completed;

        document.getElementById("form-description").value = game.description || "";
        document.getElementById("form-notes").value = game.notes || "";
        document.getElementById("form-tags").value = game.tags || "";
    } else {
        // Add Mode
        title.innerText = "Add New Game";
    }

    modal.classList.add("open");
}

function closeGameModal() {
    document.getElementById("modal-game").classList.remove("open");
}

async function handleGameFormSubmit(e) {
    e.preventDefault();
    if (!state.isAdmin) {
        showToast("Access Denied: Administrator privileges required.", "error");
        return;
    }

    const gameIdVal = document.getElementById("form-game-id").value;
    const name = document.getElementById("form-name").value.trim();
    
    const gameData = {
        name: name,
        coverUrl: document.getElementById("form-cover-url").value.trim(),
        bannerUrl: document.getElementById("form-banner-url").value.trim(),
        genre: document.getElementById("form-genre").value,
        subgenre: document.getElementById("form-subgenre").value.trim(),
        platform: document.getElementById("form-platform").value,
        store: document.getElementById("form-store").value,
        developer: document.getElementById("form-developer").value.trim(),
        publisher: document.getElementById("form-publisher").value.trim(),
        releaseDate: document.getElementById("form-release-date").value,
        engine: document.getElementById("form-engine").value.trim(),
        version: document.getElementById("form-version").value.trim(),
        language: document.getElementById("form-language").value.trim(),
        size: parseFloat(document.getElementById("form-size").value) || 0,
        rating: parseFloat(document.getElementById("form-rating").value) || 0,
        playtime: parseInt(document.getElementById("form-playtime").value) || 0,
        status: document.getElementById("form-status").value,
        websiteUrl: document.getElementById("form-website-url").value.trim(),
        trailerUrl: document.getElementById("form-trailer-url").value.trim(),
        downloadUrl: document.getElementById("form-download-url").value.trim(),
        
        minRequirements: {
            os: document.getElementById("form-min-os").value.trim(),
            cpu: document.getElementById("form-min-cpu").value.trim(),
            ram: document.getElementById("form-min-ram").value.trim(),
            gpu: document.getElementById("form-min-gpu").value.trim(),
            storage: document.getElementById("form-min-storage").value.trim(),
        },
        recRequirements: {
            os: document.getElementById("form-rec-os").value.trim(),
            cpu: document.getElementById("form-rec-cpu").value.trim(),
            ram: document.getElementById("form-rec-ram").value.trim(),
            gpu: document.getElementById("form-rec-gpu").value.trim(),
            storage: document.getElementById("form-rec-storage").value.trim(),
        },
        
        favorite: document.getElementById("form-favorite").checked,
        installed: document.getElementById("form-installed").checked,
        completed: document.getElementById("form-completed").checked,
        description: document.getElementById("form-description").value.trim(),
        notes: document.getElementById("form-notes").value.trim(),
        tags: document.getElementById("form-tags").value.trim()
    };

    try {
        if (gameIdVal) {
            // Update Game
            const id = parseInt(gameIdVal);
            const index = state.games.findIndex(g => g.id === id);
            if (index !== -1) {
                gameData.id = id;
                gameData.addedAt = state.games[index].addedAt || new Date().toISOString();
                
                const response = await fetch(`/api/games/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(gameData)
                });
                if (!response.ok) throw new Error("Failed to update game on server");
                
                const serverGame = await response.json();
                state.games[index] = serverGame;
                showToast(`Game "${name}" updated successfully!`, "success");
            }
        } else {
            // Create Game
            const response = await fetch("/api/games", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(gameData)
            });
            if (!response.ok) throw new Error("Failed to create game on server");
            
            const serverGame = await response.json();
            state.games.push(serverGame);
            showToast(`Game "${name}" added to library!`, "success");
        }

        saveToLocalStorage();
        closeGameModal();
        refreshAllViews();

        // If currently viewing details of this game, refresh details
        if (state.activeSection === "game-details" && gameIdVal) {
            showGameDetails(parseInt(gameIdVal));
        }
    } catch (err) {
        console.error("Save game form failed:", err);
        showToast("Failed to save game to server.", "error");
    }
}

async function deleteGame(gameId) {
    if (!state.isAdmin) {
        showToast("Access Denied: Administrator privileges required.", "error");
        return;
    }
    const game = state.games.find(g => g.id === gameId);
    if (!game) return;

    if (confirm(`Are you sure you want to delete "${game.name}"?`)) {
        try {
            const response = await fetch(`/api/games/${gameId}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete game on server");
            
            state.games = state.games.filter(g => g.id !== gameId);
            saveToLocalStorage();
            showToast(`Game "${game.name}" deleted.`, "info");
            
            if (state.activeSection === "game-details") {
                navigate("games");
            } else {
                refreshAllViews();
            }
        } catch (e) {
            console.error("Delete failed:", e);
            showToast("Failed to delete game from server.", "error");
        }
    }
}

async function toggleGameProperty(gameId, prop) {
    const game = state.games.find(g => g.id === gameId);
    if (!game) return;

    const wasInstalled = game.installed;
    
    // Clone and toggle property
    const updatedGame = { ...game };
    updatedGame[prop] = !updatedGame[prop];
    
    // Sync status if completed
    if (prop === "completed") {
        updatedGame.status = updatedGame.completed ? "Completed" : "Playing";
    }

    try {
        const response = await fetch(`/api/games/${gameId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedGame)
        });
        if (!response.ok) throw new Error("Failed to update game on server");
        
        const serverGame = await response.json();
        const index = state.games.findIndex(g => g.id === gameId);
        if (index !== -1) {
            state.games[index] = serverGame;
        }

        saveToLocalStorage();
        
        // If installing and has a download link, open it
        if (prop === "installed" && serverGame.installed && !wasInstalled && serverGame.downloadUrl) {
            window.open(serverGame.downloadUrl, "_blank");
            showToast(`Opening installation link for ${serverGame.name}...`, "success");
        }
        
        // Toast notification
        if (prop === "favorite") {
            showToast(serverGame.favorite ? `Added "${serverGame.name}" to Favorites` : `Removed "${serverGame.name}" from Favorites`, "info");
        } else if (prop === "installed") {
            showToast(serverGame.installed ? `Marked "${serverGame.name}" as Installed` : `Marked "${serverGame.name}" as Uninstalled`, "info");
        } else if (prop === "completed") {
            showToast(serverGame.completed ? `Marked "${serverGame.name}" as Completed!` : `Marked "${serverGame.name}" as In Progress`, "info");
        }

        // Refresh UI
        if (state.activeSection === "game-details") {
            showGameDetails(gameId);
        } else {
            refreshAllViews();
        }
    } catch (e) {
        console.error("Toggle property failed:", e);
        showToast("Failed to update game state on server.", "error");
    }
}

// --- Game Details View ---
function showGameDetails(gameId) {
    const game = state.games.find(g => g.id === gameId);
    if (!game) return;

    navigate("game-details");

    // Banner and Cover
    const cover = game.coverUrl || "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400";
    const banner = game.bannerUrl || cover;

    document.getElementById("details-hero-banner").style.backgroundImage = `url('${banner}')`;
    document.getElementById("details-cover").src = cover;
    document.getElementById("details-cover").alt = game.name;
    document.getElementById("details-title").innerText = game.name;

    // Badges
    const badgeContainer = document.getElementById("details-badges");
    badgeContainer.innerHTML = `
        <span class="card-badge">${game.genre}</span>
        <span class="card-badge platform-badge">${game.platform}</span>
        ${game.status ? `<span class="card-badge" style="background: rgba(0, 191, 255, 0.1); color: #00BFFF; border-color: rgba(0, 191, 255, 0.2);">${game.status}</span>` : ''}
    `;

    // Action buttons active state
    const favBtn = document.getElementById("btn-details-fav");
    const instBtn = document.getElementById("btn-details-inst");
    const compBtn = document.getElementById("btn-details-comp");

    favBtn.setAttribute("data-game-id", game.id);
    instBtn.setAttribute("data-game-id", game.id);
    compBtn.setAttribute("data-game-id", game.id);
    document.getElementById("btn-details-edit").setAttribute("data-game-id", game.id);
    document.getElementById("btn-details-delete").setAttribute("data-game-id", game.id);

    if (game.favorite) favBtn.classList.add("active");
    else favBtn.classList.remove("active");

    if (game.installed) instBtn.classList.add("active");
    else instBtn.classList.remove("active");

    if (game.completed) compBtn.classList.add("active");
    else compBtn.classList.remove("active");

    // Info panel
    document.getElementById("details-genre").innerText = game.genre;
    document.getElementById("details-subgenre").innerText = game.subgenre || "-";
    document.getElementById("details-platform").innerText = game.platform;
    document.getElementById("details-developer").innerText = game.developer || "-";
    document.getElementById("details-publisher").innerText = game.publisher || "-";
    document.getElementById("details-release").innerText = game.releaseDate || "-";
    document.getElementById("details-engine").innerText = game.engine || "-";
    document.getElementById("details-version").innerText = game.version || "-";
    document.getElementById("details-language").innerText = game.language || "-";
    document.getElementById("details-size").innerText = game.size ? `${game.size} GB` : "-";
    document.getElementById("details-rating").innerHTML = `<i class="fas fa-star" style="color: #FFD700; margin-right: 4px;"></i> ${game.rating.toFixed(1)} / 5.0`;
    document.getElementById("details-playtime").innerText = `${game.playtime || 0} hours`;
    document.getElementById("details-status").innerText = game.status;
    document.getElementById("details-store").innerText = game.store || "-";
    
    // Download Link Row
    const downloadRow = document.getElementById("details-download-row");
    const downloadLink = document.getElementById("details-download");
    if (game.downloadUrl) {
        downloadRow.style.display = "flex";
        downloadLink.href = game.downloadUrl;
    } else {
        downloadRow.style.display = "none";
    }

    // Setup Primary Play / Install Button
    const playBtn = document.getElementById("btn-details-play-launch");
    if (playBtn) {
        if (game.installed) {
            playBtn.innerHTML = `<i class="fas fa-download"></i> Download`;
            playBtn.className = "btn-details-primary";
            playBtn.onclick = () => {
                if (game.downloadUrl) {
                    window.open(game.downloadUrl, "_blank");
                    showToast(`Opening download link for ${game.name}...`, "success");
                } else if (game.websiteUrl) {
                    window.open(game.websiteUrl, "_blank");
                    showToast(`Opening website for ${game.name}...`, "info");
                } else {
                    showToast(`Starting download for ${game.name}...`, "success");
                }
            };
        } else {
            playBtn.innerHTML = `<i class="fas fa-download"></i> Install`;
            playBtn.className = "btn-details-primary install-style";
            playBtn.onclick = () => {
                if (game.downloadUrl) {
                    window.open(game.downloadUrl, "_blank");
                    showToast(`Starting installation for ${game.name}...`, "success");
                    toggleGameProperty(game.id, "installed");
                } else {
                    showToast("No download/install link provided. Edit the game to add one.", "warning");
                }
            };
        }
    }

    // Website Row
    const webRow = document.getElementById("details-website-row");
    const webLink = document.getElementById("details-website");
    if (game.websiteUrl) {
        webRow.style.display = "flex";
        webLink.href = game.websiteUrl;
    } else {
        webRow.style.display = "none";
    }

    // Description & Notes
    document.getElementById("details-description").innerText = game.description || "No description available.";
    document.getElementById("details-notes").innerText = game.notes || "No personal notes. Click Edit to add some.";

    // Requirements
    const min = game.minRequirements || {};
    const rec = game.recRequirements || {};
    document.getElementById("details-min-os").innerText = min.os || "-";
    document.getElementById("details-min-cpu").innerText = min.cpu || "-";
    document.getElementById("details-min-ram").innerText = min.ram || "-";
    document.getElementById("details-min-gpu").innerText = min.gpu || "-";
    document.getElementById("details-min-storage").innerText = min.storage || "-";

    document.getElementById("details-rec-os").innerText = rec.os || "-";
    document.getElementById("details-rec-cpu").innerText = rec.cpu || "-";
    document.getElementById("details-rec-ram").innerText = rec.ram || "-";
    document.getElementById("details-rec-gpu").innerText = rec.gpu || "-";
    document.getElementById("details-rec-storage").innerText = rec.storage || "-";

    // Trailer iframe
    const mediaCard = document.getElementById("details-media-card");
    const trailer = document.getElementById("details-trailer");
    
    if (game.trailerUrl) {
        mediaCard.style.display = "block";
        let embedUrl = game.trailerUrl;
        
        // Convert watch URL to embed if necessary
        if (embedUrl.includes("watch?v=")) {
            const videoId = embedUrl.split("v=")[1].split("&")[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (embedUrl.includes("youtu.be/")) {
            const videoId = embedUrl.split("youtu.be/")[1].split("?")[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
        trailer.src = embedUrl;
    } else {
        mediaCard.style.display = "none";
        trailer.src = "";
    }

    // Tags
    const tagsContainer = document.getElementById("details-tags");
    tagsContainer.innerHTML = "";
    if (game.tags) {
        const tagsList = game.tags.split(",").map(t => t.trim()).filter(t => t !== "");
        tagsList.forEach(t => {
            const badge = document.createElement("span");
            badge.className = "tag-badge";
            badge.innerText = t;
            tagsContainer.appendChild(badge);
        });
    } else {
        tagsContainer.innerHTML = '<span style="font-size: 0.85rem; color: var(--text-secondary);">No tags assigned.</span>';
    }

    // Update admin controls visibility for details page
    updateAdminUI();
}

// --- Analytics Render (Chart.js) ---
function renderAnalytics() {
    // Destroy previous charts if they exist to prevent hover glitches
    Object.keys(state.charts).forEach(key => {
        if (state.charts[key] && typeof state.charts[key].destroy === 'function') {
            state.charts[key].destroy();
        }
    });

    const games = state.games;

    if (games.length === 0) {
        showToast("Add games to view analytics charts.", "info");
        return;
    }

    // Chart 1: Games by Genre (Doughnut)
    const genreData = {};
    games.forEach(g => {
        genreData[g.genre] = (genreData[g.genre] || 0) + 1;
    });
    
    state.charts.genre = new Chart(document.getElementById("chart-genre").getContext("2d"), {
        type: "doughnut",
        data: {
            labels: Object.keys(genreData),
            datasets: [{
                data: Object.values(genreData),
                backgroundColor: [
                    "#00C853", "#00BFFF", "#FFD700", "#FF4500", "#E040FB", "#FF1493",
                    "#9400D3", "#4B0082", "#0000FF", "#32CD32", "#FF8C00", "#8B0000"
                ],
                borderWidth: 1,
                borderColor: "#181818"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right",
                    labels: { color: "#FFFFFF", font: { family: "Poppins", size: 11 } }
                }
            }
        }
    });

    // Chart 2: Games by Platform (Pie)
    const platformData = {};
    games.forEach(g => {
        platformData[g.platform] = (platformData[g.platform] || 0) + 1;
    });

    state.charts.platform = new Chart(document.getElementById("chart-platform").getContext("2d"), {
        type: "pie",
        data: {
            labels: Object.keys(platformData),
            datasets: [{
                data: Object.values(platformData),
                backgroundColor: [
                    "#FF4500", "#FFD700", "#00C853", "#00BFFF", "#E040FB", "#7CFC00",
                    "#D2691E", "#4682B4", "#8A2BE2", "#5F9EA0", "#D8BFD8", "#F0E68C"
                ],
                borderWidth: 1,
                borderColor: "#181818"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right",
                    labels: { color: "#FFFFFF", font: { family: "Poppins", size: 11 } }
                }
            }
        }
    });

    // Chart 3: Rating Distribution (Bar)
    const ratingBuckets = { "4.5 - 5.0": 0, "4.0 - 4.4": 0, "3.0 - 3.9": 0, "2.0 - 2.9": 0, "< 2.0": 0 };
    games.forEach(g => {
        const r = g.rating;
        if (r >= 4.5) ratingBuckets["4.5 - 5.0"]++;
        else if (r >= 4.0) ratingBuckets["4.0 - 4.4"]++;
        else if (r >= 3.0) ratingBuckets["3.0 - 3.9"]++;
        else if (r >= 2.0) ratingBuckets["2.0 - 2.9"]++;
        else ratingBuckets["< 2.0"]++;
    });

    state.charts.rating = new Chart(document.getElementById("chart-rating").getContext("2d"), {
        type: "bar",
        data: {
            labels: Object.keys(ratingBuckets),
            datasets: [{
                label: "Number of Games",
                data: Object.values(ratingBuckets),
                backgroundColor: "rgba(0, 200, 83, 0.6)",
                borderColor: "#00C853",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#AAAAAA" }, beginAtZero: true },
                x: { grid: { display: false }, ticks: { color: "#AAAAAA" } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // Chart 4: Completion Status (Doughnut)
    const statusData = { "Wishlist": 0, "Backlog": 0, "Playing": 0, "Completed": 0 };
    games.forEach(g => {
        if (statusData[g.status] !== undefined) statusData[g.status]++;
    });

    state.charts.status = new Chart(document.getElementById("chart-status").getContext("2d"), {
        type: "doughnut",
        data: {
            labels: Object.keys(statusData),
            datasets: [{
                data: Object.values(statusData),
                backgroundColor: ["#999999", "#FF8C00", "#00BFFF", "#00C853"],
                borderWidth: 1,
                borderColor: "#181818"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right",
                    labels: { color: "#FFFFFF", font: { family: "Poppins", size: 11 } }
                }
            }
        }
    });

    // Chart 5: Playtime (Polar Area)
    const playtimeBuckets = { "0h": 0, "1-10h": 0, "11-50h": 0, "51-100h": 0, "100h+": 0 };
    games.forEach(g => {
        const p = g.playtime || 0;
        if (p === 0) playtimeBuckets["0h"]++;
        else if (p <= 10) playtimeBuckets["1-10h"]++;
        else if (p <= 50) playtimeBuckets["11-50h"]++;
        else if (p <= 100) playtimeBuckets["51-100h"]++;
        else playtimeBuckets["100h+"]++;
    });

    state.charts.playtime = new Chart(document.getElementById("chart-playtime").getContext("2d"), {
        type: "polarArea",
        data: {
            labels: Object.keys(playtimeBuckets),
            datasets: [{
                data: Object.values(playtimeBuckets),
                backgroundColor: [
                    "rgba(153, 153, 153, 0.6)",
                    "rgba(255, 140, 0, 0.6)",
                    "rgba(0, 191, 255, 0.6)",
                    "rgba(224, 64, 251, 0.6)",
                    "rgba(0, 200, 83, 0.6)"
                ],
                borderColor: "#181818",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    grid: { color: "rgba(255,255,255,0.05)" },
                    ticks: { color: "#AAAAAA", backdropColor: "transparent" }
                }
            },
            plugins: {
                legend: {
                    position: "right",
                    labels: { color: "#FFFFFF", font: { family: "Poppins", size: 11 } }
                }
            }
        }
    });

    // Chart 6: Installed vs Uninstalled (Doughnut)
    const installedData = { "Installed": 0, "Not Installed": 0 };
    games.forEach(g => {
        if (g.installed) installedData["Installed"]++;
        else installedData["Not Installed"]++;
    });

    state.charts.installed = new Chart(document.getElementById("chart-installed").getContext("2d"), {
        type: "doughnut",
        data: {
            labels: Object.keys(installedData),
            datasets: [{
                data: Object.values(installedData),
                backgroundColor: ["#00C853", "#FF4500"],
                borderWidth: 1,
                borderColor: "#181818"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right",
                    labels: { color: "#FFFFFF", font: { family: "Poppins", size: 11 } }
                }
            }
        }
    });
}

// --- Import / Export Engines ---

// 1. Export JSON
function exportLibraryJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.games, null, 4));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "GameVault_Library.json");
    dlAnchorElem.click();
    showToast("Library exported to JSON successfully!", "success");
}

// 2. Export CSV
function exportLibraryCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Header
    const headers = ["ID", "Name", "Genre", "SubGenre", "Platform", "Store", "Developer", "Publisher", "ReleaseDate", "Engine", "Version", "Language", "SizeGB", "Rating", "PlaytimeHours", "Status", "Installed", "Completed", "Favorite", "WebsiteUrl", "TrailerUrl", "DownloadUrl", "Tags", "Description", "Notes"];
    csvContent += headers.map(h => `"${h}"`).join(",") + "\n";

    // Rows
    state.games.forEach(g => {
        const row = [
            g.id,
            g.name,
            g.genre,
            g.subgenre || "",
            g.platform,
            g.store || "",
            g.developer || "",
            g.publisher || "",
            g.releaseDate || "",
            g.engine || "",
            g.version || "",
            g.language || "",
            g.size || 0,
            g.rating || 0,
            g.playtime || 0,
            g.status,
            g.installed ? "TRUE" : "FALSE",
            g.completed ? "TRUE" : "FALSE",
            g.favorite ? "TRUE" : "FALSE",
            g.websiteUrl || "",
            g.trailerUrl || "",
            g.downloadUrl || "",
            g.tags || "",
            (g.description || "").replace(/"/g, '""'),
            (g.notes || "").replace(/"/g, '""')
        ];
        csvContent += row.map(v => `"${v}"`).join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "GameVault_Library.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Library exported to CSV successfully!", "success");
}

// 3. Export Excel (SheetJS)
function exportLibraryExcel() {
    if (typeof XLSX === "undefined") {
        showToast("SheetJS library not loaded.", "error");
        return;
    }

    // Flatten requirements for easy spreadsheet display
    const flatGames = state.games.map(g => {
        return {
            ID: g.id,
            Name: g.name,
            Genre: g.genre,
            SubGenre: g.subgenre || "",
            Platform: g.platform,
            Store: g.store || "",
            Developer: g.developer || "",
            Publisher: g.publisher || "",
            ReleaseDate: g.releaseDate || "",
            Engine: g.engine || "",
            Version: g.version || "",
            Language: g.language || "",
            SizeGB: g.size || 0,
            Rating: g.rating || 0,
            PlaytimeHours: g.playtime || 0,
            Status: g.status,
            Installed: g.installed ? "YES" : "NO",
            Completed: g.completed ? "YES" : "NO",
            Favorite: g.favorite ? "YES" : "NO",
            WebsiteUrl: g.websiteUrl || "",
            TrailerUrl: g.trailerUrl || "",
            DownloadUrl: g.downloadUrl || "",
            Tags: g.tags || "",
            Description: g.description || "",
            Notes: g.notes || "",
            Min_OS: g.minRequirements ? g.minRequirements.os || "" : "",
            Min_CPU: g.minRequirements ? g.minRequirements.cpu || "" : "",
            Min_RAM: g.minRequirements ? g.minRequirements.ram || "" : "",
            Min_GPU: g.minRequirements ? g.minRequirements.gpu || "" : "",
            Min_Storage: g.minRequirements ? g.minRequirements.storage || "" : "",
            Rec_OS: g.recRequirements ? g.recRequirements.os || "" : "",
            Rec_CPU: g.recRequirements ? g.recRequirements.cpu || "" : "",
            Rec_RAM: g.recRequirements ? g.recRequirements.ram || "" : "",
            Rec_GPU: g.recRequirements ? g.recRequirements.gpu || "" : "",
            Rec_Storage: g.recRequirements ? g.recRequirements.storage || "" : ""
        };
    });

    const worksheet = XLSX.utils.json_to_sheet(flatGames);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Games Library");
    
    XLSX.writeFile(workbook, "GameVault_Library.xlsx");
    showToast("Library exported to Excel successfully!", "success");
}

// 4. Import Handlers
let importedGamesList = [];

function openImportModal() {
    if (!state.isAdmin) {
        showToast("Access Denied: Administrator privileges required.", "error");
        return;
    }
    document.getElementById("modal-import").classList.add("open");
    resetImportModal();
}

function closeImportModal() {
    document.getElementById("modal-import").classList.remove("open");
}

function resetImportModal() {
    document.getElementById("import-preview-container").classList.add("hidden");
    document.getElementById("btn-submit-import").disabled = true;
    document.getElementById("import-file-input").value = "";
    importedGamesList = [];
}

function handleImportFileSelect() {
    const fileInput = document.getElementById("import-file-input");
    if (!fileInput.files.length) return;

    const file = fileInput.files[0];
    document.getElementById("import-file-name").innerText = file.name;
    document.getElementById("import-file-size").innerText = formatBytes(file.size);

    const reader = new FileReader();

    if (file.name.endsWith(".json")) {
        reader.onload = function(e) {
            try {
                const json = JSON.parse(e.target.result);
                if (Array.isArray(json)) {
                    importedGamesList = validateImportedGames(json);
                    showImportPreview(importedGamesList.length);
                } else if (json.games && Array.isArray(json.games)) {
                    // Backup format containing settings/games
                    importedGamesList = validateImportedGames(json.games);
                    showImportPreview(importedGamesList.length);
                } else {
                    throw new Error("JSON structure is not a games array.");
                }
            } catch (err) {
                showToast("Invalid JSON file structure.", "error");
                resetImportModal();
            }
        };
        reader.readAsText(file);
    } else if (file.name.endsWith(".csv")) {
        reader.onload = function(e) {
            try {
                const text = e.target.result;
                importedGamesList = parseCSVToGames(text);
                showImportPreview(importedGamesList.length);
            } catch (err) {
                showToast("Error parsing CSV file.", "error");
                resetImportModal();
            }
        };
        reader.readAsText(file);
    } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                importedGamesList = parseExcelToGames(json);
                showImportPreview(importedGamesList.length);
            } catch (err) {
                showToast("Error parsing Excel file.", "error");
                resetImportModal();
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        showToast("Unsupported file format.", "error");
        resetImportModal();
    }
}

function showImportPreview(count) {
    const preview = document.getElementById("import-preview-container");
    const countText = document.getElementById("import-games-count");
    const submitBtn = document.getElementById("btn-submit-import");

    countText.innerText = `${count} valid games found in file. Ready to import.`;
    preview.classList.remove("hidden");
    
    if (count > 0) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

async function processImportFile() {
    if (!state.isAdmin) {
        showToast("Access Denied: Administrator privileges required.", "error");
        return;
    }
    if (importedGamesList.length === 0) return;

    if (confirm(`Do you want to import these ${importedGamesList.length} games? Duplicate games with the same name will be overwritten.`)) {
        try {
            const response = await fetch("/api/games/import", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(importedGamesList)
            });
            if (!response.ok) throw new Error("Failed to import games on server");
            
            const result = await response.json();
            state.games = result.games;
            
            saveToLocalStorage();
            closeImportModal();
            showToast(`Import Successful! Added: ${result.addedCount}, Updated: ${result.updatedCount}`, "success");
            refreshAllViews();
        } catch (err) {
            console.error("Import failed:", err);
            showToast("Failed to import games to server.", "error");
        }
    }
}

function handleRestoreJSON(e) {
    if (!state.isAdmin) {
        showToast("Access Denied: Administrator privileges required.", "error");
        return;
    }
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(evt) {
        try {
            const json = JSON.parse(evt.target.result);
            let gamesList = [];
            if (Array.isArray(json)) {
                gamesList = json;
            } else if (json.games && Array.isArray(json.games)) {
                gamesList = json.games;
            } else {
                showToast("Invalid backup file format.", "error");
                return;
            }
            
            const validGames = validateImportedGames(gamesList);
            if (validGames.length > 0) {
                if (confirm(`Are you sure you want to restore the database with these ${validGames.length} games? This will overwrite the existing database.`)) {
                    const response = await fetch("/api/games/restore", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(validGames)
                    });
                    if (!response.ok) throw new Error("Failed to restore games on server");
                    
                    const result = await response.json();
                    state.games = result.games;
                    
                    saveToLocalStorage();
                    showToast(`Database restored! Loaded ${result.count} games.`, "success");
                    refreshAllViews();
                }
            } else {
                showToast("No valid games found in restore file.", "error");
            }
        } catch (err) {
            console.error("Restore failed:", err);
            showToast("Failed to parse or restore backup file.", "error");
        }
    };
    reader.readAsText(file);
}

// --- Import Validation & Parsers ---
function validateImportedGames(arr) {
    return arr.filter(g => {
        // Must have at least a Name, Genre, and Platform
        return g.name && typeof g.name === "string" && g.name.trim() !== "";
    }).map(g => {
        // Sanitize and ensure standard properties
        return {
            id: g.id || Date.now() + Math.floor(Math.random() * 1000),
            name: g.name.trim(),
            coverUrl: g.coverUrl || "",
            bannerUrl: g.bannerUrl || "",
            genre: CATEGORIES.includes(g.genre) ? g.genre : "Action",
            subgenre: g.subgenre || "",
            platform: PLATFORMS.includes(g.platform) ? g.platform : "PC",
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
    });
}

function parseCSVToGames(text) {
    const lines = text.split("\n");
    if (lines.length < 2) return [];

    // Simple CSV parser (assumes quotes wrap values containing commas)
    const parseCSVLine = (line) => {
        const result = [];
        let current = "";
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    current += '"'; // Escaped double quote
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = "";
            } else {
                current += char;
            }
        }
        result.push(current);
        return result;
    };

    const headers = parseCSVLine(lines[0]).map(h => h.trim().replace(/^"|"$/g, ""));
    const games = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === "") continue;

        const cells = parseCSVLine(line);
        const row = {};
        headers.forEach((h, index) => {
            row[h] = cells[index] ? cells[index].trim() : "";
        });

        if (row["Name"]) {
            games.push({
                name: row["Name"],
                genre: row["Genre"] || "Action",
                subgenre: row["SubGenre"] || "",
                platform: row["Platform"] || "PC",
                developer: row["Developer"] || "",
                publisher: row["Publisher"] || "",
                releaseDate: row["ReleaseDate"] || "",
                engine: row["Engine"] || "",
                version: row["Version"] || "",
                language: row["Language"] || "",
                size: parseFloat(row["SizeGB"]) || 0,
                rating: parseFloat(row["Rating"]) || 0,
                playtime: parseInt(row["PlaytimeHours"]) || 0,
                status: row["Status"] || "Backlog",
                installed: row["Installed"] === "TRUE" || row["Installed"] === "YES",
                completed: row["Completed"] === "TRUE" || row["Completed"] === "YES",
                favorite: row["Favorite"] === "TRUE" || row["Favorite"] === "YES",
                websiteUrl: row["WebsiteUrl"] || "",
                trailerUrl: row["TrailerUrl"] || "",
                tags: row["Tags"] || "",
                description: row["Description"] || "",
                notes: row["Notes"] || ""
            });
        }
    }

    return validateImportedGames(games);
}

function parseExcelToGames(jsonArr) {
    const games = jsonArr.map(row => {
        return {
            name: row["Name"],
            genre: row["Genre"] || "Action",
            subgenre: row["SubGenre"] || "",
            platform: row["Platform"] || "PC",
            developer: row["Developer"] || "",
            publisher: row["Publisher"] || "",
            releaseDate: row["ReleaseDate"] || "",
            engine: row["Engine"] || "",
            version: row["Version"] || "",
            language: row["Language"] || "",
            size: parseFloat(row["SizeGB"]) || 0,
            rating: parseFloat(row["Rating"]) || 0,
            playtime: parseInt(row["PlaytimeHours"]) || 0,
            status: row["Status"] || "Backlog",
            installed: row["Installed"] === "YES" || row["Installed"] === "TRUE" || row["Installed"] === true,
            completed: row["Completed"] === "YES" || row["Completed"] === "TRUE" || row["Completed"] === true,
            favorite: row["Favorite"] === "YES" || row["Favorite"] === "TRUE" || row["Favorite"] === true,
            websiteUrl: row["WebsiteUrl"] || "",
            trailerUrl: row["TrailerUrl"] || "",
            tags: row["Tags"] || "",
            description: row["Description"] || "",
            notes: row["Notes"] || "",
            minRequirements: {
                os: row["Min_OS"] || "",
                cpu: row["Min_CPU"] || "",
                ram: row["Min_RAM"] || "",
                gpu: row["Min_GPU"] || "",
                storage: row["Min_Storage"] || ""
            },
            recRequirements: {
                os: row["Rec_OS"] || "",
                cpu: row["Rec_CPU"] || "",
                ram: row["Rec_RAM"] || "",
                gpu: row["Rec_GPU"] || "",
                storage: row["Rec_Storage"] || ""
            }
        };
    });

    return validateImportedGames(games);
}

// --- Toast Notifications System ---
function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    // Icon map
    const icons = {
        success: "fa-check-circle",
        info: "fa-info-circle",
        warning: "fa-exclamation-triangle",
        error: "fa-exclamation-circle"
    };
    
    const icon = icons[type] || "fa-info-circle";

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <div class="toast-content">${message}</div>
        <i class="fas fa-times toast-close" onclick="this.parentElement.remove()"></i>
    `;

    container.appendChild(toast);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = "slideInRight 0.3s ease reverse forwards";
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);
}

// --- Utility Functions ---
function shortenText(text, maxLen) {
    if (text.length <= maxLen) return text;
    return text.substring(0, maxLen) + "...";
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// --- Admin Authentication & Control Logic ---
function updateAdminUI() {
    const adminElements = document.querySelectorAll(".admin-only");
    adminElements.forEach(el => {
        if (state.isAdmin) {
            el.classList.remove("hidden");
        } else {
            el.classList.add("hidden");
        }
    });

    const adminIcon = document.getElementById("sidebar-admin-icon");
    const adminText = document.getElementById("sidebar-admin-text");
    const adminMenuItem = document.getElementById("menu-item-admin");

    if (state.isAdmin) {
        if (adminIcon) {
            adminIcon.className = "fas fa-lock-open";
            adminIcon.style.color = "var(--accent)";
        }
        if (adminText) adminText.innerText = "Admin Panel";
        if (adminMenuItem) {
            adminMenuItem.setAttribute("data-section-target", "admin");
            adminMenuItem.classList.add("active-admin");
        }
    } else {
        if (adminIcon) {
            adminIcon.className = "fas fa-lock";
            adminIcon.style.color = "var(--text-secondary)";
        }
        if (adminText) adminText.innerText = "Admin Login";
        if (adminMenuItem) {
            adminMenuItem.classList.remove("active-admin");
        }
    }
}

function openAdminLoginModal() {
    document.getElementById("modal-admin-login").classList.add("open");
    document.getElementById("admin-password").value = "";
    document.getElementById("admin-login-error").classList.add("hidden");
}

function closeAdminLoginModal() {
    document.getElementById("modal-admin-login").classList.remove("open");
}

async function handleAdminLoginSubmit(e) {
    e.preventDefault();
    const passwordInput = document.getElementById("admin-password");
    const errorDiv = document.getElementById("admin-login-error");
    
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: passwordInput.value })
        });
        
        if (!response.ok) {
            throw new Error("Invalid credentials");
        }
        
        const result = await response.json();
        if (result.success) {
            state.isAdmin = true;
            localStorage.setItem("gamevault_is_admin", "true");
            closeAdminLoginModal();
            showToast("Authenticated as Administrator successfully!", "success");
            updateAdminUI();
            navigate("admin");
        } else {
            throw new Error("Authentication failed");
        }
    } catch (err) {
        errorDiv.classList.remove("hidden");
        passwordInput.value = "";
        passwordInput.focus();
    }
}

function handleAdminLogout() {
    state.isAdmin = false;
    localStorage.setItem("gamevault_is_admin", "false");
    showToast("Logged out of Administrator mode.", "info");
    updateAdminUI();
    navigate("dashboard");
}

// Stats render for the Admin Control Panel
function renderAdminPanel() {
    const totalGames = state.games.length;
    const totalPlaytime = state.games.reduce((sum, g) => sum + (g.playtime || 0), 0);
    const totalSize = state.games.reduce((sum, g) => sum + (g.size || 0), 0).toFixed(1);
    
    document.getElementById("admin-total-games").innerText = totalGames;
    document.getElementById("admin-total-playtime").innerText = `${totalPlaytime} hours`;
    document.getElementById("admin-total-size").innerText = `${totalSize} GB`;
}
