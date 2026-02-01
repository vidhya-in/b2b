# LeadCapture

B2B Event Lead Capture & Enrichment App — Capture business cards, enrich leads with company data, sync to HubSpot CRM, and send personalized follow-ups via Outlook.

![LeadCapture](https://img.shields.io/badge/React-18.2-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## Features

- 📷 **Card Capture** — Photograph or upload business cards
- 🔍 **OCR Extraction** — Automatically extract contact details
- ✨ **Lead Enrichment** — Auto-research company data (industry, size, funding, news)
- 📊 **Lead Dashboard** — Manage and filter all captured leads
- 🔗 **HubSpot Sync** — Push leads directly to your CRM
- ✉️ **Email Drafts** — Generate personalized follow-ups for Outlook

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/leadcapture.git
cd leadcapture

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click **"New Project"** → Select your repository

4. Vercel auto-detects settings. Click **"Deploy"**

5. Your app is live at `https://your-project.vercel.app`

**One-click deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/leadcapture)

### Deploy to Netlify

1. Push your code to GitHub

2. Go to [netlify.com](https://netlify.com) → **"New site from Git"**

3. Connect your repository

4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

5. Click **"Deploy site"**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/leadcapture)

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install gh-pages --save-dev

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Add homepage to package.json:
# "homepage": "https://yourusername.github.io/leadcapture"

# Deploy
npm run deploy
```

### Deploy with Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t leadcapture .
docker run -p 8080:80 leadcapture
```

## Project Structure

```
leadcapture/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main application component
│   └── main.jsx         # React entry point
├── index.html           # HTML template
├── package.json         # Dependencies & scripts
├── vite.config.js       # Vite configuration
└── README.md
```

## Environment Variables

Create a `.env` file for API integrations:

```env
# HubSpot Integration
VITE_HUBSPOT_CLIENT_ID=your_client_id
VITE_HUBSPOT_REDIRECT_URI=https://yourapp.com/callback

# OCR Service (Google Cloud Vision)
VITE_GOOGLE_CLOUD_API_KEY=your_api_key

# Enrichment API (optional)
VITE_CLEARBIT_API_KEY=your_api_key
```

## Roadmap

- [x] Frontend UI with lead dashboard
- [x] Card capture modal with camera support
- [ ] OCR integration (Google Cloud Vision)
- [ ] Company enrichment API
- [ ] HubSpot OAuth & contact sync
- [ ] Outlook email draft integration
- [ ] PWA offline support
- [ ] Mobile native apps

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Styling | CSS-in-JS (inline styles) |
| Icons | Custom SVG components |
| Build | Vite 5 |
| Hosting | Vercel / Netlify |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built with ☕ for B2B sales professionals who attend too many events.
