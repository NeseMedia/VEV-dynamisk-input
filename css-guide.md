# CSS Guide for Vev Components

## Module CSS Syntax
CSS Modules brukes for komponent-spesifikk styling. Filnavnet må ende med `.module.css`.

```css
/* styles.module.css */

/* Hovedcontainer */
.container {
  margin: 0 auto;
  padding: 1rem;
  width: 100%;
  max-width: 600px;
}

/* BEM-lignende naming convention for states/varianter */
.container--large {
  max-width: 800px;
}

/* Nesting støttes ikke i standard CSS modules */
.inputWrapper {
  position: relative;
  margin-bottom: 1rem;
}

/* Bruk beskrivende klassenavn */
.label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

/* Suffiks med type for spesifikke varianter */
.label--required {
  color: #ef4444;
}
```

## Editablility i Vev
I `registerVevComponent` må vi definere hvilke CSS-properties som skal være redigerbare:

```javascript
registerVevComponent(FormInput, {
  name: "Form Input",
  // ... andre props
  editableCSS: [
    {
      // Selector refererer til klassenavnet i module.css
      selector: styles.container,
      properties: [
        'background',         // Bakgrunnsfarge
        'padding',           // Invevendig margin
        'margin',            // Utvendig margin
        'border-radius',     // Avrunding av hjørner
        'box-shadow'         // Skyggeeffekt
      ]
    },
    {
      selector: styles.label,
      properties: [
        'color',            // Tekstfarge
        'font-family',      // Skrifttype
        'font-size',        // Tekststørrelse
        'font-weight',      // Teksttykkelse
        'margin-bottom'     // Avstand under label
      ]
    },
    {
      selector: styles.input,
      properties: [
        'background',       // Input bakgrunn
        'color',           // Input tekstfarge
        'border',          // Kantlinje
        'border-radius',   // Hjørneavrunding
        'padding',         // Innvendig spacing
        'font-size',       // Input tekststørrelse
        'box-shadow'       // Skygge rundt input
      ]
    }
  ]
});
```

## Viktige regler

### 1. CSS Modules
- Bruk `.module.css` extension
- Alle klassenavn blir automatisk unike
- Import styles med: `import styles from './styles.module.css'`
- Bruk styles som objekt: `className={styles.container}`

### 2. Vev Editable CSS
- Selector må matche klassenavn fra CSS module
- Bruk standard CSS properties (ikke custom properties)
- Hold listen med properties fokusert og relevant
- Test at properties faktisk fungerer i Vev-editoren

### 3. Best Practices
- Definer base-stiler som fungerer uten customization
- Bruk relative enheter (rem, em) for bedre skalerbarhet 
- Unngå position: fixed da det kan skape problemer i Vev
- Test responsivitet grundig

### 4. Tailwind
- Vev støtter Tailwind's core utility classes
- IKKE bruk arbitrary values (som w-[500px])
- Bruk standard Tailwind klasser (som w-64)
- Kombiner gjerne med CSS modules for mer spesifikk styling

### 5. Responsive Design
```css
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}
```

### 6. States
```css
.input:hover {
  border-color: #2563eb;
}

.input:focus {
  outline: none;
  ring: 2px solid #2563eb;
}
```

### 7. Transitions
```css
.input {
  transition: all 0.2s ease-in-out;
}
```

## Komplett eksempel på CSS Module

```css
/* styles.module.css */

/* Container styles */
.container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
}

/* Label styles */
.label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

/* Input wrapper for positioning */
.inputWrapper {
  position: relative;
  margin-bottom: 1rem;
}

/* Base input styles */
.input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: all 0.2s ease-in-out;
}

/* Input states */
.input:hover {
  border-color: #2563eb;
}

.input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

/* Helper text */
.helperText {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
}

/* Error state */
.error {
  border-color: #ef4444;
}

.errorText {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .container {
    padding: 1.5rem;
  }

  .label {
    font-size: 1rem;
  }

  .input {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }
}
```

Dette oppsettet gir en solid base som både fungerer bra ut av boksen og er enkel å tilpasse i Vev-editoren.