import { useState, type CSSProperties } from 'react';

import candlebrightIcon from '../assets/icons/candlebright.svg';
import catalystIcon from '../assets/icons/catalyst.svg';
import clawsIcon from '../assets/icons/claws.svg';
import dropIcon from '../assets/icons/drop.svg';
import eclipseIcon from '../assets/icons/eclipse.svg';
import fluffyCloudIcon from '../assets/icons/fluffy-cloud.svg';
import herbIcon from '../assets/icons/herb.svg';
import peaksIcon from '../assets/icons/peaks.svg';
import polarStarIcon from '../assets/icons/polar-star.svg';
import pouringPotIcon from '../assets/icons/pouring-pot.svg';
import starSatellitesIcon from '../assets/icons/star-satellites.svg';
import stonePileIcon from '../assets/icons/stone-pile.svg';
import waterBottleIcon from '../assets/icons/water-bottle.svg';
import woodPileIcon from '../assets/icons/wood-pile.svg';
import { useItemPreviewStore } from '../store/itemPreviewStore';
import { getItemRankFromQuality, itemElements, itemTypes, type ItemElement, type ItemType } from '../types/items';

const rankColors: Record<ReturnType<typeof getItemRankFromQuality>, string> = {
  S: '#d4af37',
  A: '#c0c7d1',
  B: '#b67b3f',
  C: '#d9822b',
  D: '#5ea264',
  E: '#4f7ecf',
  F: '#7c4d8f',
};

const elementConfigs: Record<
  ItemElement,
  {
    label: string;
    icon: string;
    descriptor: string;
    accent: string;
    surface: string;
    line: string;
    glow: string;
  }
> = {
  fire: {
    label: 'Fire',
    icon: candlebrightIcon,
    descriptor: 'Ember',
    accent: '#d55b2b',
    surface: 'rgba(255, 224, 204, 0.76)',
    line: 'rgba(213, 91, 43, 0.28)',
    glow: 'rgba(213, 91, 43, 0.2)',
  },
  water: {
    label: 'Water',
    icon: pouringPotIcon,
    descriptor: 'Flow',
    accent: '#2f86c5',
    surface: 'rgba(210, 235, 250, 0.76)',
    line: 'rgba(47, 134, 197, 0.24)',
    glow: 'rgba(47, 134, 197, 0.18)',
  },
  wind: {
    label: 'Wind',
    icon: fluffyCloudIcon,
    descriptor: 'Gale',
    accent: '#7aa6b2',
    surface: 'rgba(227, 241, 244, 0.8)',
    line: 'rgba(122, 166, 178, 0.24)',
    glow: 'rgba(122, 166, 178, 0.18)',
  },
  earth: {
    label: 'Earth',
    icon: peaksIcon,
    descriptor: 'Stone',
    accent: '#768a3e',
    surface: 'rgba(226, 234, 204, 0.8)',
    line: 'rgba(118, 138, 62, 0.24)',
    glow: 'rgba(118, 138, 62, 0.16)',
  },
  light: {
    label: 'Light',
    icon: starSatellitesIcon,
    descriptor: 'Radiance',
    accent: '#d6ab39',
    surface: 'rgba(253, 241, 201, 0.82)',
    line: 'rgba(214, 171, 57, 0.24)',
    glow: 'rgba(214, 171, 57, 0.18)',
  },
  shadow: {
    label: 'Shadow',
    icon: eclipseIcon,
    descriptor: 'Veil',
    accent: '#64507d',
    surface: 'rgba(228, 219, 240, 0.8)',
    line: 'rgba(100, 80, 125, 0.24)',
    glow: 'rgba(100, 80, 125, 0.18)',
  },
};

const typeConfigs: Record<
  ItemType,
  {
    label: string;
    icon: string;
    accent: string;
    surface: string;
    line: string;
  }
