import React, { useState, useEffect } from 'react';
import { registerVevComponent } from '@vev/react';
import styles from './styles.module.css';

const FormInput = ({
  type = 'text',
  variableId,
  label,
  description,
  options = [],
  suffix = '',
  prefix = '',
  placeholder = '',
  initialValue = '',
  min,
  max,
  required = false,
  displayStyle = 'standard'
}) => {
  const [value, setValue] = useState(initialValue);
  
  // Initialiserer global state
  useEffect(() => {
    if (!window.vevVariables) {
      window.vevVariables = {};
    }
    
    // Setter initial verdi og trigger event
    window.vevVariables[variableId] = initialValue;
    const event = new CustomEvent('vevVariableUpdate', { 
      detail: { id: variableId, value: initialValue }
    });
    window.dispatchEvent(event);
    
    return () => {
      delete window.vevVariables[variableId];
    };
  }, [variableId, initialValue]);

  // Lytter til endringer i andre komponenter med samme variableId
  useEffect(() => {
    const handleVariableUpdate = (event) => {
      const { id, value } = event.detail;
      if (id === variableId) {
        setValue(value);
      }
    };

    window.addEventListener('vevVariableUpdate', handleVariableUpdate);
    
    // Hent initial verdi hvis den finnes
    if (window.vevVariables && window.vevVariables[variableId] !== undefined) {
      setValue(window.vevVariables[variableId]);
    }

    return () => {
      window.removeEventListener('vevVariableUpdate', handleVariableUpdate);
    };
  }, [variableId]);

  // Oppdatert updateValue funksjon med bedre type-håndtering
  const updateValue = (newValue) => {
    // Konverterer til string for konsistent håndtering
    const stringValue = String(newValue);
    setValue(stringValue);
    
    // Oppdaterer global state og trigger event
    window.vevVariables[variableId] = stringValue;
    const event = new CustomEvent('vevVariableUpdate', { 
      detail: { id: variableId, value: stringValue }
    });
    window.dispatchEvent(event);
    
    // Debug logging
    console.log('Variable updated:', { 
      id: variableId, 
      value: stringValue, 
      globalState: window.vevVariables 
    });
  };

  const renderInput = () => {
    switch (type) {
      case 'text':
      case 'number':
        return (
          <div className={styles.inputWrapper}>
            <input
              type={type}
              value={value}
              onChange={(e) => updateValue(e.target.value)}
              onBlur={type === 'number' ? (e) => {
                const num = parseFloat(e.target.value);
                if (isNaN(num)) updateValue('0');
              } : undefined}
              placeholder={placeholder}
              min={min}
              max={max}
              required={required}
              className={`${styles.input} 
                ${prefix ? styles['input--withPrefix'] : ''} 
                ${suffix ? styles['input--withSuffix'] : ''}`}
            />
            {prefix && (
              <span className={`${styles.affix} ${styles.prefix}`}>
                {prefix}
              </span>
            )}
            {suffix && (
              <span className={`${styles.affix} ${styles.suffix}`}>
                {suffix}
              </span>
            )}
          </div>
        );

      case 'slider':
        const sliderValue = parseFloat(value) || 0;
        const sliderMin = min || 0;
        const sliderMax = max || 100;
        const progress = ((sliderValue - sliderMin) / (sliderMax - sliderMin)) * 100;
        
        return (
          <div className={styles.sliderContainer}>
            <input
              type="range"
              value={sliderValue}
              onChange={(e) => updateValue(e.target.value)}
              min={sliderMin}
              max={sliderMax}
              className={styles.slider}
              style={{ '--slider-progress': `${progress}%` }}
            />
            <div className={styles.sliderValue}>
              <span>
                {sliderValue}
                {suffix && <span className={styles.displayAffix}>{suffix}</span>}
              </span>
              <span className={styles.sliderMaxValue}>
                {sliderMax}{suffix && <span className={styles.displayAffix}>{suffix}</span>}
              </span>
            </div>
          </div>
        );

      case 'select':
        return (
          <div className={styles.inputWrapper}>
            <select
              value={value}
              onChange={(e) => updateValue(e.target.value)}
              required={required}
              className={styles.select}
            >
              <option value="">{placeholder || 'Velg...'}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'radio':
        return (
          <div className={styles.radioGroup}>
            {options.map((option) => (
              <label key={option.value} className={styles.radioLabel}>
                <input
                  type="radio"
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => updateValue(e.target.value)}
                  required={required}
                  className={styles.radio}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'boolean':
        return (
          <label className={styles.radioLabel}>
            <input
              type="checkbox"
              checked={value === 'true'}
              onChange={(e) => updateValue(e.target.checked.toString())}
              required={required}
              className={styles.checkbox}
            />
            <span>{placeholder}</span>
          </label>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`${styles.container} ${styles[`container--${displayStyle}`]}`}>
      {label && (
        <label className={`${styles.label} ${required ? styles['label--required'] : ''}`}>
          {label}
        </label>
      )}
      {description && (
        <p className={styles.description}>{description}</p>
      )}
      {renderInput()}
    </div>
  );
};

// Registrerer komponenten med Vev
registerVevComponent(FormInput, {
  name: "Form Input",
  props: [
    {
      name: "type",
      type: "select",
      title: "Type input",
      options: {
        items: [
          { label: "Tekst", value: "text" },
          { label: "Tall", value: "number" },
          { label: "Slider", value: "slider" },
          { label: "Nedtrekksliste", value: "select" },
          { label: "Radio knapper", value: "radio" },
          { label: "Ja/Nei", value: "boolean" }
        ]
      },
      initialValue: "text"
    },
    {
      name: "variableId",
      type: "string",
      title: "Variabel ID",
      required: true
    },
    {
      name: "label",
      type: "string",
      title: "Ledetekst"
    },
    {
      name: "description",
      type: "string",
      title: "Beskrivelse"
    },
    {
      name: "options",
      type: "array",
      title: "Alternativer (for select/radio)",
      of: [
        {
          name: "option",
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Tekst" },
            { name: "value", type: "string", title: "Verdi" }
          ]
        }
      ]
    },
    {
      name: "suffix",
      type: "string",
      title: "Suffiks"
    },
    {
      name: "prefix",
      type: "string",
      title: "Prefiks"
    },
    {
      name: "placeholder",
      type: "string",
      title: "Placeholder"
    },
    {
      name: "initialValue",
      type: "string",
      title: "Startverdi",
      initialValue: "0"
    },
    {
      name: "min",
      type: "number",
      title: "Minimumsverdi"
    },
    {
      name: "max",
      type: "number",
      title: "Maksimumsverdi"
    },
    {
      name: "required",
      type: "boolean",
      title: "Påkrevd",
      initialValue: false
    },
    {
      name: "displayStyle",
      type: "select",
      title: "Visningsstil",
      options: {
        items: [
          { label: "Standard", value: "standard" },
          { label: "Kompakt", value: "compact" },
          { label: "Stor", value: "large" }
        ]
      },
      initialValue: "standard"
    }
  ],
  editableCSS: [
    {
      selector: styles.container,
      properties: [
        'background',
        'background-color',
        'padding',
        'margin',
        'border-radius',
        'box-shadow'
      ]
    },
    {
      selector: styles.label,
      properties: [
        'color',
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'margin-bottom',
        'text-transform',
        'letter-spacing',
        'background',
        'background-color',
        'padding'
      ]
    },
    {
      selector: styles.description,
      properties: [
        'color',
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'margin-bottom',
        'text-transform',
        'letter-spacing',
        'background',
        'background-color',
        'padding'
      ]
    },
    {
      selector: styles.input,
      properties: [
        'background',
        'background-color',
        'color',
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'letter-spacing',
        'text-transform',
        'border',
        'border-radius',
        'padding',
        'box-shadow'
      ]
    },
    {
      selector: styles.select,
      properties: [
        'background',
        'background-color',
        'color',
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'letter-spacing',
        'text-transform',
        'border',
        'border-radius',
        'padding',
        'box-shadow'
      ]
    },
    {
      selector: styles.radioGroup,
      properties: [
        'background',
        'background-color',
        'padding',
        'border-radius',
        'border',
        'box-shadow'
      ]
    },
    {
      selector: styles.radioLabel,
      properties: [
        'color',
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'letter-spacing',
        'text-transform',
        'padding',
        'background',
        'background-color',
        'border-radius',
        'border'
      ]
    },
    {
      selector: styles.radio,
      properties: [
        'border-color',
        'background-color',
        'width',
        'height',
        'box-shadow'
      ]
    },
    {
      selector: styles.checkbox,
      properties: [
        'border-color',
        'background-color',
        'width',
        'height',
        'box-shadow'
      ]
    },
    {
      selector: styles.affix,
      properties: [
        'color',
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'letter-spacing',
        'text-transform',
        'background',
        'background-color',
        'padding'
      ]
    },
    {
      selector: `${styles.radioLabel} span`,
      properties: [
        'color',
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'letter-spacing',
        'text-transform',
        'background',
        'background-color',
        'padding'
      ]
    },
    {
      selector: 'option',
      properties: [
        'color',
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'background',
        'background-color'
      ]
    },
    {
      selector: styles.slider,
      properties: [
        'background',
        'background-color'
      ]
    },
    {
      selector: `${styles.slider}::-webkit-slider-thumb`,
      properties: [
        'background',
        'background-color'
      ]
    },
    {
      selector: `${styles.slider}::-moz-range-thumb`,
      properties: [
        'background',
        'background-color'
      ]
    },
    {
      selector: styles.sliderValue,
      properties: [
        'color',
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'letter-spacing'
      ]
    },
    {
      selector: styles.sliderMaxValue,
      properties: [
        'color',
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'letter-spacing'
      ]
    }
  ]
});

export default FormInput; 