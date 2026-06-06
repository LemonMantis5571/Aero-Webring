import { useState, useEffect } from 'react'
import './App.css'

/* ── Pokémon sprites (PokeAPI CDN) ── */
const pokemonTeam = [
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
  { name: 'Flygon', id: 330 },
  { name: 'Milotic', id: 350 },
]

const spriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`

const spriteStatic = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

/* ── Navigation ── */
const navLinks = [
  { label: 'About Me', href: '#about' },
  { label: 'Pokédex', href: '#pokedex' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Webring', href: '#webring' },
  { label: 'Guestbook', href: '#guestbook' },
  { label: 'Links', href: '#links' },
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
  { name: 'Neocities', url: 'https://neocities.org/', icon: '🏠' },
  { name: 'Nekoweb', url: 'https://nekoweb.org/', icon: '🐱' },
  { name: 'Frutiger Aero Archive', url: 'https://frutigeraeroarchive.org/', icon: '🌿' },
  { name: 'MelonLand Forum', url: 'https://forum.melonland.net/', icon: '🍈' },
  { name: 'PokeAPI', url: 'https://pokeapi.co/', icon: '⚡' },
  { name: '7.css', url: 'https://khang-nd.github.io/7.css/', icon: '🪟' },
]

/* ── Gallery wallpapers ── */
const galleryImages = [
  { src: 'https://wallpapercave.com/wp/wp13908387.png', label: 'Bubbles' },
  { src: 'https://wallpapercave.com/wp/wp13908399.png', label: 'Nature Glass' },
  { src: 'https://wallpapercave.com/wp/wp13908393.png', label: 'Vista' },
  { src: 'https://wallpapercave.com/wp/wp13908395.png', label: 'Meadow' },
  { src: 'https://wallpapercave.com/wp/wp13908401.png', label: 'Sky' },
]

/* ── Guestbook storage key ── */
const GUESTBOOK_KEY = 'lemonmantis-guestbook'

/* ── Bubble decorations ── */
function Bubbles() {
  const bubbles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 6 + Math.random() * 28,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
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
  const [guestName, setGuestName] = useState('')
  const [guestMessage, setGuestMessage] = useState('')
  const [guestEntries, setGuestEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(GUESTBOOK_KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  /* ── Save guestbook to localStorage whenever it changes ── */
  useEffect(() => {
    localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(guestEntries))
  }, [guestEntries])

  /* ── Submit guestbook entry ── */
  const handleGuestSubmit = (e) => {
    e.preventDefault()
    if (!guestMessage.trim() || !guestName.trim()) return

    const newEntry = {
      name: guestName.trim().slice(0, 30),
      msg: guestMessage.trim().slice(0, 200),
      date: new Date().toISOString().split('T')[0],
    }

    setGuestEntries((prev) => [newEntry, ...prev].slice(0, 50))
    setGuestName('')
    setGuestMessage('')
  }

  return (
    <div className="aero-shell">
      <Bubbles />

      {/* Decorative GIFs scattered around */}
      <div className="deco-gifs" aria-hidden="true">
        <img src="/byakuren.gif" alt="" className="deco-gif deco-gif-1" />
        <img src="/mokou.gif" alt="" className="deco-gif deco-gif-2" />
        <img src="/byakuren.gif" alt="" className="deco-gif deco-gif-3" />
        <img src="/mokou.gif" alt="" className="deco-gif deco-gif-4" />
      </div>

      {/* ── Top Bar ── */}
      <header className="topbar">
        <div className="brand-pill">
          <span className="brand-orb" aria-hidden="true" />
          LemonMantis5571
        </div>
        <nav className="quick-links" aria-label="Quick links">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
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
              🌿 welcome.exe — LemonMantis5571
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

              <div className="hero-gifs">
                <img src="/byakuren.gif" alt="Byakuren" className="hero-gif" />
                <img src="/mokou.gif" alt="Mokou" className="hero-gif" />
              </div>

              <div className="hero-actions">
                <a className="push-button aero-btn" href="#pokedex">
                  My Pokédex
                </a>
                <a className="push-button aero-btn alt" href="#guestbook">
                  Sign Guestbook
                </a>
              </div>

              <div className="badge-row" aria-label="Interests">
                <span>🌊 Touhou</span>
                <span>⚡ Pokémon</span>
                <span>🎮 Games</span>
                <span>🎵 Music</span>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="pokemon-showcase">
                <img src={spriteUrl(25)} alt="" className="showcase-sprite bounce-1" />
                <img src={spriteUrl(133)} alt="" className="showcase-sprite bounce-2" />
                <img src={spriteUrl(4)} alt="" className="showcase-sprite bounce-3" />
              </div>
            </div>
          </div>
          <div className="status-bar">
            <p className="status-bar-field">🌤️ {currentTime.toLocaleDateString()}</p>
            <p className="status-bar-field">🎵 Now playing: something cool</p>
          </div>
        </section>

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
                  <img src={spriteUrl(197)} alt="Umbreon" className="avatar-sprite" />
                </div>
                <h2 className="about-username">LemonMantis5571</h2>
                <div className="about-badges">
                  <span className="about-badge">🎮 Gamer</span>
                  <span className="about-badge">⚡ Pokémon Trainer</span>
                </div>
              </div>
              <div className="about-text">
                <p>Hey! Welcome to my site.</p>
                <div className="field-row about-field">
                  <label>Favorite Pokémon:</label>
                  <span>Umbreon, Gardevoir, Flygon</span>
                </div>
                <img src="/byakuren.gif" alt="Byakuren" className="about-gif" />
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
              <div className="now-playing">
                <div className="music-visualizer" aria-hidden="true">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="viz-bar" style={{ animationDelay: `${i * 0.12}s` }} />
                  ))}
                </div>
                <div className="track-info">
                  <span className="track-title">Synthetic Tides</span>
                  <span className="track-artist">FM</span>
                </div>
                <div className="music-controls">
                  <button className="music-btn" type="button">⏮</button>
                  <button className="music-btn play-btn" type="button">▶</button>
                  <button className="music-btn" type="button">⏭</button>
                </div>
              </div>
              <div className="panel-gif-container">
                <img src="/mokou.gif" alt="Mokou" className="panel-gif" />
              </div>
            </div>
          </article>
        </section>

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

        {/* ── Gallery ── */}
        <section className="window gallery-window glass" id="gallery">
          <div className="title-bar">
            <div className="title-bar-text">🖼️ gallery.bmp — Wallpapers</div>
            <div className="title-bar-controls" aria-hidden="true">
              <button type="button" tabIndex="-1" aria-label="Minimize" />
              <button type="button" tabIndex="-1" aria-label="Maximize" />
              <button type="button" tabIndex="-1" aria-label="Close" />
            </div>
          </div>
          <div className="window-body">
            <div className="gallery-grid">
              {galleryImages.map((img, i) => (
                <a
                  key={i}
                  className={`gallery-card ${i === 0 ? 'main-card' : ''}`}
                  href={img.src}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={img.src} alt={img.label} className="gallery-img" loading="lazy" />
                  <div className="gallery-overlay">
                    <span>{img.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Webring ── */}
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
              <div className="webring-nav">
                <a href="https://frutigeraeroarchive.org/aero_webring" target="_blank" rel="noreferrer" className="push-button aero-btn">
                  ← Prev
                </a>
                <span className="webring-badge">🌐 Y2K Webring</span>
                <a href="https://frutigeraeroarchive.org/aero_webring" target="_blank" rel="noreferrer" className="push-button aero-btn">
                  Next →
                </a>
              </div>
            </div>
          </article>

          {/* ── Links ── */}
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
              <div className="panel-gif-container">
                <img src="/byakuren.gif" alt="Byakuren" className="panel-gif" />
              </div>
            </div>
          </article>
        </section>

        {/* ── Guestbook (Functional — JSONBin backend) ── */}
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
            <form className="guestbook-form" onSubmit={handleGuestSubmit}>
              <div className="guestbook-fields">
                <div className="field-row guestbook-input-row">
                  <label htmlFor="guestName">Name:</label>
                  <input
                    id="guestName"
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Your name"
                    maxLength={30}
                    required
                  />
                </div>
                <div className="field-row guestbook-input-row">
                  <label htmlFor="guestMsg">Message:</label>
                  <input
                    id="guestMsg"
                    type="text"
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Leave a message..."
                    maxLength={200}
                    required
                  />
                </div>
                <button type="submit" className="push-button aero-btn">
                  Sign ✍️
                </button>
              </div>
            </form>
            <div className="guestbook-entries">
              {guestEntries.length === 0 ? (
                <p className="guest-loading">No entries yet — be the first to sign!</p>
              ) : (
                guestEntries.map((entry, i) => (
                  <div key={i} className="guestbook-entry">
                    <div className="entry-header">
                      <strong>{entry.name}</strong>
                      <span className="entry-date">{entry.date}</span>
                    </div>
                    <p>{entry.msg}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="site-footer">
          <div className="footer-sprites" aria-hidden="true">
            <img src={spriteUrl(25)} alt="" className="footer-sprite" />
            <img src="/mokou.gif" alt="" className="footer-gif" />
            <img src={spriteUrl(133)} alt="" className="footer-sprite" />
            <img src="/byakuren.gif" alt="" className="footer-gif" />
            <img src={spriteUrl(1)} alt="" className="footer-sprite" />
          </div>
          <p>
            © {new Date().getFullYear()} LemonMantis5571 — Made with{' '}
            <a href="https://khang-nd.github.io/7.css/" target="_blank" rel="noreferrer">7.css</a>
          </p>
          <div className="footer-marquee">
            <div className="marquee-inner">
              ✨ Welcome to my site ✨ Thanks for visiting ✨ Sign the guestbook! ✨ Welcome to my site ✨ Thanks for visiting ✨ Sign the guestbook! ✨
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
