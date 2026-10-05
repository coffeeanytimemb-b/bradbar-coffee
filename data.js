// ===== EDIT THIS FILE: your details, products and merchandise =====
const SITE = {
  name: "Brad Bar Coffee",
  tagline: "Coffee. Clarity. Community.",
  currency: "R",
  whatsapp: "27718837701",
  instagram: "https://instagram.com/Coffeeanytimemb",
  facebook: "https://facebook.com/Coffeeanytime",
  email: ""
};

// Coffee products will be added when you send the real product photos and prices.
const PRODUCTS = [];

// Merchandise: prices can be added later. For now, customers can enquire on WhatsApp.
const MERCH = [
  {
    id: "great-coffee-tees",
    name: "This Is Great Coffee — T-Shirts",
    image: "brad-bar-coffee-tees.jpeg",
    short: "Brad Bar Coffee merchandise.",
    description: "Available in multiple colours. Sizes and pricing will be confirmed before ordering."
  },
  {
    id: "great-coffee-crewneck",
    name: "This Is Great Coffee — Crewneck",
    image: "this-is-great-coffee-crewneck.jpeg",
    short: "Brad Bar Coffee merchandise.",
    description: "Classic crewneck featuring the This Is Great Coffee design. Sizes and pricing will be confirmed before ordering."
  }
];

// Learn page articles. body = list of paragraphs.
const ARTICLES = [
  { title: "What is a dirty chai?", summary: "Chai latte plus a shot of espresso.",
    body: ["A dirty chai is a chai latte with a shot of espresso added.",
           "It tastes spiced and creamy, with the roasted bitterness of coffee underneath.",
           "To make one: heat milk, pour over chai concentrate or mix, then add one fresh shot of espresso."] },
  { title: "Espresso basics", summary: "Dose, time and taste in plain language.",
    body: ["Espresso comes down to three things: how much coffee you use, how long it brews, and how it tastes.",
           "Too sour means brew a little longer or grind finer. Too bitter means brew shorter or grind coarser."] },
  { title: "Brewing at home", summary: "Good coffee without the gear snobbery.",
    body: ["You do not need expensive gear. Fresh beans, a clean brewer and a scale will take you most of the way."] }
];
