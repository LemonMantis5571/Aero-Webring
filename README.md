# Aero-Webring

A React + Vite Frutiger Aero personal site template built on top of `7.css`.

This repo is meant to be easy to fork. Most of the editable content now lives in a single JSON file, so people can swap in their own text, links, Pokémon, NPC lines, guestbook URL, pet info, and music source without digging through the React components.

## Features

- Frutiger Aero / Windows 7-inspired UI with `7.css`
- Floating bubbles and animated desktop NPCs
- Customizable hero, about, projects, links, guestbook, and pet panels
- Pokémon sprite showcase powered by PokéAPI image URLs
- Background music player
- Mobile-responsive layout
- JSON-driven site content

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Customize Your Site

### Edit one file

Most content is driven by [`src/siteData.json`](src/siteData.json).

That file controls:

- branding and hero text
- nav links
- about card text and avatar URL
- music labels and audio source
- project cards
- Pokémon team
- links and webring badge code
- guestbook URL and copy
- pet data
- NPC sprite paths and dialogue lines
- marquee ticker text

### Swap assets

The app still uses files from `public/` for visual/audio assets. Replace them with your own while keeping the same filenames, or update the JSON/markup to point elsewhere.

Common assets:

- `public/LEASE.mp3`
- `public/byakuren.gif`
- `public/mokou.gif`
- `public/wallpaper1.jpg`
- `public/favicon.svg`

## Project Structure

- [`src/App.jsx`](src/App.jsx): app layout and component behavior
- [`src/siteData.json`](src/siteData.json): editable site content
- [`src/App.css`](src/App.css): component styling
- [`src/index.css`](src/index.css): global styling and background

## Scripts

```bash
npm run dev
npm run build
npm run lint
```


