// Message({ text, actionLabel?, onAction? }) – loading, error and empty states
function Message({ text, actionLabel, onAction }) {
  return h("div", { class: "message", role: "status" },
    h("p", {}, text),
    actionLabel ? h("button", { onclick: onAction }, actionLabel) : "");
}
