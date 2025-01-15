# Form Components for Vev 🎨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Kraftige og fleksible skjemakomponenter for Vev-plattformen, designet for å lage interaktive og dynamiske skjemaløsninger.

## ✨ Funksjoner

- 🎯 **Form Input**: Allsidige inputkomponenter med støtte for:
  - Tekst input
  - Tall input med formatering
  - Nedtrekkslister
  - Radio knapper
  - Ja/Nei spørsmål

- 📊 **Form Display**: Fleksible visningskomponenter med:
  - Tekstvisning
  - Tallformatering
  - Avanserte beregninger
  - Automatisk oppdatering

- 🔗 **Variabelhåndtering**:
  - Enkel kobling mellom komponenter
  - Dynamisk oppdatering av verdier
  - Støtte for komplekse beregninger

## 🚀 Kom i gang

### Installasjon

1. Installer komponentene i ditt Vev-prosjekt:
```bash
npm install @vev/form-components
```

2. Importer komponentene i din kode:
```jsx
import { FormInput, FormDisplay } from '@vev/form-components';
```

### Grunnleggende Bruk

```jsx
// Input komponent
<FormInput 
  type="text"
  variableId="navn"
  label="Hva heter du?"
  placeholder="Skriv navnet ditt"
/>

// Display komponent
<FormDisplay 
  type="text"
  variableIds={[{ variableId: "navn" }]}
  label="Ditt navn"
/>
```

## 📖 Dokumentasjon

For detaljert dokumentasjon, se [brukermanual.md](brukermanual.md).

### Eksempler

#### 1. Personlig Informasjon
```jsx
<FormInput 
  type="text"
  variableId="fornavn"
  label="Fornavn"
  required={true}
/>

<FormDisplay 
  type="text"
  variableIds={[{ variableId: "fornavn" }]}
  label="Ditt fornavn"
/>
```

#### 2. Beregninger
```jsx
<FormInput 
  type="number"
  variableId="belop"
  label="Beløp"
  prefix="kr"
/>

<FormDisplay 
  type="calculation"
  variableIds={[{ variableId: "belop" }]}
  label="Beløp inkl. mva"
  formula="belop * 1.25"
  formatOptions={{
    style: "currency",
    currency: "NOK"
  }}
/>
```

## 🎨 Tilpasning

Komponentene kan tilpasses med:
- Ulike visningsstiler (standard/compact/large)
- Tilpasset formatering av tall og tekst
- Prefix og suffix for verdier
- Validering og feilmeldinger

## 🤝 Bidrag

Vi setter pris på bidrag! Se [CONTRIBUTING.md](CONTRIBUTING.md) for retningslinjer.

## 📝 Lisens

Dette prosjektet er lisensiert under MIT-lisensen. Se [LICENSE](LICENSE) filen for detaljer.

## 🙋‍♂️ Support

- 📚 [Dokumentasjon](brukermanual.md)
- 🐛 [Issue Tracker](https://github.com/yourusername/form-components/issues)
- 💬 [Diskusjoner](https://github.com/yourusername/form-components/discussions)

## ✨ Takk til

- Vev-teamet for plattformen
- Alle bidragsytere som har hjulpet til med utvikling og testing

---

Laget med ❤️ for Vev-plattformen 