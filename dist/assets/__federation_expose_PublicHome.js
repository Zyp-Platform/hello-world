import { importShared } from "./__federation_fn_import.js";
import { j as jsxRuntimeExports } from "./jsx-runtime.js";
const { useState: useState$1 } = await importShared("react");
function Calculator(props) {
  const { theme } = props;
  const [display, setDisplay] = useState$1("0");
  const [previousValue, setPreviousValue] = useState$1(null);
  const [operation, setOperation] = useState$1(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState$1(false);
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
      default:
        return current;
    }
  };
  const handleEquals = () => {
    const currentValue = parseFloat(display);
    if (previousValue !== null && operation) {
      const result = performCalculation(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };
  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };
  const buttonStyle = {
    padding: "1rem",
    fontSize: "1.25rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    backgroundColor: theme === "dark" ? "#333" : "#e0e0e0",
    color: theme === "dark" ? "#fff" : "#000",
    transition: "background-color 0.2s"
  };
  const operationButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3B82F6",
    color: "#fff"
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { fontSize: "2rem", marginBottom: "2rem" }, children: "Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              maxWidth: "400px",
              margin: "0 auto",
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
                    justifyContent: "flex-end"
                  },
                  children: display
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "0.75rem"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: handleClear,
                        style: { ...clearButtonStyle, gridColumn: "span 2" },
                        children: "Clear"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleOperation("/"), style: operationButtonStyle, children: "÷" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleOperation("*"), style: operationButtonStyle, children: "×" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("7"), style: buttonStyle, children: "7" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("8"), style: buttonStyle, children: "8" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("9"), style: buttonStyle, children: "9" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleOperation("-"), style: operationButtonStyle, children: "−" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("4"), style: buttonStyle, children: "4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("5"), style: buttonStyle, children: "5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("6"), style: buttonStyle, children: "6" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleOperation("+"), style: operationButtonStyle, children: "+" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("1"), style: buttonStyle, children: "1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("2"), style: buttonStyle, children: "2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleNumberClick("3"), style: buttonStyle, children: "3" }),
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
                        style: { ...buttonStyle, gridColumn: "span 2" },
                        children: "0"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleDecimal, style: buttonStyle, children: "." })
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
