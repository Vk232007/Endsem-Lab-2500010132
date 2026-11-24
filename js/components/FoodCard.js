// FoodCard({ food, onAdd }) – one dish
function FoodCard({ food, onAdd }) {
  return h("article", { class: "food-card" },
    h("div", { class: "food-top" },
      h("span", { class: "food-emoji", "aria-hidden": "true" }, food.emoji),
      h("span", {
        class: "diet" + (food.veg ? "" : " nonveg"),
        title: food.veg ? "Vegetarian" : "Non-vegetarian"
      })),
    h("h3", {}, food.name),
    h("p", {}, food.description),
    h("div", { class: "food-bottom" },
      h("span", { class: "price" }, rupees(food.price)),
      h("button", {
        class: "add-btn",
        "aria-label": "Add " + food.name,
        onclick: () => onAdd(food)
      }, "Add")));
}
