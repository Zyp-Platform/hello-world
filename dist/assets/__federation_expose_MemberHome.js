import { importShared } from "./__federation_fn_import.js";
import { j as jsxRuntimeExports } from "./jsx-runtime.js";
const { useEffect } = await importShared("react");
function MemberHome(props) {
  const { communityId, user, onNavigate, theme } = props;
  useEffect(() => {
    window.__HELLO_WORLD_PROPS__ = props;
  }, [props]);
  const handleGoToAccount = () => {
    onNavigate("/core/user-core/member/account");
  };
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-testid": "dashboard-container", "data-community-id": communityId, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading user..." }) });
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: { fontSize: "2rem", marginBottom: "1rem" }, children: [
          "Hello, ",
          user.displayName || user.firstName,
          "!"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginBottom: "1rem", color: theme === "dark" ? "#a0a0a0" : "#666" }, children: "Welcome back to your dashboard." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            "data-testid": "user-role-indicator",
            style: {
              display: "inline-block",
              padding: "0.25rem 0.75rem",
              backgroundColor: theme === "dark" ? "#374151" : "#E5E7EB",
              borderRadius: "9999px",
              fontSize: "0.875rem",
              marginBottom: "1.5rem"
            },
            children: user.role.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: "1rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleGoToAccount,
            style: {
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: "#3B82F6",
              color: "#ffffff",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer"
            },
            children: "Go to Account"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { marginTop: "1rem", fontSize: "0.875rem", color: theme === "dark" ? "#666" : "#999" }, children: [
          "Community: ",
          communityId
        ] })
      ]
    }
  );
}
export {
  MemberHome as default
};
