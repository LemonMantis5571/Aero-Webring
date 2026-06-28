import { useState, useEffect, useRef } from 'react'
import './App.css'
import siteData from './siteData.json'

const spriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`

const spriteStatic = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

/* ── Walking NPCs with conversation system ── */
function NpcLayer() {
  const npc1Ref = useRef(null)
  const npc2Ref = useRef(null)
  const pos1 = useRef({ x: 20, y: 200 })
  const pos2 = useRef({ x: 200, y: 400 })
  const target1 = useRef({ x: 200, y: 400 })
  const target2 = useRef({ x: 100, y: 200 })
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
      const vpW = window.innerWidth
      const vpH = window.innerHeight
      return {
        x: 20 + Math.random() * (vpW - 140),
        y: 60 + Math.random() * (vpH - 180),
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
          const convo = siteData.npc.conversation[Math.floor(Math.random() * siteData.npc.conversation.length)]
          setBubble1(convo.a)
          setTimeout(() => setBubble2(convo.b), 1200)
          setTimeout(() => { setBubble1(null); setBubble2(null) }, 5000)
          chatCooldown.current = 12 // cooldown in ~12 seconds
        } else {
          // Solo chatter
          if (soloCooldown1.current <= 0 && Math.random() < 0.08) {
            const lines = siteData.npc.solo.byakuren
            setBubble1(lines[Math.floor(Math.random() * lines.length)])
            setTimeout(() => setBubble1(null), 3500)
            soloCooldown1.current = 8
          }
          if (soloCooldown2.current <= 0 && Math.random() < 0.08) {
            const lines = siteData.npc.solo.mokou
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
        <img src={siteData.npc.sprites.left} alt="" className="npc-sprite" />
      </div>
      <div ref={npc2Ref} className="npc">
        {bubble2 && <div className="npc-bubble npc-bubble-right">{bubble2}</div>}
        <img src={siteData.npc.sprites.right} alt="" className="npc-sprite" />
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

/* ── Soft drifting clouds ── */
function Clouds() {
  return (
    <div className="clouds-layer" aria-hidden="true">
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />
    </div>
  )
}

/* ── Water Droplets ── */
function WaterDroplets({ count = 8 }) {
  const [drops] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      top: 5 + Math.random() * 90,
      size: 6 + Math.random() * 12,
      delay: Math.random() * 3
    }))
  );

  return (
    <div className="water-droplets-overlay" aria-hidden="true">
      {drops.map((d) => (
        <div
          key={d.id}
          className="water-droplet"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size * 0.9}px`,
            animationDelay: `${d.delay}s`
          }}
        />
      ))}
    </div>
  );
}