> = {
  herb: {
    label: 'Herb',
    icon: herbIcon,
    accent: '#5f8d49',
    surface: 'rgba(231, 241, 223, 0.88)',
    line: 'rgba(95, 141, 73, 0.24)',
  },
  oil: {
    label: 'Oil',
    icon: dropIcon,
    accent: '#b16a31',
    surface: 'rgba(244, 228, 210, 0.88)',
    line: 'rgba(177, 106, 49, 0.24)',
  },
  catalyst: {
    label: 'Catalyst',
    icon: catalystIcon,
    accent: '#7c5ca7',
    surface: 'rgba(235, 227, 247, 0.88)',
    line: 'rgba(124, 92, 167, 0.24)',
  },
  stone: {
    label: 'Stone',
    icon: stonePileIcon,
    accent: '#7a7469',
    surface: 'rgba(234, 230, 221, 0.9)',
    line: 'rgba(122, 116, 105, 0.24)',
  },
  wood: {
    label: 'Wood',
    icon: woodPileIcon,
    accent: '#8d6641',
    surface: 'rgba(242, 229, 215, 0.9)',
    line: 'rgba(141, 102, 65, 0.24)',
  },
  water: {
    label: 'Water',
    icon: waterBottleIcon,
    accent: '#417fb0',
    surface: 'rgba(221, 235, 248, 0.9)',
    line: 'rgba(65, 127, 176, 0.24)',
  },
  beast: {
    label: 'Beast',
    icon: clawsIcon,
    accent: '#975944',
    surface: 'rgba(245, 226, 218, 0.9)',
    line: 'rgba(151, 89, 68, 0.24)',
  },
  metal: {
    label: 'Metal',
    icon: polarStarIcon,
    accent: '#6f7f95',
    surface: 'rgba(227, 233, 241, 0.92)',
    line: 'rgba(111, 127, 149, 0.24)',
  },
};

function createToneStyle(accent: string, surface: string, line: string, glow?: string) {
  return {
    '--accent': accent,
    '--surface': surface,
    '--line': line,
    '--glow': glow ?? line,
  } as CSSProperties;
}

