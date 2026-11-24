// Chip({ label, selected, onSelect }) – toggle button for filters
function Chip({ label, selected, onSelect }) {
  return h("button", {
    class: "chip",
    "aria-pressed": String(selected),
    onclick: onSelect
  }, label);
}