/* ── Static pixel NPC decorations ── */
function StaticPageNpcs() {
  const [activeDialogue, setActiveDialogue] = useState({
    jennie: 0,
    rose: 0,
    jisoo: 0,
    lisa: 0,
  })

  const npcs = [
    {
      id: 'jennie',
      name: 'Ruby Jennie',
      src: '/jennie-ruby-npc.png',
      className: 'static-npc-jennie',
      dialogue: [
        'Ruby mode online.',
        'This glass UI is cute.',
        'The whole crew is here.',
      ],
    },
    {
      id: 'rose',
      name: 'Rosé',
      src: '/rose-npc.png',
      className: 'static-npc-rose',
      dialogue: [
        'Welcome to the webring.',
        'I found the music panel.',
        'Jennie picked the red theme.',
      ],
    },
    {
      id: 'jisoo',
      name: 'Earthquake Jisoo',
      src: '/jisoo-earthquake-npc.png',
      className: 'static-npc-jisoo',
      dialogue: [
        'Tiny earthquake warning.',
        'The pixels are shaking.',
        'Stay balanced.',
      ],
    },
    {
      id: 'lisa',
      name: 'Rockstar Lisa',
      src: '/lisa-rockstar-npc.png',
      className: 'static-npc-lisa',
      dialogue: [
        'Rockstar mode.',
        'White boots, loud energy.',
        'Turn the volume up.',
      ],
    },
  ]

  const handleNpcClick = (id, dialogueCount) => {
    setActiveDialogue((current) => ({
      ...current,
      [id]: (current[id] + 1) % dialogueCount,
    }))
  }

  return (
    <div className="static-npc-layer" aria-label="Pixel character NPCs">
      {npcs.map((npc) => (
        <button
          key={npc.id}
          type="button"
          className={`static-page-npc ${npc.className}`}
          onClick={() => handleNpcClick(npc.id, npc.dialogue.length)}
          aria-label={`Talk to ${npc.name}`}
        >
          <span className="static-npc-bubble" role="status">
            {npc.dialogue[activeDialogue[npc.id]]}
          </span>
          <img src={npc.src} alt="" className="static-npc-sprite" />
        </button>
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
    const codeSnippet = siteData.links.webringCode
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="aero-shell">
      <Bubbles />
      <Clouds />

      {/* Hidden background audio element */}
      <audio ref={audioRef} src={siteData.music.audioSrc} loop />

      {/* Walking NPCs — roam the entire page and chat */}
      <NpcLayer />

      {/* ── Top Bar ── */}
      <header className="topbar">
        <div className="brand-pill">
          <span className="brand-orb" aria-hidden="true" />
          {siteData.site.brand}
        </div>
        <nav className="quick-links" aria-label="Quick links">
          {siteData.navigation.map((link) => (
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
        <StaticPageNpcs />

        {/* ── Hero Banner ── */}
        <section className="window hero-window glass active" aria-labelledby="hero-title">
          <div className="title-bar">
            <div className="title-bar-text" id="hero-title">
              {siteData.site.heroWindowTitle}
            </div>
            <div className="title-bar-controls" aria-hidden="true">
              <button type="button" tabIndex="-1" aria-label="Minimize" />
              <button type="button" tabIndex="-1" aria-label="Maximize" />
              <button type="button" tabIndex="-1" aria-label="Close" />
            </div>
          </div>
          <div className="window-body hero-body">
            <WaterDroplets count={8} />
            <div className="hero-copy">
              <h1>{siteData.site.heroTitle}</h1>
              <p className="hero-subtitle">{siteData.site.heroSubtitle}</p>

              <div className="hero-actions">
                {siteData.site.heroActions.map((action) => (
                  <a
                    key={action.label}
                    className={`push-button aero-btn${action.variant === 'alt' ? ' alt' : ''}`}
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noreferrer" : undefined}
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="pokemon-showcase">
                <img src={spriteUrl(siteData.pokemonTeam[0].id)} alt="" className="showcase-sprite bounce-1" />
                <img src={spriteUrl(siteData.pokemonTeam[1].id)} alt="" className="showcase-sprite bounce-2 showcase-large" />
                <img src={spriteUrl(siteData.pokemonTeam[2].id)} alt="" className="showcase-sprite bounce-3" />
              </div>
            </div>
          </div>
          <div className="status-bar">
            <p className="status-bar-field">🌤️ {currentTime.toLocaleDateString()}</p>
            <p className="status-bar-field">🎵 {isPlaying ? `${siteData.music.playingLabelPrefix} ${siteData.music.trackTitle} - ${siteData.music.trackArtist}` : siteData.music.pausedLabel}</p>
          </div>
        </section>

        {/* ── Japanese-style marquee ticker ── */}
        <div className="jp-ticker">
          <div className="jp-ticker-inner">
            <span>{siteData.site.tickerPrimary}</span>
          </div>
        </div>

        {/* ── About Me ── */}
        <section className="grid-panels" id="about">
          <article className="window panel-window glass">
            <div className="title-bar">
              <div className="title-bar-text">{siteData.about.windowTitle}</div>
              <div className="title-bar-controls" aria-hidden="true">
                <button type="button" tabIndex="-1" aria-label="Minimize" />
                <button type="button" tabIndex="-1" aria-label="Maximize" />
                <button type="button" tabIndex="-1" aria-label="Close" />
              </div>
            </div>
            <div className="window-body about-body">
              <WaterDroplets count={5} />
              <div className="about-avatar-section">
                <div className="avatar-frame">
                  <img
                    src={siteData.about.avatarUrl}
                    alt={siteData.about.name}
                    className="avatar-github"
                  />
                </div>
                <h2 className="about-username">{siteData.about.name}</h2>
                <p className="about-handle">{siteData.about.handle}</p>
                <div className="about-badges">
                  {siteData.about.badges.map((badge) => (
                    <span key={badge} className="about-badge">{badge}</span>
                  ))}
                </div>
              </div>
              <div className="about-text">
                <p>{siteData.about.intro}</p>
                {siteData.about.fields.map((field) => (
                  <div key={field.label} className="field-row about-field">
                    <label>{field.label}</label>
                    <span>{field.value}</span>
                  </div>
                ))}
                <div className="about-fav-sprites">
                  <img src={spriteUrl(siteData.pokemonTeam[0].id)} alt={siteData.pokemonTeam[0].name} className="fav-sprite" />
                  <img src={spriteUrl(siteData.pokemonTeam[1].id)} alt={siteData.pokemonTeam[1].name} className="fav-sprite fav-sprite-large" />
                </div>
              </div>
            </div>
          </article>

          {/* ── Now Playing ── */}
          <article className="window panel-window glass status-panel">
            <div className="title-bar">
              <div className="title-bar-text">{siteData.music.windowTitle}</div>
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
                  <span className="track-title">{siteData.music.trackTitle}</span>
                  <span className="track-artist">{siteData.music.trackArtist}</span>
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
            <div className="title-bar-text">{siteData.projects.windowTitle}</div>
            <div className="title-bar-controls" aria-hidden="true">
              <button type="button" tabIndex="-1" aria-label="Minimize" />
              <button type="button" tabIndex="-1" aria-label="Maximize" />
              <button type="button" tabIndex="-1" aria-label="Close" />
            </div>
          </div>
          <div className="window-body">
            <WaterDroplets count={6} />
            <div className="projects-grid">
              {siteData.projects.items.map((proj) => (
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
                      style={{ '--lang-color': proj.langColor || '#666' }}
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
                href={siteData.projects.ctaHref}
                target="_blank"
                rel="noreferrer"
                className="push-button aero-btn"
              >
                {siteData.projects.ctaLabel}
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
            <span>{siteData.site.tickerSecondary}</span>
          </div>
        </div>

        {/* ── Pokédex ── */}
        <section className="window pokedex-window glass" id="pokedex">
          <div className="title-bar">
            <div className="title-bar-text">{siteData.pokedex.windowTitle}</div>
            <div className="title-bar-controls" aria-hidden="true">
              <button type="button" tabIndex="-1" aria-label="Minimize" />
              <button type="button" tabIndex="-1" aria-label="Maximize" />
              <button type="button" tabIndex="-1" aria-label="Close" />
            </div>
          </div>
          <div className="window-body">
            <WaterDroplets count={6} />
            <div className="pokemon-grid">
              {siteData.pokemonTeam.map((poke) => (
                <PokemonCard key={poke.id} pokemon={poke} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Lisa Aero Decoration ── */}
        <div className="aero-decor aero-decor-lisa">
          <img src="/00e94b0b88daf71b60a25f6963ef7c92.jpg" alt="" className="aero-decor-img" />
        </div>

        {/* ── Links & Pet ── */}
        <section className="grid-panels" id="webring">
          <article className="window panel-window glass">
            <div className="title-bar">
              <div className="title-bar-text">{siteData.links.windowTitle}</div>
              <div className="title-bar-controls" aria-hidden="true">
                <button type="button" tabIndex="-1" aria-label="Minimize" />
                <button type="button" tabIndex="-1" aria-label="Maximize" />
                <button type="button" tabIndex="-1" aria-label="Close" />
              </div>
            </div>
            <div className="window-body" id="links">
              <WaterDroplets count={4} />
              <div className="links-grid">
                {siteData.links.items.map((link) => (
                  <a key={link.name} className="link-button" href={link.url} target="_blank" rel="noreferrer">
                    <span className="link-icon">{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>

              <div className="links-webring-share">
                  <button
                    type="button"
                    className="push-button aero-btn links-webring-btn"
                    onClick={() => setShowWebringModal(!showWebringModal)}
                  >
                    {showWebringModal ? siteData.links.webringButtonHide : siteData.links.webringButtonShow}
                  </button>

                  {showWebringModal && (
                    <div className="links-webring-panel">
                      <p className="links-webring-desc">
                        {siteData.links.webringDescription}
                      </p>
                      <textarea
                        className="webring-code-box"
                        readOnly
                        value={siteData.links.webringCode}
                        onClick={(e) => e.target.select()}
                      />
                    <div className="links-webring-row">
                      <button
                        type="button"
                        className="push-button aero-btn alt"
                        onClick={handleCopyWebringCode}
                      >
                        {copied ? siteData.links.webringCopiedLabel : siteData.links.webringCopyLabel}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>

          <article className="window panel-window glass pet-window">
            <div className="title-bar">
              <div className="title-bar-text">{siteData.pet.windowTitle}</div>
              <div className="title-bar-controls" aria-hidden="true">
                <button type="button" tabIndex="-1" aria-label="Minimize" />
                <button type="button" tabIndex="-1" aria-label="Maximize" />
                <button type="button" tabIndex="-1" aria-label="Close" />
              </div>
            </div>
            <div className="window-body pet-window-body">
              <WaterDroplets count={3} />
              <div className="pet-display">
                <div className="pet-habitat">
                  <div className="pet-glow-aura" />
                  <a href={siteData.pet.adoptionUrl} target="_blank" rel="noreferrer" className="pet-sprite-link">
                    <img
                      src={siteData.pet.spriteUrl}
                      alt={siteData.pet.species}
                      className="pet-animated-sprite"
                    />
                  </a>
                </div>
                <div className="pet-info">
                  <h3 className="pet-name">{siteData.pet.name}</h3>
                  <p className="pet-species">{siteData.pet.species}</p>
                </div>
              </div>

              <div className="pet-stats">
                {siteData.pet.stats.map((stat) => (
                  <div key={stat.label} className="pet-stat-row">
                    <span className="pet-stat-label">{stat.label}</span>
                    <div className="pet-stat-bar">
                      <div className={`pet-stat-fill ${stat.className}`.trim()} style={{ width: `${stat.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pet-adoption-cta">
                <span className="pet-tagline">{siteData.pet.tagline}</span>
                <a
                  href={siteData.pet.adoptionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="push-button aero-btn alt pet-adopt-btn"
                >
                  {siteData.pet.adoptionLabel}
                </a>
              </div>
            </div>
          </article>
        </section>

        {/* ── Guestbook ── */}
        <section className="window guestbook-window glass" id="guestbook">
          <div className="title-bar">
            <div className="title-bar-text">{siteData.guestbook.windowTitle}</div>
            <div className="title-bar-controls" aria-hidden="true">
              <button type="button" tabIndex="-1" aria-label="Minimize" />
              <button type="button" tabIndex="-1" aria-label="Maximize" />
              <button type="button" tabIndex="-1" aria-label="Close" />
            </div>
          </div>
          <div className="window-body">
            <WaterDroplets count={5} />
            <p className="guestbook-tip">
              {siteData.guestbook.tip}
            </p>
            <div className="guestbook-iframe-container">
              <iframe
                src={siteData.guestbook.iframeSrc}
                title={siteData.guestbook.iframeTitle}
                className="guestbook-iframe"
                scrolling="yes"
              />
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="site-footer">
          <div className="footer-sprites" aria-hidden="true">
            <img src={spriteUrl(siteData.pokemonTeam[0].id)} alt="" className="footer-sprite" />
            <img src={spriteUrl(siteData.pokemonTeam[1].id)} alt="" className="footer-sprite footer-sprite-large" />
            <img src={spriteUrl(siteData.pokemonTeam[2].id)} alt="" className="footer-sprite" />
          </div>
          <a
            href={siteData.links.webringSourceHref}
            target="_blank"
            rel="noreferrer"
            className="footer-source-link"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-source-icon">
              <path
                fill="currentColor"
                d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.57.11.78-.25.78-.55 0-.27-.01-1.17-.01-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.14 1.17A10.9 10.9 0 0 1 12 6.03c.97 0 1.95.13 2.86.38 2.18-1.48 3.13-1.17 3.13-1.17.63 1.59.24 2.76.12 3.05.74.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.37-5.26 5.66.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.67.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
              />
            </svg>
            <span>{siteData.links.webringSourceLabel}</span>
          </a>
          <p>
            © {new Date().getFullYear()} Leonel Guerrero — Made with{' '}
            <a href="https://khang-nd.github.io/7.css/" target="_blank" rel="noreferrer">7.css</a>
          </p>
          <div className="jp-ticker jp-ticker-footer">
            <div className="jp-ticker-inner">
              <span>{siteData.site.footerTicker}</span>
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
