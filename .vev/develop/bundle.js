System.register("3pSOyLAhwORSWcofgHMm", ["react", "react-dom", "vev"], function (exports) {
  "use strict";
  var global = {};
  const ReactDOM = {};
  var ReactRouterDOM = {};
  var Vev = {};
  var Silke = {};
  return {
    setters: [
      function (module) {},
      function (module) {
        Object.assign(ReactDOM, module);
      },
      function (module) {
        Vev.registerVevComponent = () => undefined;
        
      },
    ],
    execute: function () {
      var packageBuild = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // globals:react
  var require_react = __commonJS({
    "globals:react"(exports, module) {
      module.exports = React;
    }
  });

  // globals:@vev/react
  var require_react2 = __commonJS({
    "globals:@vev/react"(exports, module) {
      module.exports = Vev;
    }
  });

  // src/____index.js
  var index_exports = {};
  __export(index_exports, {
    FormDisplay: () => FormDisplay_default,
    FormInput: () => FormInput_default
  });

  // src/components/form-elements/FormDisplay.jsx
  var import_react = __toESM(require_react());
  var import_react2 = __toESM(require_react2());

  // src/components/form-elements/styles.module.css
  var styles_default = { "container": "container__styles", "container--standard": "container--standard__styles", "containerStandard": "container--standard__styles", "container--compact": "container--compact__styles", "containerCompact": "container--compact__styles", "container--large": "container--large__styles", "containerLarge": "container--large__styles", "label": "label__styles", "label--required": "label--required__styles", "labelRequired": "label--required__styles", "description": "description__styles", "inputWrapper": "inputWrapper__styles", "input": "input__styles", "input--withPrefix": "input--withPrefix__styles", "inputWithPrefix": "input--withPrefix__styles", "input--withSuffix": "input--withSuffix__styles", "inputWithSuffix": "input--withSuffix__styles", "affix": "affix__styles", "prefix": "prefix__styles", "suffix": "suffix__styles", "select": "select__styles", "radioGroup": "radioGroup__styles", "radioLabel": "radioLabel__styles", "radio": "radio__styles", "checkbox": "checkbox__styles", "display": "display__styles", "displayValue": "displayValue__styles", "displayAffix": "displayAffix__styles" };

  // src/components/form-elements/FormDisplay.jsx
  var FormDisplay = /* @__PURE__ */ __name(({
    type = "text",
    // text, number, calculation
    variableIds = [],
    // array of variable IDs to watch
    label,
    // ledetekst
    description,
    // hjelpetekst
    formula = "",
    // formel for calculation type (f.eks: "var1 * var2")
    formatOptions = {},
    // formateringsvalg (currency, decimal, percent)
    displayStyle = "standard",
    // standard, compact, large
    prefix = "",
    // prefiks (kr, $, etc)
    suffix = ""
    // suffiks (%, år, etc)
  }) => {
    const [value, setValue] = (0, import_react.useState)("");
    const [variables, setVariables] = (0, import_react.useState)({});
    (0, import_react.useEffect)(() => {
      const handleVariableUpdate = /* @__PURE__ */ __name((event) => {
        const { id, value: value2 } = event.detail;
        console.log("FormDisplay received update:", { id, value: value2, variableIds });
        const hasVariable = variableIds.some((v) => v.variableId === id);
        if (hasVariable) {
          setVariables((prev) => {
            const newVars = {
              ...prev,
              [id]: value2
            };
            console.log("Updated variables state:", newVars);
            return newVars;
          });
        }
      }, "handleVariableUpdate");
      window.addEventListener("vevVariableUpdate", handleVariableUpdate);
      if (window.vevVariables) {
        const initialVars = {};
        variableIds.forEach((v) => {
          const id = v.variableId;
          if (window.vevVariables[id] !== void 0) {
            initialVars[id] = window.vevVariables[id];
          }
        });
        console.log("Initial variables:", initialVars);
        setVariables(initialVars);
      }
      return () => {
        window.removeEventListener("vevVariableUpdate", handleVariableUpdate);
      };
    }, [variableIds]);
    (0, import_react.useEffect)(() => {
      let result = "";
      console.log("Calculating display value:", { type, variables, formula });
      switch (type) {
        case "text":
          if (variableIds.length > 1) {
            const values = variableIds.map((v) => variables[v.variableId] || "").filter(Boolean);
            if (formula) {
              result = formula.replace(/\${(\w+)}/g, (match, key) => variables[key] || "");
            } else {
              result = values.join(" ");
            }
          } else {
            const firstVarId = variableIds[0]?.variableId;
            result = variables[firstVarId] || "";
          }
          break;
        case "number":
          const numVarId = variableIds[0]?.variableId;
          result = formatNumber(variables[numVarId] || "0", formatOptions);
          break;
        case "calculation":
          result = calculateFormula(formula, variables, formatOptions);
          break;
        default:
          result = "";
      }
      console.log("Setting display value:", result);
      setValue(result);
    }, [type, variables, formula, formatOptions, variableIds]);
    const formatNumber = /* @__PURE__ */ __name((num, options = {}) => {
      const number = parseFloat(num);
      if (isNaN(number))
        return "0";
      const {
        style = "decimal",
        // decimal, currency, percent
        currency = "NOK",
        minimumFractionDigits = 0,
        maximumFractionDigits = 0
        // Endret til 0 som standard
      } = options;
      try {
        return new Intl.NumberFormat("nb-NO", {
          style,
          currency,
          minimumFractionDigits,
          maximumFractionDigits
        }).format(number);
      } catch (error) {
        console.error("Number formatting error:", error);
        return number.toString();
      }
    }, "formatNumber");
    const calculateFormula = /* @__PURE__ */ __name((formula2, variables2, formatOptions2) => {
      try {
        let calculation = formula2;
        Object.entries(variables2).forEach(([key, value2]) => {
          const regex = new RegExp(key, "g");
          calculation = calculation.replace(regex, parseFloat(value2) || 0);
        });
        const result = Function('"use strict";return (' + calculation + ")")();
        return formatNumber(result, formatOptions2);
      } catch (error) {
        console.error("Calculation error:", error);
        return "0";
      }
    }, "calculateFormula");
    return /* @__PURE__ */ import_react.default.createElement("div", { className: `${styles_default.container} ${styles_default[`container--${displayStyle}`]}` }, label && /* @__PURE__ */ import_react.default.createElement("label", { className: styles_default.label }, label), description && /* @__PURE__ */ import_react.default.createElement("p", { className: styles_default.description }, description), /* @__PURE__ */ import_react.default.createElement("div", { className: styles_default.display }, /* @__PURE__ */ import_react.default.createElement("div", { className: styles_default.displayValue }, prefix && /* @__PURE__ */ import_react.default.createElement("span", { className: styles_default.displayAffix }, prefix), /* @__PURE__ */ import_react.default.createElement("span", null, value || "0"), suffix && /* @__PURE__ */ import_react.default.createElement("span", { className: styles_default.displayAffix }, suffix))));
  }, "FormDisplay");
  (0, import_react2.registerVevComponent)(FormDisplay, {
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
        initialValue: "number"
        // Endret fra text til number som standard
      },
      {
        name: "variableIds",
        type: "array",
        title: "Variabler \xE5 overv\xE5ke",
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
        selector: styles_default.container,
        properties: [
          "background",
          "background-color",
          "padding",
          "margin",
          "border-radius",
          "box-shadow",
          "border"
        ]
      },
      {
        selector: styles_default.label,
        properties: [
          "color",
          "font-family",
          "font-size",
          "font-weight",
          "line-height",
          "margin-bottom",
          "text-transform",
          "letter-spacing",
          "background",
          "background-color",
          "padding"
        ]
      },
      {
        selector: styles_default.description,
        properties: [
          "color",
          "font-family",
          "font-size",
          "font-weight",
          "line-height",
          "margin-bottom",
          "text-transform",
          "letter-spacing",
          "background",
          "background-color",
          "padding"
        ]
      },
      {
        selector: styles_default.display,
        properties: [
          "background",
          "background-color",
          "border-radius",
          "padding",
          "box-shadow",
          "border"
        ]
      },
      {
        selector: styles_default.displayValue,
        properties: [
          "color",
          "font-family",
          "font-size",
          "font-weight",
          "line-height",
          "letter-spacing",
          "text-transform",
          "background",
          "background-color",
          "padding",
          "border-radius"
        ]
      },
      {
        selector: styles_default.displayAffix,
        properties: [
          "color",
          "font-family",
          "font-size",
          "font-weight",
          "line-height",
          "letter-spacing",
          "text-transform",
          "background",
          "background-color",
          "padding"
        ]
      }
    ]
  });
  var FormDisplay_default = FormDisplay;

  // src/components/form-elements/FormInput.jsx
  var import_react3 = __toESM(require_react());
  var import_react4 = __toESM(require_react2());
  var FormInput = /* @__PURE__ */ __name(({
    type = "text",
    variableId,
    label,
    description,
    options = [],
    suffix = "",
    prefix = "",
    placeholder = "",
    initialValue = "",
    min,
    max,
    required = false,
    displayStyle = "standard"
  }) => {
    const [value, setValue] = (0, import_react3.useState)(initialValue);
    (0, import_react3.useEffect)(() => {
      if (!window.vevVariables) {
        window.vevVariables = {};
      }
      window.vevVariables[variableId] = initialValue;
      const event = new CustomEvent("vevVariableUpdate", {
        detail: { id: variableId, value: initialValue }
      });
      window.dispatchEvent(event);
      return () => {
        delete window.vevVariables[variableId];
      };
    }, [variableId, initialValue]);
    const updateValue = /* @__PURE__ */ __name((newValue) => {
      const stringValue = String(newValue);
      setValue(stringValue);
      window.vevVariables[variableId] = stringValue;
      const event = new CustomEvent("vevVariableUpdate", {
        detail: { id: variableId, value: stringValue }
      });
      window.dispatchEvent(event);
      console.log("Variable updated:", {
        id: variableId,
        value: stringValue,
        globalState: window.vevVariables
      });
    }, "updateValue");
    const renderInput = /* @__PURE__ */ __name(() => {
      switch (type) {
        case "text":
        case "number":
          return /* @__PURE__ */ import_react3.default.createElement("div", { className: styles_default.inputWrapper }, /* @__PURE__ */ import_react3.default.createElement(
            "input",
            {
              type,
              value,
              onChange: (e) => updateValue(e.target.value),
              onBlur: type === "number" ? (e) => {
                const num = parseFloat(e.target.value);
                if (isNaN(num))
                  updateValue("0");
              } : void 0,
              placeholder,
              min,
              max,
              required,
              className: `${styles_default.input} 
                ${prefix ? styles_default["input--withPrefix"] : ""} 
                ${suffix ? styles_default["input--withSuffix"] : ""}`
            }
          ), prefix && /* @__PURE__ */ import_react3.default.createElement("span", { className: `${styles_default.affix} ${styles_default.prefix}` }, prefix), suffix && /* @__PURE__ */ import_react3.default.createElement("span", { className: `${styles_default.affix} ${styles_default.suffix}` }, suffix));
        case "select":
          return /* @__PURE__ */ import_react3.default.createElement("div", { className: styles_default.inputWrapper }, /* @__PURE__ */ import_react3.default.createElement(
            "select",
            {
              value,
              onChange: (e) => updateValue(e.target.value),
              required,
              className: styles_default.select
            },
            /* @__PURE__ */ import_react3.default.createElement("option", { value: "" }, placeholder || "Velg..."),
            options.map((option) => /* @__PURE__ */ import_react3.default.createElement("option", { key: option.value, value: option.value }, option.label))
          ));
        case "radio":
          return /* @__PURE__ */ import_react3.default.createElement("div", { className: styles_default.radioGroup }, options.map((option) => /* @__PURE__ */ import_react3.default.createElement("label", { key: option.value, className: styles_default.radioLabel }, /* @__PURE__ */ import_react3.default.createElement(
            "input",
            {
              type: "radio",
              value: option.value,
              checked: value === option.value,
              onChange: (e) => updateValue(e.target.value),
              required,
              className: styles_default.radio
            }
          ), /* @__PURE__ */ import_react3.default.createElement("span", null, option.label))));
        case "boolean":
          return /* @__PURE__ */ import_react3.default.createElement("label", { className: styles_default.radioLabel }, /* @__PURE__ */ import_react3.default.createElement(
            "input",
            {
              type: "checkbox",
              checked: value === "true",
              onChange: (e) => updateValue(e.target.checked.toString()),
              required,
              className: styles_default.checkbox
            }
          ), /* @__PURE__ */ import_react3.default.createElement("span", null, placeholder));
        default:
          return null;
      }
    }, "renderInput");
    return /* @__PURE__ */ import_react3.default.createElement("div", { className: `${styles_default.container} ${styles_default[`container--${displayStyle}`]}` }, label && /* @__PURE__ */ import_react3.default.createElement("label", { className: `${styles_default.label} ${required ? styles_default["label--required"] : ""}` }, label), description && /* @__PURE__ */ import_react3.default.createElement("p", { className: styles_default.description }, description), renderInput());
  }, "FormInput");
  (0, import_react4.registerVevComponent)(FormInput, {
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
        title: "P\xE5krevd",
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
        selector: styles_default.container,
        properties: [
          "background",
          "background-color",
          "padding",
          "margin",
          "border-radius",
          "box-shadow"
        ]
      },
      {
        selector: styles_default.label,
        properties: [
          "color",
          "font-family",
          "font-size",
          "font-weight",
          "line-height",
          "margin-bottom",
          "text-transform",
          "letter-spacing",
          "background",
          "background-color",
          "padding"
        ]
      },
      {
        selector: styles_default.description,
        properties: [
          "color",
          "font-family",
          "font-size",
          "font-weight",
          "line-height",
          "margin-bottom",
          "text-transform",
          "letter-spacing",
          "background",
          "background-color",
          "padding"
        ]
      },
      {
        selector: styles_default.input,
        properties: [
          "background",
          "background-color",
          "color",
          "font-family",
          "font-size",
          "font-weight",
          "line-height",
          "letter-spacing",
          "text-transform",
          "border",
          "border-radius",
          "padding",
          "box-shadow"
        ]
      },
      {
        selector: styles_default.select,
        properties: [
          "background",
          "background-color",
          "color",
          "font-family",
          "font-size",
          "font-weight",
          "line-height",
          "letter-spacing",
          "text-transform",
          "border",
          "border-radius",
          "padding",
          "box-shadow"
        ]
      },
      {
        selector: styles_default.radioGroup,
        properties: [
          "background",
          "background-color",
          "padding",
          "border-radius",
          "border",
          "box-shadow"
        ]
      },
      {
        selector: styles_default.radioLabel,
        properties: [
          "color",
          "font-family",
          "font-size",
          "font-weight",
          "line-height",
          "letter-spacing",
          "text-transform",
          "padding",
          "background",
          "background-color",
          "border-radius",
          "border"
        ]
      },
      {
        selector: styles_default.radio,
        properties: [
          "border-color",
          "background-color",
          "width",
          "height",
          "box-shadow"
        ]
      },
      {
        selector: styles_default.checkbox,
        properties: [
          "border-color",
          "background-color",
          "width",
          "height",
          "box-shadow"
        ]
      },
      {
        selector: styles_default.affix,
        properties: [
          "color",
          "font-family",
          "font-size",
          "font-weight",
          "line-height",
          "letter-spacing",
          "text-transform",
          "background",
          "background-color",
          "padding"
        ]
      },
      {
        selector: `${styles_default.radioLabel} span`,
        properties: [
          "color",
          "font-family",
          "font-size",
          "font-weight",
          "line-height",
          "letter-spacing",
          "text-transform",
          "background",
          "background-color",
          "padding"
        ]
      },
      {
        selector: "option",
        properties: [
          "color",
          "font-family",
          "font-size",
          "font-weight",
          "line-height",
          "background",
          "background-color"
        ]
      }
    ]
  });
  var FormInput_default = FormInput;
  return __toCommonJS(index_exports);
})();

      exports("3pSOyLAhwORSWcofgHMm_FormDisplay", packageBuild.FormDisplay);
exports("3pSOyLAhwORSWcofgHMm_FormInput", packageBuild.FormInput);
    },
  };
});
//# sourceMappingURL=http://localhost:9876/stdin.js.map