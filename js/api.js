// Change this to a real endpoint when you have one.
// The response must look like data/menu.json.
const API_URL = "data/menu.json";

async function fetchRestaurants() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Server returned " + response.status);
  const data = await response.json();
  return data.restaurants;
}
