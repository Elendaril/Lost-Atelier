import { useItemPreviewStore } from './store/itemPreviewStore';
import './App.css';

function App() {
  const name = useItemPreviewStore((state) => state.name);
  const rank = useItemPreviewStore((state) => state.rank);
  const quality = useItemPreviewStore((state) => state.quality);
  const description = useItemPreviewStore((state) => state.description);
  const elements = useItemPreviewStore((state) => state.elements);
  const type = useItemPreviewStore((state) => state.type);
  const setField = useItemPreviewStore((state) => state.setField);
  const setQuality = useItemPreviewStore((state) => state.setQuality);
  const setElement = useItemPreviewStore((state) => state.setElement);
  const classificationCount = type
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean).length;

  return (
    <main className="app-shell">
      <div className="workbench">
        <section className="panel editor-panel">
          <span className="eyebrow">Item Forge</span>
          <h1 className="page-title text-balance">Atelier-style item card test page</h1>
          <p className="page-subtitle text-pretty">Tweak the values on the left and preview a warm, alchemy-inspired JRPG item card on the right.</p>

          <div className="editor-grid">
            <div className="field">
              <label htmlFor="item-name">Name</label>
              <input id="item-name" value={name} onChange={(event) => setField('name', event.target.value)} />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="item-rank">Rank</label>
                <input id="item-rank" maxLength={2} value={rank} onChange={(event) => setField('rank', event.target.value.toUpperCase())} />
              </div>
              <div className="field">
                <label htmlFor="item-quality">Quality</label>
                <input id="item-quality" type="number" min={0} max={999} value={quality} onChange={(event) => setQuality(Number(event.target.value) || 0)} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="item-description">Description</label>
              <textarea id="item-description" value={description} onChange={(event) => setField('description', event.target.value)} />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="element-light">Light Element</label>
                <input id="element-light" type="number" min={0} max={9} value={elements.light} onChange={(event) => setElement('light', Number(event.target.value) || 0)} />
              </div>
              <div className="field">
                <label htmlFor="element-fire">Fire Element</label>
                <input id="element-fire" type="number" min={0} max={9} value={elements.fire} onChange={(event) => setElement('fire', Number(event.target.value) || 0)} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="item-type">Type</label>
              <input id="item-type" value={type} onChange={(event) => setField('type', event.target.value)} />
              <span className="field-note">Use a comma-separated list like `Stone, Catalyst`.</span>
            </div>
          </div>
        </section>

        <section className="panel preview-panel">
          <div className="preview-layout">
            <div className="preview-meta">
              <span>Live Preview</span>
              <span>Alchemy Archive No. 07</span>
            </div>

            <article className="item-card">
              <header className="item-card-header">
                <div>
                  <h2 className="item-card-name">{name}</h2>
                  <p className="item-card-type">{type}</p>
                </div>

                <div className="rank-badge">
                  <span className="rank-label">Rank</span>
                  <span className="rank-value font-cinzel">{rank || '-'}</span>
                </div>
              </header>

              <p className="item-description">{description}</p>

              <div className="stats-row">
                <div className="stat-card">
                  <span className="stat-label">Quality</span>
                  <span className="stat-value">{quality}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Classification</span>
                  <span className="stat-value">{classificationCount}</span>
                </div>
              </div>

              <section className="elements-section" aria-label="Item elements">
                <span className="stat-label">Elements</span>
                <div className="element-list">
                  <div className="element-pill">
                    <span className="element-gem element-light">{elements.light}</span>
                    <div>
                      <div className="element-name">Light</div>
                      <div className="element-value">Radiance</div>
                    </div>
                  </div>
                  <div className="element-pill">
                    <span className="element-gem element-fire">{elements.fire}</span>
                    <div>
                      <div className="element-name">Fire</div>
                      <div className="element-value">Ember</div>
                    </div>
                  </div>
                </div>
              </section>
            </article>

            <div className="preview-note">This mock preview leans into a warm, handcrafted alchemy-JRPG mood so we can quickly iterate on hierarchy, ornament, and readability.</div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
