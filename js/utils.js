// Builds a DOM element: h("div", { class: "x", onclick: fn }, child1, "text")
function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith("on")) el.addEventListener(key.slice(2).toLowerCase(), value);
    else if (value === true) el.setAttribute(key, "");
    else if (value !== false && value != null) el.setAttribute(key, value);
  }
  children.flat().forEach(child => el.append(child));
  return el;
}

// 1250 -> "₹1,250"
function rupees(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}
