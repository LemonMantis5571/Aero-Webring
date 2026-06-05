import { useState, useEffect } from 'react'
import './App.css'

/* ── Pokémon sprite data (PokeAPI CDN) ── */
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

/* ── Gallery wallpapers from the web ── */
const galleryImages = [
  {
    src: 'https://wallpapercave.com/wp/wp13908387.png',
    label: 'Frutiger Aero Bubbles',
  },
  {
    src: 'https://wallpapercave.com/wp/wp13908399.png',
    label: 'Nature Glass',
  },
  {
    src: 'https://wallpapercave.com/wp/wp13908393.png',
    label: 'Aero Vista',
  },
  {
    src: 'https://wallpapercave.com/wp/wp13908395.png',
    label: 'Digital Meadow',
  },
  {
    src: 'https://wallpapercave.com/wp/wp13908401.png',
    label: 'Sky Bloom',
  },
]

/* ── Navigation links ── */
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

/* ── Floating Pokémon decoration ── */
function FloatingPokemon() {
  const floaters = [
    { id: 25, x: '5%', y: '15%', delay: '0s', size: 64 },
    { id: 133, x: '88%', y: '8%', delay: '1.2s', size: 56 },
    { id: 7, x: '92%', y: '45%', delay: '2.4s', size: 48 },
    { id: 94, x: '3%', y: '55%', delay: '0.8s', size: 52 },
    { id: 282, x: '90%', y: '78%', delay: '1.6s', size: 56 },
    { id: 350, x: '8%', y: '85%', delay: '3s', size: 48 },
  ]

  return (
    <div className="floating-pokemon" aria-hidden="true">
      {floaters.map((p) => (
        <img
          key={p.id}
          src={spriteUrl(p.id)}
          alt=""
          className="floater-sprite"
          style={{
            left: p.x,
            top: p.y,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  )
}

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
  const [guestMessage, setGuestMessage] = useState('')
  const [guestEntries, setGuestEntries] = useState([
    { name: 'AeroFan2024', msg: 'Love the glossy vibes! ✨', date: '2026-05-28' },
    { name: 'PixelTrainer', msg: 'The Pokémon sprites are so cute!', date: '2026-06-01' },
    { name: 'GlassPanel', msg: 'This site gives me Vista nostalgia 🪟', date: '2026-06-03' },
  ])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleGuestSubmit = (e) => {
    e.preventDefault()
    if (guestMessage.trim()) {
      setGuestEntries([
        { name: 'Visitor', msg: guestMessage, date: new Date().toISOString().split('T')[0] },
        ...guestEntries,
      ])
      setGuestMessage('')
    }
  }

  return (
    <div className="aero-shell">
      <Bubbles />
      <FloatingPokemon />

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
              🌿 welcome.exe — LemonMantis5571&apos;s Neocity
            </div>
            <div className="title-bar-controls" aria-hidden="true">
              <button type="button" tabIndex="-1" aria-label="Minimize" />
              <button type="button" tabIndex="-1" aria-label="Maximize" />
              <button type="button" tabIndex="-1" aria-label="Close" />
            </div>
          </div>
          <div className="window-body hero-body">
            <div className="hero-copy">
              <p className="eyebrow">Frutiger Aero / Pokémon / Personal Web</p>
              <h1>Welcome to my corner of the internet</h1>
              <p className="lede">
                Pokémon pixel art, Frutiger Aero wallpapers, and glossy glass panels.
                Part of the Aero &amp; Y2K Webring.
              </p>

              <div className="hero-actions">
                <a className="push-button aero-btn" href="#pokedex">
                  View My Pokédex
                </a>
                <a className="push-button aero-btn alt" href="#webring">
                  Browse Webring
                </a>
              </div>

              <div className="badge-row" aria-label="Visual themes">
                <span>🌊 glass chrome</span>
                <span>🌈 rainbow reflections</span>
                <span>⚡ pixel pokémon</span>
                <span>🎵 jukebox energy</span>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <img
                src="https://wallpapercave.com/wp/wp13908387.png"
                alt="Frutiger Aero wallpaper"
                className="hero-image"
              />
              <div className="pokemon-showcase">
                <img src={spriteUrl(25)} alt="" className="showcase-sprite bounce-1" />
                <img src={spriteUrl(133)} alt="" className="showcase-sprite bounce-2" />
                <img src={spriteUrl(4)} alt="" className="showcase-sprite bounce-3" />
              </div>
            </div>
          </div>
          <div className="status-bar">
            <p className="status-bar-field">🌤️ Forecast: clear skies with reflective surfaces</p>
            <p className="status-bar-field">🎵 Now playing: soft synthetic tides</p>
          </div>
        </section>

        {/* ── About Me Window ── */}
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
                    src={spriteUrl(197)}
                    alt="Umbreon sprite"
                    className="avatar-sprite"
                  />
                </div>
                <h2 className="about-username">LemonMantis5571</h2>
                <div className="about-badges">
                  <span className="about-badge">🎮 Gamer</span>
                  <span className="about-badge">🌿 Aero Enthusiast</span>
                  <span className="about-badge">⚡ Pokémon Trainer</span>
                </div>
              </div>
              <div className="about-text">
                <p>
                  Hey! Welcome to my site. I like Frutiger Aero, Pokémon, and the personal web.
                </p>
                <p>
                  This is my neocity — a place for pixel art, wallpapers, and links to cool sites.
                  The internet should be personal and creative.
                </p>
                <div className="field-row about-field">
                  <label>Favorite Pokémon:</label>
                  <span>Umbreon, Gardevoir, Flygon</span>
                </div>
                <div className="field-row about-field">
                  <label>Aesthetic:</label>
                  <span>Frutiger Aero, Y2K, Skeuomorphism</span>
                </div>
              </div>
            </div>
          </article>

          {/* ── Now Playing Panel ── */}
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
                    <div
                      key={i}
                      className="viz-bar"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
                <div className="track-info">
                  <span className="track-title">Synthetic Tides</span>
                  <span className="track-artist">Aero FM</span>
                </div>
                <div className="music-controls">
                  <button className="music-btn" type="button">⏮</button>
                  <button className="music-btn play-btn" type="button">▶</button>
                  <button className="music-btn" type="button">⏭</button>
                </div>
              </div>

              <div className="weather-widget">
                <span className="weather-icon">🌤️</span>
                <div>
                  <strong>Desktop Weather</strong>
                  <br />
                  Clear skies, 72°F
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* ── Pokédex Grid ── */}
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
            <p className="panel-intro">
              My Pokémon team — hover to see animated sprites! 🎮
            </p>
            <div className="pokemon-grid">
              {pokemonTeam.map((poke) => (
                <PokemonCard key={poke.id} pokemon={poke} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Gallery / Wallpapers Window ── */}
        <section className="window gallery-window glass" id="gallery">
          <div className="title-bar">
            <div className="title-bar-text">🖼️ gallery.bmp — Frutiger Aero Wallpapers</div>
            <div className="title-bar-controls" aria-hidden="true">
              <button type="button" tabIndex="-1" aria-label="Minimize" />
              <button type="button" tabIndex="-1" aria-label="Maximize" />
              <button type="button" tabIndex="-1" aria-label="Close" />
            </div>
          </div>
          <div className="window-body">
            <p className="panel-intro">
              Frutiger Aero wallpapers — images from{' '}
              <a href="https://wallpapercave.com/frutiger-aero-wallpapers" target="_blank" rel="noreferrer">
                WallpaperCave
              </a>
              . 🌿
            </p>
            <div className="gallery-grid">
              {galleryImages.map((img, i) => (
                <a
                  key={i}
                  className={`gallery-card ${i === 0 ? 'main-card' : ''}`}
                  href={img.src}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="gallery-img"
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <span>{img.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Webring Section ── */}
        <section className="grid-panels" id="webring">
          <article className="window panel-window glass">
            <div className="title-bar">
              <div className="title-bar-text">🌐 aero_webring.url — Neighbors</div>
              <div className="title-bar-controls" aria-hidden="true">
                <button type="button" tabIndex="-1" aria-label="Minimize" />
                <button type="button" tabIndex="-1" aria-label="Maximize" />
                <button type="button" tabIndex="-1" aria-label="Close" />
              </div>
            </div>
            <div className="window-body">
              <p className="panel-intro">
                Part of the{' '}
                <a href="https://frutigeraeroarchive.org/aero_webring" target="_blank" rel="noreferrer">
                  Aero &amp; Y2K Webring
                </a>
                . 🌊
              </p>
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
                <a
                  href="https://frutigeraeroarchive.org/aero_webring"
                  target="_blank"
                  rel="noreferrer"
                  className="push-button aero-btn"
                >
                  ← Prev
                </a>
                <span className="webring-badge">🌐 Aero &amp; Y2K Webring</span>
                <a
                  href="https://frutigeraeroarchive.org/aero_webring"
                  target="_blank"
                  rel="noreferrer"
                  className="push-button aero-btn"
                >
                  Next →
                </a>
              </div>
            </div>
          </article>

          {/* ── Links / Buttons Panel ── */}
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
                  <a
                    key={link.name}
                    className="link-button"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="link-icon">{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>

              <div className="button-wall">
                <h3>88×31 Buttons</h3>
                <div className="buttons-row">
                  <div className="pixel-button" title="Made with React">⚛️ React</div>
                  <div className="pixel-button" title="Frutiger Aero">🌿 Aero</div>
                  <div className="pixel-button" title="7.css">🪟 7.css</div>
                  <div className="pixel-button" title="Pokémon Fan">⚡ Poké</div>
                  <div className="pixel-button" title="Personal Web">🏠 Neocity</div>
                </div>
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
            <form className="guestbook-form" onSubmit={handleGuestSubmit}>
              <div className="field-row guestbook-input-row">
                <label htmlFor="guestMsg">Your message:</label>
                <input
                  id="guestMsg"
                  type="text"
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)}
                  placeholder="Leave a message..."
                  maxLength={200}
                />
                <button type="submit" className="push-button aero-btn">
                  Sign ✍️
                </button>
              </div>
            </form>
            <div className="guestbook-entries">
              {guestEntries.map((entry, i) => (
                <div key={i} className="guestbook-entry">
                  <div className="entry-header">
                    <strong>{entry.name}</strong>
                    <span className="entry-date">{entry.date}</span>
                  </div>
                  <p>{entry.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="site-footer">
          <div className="footer-sprites" aria-hidden="true">
            <img src={spriteUrl(25)} alt="" className="footer-sprite" />
            <img src={spriteUrl(133)} alt="" className="footer-sprite" />
            <img src={spriteUrl(1)} alt="" className="footer-sprite" />
          </div>
          <p>
            © {new Date().getFullYear()} LemonMantis5571 — Made with{' '}
            <a href="https://khang-nd.github.io/7.css/" target="_blank" rel="noreferrer">
              7.css
            </a>
          </p>
          <p className="footer-sub">
            Part of the{' '}
            <a href="https://frutigeraeroarchive.org/aero_webring" target="_blank" rel="noreferrer">
              Aero &amp; Y2K Webring
            </a>{' '}
            🌐
          </p>
          <div className="footer-marquee">
            <div className="marquee-inner">
              ✨ Welcome to the personal web ✨ The internet still has weather ✨ Glossy surfaces and pixel dreams ✨ Thank you for visiting ✨ Welcome to the personal web ✨ The internet still has weather ✨ Glossy surfaces and pixel dreams ✨ Thank you for visiting ✨
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