export function ItemPreviewPage() {
  const [activePreviewType, setActivePreviewType] = useState<ItemType | null>(null);
  const name = useItemPreviewStore((state) => state.name);
  const quality = useItemPreviewStore((state) => state.quality);
  const description = useItemPreviewStore((state) => state.description);
  const elements = useItemPreviewStore((state) => state.elements);
  const type = useItemPreviewStore((state) => state.type);
  const setField = useItemPreviewStore((state) => state.setField);
  const setQuality = useItemPreviewStore((state) => state.setQuality);
  const setElement = useItemPreviewStore((state) => state.setElement);
  const toggleType = useItemPreviewStore((state) => state.toggleType);
  const classificationCount = type.length;
  const calculatedRank = getItemRankFromQuality(quality);
  const rankColor = rankColors[calculatedRank];
  const selectedTypes = itemTypes.filter((entry) => type.includes(entry));
  const activeTypeConfig = activePreviewType && selectedTypes.includes(activePreviewType) ? typeConfigs[activePreviewType] : null;
  const elementCards = itemElements.map((key) => ({
    key,
    value: elements[key],
    ...elementConfigs[key],
  }));
  const visibleElementCards = elementCards.filter((element) => element.value > 0);
  const qualityFill = Math.min(100, quality);

  return (
    <div className="workbench">
      <section className="panel editor-panel">
        <span className="eyebrow">Item Forge</span>
        <h1 className="page-title text-balance">Atelier-style item card test page</h1>
        <p className="page-subtitle text-pretty">
          Tune the draft on the left, then check how the updated icon set, elemental palette, and classification chips feel on the final card.
        </p>

        <div className="editor-grid">
          <div className="field">
            <label htmlFor="item-name">Name</label>
            <input id="item-name" value={name} onChange={(event) => setField('name', event.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="item-quality">Quality</label>
            <input id="item-quality" type="number" min={0} max={100} value={quality} onChange={(event) => setQuality(Number(event.target.value) || 0)} />
            <span className="field-note">Rank is calculated automatically from quality.</span>
          </div>

          <div className="field">
            <label htmlFor="item-description">Description</label>
            <textarea id="item-description" value={description} onChange={(event) => setField('description', event.target.value)} />
          </div>

          <div className="field">
            <label>Elements</label>
            <div className="element-editor-grid">
              {elementCards.map((element) => (
                <label className="element-editor-card" key={element.key} style={createToneStyle(element.accent, element.surface, element.line, element.glow)}>
                  <span className="element-editor-head">
                    <span className="editor-icon-shell">
                      <img src={element.icon} alt="" aria-hidden="true" className="icon-mark" />
                    </span>
                    <span className="element-editor-copy">
                      <span className="element-editor-name">{element.label}</span>
                      <span className="element-editor-note">{element.descriptor}</span>
                    </span>
                  </span>
                  <input
                    className="element-input"
                    type="number"
                    min={0}
                    max={9}
                    value={element.value}
                    onChange={(event) => setElement(element.key, Number(event.target.value) || 0)}
                  />
                </label>
              ))}
            </div>
            <span className="field-note">Each element uses a `0-9` attunement scale.</span>
          </div>

          <div className="field">
            <label>Type</label>
            <div className="type-toggle-grid">
              {itemTypes.map((itemType) => {
                const config = typeConfigs[itemType];
                const isActive = type.includes(itemType);

                return (
                  <button
                    key={itemType}
                    type="button"
                    className={`type-toggle${isActive ? ' is-active' : ''}`}
                    style={createToneStyle(config.accent, config.surface, config.line)}
                    aria-pressed={isActive}
                    onClick={() => toggleType(itemType)}
                  >
                    <span className="editor-icon-shell type-icon-shell">
                      <img src={config.icon} alt="" aria-hidden="true" className="icon-mark" />
                    </span>
                    <span className="type-toggle-label">{config.label}</span>
                  </button>
                );
              })}
            </div>
            <span className="field-note">Toggle every classification the item should carry.</span>
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
              <div className="item-card-copy">
                <div className="item-type-list item-type-list-compact" aria-label="Item classifications">
                  {selectedTypes.length > 0 ? (
                    selectedTypes.map((itemType) => {
                      const config = typeConfigs[itemType];
                      const isActive = activePreviewType === itemType;

                      return (
                        <button
                          type="button"
                          className={`type-chip-button${isActive ? ' is-active' : ''}`}
                          key={itemType}
                          style={createToneStyle(config.accent, config.surface, config.line)}
                          aria-label={config.label}
                          aria-pressed={isActive}
                          onClick={() => setActivePreviewType(isActive ? null : itemType)}
                        >
                          <span className="type-pill-icon">
                            <img src={config.icon} alt="" aria-hidden="true" className="icon-mark" />
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <span className="empty-state-tag">Choose at least one type</span>
                  )}
                </div>
                {activeTypeConfig ? <div className="type-name-bubble">{activeTypeConfig.label}</div> : null}

                <h2 className="item-card-name">{name}</h2>
                <div className="quality-meter" aria-label={`Quality ${quality} out of 100`}>
                  <div className="quality-meter-meta">
                    <span className="quality-icon-shell">
                      <img src={polarStarIcon} alt="" aria-hidden="true" className="icon-mark" />
                    </span>
                    <span className="quality-value">{quality} / 100</span>
                  </div>
                  <div className="quality-progress" aria-hidden="true">
                    <span className="quality-progress-fill" style={{ width: `${qualityFill}%` }} />
                  </div>
                </div>
              </div>

              <div className="rank-badge">
                <span className="rank-value font-cinzel" style={{ color: rankColor }}>
                  {calculatedRank}
                </span>
              </div>
            </header>

            <p className="item-description font-cinzel">{description}</p>

            <div className="stats-row">
              <div className="stat-card">
                <span className="stat-label">Classification</span>
                <span className="stat-value">{classificationCount}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Elements</span>
                <span className="stat-value">{visibleElementCards.length}</span>
              </div>
            </div>

            <section className="elements-section" aria-label="Item elements">
              <div className="section-heading">
                <span className="stat-label">Elements</span>
                <span className="section-note">Attunement lattice</span>
              </div>

              <div className="element-list">
                {visibleElementCards.length > 0 ? (
                  visibleElementCards.map((element) => (
                    <div
                      className="element-pill"
                      key={element.key}
                      style={createToneStyle(element.accent, element.surface, element.line, element.glow)}
                    >
                      <span className="element-pill-icon">
                        <img src={element.icon} alt="" aria-hidden="true" className="icon-mark" />
                      </span>
                      <div className="element-copy">
                        <div className="element-name">{element.label}</div>
                        <div className="element-value">{element.descriptor}</div>
                      </div>
                      <span className="element-score">{element.value}</span>
                    </div>
                  ))
                ) : (
                  <div className="empty-state-tag empty-state-block">No elemental attunement</div>
                )}
              </div>
            </section>
          </article>

          <div className="preview-note">
            The preview now leans on icon-led classification badges and a full elemental spectrum so it’s easier to read item identity at a glance.
          </div>
        </div>
      </section>
    </div>
  );
}
