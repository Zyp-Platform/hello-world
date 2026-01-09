import { importShared } from "./__federation_fn_import.js";
import { j as jsxRuntimeExports } from "./jsx-runtime.js";
const { useEffect } = await importShared("react");
function PublicHome(props) {
  const { communityId, onNavigate, theme } = props;
  useEffect(() => {
    window.__HELLO_WORLD_PROPS__ = props;
  }, [props]);
  const handleSignIn = () => {
    onNavigate("/core/user-core/public/auth/login");
  };
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { fontSize: "2rem", marginBottom: "1rem" }, children: "Welcome to ZYP Platform" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginBottom: "2rem", color: theme === "dark" ? "#a0a0a0" : "#666" }, children: "A minimal SPA for Shell-V1 prototype validation." }),
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
              cursor: "pointer"
            },
            children: "Sign In"
          }
        ),
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
