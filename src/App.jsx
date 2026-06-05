import './App.css'

const inspirations = [
  {
    title: 'Extra Graphics',
    href: 'https://lakes.glamour.ovh/extragraphics.html',
    description:
      'Glossy icons, drifting sparkle, and a page surface filled edge to edge with little treasures.',
  },
  {
    title: 'Skyweaver',
    href: 'https://skyweaver.nekoweb.org',
    description:
      'Handmade textures, bright little portals, and a homepage that feels lived in and softly enchanted.',
  },
  {
    title: 'Lakes',
    href: 'https://lakes.glamour.ovh',
    description:
      'Water gradients, luminous glass, and desktop nostalgia drifting through every panel.',
  },
  {
    title: 'Frutiger Aero Webring',
    href: 'https://frutigeraeroarchive.org/aero_webring',
    description:
      'A bright ring of neighboring worlds, outgoing links, and a shared atmosphere of weather and glow.',
  },
]

const orbitSites = [
  'pixel aquariums',
  'button walls',
  'playlist shrines',
  'weather widgets',
  'guestbooks',
  'stamp collections',
]

const buildNotes = [
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
  'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip.',
  'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.',
]

function App() {
  return (
    <div className="aero-shell">
      <header className="topbar">
        <div className="brand-pill">
          <span className="brand-orb" aria-hidden="true" />
          Aero Webring
        </div>
        <nav className="quick-links" aria-label="Quick links">
          <a href="#manifesto">Manifesto</a>
          <a href="#inspiration">Inspiration</a>
          <a href="#join">Join In</a>
        </nav>
      </header>

      <main className="desktop">
        <section className="window hero-window active" aria-labelledby="hero-title">
          <div className="title-bar">
            <div className="title-bar-text" id="hero-title">
              neocity.exe
            </div>
            <div className="title-bar-controls" aria-hidden="true">
              <button type="button" tabIndex="-1" />
              <button type="button" tabIndex="-1" />
              <button type="button" tabIndex="-1" />
            </div>
          </div>
          <div className="window-body hero-body">
            <div className="hero-copy">
              <p className="eyebrow">Frutiger Aero / Windows 7 / personal web</p>
              <h1>Let&apos;s make a neocity that looks like the internet still has weather.</h1>
              <p className="lede" id="manifesto">
                A bright desktop lagoon of glass panels, floating badges, sky bloom, and silver-blue
                reflections. Buttons drift like little portals, links loop outward in every
                direction, and each panel feels touched by rain, light, and music.
              </p>

              <div className="hero-actions">
                <a className="push-button" href="https://frutigeraeroarchive.org/aero_webring" target="_blank" rel="noreferrer">
                  Browse the Webring
                </a>
                <a className="push-button alt" href="https://github.com/khang-nd/7.css" target="_blank" rel="noreferrer">
                  Open 7.css
                </a>
              </div>

              <div className="badge-row" aria-label="Visual themes">
                <span>glass chrome</span>
                <span>rainbow reflections</span>
                <span>site buttons</span>
                <span>jukebox energy</span>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="sky-disc sky-disc-large" />
              <div className="sky-disc sky-disc-small" />
              <div className="glass-card glass-card-main">
                <div className="glass-shine" />
                <div className="glass-fish glass-fish-one" />
                <div className="glass-fish glass-fish-two" />
                <div className="glass-wave" />
              </div>
              <div className="mini-badge mini-badge-top">Aero</div>
              <div className="mini-badge mini-badge-bottom">Win7</div>
            </div>
          </div>
          <div className="status-bar">
            <p className="status-bar-field">Forecast: clear skies with reflective surfaces</p>
            <p className="status-bar-field">Now playing: soft synthetic tides</p>
          </div>
        </section>

        <section className="grid-panels">
          <article className="window panel-window" id="inspiration">
            <div className="title-bar">
              <div className="title-bar-text">inspiration.url</div>
            </div>
            <div className="window-body">
              <p className="panel-intro">
                Shiny, personal, and gently overgrown with color, gloss, and link-out energy.
              </p>
              <div className="site-grid">
                {inspirations.map((item) => (
                  <a key={item.title} className="site-card" href={item.href} target="_blank" rel="noreferrer">
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </a>
                ))}
              </div>
            </div>
          </article>

          <article className="window panel-window">
            <div className="title-bar">
              <div className="title-bar-text">orbit-panel.ini</div>
            </div>
            <div className="window-body">
              <div className="groupbox">
                <div className="legend">Orbit collection</div>
                <ul className="orbit-list">
                  {orbitSites.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="field-row build-row">
                <label htmlFor="mood">Sky</label>
                <input id="mood" type="text" value="sunlit desktop lagoon" readOnly />
              </div>
              <div className="field-row build-row">
                <label htmlFor="genre">Theme</label>
                <input id="genre" type="text" value="Frutiger Aero memory garden" readOnly />
              </div>
            </div>
          </article>
        </section>

        <section className="lower-panels">
          <article className="window notes-window">
            <div className="title-bar">
              <div className="title-bar-text">cloud-notes.txt</div>
            </div>
            <div className="window-body">
              <ol className="notes-list">
                {buildNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </article>

          <aside className="window join-window" id="join">
            <div className="title-bar">
              <div className="title-bar-text">join-webring.cpl</div>
            </div>
            <div className="window-body">
              <p className="join-copy">
                A page of neighboring skies, glossy little pathways, and shelves for odd treasures,
                stamps, and weather-worn keepsakes.
              </p>
              <div className="join-actions">
                <a className="push-button wide" href="https://frutigeraeroarchive.org/aero_webring" target="_blank" rel="noreferrer">
                  Submit / Explore
                </a>
                <a className="push-button wide alt" href="https://skyweaver.nekoweb.org" target="_blank" rel="noreferrer">
                  Visit a Neighbor
                </a>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  )
}

export default App
