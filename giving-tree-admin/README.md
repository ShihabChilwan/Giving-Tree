# 🌳 Giving Tree — Admin Dashboard

A separate Vite + React admin console for the Giving Tree platform.
Connects to the same Supabase project as the main app using the service role key.

---

## Folder Structure

```
giving-tree-admin/
├── src/
│   ├── App.jsx          ← entire dashboard (single file)
│   └── main.jsx         ← React entry point
├── index.html
├── package.json
├── vite.config.js
├── .env                 ← your credentials go here
└── supabase-setup.sql   ← run this in Supabase SQL Editor first
```

---

## Setup Steps

### 1. Install dependencies
```bash
cd giving-tree-admin
npm install
```

### 2. Add your credentials to .env
```
VITE_SUPABASE_URL=https://youridhere.supabase.co
VITE_SUPABASE_SERVICE_KEY=your_service_role_key_here
```

Find your service role key at:
**Supabase Dashboard → Project Settings → API → service_role**

### 3. Run the SQL setup
Open `supabase-setup.sql` and run it in:
**Supabase Dashboard → SQL Editor → New Query**

### 4. Start the dev server
```bash
npm run dev
```

The dashboard runs on http://localhost:5174 (or next available port).

---

## What Each Page Shows

| Page | Data source |
|---|---|
| Overview | users_view, items, requests, saved_items |
| Users | users_view joined with items + requests counts |
| Listings | items table, full list + top requested |
| Requests | requests table joined with items |
| Areas | items grouped by neighborhood |
| Top Givers | items grouped by giver_name |

---

## Security Notes

- **Never deploy this app publicly.** It uses the service role key which bypasses all RLS.
- Keep it running locally or on a password-protected internal network.
- Never commit the `.env` file to GitHub (add it to `.gitignore`).

---

## Auto-refresh

The dashboard polls Supabase every **30 seconds** automatically.
You can also click the **↻ REFRESH** button in the sidebar for instant updates.
