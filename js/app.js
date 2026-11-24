const app = document.getElementById("app");
const badge = document.getElementById("cart-badge");

const state = {
  restaurants: [],
  selected: "all",   // restaurant id or "all"
  query: "",
  vegOnly: false,
  cart: { count: 0, total: 0 }
};

function addToCart(food) {
  state.cart.count += 1;
  state.cart.total += food.price;
  badge.textContent =
    state.cart.count + (state.cart.count === 1 ? " item" : " items") + " · " + rupees(state.cart.total);
}

function visibleSections() {
  const q = state.query.trim().toLowerCase();
  return state.restaurants
    .filter(r => state.selected === "all" || r.id === state.selected)
    .map(r => ({
      restaurant: r,
      foods: r.menu.filter(f =>
        (!state.vegOnly || f.veg) &&
        (!q || (f.name + " " + f.description).toLowerCase().includes(q)))
    }))
    .filter(section => section.foods.length > 0);
}

// Two containers: controls stay put while typing, only results re-render
const controls = h("div", {});
const results = h("div", {});

function renderResults() {
  results.replaceChildren();
  const sections = visibleSections();
  if (sections.length === 0) {
    results.append(Message({ text: "No dishes match. Try a different search or turn off the veg filter." }));
    return;
  }
  sections.forEach(s => results.append(RestaurantSection({ ...s, onAdd: addToCart })));
}

function renderControls() {
  controls.replaceChildren(
    SearchBar({
      query: state.query,
      vegOnly: state.vegOnly,
      onQuery: value => { state.query = value; renderResults(); },
      onVeg: value => { state.vegOnly = value; renderResults(); }
    }),
    h("div", { class: "chips" },
      Chip({ label: "All", selected: state.selected === "all", onSelect: () => select("all") }),
      state.restaurants.map(r =>
        Chip({ label: r.name, selected: state.selected === r.id, onSelect: () => select(r.id) })))
  );
}

function select(id) {
  state.selected = id;
  renderControls();
  renderResults();
}

async function init() {
  app.replaceChildren(Message({ text: "Loading menus…" }));
  try {
    state.restaurants = await fetchRestaurants();
    app.replaceChildren(controls, results);
    renderControls();
    renderResults();
  } catch (err) {
    app.replaceChildren(Message({
      text: "Couldn't load the menus (" + err.message + "). If you opened index.html by double-clicking, " +
            "run a local server instead (see README).",
      actionLabel: "Try again",
      onAction: init
    }));
  }
}

init();
