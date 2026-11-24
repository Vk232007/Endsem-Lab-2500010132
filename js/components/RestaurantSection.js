// RestaurantSection({ restaurant, foods, onAdd }) – header + grid of FoodCards
function RestaurantSection({ restaurant, foods, onAdd }) {
  return h("section", { class: "restaurant" },
    h("div", { class: "restaurant-head" },
      h("h2", {}, restaurant.name),
      h("p", {}, restaurant.cuisine + " · ★ " + restaurant.rating)),
    h("div", { class: "grid" }, foods.map(food => FoodCard({ food, onAdd }))));
}
