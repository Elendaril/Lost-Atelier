import { useState } from 'react';

import { getItemRankFromQuality, itemElements, itemTypes, type ItemElement, type ItemIngredient, type ItemType } from '../types/items';

type ItemFormState = {
  id: number;
  name: string;
  description: string;
  quality: number;
  icon: string;
  image: string;
  elements: Record<ItemElement, number>;
  type: ItemType[];
  material: boolean;
  usable: boolean;
  consumable: boolean;
};

const initialState: ItemFormState = {
  id: 1,
  name: 'Life Stone',
  description: 'A pulsating crystalline core that radiates a rhythmic glow.',
  quality: 98,
  icon: '/icons/life-stone.png',
  image: '/images/life-stone-full.png',
  elements: {
    fire: 3,
    water: 1,
    wind: 0,
    earth: 6,
    light: 5,
    shadow: 0,
  },
  type: ['stone', 'catalyst'],
  material: true,
  usable: false,
  consumable: false,
};

function buildItemJson(state: ItemFormState): ItemIngredient {
  return {
    id: state.id,
    name: state.name,
    description: state.description,
    quality: state.quality,
    icon: state.icon,
    image: state.image,
    elements: itemElements
      .map((element) => ({
        element,
        value: state.elements[element],
      }))
      .filter((entry) => entry.value > 0),
    type: state.type,
    material: state.material,
    usable: state.usable,
    consumable: state.consumable,
  };
}

function toLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function ItemJsonBuilderPage() {
  const [form, setForm] = useState<ItemFormState>(initialState);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const output = buildItemJson(form);
  const outputJson = JSON.stringify(output, null, 2);
  const calculatedRank = getItemRankFromQuality(form.quality);

  function setField<K extends keyof ItemFormState>(field: K, value: ItemFormState[K]) {
    setForm((state) => ({
      ...state,
      [field]: value,
    }));
    setCopyState('idle');
  }

  function setElement(element: ItemElement, value: number) {
    setForm((state) => ({
      ...state,
      elements: {
        ...state.elements,
        [element]: Math.min(9, Math.max(0, value)),
      },
    }));
    setCopyState('idle');
  }

  function toggleType(itemType: ItemType) {
    setForm((state) => ({
      ...state,
      type: state.type.includes(itemType) ? state.type.filter((entry) => entry !== itemType) : [...state.type, itemType],
    }));
    setCopyState('idle');
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(outputJson);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  }

  return (
    <div className="generator-layout">
      <section className="panel editor-panel">
        <span className="eyebrow">Item JSON</span>
        <h1 className="page-title text-balance">Ingredient JSON generator</h1>
        <p className="page-subtitle text-pretty">
          Fill in the ingredient fields and copy a JSON object that mirrors the shared `ItemIngredient` TypeScript type.
        </p>

        <div className="editor-grid">
          <div className="field-row">
            <div className="field">
              <label htmlFor="json-item-id">Id</label>
              <input id="json-item-id" type="number" min={1} value={form.id} onChange={(event) => setField('id', Number(event.target.value) || 1)} />
            </div>
            <div className="field">
              <label htmlFor="json-item-quality">Quality</label>
              <input
                id="json-item-quality"
                type="number"
                min={0}
                max={100}
                value={form.quality}
                onChange={(event) => setField('quality', Math.min(100, Math.max(0, Number(event.target.value) || 0)))}
              />
              <span className="field-note">Calculated rank: {calculatedRank}</span>
            </div>
          </div>

          <div className="field">
            <label htmlFor="json-item-name">Name</label>
            <input id="json-item-name" value={form.name} onChange={(event) => setField('name', event.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="json-item-description">Description</label>
            <textarea id="json-item-description" value={form.description} onChange={(event) => setField('description', event.target.value)} />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="json-item-icon">Icon Path</label>
              <input id="json-item-icon" value={form.icon} onChange={(event) => setField('icon', event.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="json-item-image">Image Path</label>
              <input id="json-item-image" value={form.image} onChange={(event) => setField('image', event.target.value)} />
            </div>
          </div>

          <div className="field">
            <label>Types</label>
            <div className="type-toggle-grid">
              {itemTypes.map((itemType) => {
                const isActive = form.type.includes(itemType);

                return (
                  <button
                    key={itemType}
                    type="button"
                    className={`type-toggle type-toggle-simple${isActive ? ' is-active' : ''}`}
                    aria-pressed={isActive}
                    onClick={() => toggleType(itemType)}
                  >
                    <span className="type-toggle-label">{toLabel(itemType)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="field">
            <label>Elements</label>
            <div className="generator-elements-grid">
              {itemElements.map((element) => (
                <div className="field" key={element}>
                  <label htmlFor={`json-element-${element}`}>{toLabel(element)}</label>
                  <input
                    id={`json-element-${element}`}
                    type="number"
                    min={0}
                    max={9}
                    value={form.elements[element]}
                    onChange={(event) => setElement(element, Number(event.target.value) || 0)}
                  />
                </div>
              ))}
            </div>
            <span className="field-note">Only elements with a value above `0` are included in the generated JSON array.</span>
          </div>

          <div className="field">
            <label>Flags</label>
            <div className="boolean-grid">
              <label className="boolean-card">
                <input type="checkbox" checked={form.material} onChange={(event) => setField('material', event.target.checked)} />
                <span>Material</span>
              </label>
              <label className="boolean-card">
                <input type="checkbox" checked={form.usable} onChange={(event) => setField('usable', event.target.checked)} />
                <span>Usable</span>
              </label>
              <label className="boolean-card">
                <input type="checkbox" checked={form.consumable} onChange={(event) => setField('consumable', event.target.checked)} />
                <span>Consumable</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="panel preview-panel">
        <div className="preview-layout">
          <div className="preview-meta">
            <span>Generated Output</span>
            <span>Type-safe draft</span>
          </div>

          <div className="json-output-card">
            <div className="json-output-toolbar">
              <div className="json-output-meta">
                <span className="stat-label">ItemIngredient JSON</span>
                <span className="json-output-note">Ready to copy</span>
              </div>
              <button type="button" className="copy-button" onClick={copyJson}>
                {copyState === 'copied' ? 'Copied' : 'Copy JSON'}
              </button>
            </div>

            <pre className="json-output-block">
              <code>{outputJson}</code>
            </pre>

            {copyState === 'failed' ? <div className="copy-feedback">Clipboard copy failed. You can still copy the JSON manually.</div> : null}
          </div>
        </div>
      </section>
    </div>
  );
}
