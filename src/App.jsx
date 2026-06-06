import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ── Pokémon sprites (PokeAPI CDN) ── */
const pokemonTeam = [
  { name: 'Mienshao', id: 620 },
  { name: 'Suicune', id: 245 },
  { name: 'Pikachu', id: 25 },
  { name: 'Eevee', id: 133 },
  { name: 'Charmander', id: 4 },
  { name: 'Bulbasaur', id: 1 },
  { name: 'Squirtle', id: 7 },
  { name: 'Jigglypuff', id: 39 },
  { name: 'Gengar', id: 94 },
  { name: 'Umbreon', id: 197 },
  { name: 'Gardevoir', id: 282 },
  { name: 'Lucario', id: 448 },
]

const spriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`

const spriteStatic = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

/* ── Navigation ── */
const navLinks = [
  { label: 'Portfolio', href: 'https://www.lemonmantis.dev', external: true },
  { label: 'About Me', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Pokédex', href: '#pokedex' },
  { label: 'Webring', href: '#webring' },
  { label: 'Guestbook', href: '#guestbook' },
  { label: 'Links', href: '#links' },
]

/* ── Projects from GitHub ── */
const projects = [
  {
    name: 'edgestore',
    desc: 'The best way to add file uploads to React apps',
    url: 'https://github.com/edgestorejs/edgestore',
    lang: 'TypeScript',
    stars: 453,
  },
  {
    name: 'awesome-ucp',
    desc: 'A curated list of awesome Universal Commerce Protocol (UCP) resources, tools, and implementations',
    url: 'https://github.com/Upsonic/awesome-ucp',
    lang: 'Markdown',
    stars: 126,
  },
  {
    name: 'LimeBot-OS',
    desc: 'A self-hosted, agentic AI assistant with multi-channel support, persistent memory, and a real-time web dashboard',
    url: 'https://github.com/Ethereal-Lemons/LimeBot-OS',
    lang: 'Python',
    stars: 16,
  },
  {
    name: 'PokeMMO-Utilities',
    desc: 'PvP utilities for PokeMMO players',
    url: 'https://github.com/LemonMantis5571/PokeMMO-Utilities',
    live: 'https://poke-mmo-utilities.vercel.app/',
    lang: 'TypeScript',
    stars: 12,
  },
  {
    name: 'SilentFail',
    desc: 'Monitor Cron Jobs by using a simple Curl command',
    url: 'https://github.com/Ethereal-Lemons/SilentFail',
    lang: 'TypeScript',
    stars: 7,
  },
  {
    name: 'A-mess Visual Novel',
    desc: 'Visual Novel Project Development',
    url: 'https://github.com/LemonMantis5571/A-mess-Visual-Novel-Project',
    lang: 'Python',
    stars: 5,
  },
]

/* ── Webring members ── */
const webringMembers = [
  { name: 'Frutiger Aero Archive', url: 'https://frutigeraeroarchive.org/', color: '#2db87e' },
  { name: 'Lakes', url: 'https://lakes.glamour.ovh/', color: '#13a3ac' },
  { name: 'Skyweaver', url: 'https://skyweaver.nekoweb.org/', color: '#6a5acd' },
  { name: 'Clygro', url: 'https://clygro.cc/', color: '#ff6b9d' },
  { name: 'Pizzacat Delights', url: 'https://pizzacatdelights.nekoweb.org/', color: '#ff8c42' },
  { name: 'ToxiDev', url: 'https://toxidev.neocities.org/', color: '#42b883' },
]

/* ── Friend links ── */
const friendLinks = [
  { name: 'Portfolio', url: 'https://www.lemonmantis.dev', icon: '💼' },
  { name: 'GitHub', url: 'https://github.com/LemonMantis5571', icon: '🐙' },
  { name: 'Neocities', url: 'https://neocities.org/', icon: '🏠' },
  { name: 'Nekoweb', url: 'https://nekoweb.org/', icon: '🐱' },
  { name: 'Frutiger Aero Archive', url: 'https://frutigeraeroarchive.org/', icon: '🌿' },
  { name: 'MelonLand Forum', url: 'https://forum.melonland.net/', icon: '🍈' },
  { name: 'PokeAPI', url: 'https://pokeapi.co/', icon: '⚡' },
]

/* ── Language color map ── */
const langColors = {
  TypeScript: '#3178c6',
  Python: '#3572a5',
  HTML: '#e34c26',
  Java: '#b07219',
  Markdown: '#083fa1',
}

/* ── NPC Conversation Lines ── */
const npcDialogues = {
  solo: {
    byakuren: [
      '南無三…',
      'The Dharma guides all ✨',
      'Have you seen Murasa?',
      'Peace be with you~',
      '般若心経…',
      'I sense great energy here!',
      'What a lovely website 🌸',
    ],
    mokou: [
      '…immortality is boring.',
      '🔥🔥🔥',
      'Kaguya can go away.',
      'Anyone got yakitori?',
      'ずっと生きてる…',
      '*smokes*',
      'Nice page, kid.',
    ],
  },
  conversation: [
    { a: 'Hey Mokou, nice day huh?', b: '…I guess. Every day is the same for me.' },
    { a: 'Want to grab ramen later?', b: 'Only if you\'re paying, monk.' },
    { a: 'You should visit the temple!', b: 'I\'d burn it down by accident.' },
    { a: 'Mokou, are you okay?', b: '…define okay. I\'ve been alive 1000+ years.' },
    { a: 'The Pokémon here are cute~', b: 'Mienshao could beat Kaguya.' },
    { a: 'BLACKPINK in your area! 🩷', b: '…did you just quote a K-pop song?' },
    { a: 'Let\'s protect this webring!', b: 'Fine. But I get to be the firewall. 🔥' },
    { a: 'Do you like this music?', b: 'Takeshi Abo slaps, not gonna lie.' },
  ],
}

/* ── Walking NPCs with conversation system ── */
function NpcLayer() {
  const npc1Ref = useRef(null)
  const npc2Ref = useRef(null)
  const pos1 = useRef({ x: -120, y: 300 })
  const pos2 = useRef({ x: 800, y: 600 })
  const target1 = useRef({ x: 200, y: 400 })
  const target2 = useRef({ x: 400, y: 200 })
  const facing1 = useRef(1)
  const facing2 = useRef(-1)
  const frameRef = useRef(0)

  const [bubble1, setBubble1] = useState(null)
  const [bubble2, setBubble2] = useState(null)
  const chatCooldown = useRef(0)
  const soloCooldown1 = useRef(0)
  const soloCooldown2 = useRef(0)

  useEffect(() => {
    const pickTarget = () => {
      const pageH = document.documentElement.scrollHeight
      const vpW = window.innerWidth
      return {
        x: 40 + Math.random() * (vpW - 160),
        y: 100 + Math.random() * (pageH - 300),
      }
    }

    target1.current = pickTarget()
    target2.current = pickTarget()

    let ticks = 0

    const animate = () => {
      ticks++

      // Move NPC 1
      const p1 = pos1.current
      const t1 = target1.current
      let dx1 = t1.x - p1.x
      let dy1 = t1.y - p1.y
      let dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)
      if (dist1 < 10) { target1.current = pickTarget() }
      else {
        const mx1 = (dx1 / dist1) * 1.0
        const my1 = (dy1 / dist1) * 1.0
        p1.x += mx1; p1.y += my1
        if (mx1 > 0.1) facing1.current = 1
        else if (mx1 < -0.1) facing1.current = -1
      }

      // Move NPC 2
      const p2 = pos2.current
      const t2 = target2.current
      let dx2 = t2.x - p2.x
      let dy2 = t2.y - p2.y
      let dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
      if (dist2 < 10) { target2.current = pickTarget() }
      else {
        const mx2 = (dx2 / dist2) * 1.4
        const my2 = (dy2 / dist2) * 1.4
        p2.x += mx2; p2.y += my2
        if (mx2 > 0.1) facing2.current = 1
        else if (mx2 < -0.1) facing2.current = -1
      }

      // Apply transforms
      if (npc1Ref.current) {
        npc1Ref.current.style.transform = `translate(${p1.x}px, ${p1.y}px) scaleX(${facing1.current})`
      }
      if (npc2Ref.current) {
        npc2Ref.current.style.transform = `translate(${p2.x}px, ${p2.y}px) scaleX(${facing2.current})`
      }

      // Check proximity for conversation (every 60 frames)
      if (ticks % 60 === 0) {
        chatCooldown.current = Math.max(0, chatCooldown.current - 1)
        soloCooldown1.current = Math.max(0, soloCooldown1.current - 1)
        soloCooldown2.current = Math.max(0, soloCooldown2.current - 1)

        const cdx = p1.x - p2.x
        const cdy = p1.y - p2.y
        const closeness = Math.sqrt(cdx * cdx + cdy * cdy)

        if (closeness < 250 && chatCooldown.current <= 0 && Math.random() < 0.45) {
          // Conversation!
          const convo = npcDialogues.conversation[Math.floor(Math.random() * npcDialogues.conversation.length)]
          setBubble1(convo.a)
          setTimeout(() => setBubble2(convo.b), 1200)
          setTimeout(() => { setBubble1(null); setBubble2(null) }, 5000)
          chatCooldown.current = 12 // cooldown in ~12 seconds
        } else {
          // Solo chatter
          if (soloCooldown1.current <= 0 && Math.random() < 0.08) {
            const lines = npcDialogues.solo.byakuren
            setBubble1(lines[Math.floor(Math.random() * lines.length)])
            setTimeout(() => setBubble1(null), 3500)
            soloCooldown1.current = 8
          }
          if (soloCooldown2.current <= 0 && Math.random() < 0.08) {
            const lines = npcDialogues.solo.mokou
            setBubble2(lines[Math.floor(Math.random() * lines.length)])
            setTimeout(() => setBubble2(null), 3500)
            soloCooldown2.current = 8
          }
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <div className="npc-layer" aria-hidden="true">
      <div ref={npc1Ref} className="npc">
        {bubble1 && <div className="npc-bubble npc-bubble-left">{bubble1}</div>}
        <img src="/byakuren.gif" alt="" className="npc-sprite" />
      </div>
      <div ref={npc2Ref} className="npc">
        {bubble2 && <div className="npc-bubble npc-bubble-right">{bubble2}</div>}
        <img src="/mokou.gif" alt="" className="npc-sprite" />
      </div>
    </div>
  )
}

/* ── Bubble decorations ── */
function Bubbles() {
  const bubbles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 8 + (i % 5) * 5,
    left: (i * 11 + (i % 3) * 7) % 100,
    delay: (i % 6) * 1.15,
    duration: 7 + (i % 4) * 2,
  }))

  return (
    <div className="bubbles-container" aria-hidden="true">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Main App ── */
function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isPlaying, setIsPlaying] = useState(false)
  const [showWebringModal, setShowWebringModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Playback prevented by browser policy. User interaction required first.", err)
      })
    }
    setIsPlaying(!isPlaying)
  }

  const handleCopyWebringCode = () => {
    const codeSnippet = `<a href="https://lemonwebring.xyz" target="_blank"><img src="https://avatars.githubusercontent.com/u/85099589?v=4" width="32" height="32" style="border-radius:50%; vertical-align:middle; margin-right:5px;" /><span>Lemon Webring</span></a>`
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="aero-shell">
      <Bubbles />
      
      {/* Hidden background audio element */}
      <audio ref={audioRef} src="/LEASE.mp3" loop />

      {/* Walking NPCs — roam the entire page and chat */}
      <NpcLayer />

      {/* ── Top Bar ── */}
      <header className="topbar">
        <div className="brand-pill">
          <span className="brand-orb" aria-hidden="true" />
          LemonMantis5571
        </div>
        <nav className="quick-links" aria-label="Quick links">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="clock-widget">
          <span className="clock-icon">🕐</span>
          <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </header>

      <main className="desktop">
        {/* ── Hero Banner ── */}
        <section className="window hero-window glass active" aria-labelledby="hero-title">
          <div className="title-bar">
            <div className="title-bar-text" id="hero-title">
              🌿 welcome.exe — Leonel Guerrero
            </div>
            <div className="title-bar-controls" aria-hidden="true">
              <button type="button" tabIndex="-1" aria-label="Minimize" />
              <button type="button" tabIndex="-1" aria-label="Maximize" />
              <button type="button" tabIndex="-1" aria-label="Close" />
            </div>
          </div>
          <div className="window-body hero-body">
            <div className="hero-copy">
              <h1>Welcome to my site!</h1>
              <p className="hero-subtitle">Web Artisan · ES | EN | KR | CN</p>

              <div className="hero-actions">
                <a className="push-button aero-btn" href="https://www.lemonmantis.dev" target="_blank" rel="noreferrer">
                  My Portfolio 💼
                </a>
                <a className="push-button aero-btn alt" href="#projects">
                  My Projects
                </a>
                <a className="push-button aero-btn alt" href="#guestbook">
                  Sign Guestbook
                </a>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="pokemon-showcase">
                <img src={spriteUrl(620)} alt="" className="showcase-sprite bounce-1" />
                <img src={spriteUrl(245)} alt="" className="showcase-sprite bounce-2 showcase-large" />
                <img src={spriteUrl(25)} alt="" className="showcase-sprite bounce-3" />
              </div>
            </div>
          </div>
          <div className="status-bar">
            <p className="status-bar-field">🌤️ {currentTime.toLocaleDateString()}</p>
            <p className="status-bar-field">🎵 {isPlaying ? 'Now playing: Lease - Takeshi Abo' : 'Music Player Paused'}</p>
          </div>
        </section>

        {/* ── Japanese-style marquee ticker ── */}
        <div className="jp-ticker">
          <div className="jp-ticker-inner">
            <span>★ ようこそ！ ★ Welcome! ★ LemonMantis5571 ★ ポケモン ★ 東方 ★ ゲーム ★ 音楽 ★ ようこそ！ ★ Welcome! ★ LemonMantis5571 ★ ポケモン ★ 東方 ★ ゲーム ★ 音楽 ★</span>
          </div>
        </div>

        {/* ── About Me ── */}
        <section className="grid-panels" id="about">
          <article className="window panel-window glass">
            <div className="title-bar">
              <div className="title-bar-text">👤 about_me.txt</div>
              <div className="title-bar-controls" aria-hidden="true">
                <button type="button" tabIndex="-1" aria-label="Minimize" />
                <button type="button" tabIndex="-1" aria-label="Maximize" />
                <button type="button" tabIndex="-1" aria-label="Close" />
              </div>
            </div>
            <div className="window-body about-body">
              <div className="about-avatar-section">
                <div className="avatar-frame">
                  <img
                    src="https://avatars.githubusercontent.com/u/85099589?v=4"
                    alt="Leonel Guerrero"
                    className="avatar-github"
                  />
                </div>
                <h2 className="about-username">Leonel Guerrero</h2>
                <p className="about-handle">@LemonMantis5571</p>
                <div className="about-badges">
                  <span className="about-badge">🎮 Gamer</span>
                  <span className="about-badge">⚡ Pokémon Trainer</span>
                  <span className="about-badge">🌐 Web Artisan</span>
                </div>
              </div>
              <div className="about-text">
                <p>Hey! Welcome to my site.</p>
                <div className="field-row about-field">
                  <label>Languages:</label>
                  <span>ES | EN | KR | CN</span>
                </div>
                <div className="field-row about-field">
                  <label>Favorite Pokémon:</label>
                  <span>Mienshao, Suicune</span>
                </div>
                <div className="field-row about-field">
                  <label>Repos:</label>
                  <span>57 public repositories</span>
                </div>
                <div className="about-fav-sprites">
                  <img src={spriteUrl(620)} alt="Mienshao" className="fav-sprite" />
                  <img src={spriteUrl(245)} alt="Suicune" className="fav-sprite fav-sprite-large" />
                </div>
              </div>
            </div>
          </article>

          {/* ── Now Playing ── */}
          <article className="window panel-window glass status-panel">
            <div className="title-bar">
              <div className="title-bar-text">🎵 now_playing.wma</div>
              <div className="title-bar-controls" aria-hidden="true">
                <button type="button" tabIndex="-1" aria-label="Minimize" />
                <button type="button" tabIndex="-1" aria-label="Maximize" />
                <button type="button" tabIndex="-1" aria-label="Close" />
              </div>
            </div>
            <div className="window-body">
              <div className={`now-playing ${isPlaying ? 'playing' : ''}`}>
                <div className="music-visualizer" aria-hidden="true">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="viz-bar" style={{ animationDelay: `${i * 0.12}s` }} />
                  ))}
                </div>
                <div className="track-info">
                  <span className="track-title">Lease</span>
                  <span className="track-artist">Takeshi Abo</span>
                </div>
                <div className="music-controls">
                  <button className="music-btn" type="button" onClick={() => { if (audioRef.current) audioRef.current.currentTime = 0 }} aria-label="Restart song">⏮</button>
                  <button className="music-btn play-btn" type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause music" : "Play music"}>
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                  <button className="music-btn" type="button" onClick={() => { if (audioRef.current) audioRef.current.currentTime = 0 }} aria-label="Restart song">⏭</button>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* ── Jennie Aero Decoration ── */}
        <div className="aero-decor aero-decor-jennie">
          <img src="/a5ff3035c3f1e8d364ad4b8e13d24511.jpg" alt="" className="aero-decor-img" />
        </div>

        {/* ── Projects from GitHub ── */}
        <section className="window projects-window glass" id="projects">
          <div className="title-bar">
            <div className="title-bar-text">💻 github_projects.exe — Top Repos</div>
            <div className="title-bar-controls" aria-hidden="true">
              <button type="button" tabIndex="-1" aria-label="Minimize" />
              <button type="button" tabIndex="-1" aria-label="Maximize" />
              <button type="button" tabIndex="-1" aria-label="Close" />
            </div>
          </div>
          <div className="window-body">
            <div className="projects-grid">
              {projects.map((proj) => (
                <a
                  key={proj.name}
                  className="project-card"
                  href={proj.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="project-header">
                    <strong className="project-name">📁 {proj.name}</strong>
                    {proj.stars > 0 && (
                      <span className="project-stars">⭐ {proj.stars}</span>
                    )}
                  </div>
                  <p className="project-desc">{proj.desc}</p>
                  <div className="project-footer">
                    <span
                      className="project-lang"
                      style={{ '--lang-color': langColors[proj.lang] || '#666' }}
                    >
                      <span className="lang-dot" />
                      {proj.lang}
                    </span>
                    {proj.live && (
                      <span className="project-live">🌐 Live</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
            <div className="projects-cta">
              <a
                href="https://github.com/LemonMantis5571"
                target="_blank"
                rel="noreferrer"
                className="push-button aero-btn"
              >
                View all 57 repos on GitHub →
              </a>
            </div>
          </div>
        </section>

        {/* ── BLACKPINK Japanese-style Ad Banner ── */}
        <div className="bp-ad-banner">
          <div className="bp-ad-glow" />
          <div className="bp-ad-content">
            <img src="/giphy.gif" alt="BLACKPINK" className="bp-ad-gif" />
            <div className="bp-ad-text">
              <span className="bp-ad-jp">ブラックピンク</span>
              <span className="bp-ad-title">BLACKPINK IN YOUR AREA</span>
              <span className="bp-ad-sub">블랙핑크 ♪ THE REVOLUTION</span>
            </div>
            <img src="/giphy.gif" alt="BLACKPINK" className="bp-ad-gif bp-ad-gif-mirror" />
          </div>
          <div className="bp-ad-ticker">
            <span>★ BLACKPINK ★ ブラックピンク ★ 블랙핑크 ★ HOW YOU LIKE THAT ★ PINK VENOM ★ SHUT DOWN ★ DDU-DU DDU-DU ★ BLACKPINK ★ ブラックピンク ★ 블랙핑크 ★ HOW YOU LIKE THAT ★ PINK VENOM ★ SHUT DOWN ★ DDU-DU DDU-DU ★</span>
          </div>
        </div>

        {/* ── Japanese-style ticker 2 ── */}
        <div className="jp-ticker jp-ticker-reverse">
          <div className="jp-ticker-inner">
            <span>♪ 好きなポケモン → ミエンシャオ & スイクン ♪ Mienshao & Suicune ♪ 好きなポケモン → ミエンシャオ & スイクン ♪ Mienshao & Suicune ♪</span>
          </div>
        </div>

        {/* ── Pokédex ── */}
        <section className="window pokedex-window glass" id="pokedex">
          <div className="title-bar">
            <div className="title-bar-text">⚡ pokedex.exe — My Pokémon Team</div>
            <div className="title-bar-controls" aria-hidden="true">
              <button type="button" tabIndex="-1" aria-label="Minimize" />
              <button type="button" tabIndex="-1" aria-label="Maximize" />
              <button type="button" tabIndex="-1" aria-label="Close" />
            </div>
          </div>
          <div className="window-body">
            <div className="pokemon-grid">
              {pokemonTeam.map((poke) => (
                <PokemonCard key={poke.id} pokemon={poke} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Lisa Aero Decoration ── */}
        <div className="aero-decor aero-decor-lisa">
          <img src="/00e94b0b88daf71b60a25f6963ef7c92.jpg" alt="" className="aero-decor-img" />
        </div>

        {/* ── Webring + Links ── */}
        <section className="grid-panels" id="webring">
          <article className="window panel-window glass">
            <div className="title-bar">
              <div className="title-bar-text">🌐 webring.url — Neighbors</div>
              <div className="title-bar-controls" aria-hidden="true">
                <button type="button" tabIndex="-1" aria-label="Minimize" />
                <button type="button" tabIndex="-1" aria-label="Maximize" />
                <button type="button" tabIndex="-1" aria-label="Close" />
              </div>
            </div>
            <div className="window-body">
              <div className="webring-grid">
                {webringMembers.map((member) => (
                  <a
                    key={member.name}
                    className="webring-card"
                    href={member.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ '--card-accent': member.color }}
                  >
                    <span className="webring-dot" />
                    <strong>{member.name}</strong>
                  </a>
                ))}
              </div>
              <div className="webring-nav-container">
                <div className="webring-nav">
                  <a href="https://frutigeraeroarchive.org/aero_webring" target="_blank" rel="noreferrer" className="push-button aero-btn">
                    ← Prev
                  </a>
                  <a href="https://lemonwebring.xyz" target="_blank" rel="noreferrer" className="webring-badge" style={{ textDecoration: 'none' }}>
                    🌐 Lemon Webring
                  </a>
                  <a href="https://lakes.glamour.ovh/" target="_blank" rel="noreferrer" className="push-button aero-btn">
                    Next →
                  </a>
                </div>
                
                <div className="webring-actions">
                  <button 
                    type="button" 
                    className="push-button aero-btn"
                    onClick={() => setShowWebringModal(!showWebringModal)}
                  >
                    {showWebringModal ? 'Hide Widget Code ✕' : 'Join Webring 🤝'}
                  </button>
                </div>

                {showWebringModal && (
                  <div className="join-webring-panel">
                    <h4 className="join-webring-title">Add my site to your webring!</h4>
                    <p className="join-webring-desc">
                      Copy the HTML code below and place it on your website, then submit a pull request or email to be added!
                    </p>
                    <textarea 
                      className="webring-code-box"
                      readOnly
                      value={`<a href="https://lemonwebring.xyz" target="_blank"><img src="https://avatars.githubusercontent.com/u/85099589?v=4" width="32" height="32" style="border-radius:50%; vertical-align:middle; margin-right:5px;" /><span>Lemon Webring</span></a>`}
                      onClick={(e) => e.target.select()}
                    />
                    <div className="join-webring-row">
                      <button 
                        type="button" 
                        className="push-button aero-btn alt"
                        onClick={handleCopyWebringCode}
                      >
                        {copied ? 'Copied! ✅' : 'Copy Code 📋'}
                      </button>
                      <a 
                        href="https://github.com/LemonMantis5571/Aero-Webring" 
                        target="_blank" 
                        rel="noreferrer"
                        className="push-button aero-btn"
                      >
                        Submit Site 🚀
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>

          <article className="window panel-window glass">
            <div className="title-bar">
              <div className="title-bar-text">🔗 links.ini — Cool Sites</div>
              <div className="title-bar-controls" aria-hidden="true">
                <button type="button" tabIndex="-1" aria-label="Minimize" />
                <button type="button" tabIndex="-1" aria-label="Maximize" />
                <button type="button" tabIndex="-1" aria-label="Close" />
              </div>
            </div>
            <div className="window-body" id="links">
              <div className="links-grid">
                {friendLinks.map((link) => (
                  <a key={link.name} className="link-button" href={link.url} target="_blank" rel="noreferrer">
                    <span className="link-icon">{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </article>
        </section>

        {/* ── Guestbook ── */}
        <section className="window guestbook-window glass" id="guestbook">
          <div className="title-bar">
            <div className="title-bar-text">📝 guestbook.exe — Sign My Guestbook!</div>
            <div className="title-bar-controls" aria-hidden="true">
              <button type="button" tabIndex="-1" aria-label="Minimize" />
              <button type="button" tabIndex="-1" aria-label="Maximize" />
              <button type="button" tabIndex="-1" aria-label="Close" />
            </div>
          </div>
          <div className="window-body">
            <p className="guestbook-tip">
              💬 Say hello! Sign my live guestbook below. Feel free to leave a comment or emoji.
            </p>
            <div className="guestbook-iframe-container">
              <iframe
                src="https://lemonmantis5571.atabook.org"
                title="LemonMantis5571 Guestbook"
                className="guestbook-iframe"
                scrolling="yes"
              />
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="site-footer">
          <div className="footer-sprites" aria-hidden="true">
            <img src={spriteUrl(620)} alt="" className="footer-sprite" />
            <img src={spriteUrl(245)} alt="" className="footer-sprite footer-sprite-large" />
            <img src={spriteUrl(25)} alt="" className="footer-sprite" />
          </div>
          <p>
            © {new Date().getFullYear()} Leonel Guerrero — Made with{' '}
            <a href="https://khang-nd.github.io/7.css/" target="_blank" rel="noreferrer">7.css</a>
          </p>
          <div className="jp-ticker jp-ticker-footer">
            <div className="jp-ticker-inner">
              <span>✿ ありがとう！ ✿ Thanks for visiting! ✿ サインしてね！ ✿ Sign the guestbook! ✿ ありがとう！ ✿ Thanks for visiting! ✿ サインしてね！ ✿ Sign the guestbook! ✿</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

/* ── Pokémon Card Component ── */
function PokemonCard({ pokemon }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="pokemon-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="pokemon-sprite-container">
        <img
          src={isHovered ? spriteUrl(pokemon.id) : spriteStatic(pokemon.id)}
          alt={`${pokemon.name} sprite`}
          className={`pokemon-sprite ${isHovered ? 'animated' : ''}`}
        />
      </div>
      <span className="pokemon-name">{pokemon.name}</span>
      <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
    </div>
  )
}

export default App
