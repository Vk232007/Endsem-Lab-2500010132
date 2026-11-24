// SearchBar({ query, vegOnly, onQuery, onVeg }) – search box + veg-only toggle
function SearchBar({ query, vegOnly, onQuery, onVeg }) {
  const input = h("input", {
    type: "search",
    placeholder: "Search dishes…",
    value: query,
    "aria-label": "Search dishes",
    oninput: e => onQuery(e.target.value)
  });

  const checkbox = h("input", { type: "checkbox", onchange: e => onVeg(e.target.checked) });
  checkbox.checked = vegOnly;

  return h("div", { class: "search" },
    input,
    h("label", { class: "toggle" }, checkbox, "Veg only"));
}
