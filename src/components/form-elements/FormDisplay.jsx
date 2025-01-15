import React, { useState, useEffect } from 'react';
import { registerVevComponent } from '@vev/react';
import styles from './styles.module.css';

const FormDisplay = ({
  type = 'text',            // text, number, calculation
  variableIds = [],        // array of variable IDs to watch
  label,                   // ledetekst
  description,             // hjelpetekst
  formula = '',           // formel for calculation type (f.eks: "var1 * var2")
  formatOptions = {},     // formateringsvalg (currency, decimal, percent)
  displayStyle = 'standard', // standard, compact, large
  prefix = '',            // prefiks (kr, $, etc)
  suffix = ''             // suffiks (%, år, etc)
}) => {
  const [value, setValue] = useState('');
  const [variables, setVariables] = useState({});

  // Lytter til endringer i variabler
  useEffect(() => {
    const handleVariableUpdate = (event) => {
      const { id, value } = event.detail;
      console.log('FormDisplay received update:', { id, value, variableIds });
      
      // Sjekker om variabel-ID finnes i array av objekter
      const hasVariable = variableIds.some(v => v.variableId === id);
      if (hasVariable) {
        setVariables(prev => {
          const newVars = {
            ...prev,
            [id]: value
          };
          console.log('Updated variables state:', newVars);
          return newVars;
        });
      }
    };

    window.addEventListener('vevVariableUpdate', handleVariableUpdate);
    
    // Henter initielle verdier
    if (window.vevVariables) {
      const initialVars = {};
      variableIds.forEach(v => {
        const id = v.variableId;
        if (window.vevVariables[id] !== undefined) {
          initialVars[id] = window.vevVariables[id];
        }
      });
      console.log('Initial variables:', initialVars);
      setVariables(initialVars);
    }

    return () => {
      window.removeEventListener('vevVariableUpdate', handleVariableUpdate);
    };
  }, [variableIds]);

  // Beregner og formaterer verdi
  useEffect(() => {
    let result = '';
    console.log('Calculating display value:', { type, variables, formula });

    switch (type) {
      case 'text':
        // Hvis vi har flere variabler, kombiner dem
        if (variableIds.length > 1) {
          const values = variableIds.map(v => variables[v.variableId] || '').filter(Boolean);
          if (formula) {
            // Hvis vi har en formel, bruk den som template
            result = formula.replace(/\${(\w+)}/g, (match, key) => variables[key] || '');
          } else {
            // Ellers bare kombiner verdiene med mellomrom
            result = values.join(' ');
          }
        } else {
          // For enkelt variabel, vis bare verdien
          const firstVarId = variableIds[0]?.variableId;
          result = variables[firstVarId] || '';
        }
        break;

      case 'number':
        const numVarId = variableIds[0]?.variableId;
        result = formatNumber(variables[numVarId] || '0', formatOptions);
        break;

      case 'calculation':
        result = calculateFormula(formula, variables, formatOptions);
        break;

      default:
        result = '';
    }

    console.log('Setting display value:', result);
    setValue(result);
  }, [type, variables, formula, formatOptions, variableIds]);

  // Formaterer tall basert på options
  const formatNumber = (num, options = {}) => {
    const number = parseFloat(num);
    if (isNaN(number)) return '0';

    const {
      style = 'decimal',    // decimal, currency, percent
      currency = 'NOK',
      minimumFractionDigits = 0,
      maximumFractionDigits = 0  // Endret til 0 som standard
    } = options;

    try {
      return new Intl.NumberFormat('nb-NO', {
        style,
        currency,
        minimumFractionDigits,
        maximumFractionDigits
      }).format(number);
    } catch (error) {
      console.error('Number formatting error:', error);
      return number.toString();
    }
  };

  // Beregner formel
  const calculateFormula = (formula, variables, formatOptions) => {
    try {
      // Erstatter variabelreferanser med verdier
      let calculation = formula;
      Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(key, 'g');
        calculation = calculation.replace(regex, parseFloat(value) || 0);
      });

      // Evaluerer formelen
      const result = Function('"use strict";return (' + calculation + ')')();
      
      return formatNumber(result, formatOptions);
    } catch (error) {
      console.error('Calculation error:', error);
      return '0';
    }
  };

  return (
    <div className={`${styles.container} ${styles[`container--${displayStyle}`]}`}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}
      {description && (
        <p className={styles.description}>{description}</p>
      )}
      <div className={styles.display}>
        <div className={styles.displayValue}>
          {prefix && (
            <span className={styles.displayAffix}>{prefix}</span>
          )}
          <span>{value || '0'}</span>
          {suffix && (
            <span className={styles.displayAffix}>{suffix}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Registrerer komponenten med Vev
registerVevComponent(FormDisplay, {
  name: "Form Display",
  props: [
    {
      name: "type",
      type: "select",
      title: "Type visning",
      options: {
        items: [
          { label: "Tekst", value: "text" },
          { label: "Tall", value: "number" },
          { label: "Beregning", value: "calculation" }
        ]
      },
      initialValue: "number"  // Endret fra text til number som standard
    },
    {
      name: "variableIds",
      type: "array",
      title: "Variabler å overvåke",
      of: [
        {
          type: "string",
          name: "variableId",
          title: "Variabel ID"
        }
      ],
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
      name: "formula",
      type: "string",
      title: "Formel (for beregning)"
    },
    {
      name: "formatOptions",
      type: "object",
      title: "Formateringsvalg",
      fields: [
        {
          name: "style",
          type: "select",
          title: "Format stil",
          options: {
            items: [
              { label: "Desimaltall", value: "decimal" },
              { label: "Valuta", value: "currency" },
              { label: "Prosent", value: "percent" }
            ]
          }
        },
        {
          name: "currency",
          type: "string",
          title: "Valuta (f.eks NOK)"
        },
        {
          name: "minimumFractionDigits",
          type: "number",
          title: "Min. desimaler"
        },
        {
          name: "maximumFractionDigits",
          type: "number",
          title: "Maks. desimaler"
        }
      ]
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
    },
    {
      name: "prefix",
      type: "string",
      title: "Prefiks"
    },
    {
      name: "suffix",
      type: "string",
      title: "Suffiks"
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
        'box-shadow',
        'border'
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
      selector: styles.display,
      properties: [
        'background',
        'background-color',
        'border-radius',
        'padding',
        'box-shadow',
        'border'
      ]
    },
    {
      selector: styles.displayValue,
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
        'padding',
        'border-radius'
      ]
    },
    {
      selector: styles.displayAffix,
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
    }
  ]
});

export default FormDisplay; 