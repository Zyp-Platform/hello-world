import { importShared } from "./__federation_fn_import.js";
import { j as jsxRuntimeExports } from "./jsx-runtime.js";
const { useEffect } = await importShared("react");
function CommissionerHome(props) {
  const { communityId, user, onNavigate, theme } = props;
  useEffect(() => {
    window.__HELLO_WORLD_PROPS__ = props;
  }, [props]);
  const handleManageUsers = () => {
    onNavigate("/core/user-core/commissioner/users");
  };
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-testid": "dashboard-container", "data-community-id": communityId, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading admin..." }) });
  }
  const isCommissioner = user.role.name === "commissioner" || user.role.name === "admin";
  if (!isCommissioner) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-testid": "access-denied-page",
        style: {
          padding: "2rem",
          textAlign: "center",
          color: "#EF4444"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Access Denied" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You do not have permission to access this page." })
        ]
      }
    );
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { fontSize: "2rem", marginBottom: "1rem" }, children: "Go get it!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { marginBottom: "1rem", color: theme === "dark" ? "#a0a0a0" : "#666" }, children: [
          "Welcome, Commissioner ",
          user.displayName || user.firstName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            "data-testid": "user-role-indicator",
            style: {
              display: "inline-block",
              padding: "0.25rem 0.75rem",
              backgroundColor: "#7C3AED",
              color: "#ffffff",
              borderRadius: "9999px",
              fontSize: "0.875rem",
              marginBottom: "1.5rem"
            },
            children: user.role.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginTop: "1.5rem"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: handleManageUsers,
                  style: {
                    padding: "1rem",
                    backgroundColor: theme === "dark" ? "#374151" : "#F3F4F6",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    textAlign: "left"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: 0, fontSize: "1rem" }, children: "Manage Users" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0.5rem 0 0", fontSize: "0.875rem", opacity: 0.7 }, children: "View and manage community members" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    padding: "1rem",
                    backgroundColor: theme === "dark" ? "#374151" : "#F3F4F6",
                    borderRadius: "0.5rem"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: 0, fontSize: "1rem" }, children: "Community Stats" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { margin: "0.5rem 0 0", fontSize: "0.875rem", opacity: 0.7 }, children: [
                      "Community ID: ",
                      communityId
                    ] })
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
export {
  CommissionerHome as default
};
