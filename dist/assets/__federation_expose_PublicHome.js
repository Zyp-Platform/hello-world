import { importShared } from "./__federation_fn_import.js";
import { j as jsxRuntimeExports } from "./jsx-runtime.js";
const { useState: useState$1 } = await importShared("react");
function Calculator(props) {
  const { theme } = props;
  const [display, setDisplay] = useState$1("0");
  const [previousValue, setPreviousValue] = useState$1(null);
  const [operation, setOperation] = useState$1(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState$1(false);
  const [angleMode, setAngleMode] = useState$1("deg");
  const [history, setHistory] = useState$1([]);
  const handleNumberClick = (num) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };
  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };
  const handleOperation = (op) => {
    const currentValue = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = performCalculation(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    setOperation(op);
    setWaitingForNewValue(true);
  };
  const performCalculation = (prev, current, op) => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "*":
        return prev * current;
      case "/":
        return prev / current;
      case "^":
        return Math.pow(prev, current);
      case "mod":
        return prev % current;
      default:
        return current;
    }
  };
  const handleEquals = () => {
    const currentValue = parseFloat(display);
    if (previousValue !== null && operation) {
      const result = performCalculation(previousValue, currentValue, operation);
      const resultStr = formatResult(result);
      setDisplay(resultStr);
      addToHistory(`${previousValue} ${operation} ${currentValue} = ${resultStr}`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };
  const handleScientificFunction = (func) => {
    const currentValue = parseFloat(display);
    let result;
    switch (func) {
      case "sin":
        result = Math.sin(angleMode === "deg" ? currentValue * Math.PI / 180 : currentValue);
        break;
      case "cos":
        result = Math.cos(angleMode === "deg" ? currentValue * Math.PI / 180 : currentValue);
        break;
      case "tan":
        result = Math.tan(angleMode === "deg" ? currentValue * Math.PI / 180 : currentValue);
        break;
      case "asin":
        result = angleMode === "deg" ? Math.asin(currentValue) * 180 / Math.PI : Math.asin(currentValue);
        break;
      case "acos":
        result = angleMode === "deg" ? Math.acos(currentValue) * 180 / Math.PI : Math.acos(currentValue);
        break;
      case "atan":
        result = angleMode === "deg" ? Math.atan(currentValue) * 180 / Math.PI : Math.atan(currentValue);
        break;
      case "log":
        result = Math.log10(currentValue);
        break;
      case "ln":
        result = Math.log(currentValue);
        break;
      case "sqrt":
        result = Math.sqrt(currentValue);
        break;
      case "cbrt":
        result = Math.cbrt(currentValue);
        break;
      case "square":
        result = currentValue * currentValue;
        break;
      case "cube":
        result = currentValue * currentValue * currentValue;
        break;
      case "reciprocal":
        result = 1 / currentValue;
        break;
      case "factorial":
        result = factorial(Math.floor(currentValue));
        break;
      case "abs":
        result = Math.abs(currentValue);
        break;
      case "negate":
        result = -currentValue;
        break;
      default:
        result = currentValue;
    }
    const resultStr = formatResult(result);
    setDisplay(resultStr);
    addToHistory(`${func}(${currentValue}) = ${resultStr}`);
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(true);
  };
  const handleConstant = (constant) => {
    let value;
    switch (constant) {
      case "pi":
        value = Math.PI;
        break;
      case "e":
        value = Math.E;
        break;
      default:
        value = 0;
    }
    setDisplay(String(value));
    setWaitingForNewValue(true);
  };
  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };
  const formatResult = (value) => {
    if (!isFinite(value)) return "Error";
    if (Number.isInteger(value)) return String(value);
    return parseFloat(value.toFixed(10)).toString();
  };
  const addToHistory = (entry) => {
    setHistory([...history, entry]);
  };
  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };
  const handleClearHistory = () => {
    setHistory([]);
  };
  const buttonStyle = {
    padding: "0.75rem",
    fontSize: "0.9rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    backgroundColor: theme === "dark" ? "#333" : "#e0e0e0",
    color: theme === "dark" ? "#fff" : "#000",
    transition: "background-color 0.2s",
    fontWeight: "500"
  };
  const operationButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3B82F6",
    color: "#fff"
  };
  const scientificButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#8B5CF6",
    color: "#fff",
    fontSize: "0.8rem"
  };
  const equalsButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#10B981",
    color: "#fff"
  };
  const clearButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#EF4444",
    color: "#fff"
  };
  const constantButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#F59E0B",
    color: "#fff",
    fontSize: "0.8rem"
  };
  const modeButtonStyle = {
    ...buttonStyle,
    backgroundColor: theme === "dark" ? "#444" : "#d0d0d0",
    color: theme === "dark" ? "#fff" : "#000",
    fontSize: "0.75rem"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-testid": "calculator-container",
      style: {
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1a1a1a",
        minHeight: "100vh"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { fontSize: "2rem", marginBottom: "2rem" }, children: "Scientific Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              maxWidth: "1200px",
              margin: "0 auto"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    padding: "2rem",
                    backgroundColor: theme === "dark" ? "#2a2a2a" : "#f5f5f5",
                    borderRadius: "1rem",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
                          padding: "1.5rem",
                          borderRadius: "0.5rem",
                          marginBottom: "1.5rem",
                          textAlign: "right",
                          fontSize: "2rem",
                          fontWeight: "bold",
                          wordWrap: "break-word",
                          wordBreak: "break-all",
                          minHeight: "3rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          fontFamily: "monospace"
                        },
                        children: display
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "1rem", display: "flex", gap: "0.5rem" }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => setAngleMode("deg"),
                          style: {
                            ...modeButtonStyle,
                            backgroundColor: angleMode === "deg" ? "#3B82F6" : theme === "dark" ? "#444" : "#d0d0d0",
                            color: angleMode === "deg" ? "#fff" : theme === "dark" ? "#fff" : "#000",
                            flex: 1
                          },
                          children: "DEG"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => setAngleMode("rad"),
                          style: {
                            ...modeButtonStyle,
                            backgroundColor: angleMode === "rad" ? "#3B82F6" : theme === "dark" ? "#444" : "#d0d0d0",
                            color: angleMode === "rad" ? "#fff" : theme === "dark" ? "#fff" : "#000",
                            flex: 1
                          },
                          children: "RAD"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "grid",
                          gridTemplateColumns: "repeat(5, 1fr)",
                          gap: "0.5rem",
                          marginBottom: "1rem"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("sin"), style: scientificButtonStyle, children: "sin" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("cos"), style: scientificButtonStyle, children: "cos" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("tan"), style: scientificButtonStyle, children: "tan" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleConstant("pi"), style: constantButtonStyle, children: "π" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              onClick: handleClear,
                              style: { ...clearButtonStyle, gridColumn: "span 1" },
                              children: "C"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("asin"), style: scientificButtonStyle, children: "asin" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("acos"), style: scientificButtonStyle, children: "acos" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("atan"), style: scientificButtonStyle, children: "atan" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleConstant("e"), style: constantButtonStyle, children: "e" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("negate"), style: operationButtonStyle, children: "±" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("log"), style: scientificButtonStyle, children: "log" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("ln"), style: scientificButtonStyle, children: "ln" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("sqrt"), style: scientificButtonStyle, children: "√" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("cbrt"), style: scientificButtonStyle, children: "∛" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleOperation("/"), style: operationButtonStyle, children: "÷" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("square"), style: scientificButtonStyle, children: "x²" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("cube"), style: scientificButtonStyle, children: "x³" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleOperation("^"), style: operationButtonStyle, children: "xʸ" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("reciprocal"), style: scientificButtonStyle, children: "1/x" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleOperation("*"), style: operationButtonStyle, children: "×" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("7"), style: buttonStyle, children: "7" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("8"), style: buttonStyle, children: "8" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("9"), style: buttonStyle, children: "9" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("factorial"), style: scientificButtonStyle, children: "n!" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleOperation("-"), style: operationButtonStyle, children: "−" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("4"), style: buttonStyle, children: "4" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("5"), style: buttonStyle, children: "5" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("6"), style: buttonStyle, children: "6" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleOperation("mod"), style: operationButtonStyle, children: "mod" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleOperation("+"), style: operationButtonStyle, children: "+" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("1"), style: buttonStyle, children: "1" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("2"), style: buttonStyle, children: "2" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("3"), style: buttonStyle, children: "3" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleDecimal, style: buttonStyle, children: "." }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              onClick: handleEquals,
                              style: { ...equalsButtonStyle, gridRow: "span 2" },
                              children: "="
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              onClick: () => handleNumberClick("0"),
                              style: { ...buttonStyle, gridColumn: "span 3" },
                              children: "0"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleScientificFunction("abs"), style: scientificButtonStyle, children: "|x|" })
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    padding: "2rem",
                    backgroundColor: theme === "dark" ? "#2a2a2a" : "#f5f5f5",
                    borderRadius: "1rem",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { fontSize: "1.25rem", margin: 0 }, children: "History" }),
                      history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: handleClearHistory,
                          style: {
                            ...clearButtonStyle,
                            padding: "0.5rem 1rem",
                            fontSize: "0.9rem"
                          },
                          children: "Clear"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          flex: 1,
                          overflowY: "auto",
                          backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
                          borderRadius: "0.5rem",
                          padding: "1rem",
                          fontFamily: "monospace",
                          fontSize: "0.9rem"
                        },
                        children: history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: theme === "dark" ? "#888" : "#999", textAlign: "center" }, children: "No calculations yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: history.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              padding: "0.5rem 0",
                              borderBottom: `1px solid ${theme === "dark" ? "#333" : "#eee"}`,
                              color: theme === "dark" ? "#ccc" : "#333"
                            },
                            children: entry
                          },
                          index
                        )) })
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const { useEffect, useState } = await importShared("react");
function PublicHome(props) {
  const { communityId, onNavigate, theme } = props;
  const [showCalculator, setShowCalculator] = useState(false);
  useEffect(() => {
    window.__HELLO_WORLD_PROPS__ = props;
  }, [props]);
  const handleSignIn = () => {
    onNavigate("/core/user-core/public/auth/login");
  };
  if (showCalculator) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { ...props }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            padding: "1rem",
            textAlign: "center",
            backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setShowCalculator(false),
              style: {
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                backgroundColor: "#6B7280",
                color: "#ffffff",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer"
              },
              children: "Back to Home"
            }
          )
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-testid": "dashboard-container",
      "data-community-id": communityId,
      "data-theme": theme,
      style: {
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1a1a1a",
        minHeight: "100vh"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { fontSize: "2rem", marginBottom: "1rem" }, children: "Welcome to the new zyp platform!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginBottom: "2rem", color: theme === "dark" ? "#a0a0a0" : "#666" }, children: "A minimal SPA for Shell-V1 prototype validation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "2rem" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleSignIn,
              style: {
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                backgroundColor: "#3B82F6",
                color: "#ffffff",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                marginRight: "1rem"
              },
              children: "Sign In"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setShowCalculator(true),
              style: {
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                backgroundColor: "#10B981",
                color: "#ffffff",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer"
              },
              children: "Open Calculator"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { marginTop: "1rem", fontSize: "0.875rem", color: theme === "dark" ? "#666" : "#999" }, children: [
          "Community: ",
          communityId
        ] })
      ]
    }
  );
}
export {
  PublicHome as default
};
