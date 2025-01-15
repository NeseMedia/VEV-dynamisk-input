# 📘 Brukermanual: Form Input & Display Komponenter

## 📋 Innholdsfortegnelse
1. [Introduksjon](#introduksjon)
2. [Form Input Komponenten](#form-input)
3. [Form Display Komponenten](#form-display)
4. [Variabler og Kobling](#variabler)
5. [Praktiske Eksempler](#eksempler)
6. [Tips og Triks](#tips)
7. [Feilsøking](#feilsøking)

## 🌟 Introduksjon <a name="introduksjon"></a>

Denne løsningen består av to hovedkomponenter som gjør det enkelt å lage interaktive skjemaer i Vev:
- **Form Input**: For å samle inn data fra brukeren
- **Form Display**: For å vise data og beregninger

Komponentene jobber sammen ved hjelp av variabler, som gjør det enkelt å:
- Samle inn informasjon
- Vise informasjon
- Gjøre beregninger
- Kombinere verdier

## 📝 Form Input Komponenten <a name="form-input"></a>

Form Input er komponenten du bruker for å samle inn informasjon fra brukeren. Den støtter flere ulike input-typer:

### Input Typer

#### 1. Tekst Input 📄
For å samle inn tekst som navn, adresse, etc.
```jsx
<FormInput 
  type="text"
  variableId="navn"
  label="Hva heter du?"
  placeholder="Skriv navnet ditt"
/>
```

#### 2. Tall Input 🔢
For å samle inn numeriske verdier som alder, beløp, etc.
```jsx
<FormInput 
  type="number"
  variableId="alder"
  label="Hvor gammel er du?"
  suffix="år"
  min={0}
  max={120}
/>
```

#### 3. Nedtrekksliste 📊
Når brukeren skal velge ett alternativ fra en liste.
```jsx
<FormInput 
  type="select"
  variableId="boligtype"
  label="Hva slags bolig har du?"
  options={[
    { label: "Leilighet", value: "leilighet" },
    { label: "Enebolig", value: "enebolig" },
    { label: "Rekkehus", value: "rekkehus" }
  ]}
/>
```

#### 4. Radio Knapper 🔘
For å velge ett alternativ fra en liste, med alle alternativer synlige.
```jsx
<FormInput 
  type="radio"
  variableId="sivilstatus"
  label="Sivilstatus"
  options={[
    { label: "Singel", value: "singel" },
    { label: "Gift", value: "gift" },
    { label: "Samboer", value: "samboer" }
  ]}
/>
```

#### 5. Ja/Nei Spørsmål ✅
For enkle ja/nei valg.
```jsx
<FormInput 
  type="boolean"
  variableId="harBarn"
  label="Har du barn?"
  placeholder="Ja, jeg har barn"
/>
```

### Viktige Egenskaper

| Egenskap | Beskrivelse | Eksempel |
|----------|-------------|----------|
| variableId | Unik identifikator for verdien (VIKTIG!) | "inntekt" |
| label | Overskrift/spørsmål | "Hva er din årsinntekt?" |
| description | Ekstra forklaring | "Oppgi brutto årsinntekt" |
| placeholder | Hjelpetekst i feltet | "Skriv inn beløp" |
| required | Om feltet må fylles ut | true/false |
| prefix | Tekst før verdien | "kr" |
| suffix | Tekst etter verdien | "år" |

## 📊 Form Display Komponenten <a name="form-display"></a>

Form Display brukes for å vise verdier fra Form Input. Den kan vise enkle verdier eller gjøre beregninger basert på flere verdier.

### Visningstyper

#### 1. Tekst Visning 📄
For å vise tekst eller kombinere flere tekstverdier.
```jsx
<FormDisplay 
  type="text"
  variableIds={[{ variableId: "navn" }]}
  label="Ditt navn"
/>
```

#### 2. Tall Visning 🔢
For å vise numeriske verdier med formatering.
```jsx
<FormDisplay 
  type="number"
  variableIds={[{ variableId: "alder" }]}
  label="Din alder"
  suffix="år"
  formatOptions={{
    style: "decimal",
    maximumFractionDigits: 0
  }}
/>
```

#### 3. Beregninger 🧮
For å gjøre matematiske beregninger basert på flere verdier.
```jsx
<FormDisplay 
  type="calculation"
  variableIds={[
    { variableId: "inntekt" },
    { variableId: "skatteprosent" }
  ]}
  label="Skatt per år"
  formula="inntekt * (skatteprosent/100)"
  formatOptions={{
    style: "currency",
    currency: "NOK"
  }}
  prefix="kr"
/>
```

### Formateringsvalg

Du kan formatere tall på tre måter:

1. **Desimaltall** (decimal)
   ```jsx
   formatOptions={{
     style: "decimal",
     maximumFractionDigits: 2
   }}
   ```

2. **Valuta** (currency)
   ```jsx
   formatOptions={{
     style: "currency",
     currency: "NOK"
   }}
   ```

3. **Prosent** (percent)
   ```jsx
   formatOptions={{
     style: "percent",
     maximumFractionDigits: 1
   }}
   ```

## 🔗 Variabler og Kobling <a name="variabler"></a>

### Hvordan det fungerer

1. **Opprette variabler**
   - Hver Form Input oppretter en variabel med sin `variableId`
   - Variabel-ID må være unik
   - Bruk beskrivende navn (f.eks. "inntekt", "alder", "navn")

2. **Lese variabler**
   - Form Display kan lese én eller flere variabler
   - Bruk samme variableId som i Form Input
   - Verdier oppdateres automatisk

3. **Koble komponenter**
   ```jsx
   // Input oppretter variabelen
   <FormInput 
     variableId="inntekt"
     type="number"
     label="Årsinntekt"
   />

   // Display leser variabelen
   <FormDisplay 
     variableIds={[{ variableId: "inntekt" }]}
     type="number"
     label="Din inntekt"
   />
   ```

## 💡 Praktiske Eksempler <a name="eksempler"></a>

### 1. Personlig Informasjon
Dette eksempelet viser hvordan du kan samle og vise personlig informasjon:

```jsx
// Inputs
<FormInput 
  type="text"
  variableId="fornavn"
  label="Fornavn"
  required={true}
/>

<FormInput 
  type="text"
  variableId="etternavn"
  label="Etternavn"
  required={true}
/>

<FormInput 
  type="number"
  variableId="alder"
  label="Alder"
  suffix="år"
/>

// Display
<FormDisplay 
  type="text"
  variableIds={[
    { variableId: "fornavn" },
    { variableId: "etternavn" },
    { variableId: "alder" }
  ]}
  label="Din profil"
  formula="Hei, ${fornavn} ${etternavn}! Du er ${alder} år gammel."
/>
```

### 2. Låneberegning
Et eksempel på en enkel låneberegner:

```jsx
// Inputs
<FormInput 
  type="number"
  variableId="laanebelop"
  label="Lånebeløp"
  prefix="kr"
  required={true}
/>

<FormInput 
  type="number"
  variableId="rente"
  label="Rente"
  suffix="%"
  required={true}
/>

<FormInput 
  type="number"
  variableId="aar"
  label="Nedbetalingstid"
  suffix="år"
  required={true}
/>

// Display månedlig betaling
<FormDisplay 
  type="calculation"
  variableIds={[
    { variableId: "laanebelop" },
    { variableId: "rente" },
    { variableId: "aar" }
  ]}
  label="Månedlig betaling"
  formula="(laanebelop * (rente/100/12) * Math.pow(1 + rente/100/12, aar*12)) / (Math.pow(1 + rente/100/12, aar*12) - 1)"
  formatOptions={{
    style: "currency",
    currency: "NOK"
  }}
  prefix="kr"
/>
```

### 3. BMI Kalkulator
Et eksempel på en BMI kalkulator:

```jsx
// Inputs
<FormInput 
  type="number"
  variableId="hoyde"
  label="Høyde"
  suffix="cm"
  min={100}
  max={250}
/>

<FormInput 
  type="number"
  variableId="vekt"
  label="Vekt"
  suffix="kg"
  min={30}
  max={300}
/>

// Display
<FormDisplay 
  type="calculation"
  variableIds={[
    { variableId: "hoyde" },
    { variableId: "vekt" }
  ]}
  label="Din BMI"
  formula="vekt / Math.pow(hoyde/100, 2)"
  formatOptions={{
    style: "decimal",
    maximumFractionDigits: 1
  }}
/>
```

## 🎯 Tips og Triks <a name="tips"></a>

### 1. Organisering 📁
- Grupper relaterte inputs sammen
- Bruk beskrivende labels
- Legg til hjelpetekster med `description`
- Velg passende `displayStyle` (standard/compact/large)

### 2. Validering ✅
- Bruk `required={true}` for obligatoriske felt
- Sett `min` og `max` for tallverdier
- Legg til `placeholder` tekst som veiledning
- Test beregninger med ulike verdier

### 3. Formatering 🎨
- Bruk `prefix` og `suffix` for å tydeliggjøre verdier
- Velg riktig antall desimaler med `maximumFractionDigits`
- Bruk riktig formateringsstil (decimal/currency/percent)

## 🔍 Feilsøking <a name="feilsøking"></a>

### Vanlige problemer og løsninger

1. **Verdien vises ikke i display**
   - Sjekk at `variableId` er identisk i input og display
   - Kontroller at du har valgt riktig type i display
   - Se etter console.log meldinger i nettleseren

2. **Beregninger fungerer ikke**
   - Sjekk at formelen bruker riktige variabel-navn
   - Kontroller at alle nødvendige variabler er inkludert i `variableIds`
   - Test formelen med enkle verdier først

3. **Formatering ser feil ut**
   - Verifiser `formatOptions` innstillingene
   - Sjekk at du bruker riktig `style` for ditt behov
   - Juster antall desimaler med `maximumFractionDigits`

### Beste praksis
- Test komponenten grundig med ulike verdier
- Bruk konsollen i nettleseren for å se etter feil
- Start med enkle oppsett og bygg gradvis ut funksjonaliteten 