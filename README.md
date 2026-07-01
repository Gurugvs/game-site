# GameVault – Game Management System

GameVault is a premium game library management system with a Node.js Express backend and interactive HTML5 frontend. It catalogs playtimes, completion statuses, ratings, system requirements, and personal notes.

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3005` in your browser.

---

## Online Deployment (GitHub + Render)

Follow these steps to deploy your site online for free:

### Step 1: Create a GitHub Repository
1. Go to [GitHub](https://github.com) and sign in.
2. Click **New** to create a new repository.
3. Name it (e.g., `gamevault`), leave it as **Public** or **Private**, and click **Create repository**.
4. Copy the repository URL (e.g., `https://github.com/your-username/gamevault.git`).

### Step 2: Push Your Local Folder to GitHub
Run the following commands in your terminal from the `d:\site` folder:

```bash
# Add a remote destination pointing to your new GitHub repo
git remote add origin YOUR_GITHUB_REPOSITORY_URL

# Rename default branch to main
git branch -M main

# Push files to GitHub
git push -u origin main
```

### Step 3: Deploy on Render (Free Tier)
1. Go to [Render](https://render.com) and log in or sign up.
2. Click **New +** in the dashboard and select **Blueprint**.
3. Connect your GitHub account and select your repository (`gamevault`).
4. Render will automatically read the `render.yaml` configuration file in your project.
5. In the **Blueprint Configuration** UI:
   - Provide a Service Name if prompted.
   - Enter your preferred administrator password in the `ADMIN_PASSWORD` field.
6. Click **Apply**.
7. Render will build and deploy your app. Once done, you will receive a free public link (e.g., `https://gamevault-xxxx.onrender.com`).

---

## Technical Details

- **Backend**: Node.js & Express.
- **Data Persistence**: Serves and updates from a local database file at `data/games.json` (auto-seeded from `public/games.json` upon build).
- **Admin Password**: Configured via the `ADMIN_PASSWORD` variable. Defaults to `admin`.
