/* ==========================================================================
   CAFÉ DES ARTS — Digital Menu
   Vanilla JS — data, rendering, search/filter, modal, ambient animation
   ========================================================================== */

(function(){
"use strict";

/* ------------------------------------------------------------------------
   1. DATA
   ------------------------------------------------------------------------ */

const CATEGORIES = [
  { id:"viennoiseries", part:"morning", title:"Viennoiseries", kicker:"Chapitre Un — Le Matin", note:"Butter-laminated pastries, baked fresh at dawn." },
  { id:"eggs",          part:"morning", title:"Eggs To Order",  kicker:"Chapitre Un — Le Matin", note:"However you like them, made to order." },
  { id:"brunch",        part:"morning", title:"Brunch Plates",  kicker:"Chapitre Un — Le Matin", note:"A full plate for a slower morning." },
  { id:"painperdu",     part:"morning", title:"Pain Perdu",     kicker:"Chapitre Un — Le Matin", note:"Our signature French toast, three ways." },
  { id:"bowls",         part:"morning", title:"Healthy Bowls",  kicker:"Chapitre Un — Le Matin", note:"Bright, fresh, and built to energise." },
  { id:"teacakes",      part:"morning", title:"Tea Cakes",      kicker:"Chapitre Un — Le Matin", note:"For the table that lingers a little longer." },
  { id:"crepewaffle",   part:"morning", title:"Crêpes & Waffles", kicker:"Chapitre Un — Le Matin", note:"Choose between a delicate crêpe or a crisp waffle." },
  { id:"fries",         part:"afternoon", title:"French Fries",   kicker:"Chapitre Deux — L'Après-Midi", note:"Twice-fried, always golden." },
  { id:"savorycrepes",  part:"afternoon", title:"Savory Crêpes",  kicker:"Chapitre Deux — L'Après-Midi", note:"Breton-style crêpe made with ragi flour, served with house salad." },
  { id:"sandwiches",    part:"afternoon", title:"Sandwiches",     kicker:"Chapitre Deux — L'Après-Midi", note:"Hearty, hand-held, and honest." },
  { id:"share",         part:"afternoon", title:"Share",          kicker:"Chapitre Deux — L'Après-Midi", note:"For the table, before the table decides on mains." },
  { id:"tartines",      part:"afternoon", title:"Tartines",       kicker:"Chapitre Deux — L'Après-Midi", note:"Baked sourdough or country loaf, dressed with care." },
  { id:"salads",        part:"afternoon", title:"Salads",         kicker:"Chapitre Deux — L'Après-Midi", note:"Light enough to close the afternoon, or open the evening." }
];

const PARTS = {
  morning:   { label:"All Day Breakfast" },
  afternoon: { label:"Afternoon & Dinner" }
};

// Utility for full-width-consistent objects
function D(o){ return o; }

const ITEMS = [
  // ---------------- VIENNOISERIES ----------------
  D({id:"v1",cat:"viennoiseries",name:"Butter Croissant",price:"₹200",img:"./img/butter_croissant.jpg",
    desc:"Laminated forty times over, this classic croissant shatters at the edge and gives way to a soft, buttery crumb.",
    taste:["Buttery","Flaky","Delicate"],
    health:["Made With Real Butter","Baked Fresh Daily","No Preservatives"],
    nutrition:{cal:280,protein:5,carbs:26,fat:17}, diet:"veg", spice:0,
    pairing:"Classic Café au Lait", prep:"2 mins", badges:[],
    ingredients:["Flour","French Butter","Yeast","Milk"],
    freshness:"Baked every morning at dawn.",
    chefTip:"Warm it for 60 seconds before serving — the butter should just begin to glisten.", rating:4.7 }),
  D({id:"v2",cat:"viennoiseries",name:"Pain au Chocolat",price:"₹230",img:"./img/pain_au_chocolat.jpg",
    desc:"Two batons of dark chocolate cradled in the same butter-laminated dough as our croissant, baked until deeply golden.",
    taste:["Chocolatey","Buttery","Rich"],
    health:["Antioxidants From Dark Cocoa","Baked Fresh Daily"],
    nutrition:{cal:340,protein:6,carbs:34,fat:20}, diet:"veg", spice:0,
    pairing:"Espresso", prep:"2 mins", badges:["bestseller"],
    ingredients:["Flour","Butter","Dark Chocolate Batons"],
    freshness:"Baked fresh each morning.",
    chefTip:"Best within the first hour of baking, while the chocolate is still soft.", rating:4.8 }),
  D({id:"v3",cat:"viennoiseries",name:"Seasonal Morning Muffin",price:"₹220",img:"./img/muffin.jpg",
    desc:"A different muffin every day — ask your server what's rising in the oven this morning.",
    taste:["Sweet","Moist","Comforting"],
    health:["Seasonal Fruit","Baked Fresh Daily"],
    nutrition:{cal:310,protein:5,carbs:42,fat:13}, diet:"veg", spice:0,
    pairing:"Masala Chai", prep:"2 mins", badges:["seasonal"],
    ingredients:["Flour","Seasonal Fruit","Butter","Sugar"],
    freshness:"Recipe changes daily — always oven-fresh.",
    chefTip:"Ask which fruit is folding through today's batch before you order.", rating:4.5 }),

  // ---------------- EGGS TO ORDER ----------------
  D({id:"e1",cat:"eggs",name:"Eggs à la Truffe",price:"₹490",img:"./img/eggs_à_la_truffe.jpg",
    desc:"Soft scrambled eggs infused with truffle cream, finished with roasted mushrooms over country toast.",
    taste:["Earthy","Creamy","Luxurious","Umami"],
    health:["High Protein","Good Source Of Choline"],
    nutrition:{cal:420,protein:19,carbs:18,fat:31}, diet:"veg", spice:0,
    pairing:"Flat White", prep:"10 mins", badges:["chef"],
    ingredients:["Free-Range Eggs","Truffle Cream","Roasted Mushrooms","Country Toast"],
    freshness:"Eggs cracked and scrambled to order.",
    chefTip:"Ask for the truffle shavings on the side if you'd like it a touch lighter.", rating:4.9 }),
  D({id:"e2",cat:"eggs",name:"Egg & Soldiers",price:"₹360",img:"./img/egg_&_soldiers.jpg",
    desc:"Baked eggs in cream, Parmesan and Swiss cheese, served with buttered multigrain baguette soldiers for dipping.",
    taste:["Creamy","Cheesy","Savory"],
    health:["Calcium Rich","High Protein"],
    nutrition:{cal:460,protein:21,carbs:28,fat:29}, diet:"veg", spice:0,
    pairing:"Cappuccino", prep:"9 mins", badges:[],
    ingredients:["Eggs","Cream","Parmesan","Swiss Cheese","Multigrain Baguette"],
    freshness:"Baked to order in individual ramekins.",
    chefTip:"Dip the soldiers before the yolk fully sets for the fullest flavour.", rating:4.6 }),
  D({id:"e3",cat:"eggs",name:"Classic French Omelette",price:"₹400",img:"./img/classic_omelet.jpg",
    desc:"A classic French omelette on crispy potato rösti, with crème fraîche and balsamic-roasted cherry tomatoes.",
    taste:["Silky","Savory","Tangy"],
    health:["High Protein","Good Source Of Vitamin C"],
    nutrition:{cal:440,protein:20,carbs:24,fat:28}, diet:"veg", spice:0,
    pairing:"Fresh Orange Juice", prep:"8 mins", badges:[],
    ingredients:["Eggs","Potato Rösti","Crème Fraîche","Cherry Tomatoes"],
    freshness:"Rolled to order and served immediately.",
    chefTip:"The rösti underneath should crackle — if it doesn't, send it back to us.", rating:4.6 }),
  D({id:"e4",cat:"eggs",name:"Masala Tofu Scramble",price:"₹380",img:"./img/masala_tofu_scramble.jpg",
    desc:"Masala-spiced tofu tossed and served on crispy potato rösti with cashew cheese and balsamic cherry tomatoes.",
    taste:["Spiced","Savory","Earthy"],
    health:["Plant-Based Protein","Vegan Friendly","Iron Rich"],
    nutrition:{cal:360,protein:17,carbs:26,fat:20}, diet:"veg", spice:1,
    pairing:"Turmeric Latte", prep:"9 mins", badges:["healthy"],
    ingredients:["Tofu","Indian Spices","Potato Rösti","Cashew Cheese"],
    freshness:"Tofu pressed and spiced fresh daily.",
    chefTip:"Our wholly plant-based reading of the classic French omelette.", rating:4.5 }),

  // ---------------- BRUNCH PLATES ----------------
  D({id:"b1",cat:"brunch",name:"Croissant Florentine",price:"₹390",img:"./img/croissant_florentine.jpg",
    desc:"A buttery croissant layered with creamy spinach, perfectly poached eggs and rich Mornay sauce.",
    taste:["Rich","Creamy","Buttery","Savory"],
    health:["High Protein","Good Calcium Source","Provides Healthy Energy","Contains Iron From Spinach"],
    nutrition:{cal:520,protein:22,carbs:35,fat:30}, diet:"veg", spice:0,
    pairing:"Fresh Cappuccino", prep:"11 mins", badges:["chef"],
    ingredients:["Croissant","Spinach","Poached Egg","Mornay Sauce"],
    freshness:"Assembled to order; eggs poached fresh.",
    chefTip:"Cut in at the centre first — the yolk should run straight into the Mornay sauce.", rating:4.8 }),
  D({id:"b2",cat:"brunch",name:"Brunch Waffle",price:"₹420",img:"./img/brunch_waffle.jpg",
    desc:"A crisp Belgian waffle topped with a poached egg, sautéed mushroom and spinach in a light Mornay sauce.",
    taste:["Crisp","Savory","Creamy"],
    health:["High Protein","Iron Rich"],
    nutrition:{cal:500,protein:19,carbs:44,fat:26}, diet:"veg", spice:0,
    pairing:"Iced Latte", prep:"10 mins", badges:[],
    ingredients:["Waffle Batter","Egg","Mushroom","Spinach","Mornay Sauce"],
    freshness:"Waffle pressed fresh per order.",
    chefTip:"For the guest who can't choose between a savoury plate and a sweet one.", rating:4.6 }),
  D({id:"b3",cat:"brunch",name:"Croque Madame",price:"₹540",img:"./img/croque_madame.jpg",
    desc:"Gratinated country bread, toasted with bacon, cheese and béchamel, topped with a fried egg, fries, ketchup and house mayo.",
    taste:["Cheesy","Smoky","Indulgent","Savory"],
    health:["High Protein","Calcium Rich"],
    nutrition:{cal:720,protein:31,carbs:48,fat:42}, diet:"nonveg", spice:0,
    pairing:"Sparkling Lemonade", prep:"13 mins", badges:["bestseller"],
    ingredients:["Country Bread","Bacon","Gruyère","Béchamel","Fried Egg","Fries"],
    freshness:"Gratinated fresh under the grill.",
    chefTip:"Our all-time favourite — order it exactly as it comes, no substitutions needed.", rating:4.9 }),

  // ---------------- PAIN PERDU ----------------
  D({id:"p1",cat:"painperdu",name:"Pain Perdu Classic",price:"₹300",img:"./img/pain_perdu_classic.jpg",
    desc:"Our signature French toast — thick-cut brioche soaked in vanilla custard and pan-seared until caramelised.",
    taste:["Sweet","Custardy","Caramelised"],
    health:["Source Of Energy","Contains Calcium"],
    nutrition:{cal:380,protein:9,carbs:44,fat:17}, diet:"veg", spice:0,
    pairing:"Vanilla Latte", prep:"9 mins", badges:[],
    ingredients:["Brioche","Vanilla Custard","Butter","Maple Syrup"],
    freshness:"Soaked and seared to order.",
    chefTip:"Let it rest 30 seconds after searing so the custard sets through.", rating:4.6 }),
  D({id:"p2",cat:"painperdu",name:"Pain Perdu Crème Brûlée & Orange",price:"₹360",img:"./img/pain_perdu_orange.jpg",
    desc:"Our signature French toast finished with a brûléed sugar crust and candied orange zest.",
    taste:["Caramelised","Citrusy","Sweet"],
    health:["Vitamin C From Orange","Source Of Energy"],
    nutrition:{cal:430,protein:9,carbs:52,fat:19}, diet:"veg", spice:0,
    pairing:"Orange Blossom Tea", prep:"10 mins", badges:["favourite"],
    ingredients:["Brioche","Custard","Brûléed Sugar","Candied Orange"],
    freshness:"Torched to order for a crackling crust.",
    chefTip:"Tap the sugar crust with your spoon first — it should shatter, not bend.", rating:4.8 }),
  D({id:"p3",cat:"painperdu",name:"Pain Perdu Tiramisu",price:"₹390",img:"./img/tiramisu_pain_perdu.jpg",
    desc:"Our signature French toast layered with espresso-soaked mascarpone and a dusting of cocoa.",
    taste:["Coffee","Creamy","Sweet"],
    health:["Source Of Energy","Contains Calcium"],
    nutrition:{cal:460,protein:10,carbs:50,fat:22}, diet:"veg", spice:0,
    pairing:"Cold Brew", prep:"10 mins", badges:["chef"],
    ingredients:["Brioche","Mascarpone","Espresso","Cocoa"],
    freshness:"Layered fresh to order.",
    chefTip:"A café classic reimagined as breakfast — best enjoyed slowly, with coffee in hand.", rating:4.8 }),

  // ---------------- HEALTHY BOWLS ----------------
  D({id:"h1",cat:"bowls",name:"Granola Bowl",price:"₹360",img:"./img/granola_bowl.jpg",
    desc:"House-made granola, seasonal fresh fruit, fruit compote, yogurt and honey, layered for crunch in every bite.",
    taste:["Crunchy","Fresh","Lightly Sweet"],
    health:["High Fiber","Probiotic Rich","Energy Boosting","Low Sugar"],
    nutrition:{cal:340,protein:11,carbs:48,fat:11}, diet:"veg", spice:0,
    pairing:"Fresh Orange Juice", prep:"5 mins", badges:["healthy"],
    ingredients:["House Granola","Seasonal Fruit","Yogurt","Honey"],
    freshness:"Granola roasted in-house every week.",
    chefTip:"Let it sit two minutes before eating — the granola softens just enough.", rating:4.6 }),
  D({id:"h2",cat:"bowls",name:"Blueberry Bowl",price:"₹390",img:"./img/blueberry_bowl.jpg",
    desc:"A banana and blueberry smoothie base topped with house granola and toasted nuts, for a bright fruit-forward bowl.",
    taste:["Fruity","Fresh","Nutty"],
    health:["Antioxidant Rich","High Fiber","Vitamin C"],
    nutrition:{cal:360,protein:9,carbs:52,fat:11}, diet:"veg", spice:0,
    pairing:"Green Tea", prep:"6 mins", badges:["healthy"],
    ingredients:["Banana","Blueberry","Pineapple","House Granola","Toasted Nuts"],
    freshness:"Blended fresh to order.",
    chefTip:"Best enjoyed right away, while the smoothie base is still cold and thick.", rating:4.7 }),
  D({id:"h3",cat:"bowls",name:"Dragon Bowl",price:"₹390",img:"./img/dragon_bowl.jpg",
    desc:"Red dragon fruit, banana and pineapple smoothie topped with seasonal fruit and toasted nuts.",
    taste:["Fruity","Refreshing","Tropical"],
    health:["Vitamin C","High Fiber","Hydrating"],
    nutrition:{cal:350,protein:8,carbs:54,fat:9}, diet:"veg", spice:0,
    pairing:"Coconut Water", prep:"6 mins", badges:["healthy","new"],
    ingredients:["Dragon Fruit","Banana","Pineapple","Seasonal Fruit","Toasted Nuts"],
    freshness:"Blended fresh to order.",
    chefTip:"Our newest bowl — the dragon fruit gives it a colour as striking as its taste.", rating:4.7 }),

  // ---------------- TEA CAKES ----------------
  D({id:"t1",cat:"teacakes",name:"Chocolate Ganache Cake",price:"₹420",img:"./img/chocolate_ganache_cake.jpg",
    desc:"A dense chocolate ganache cake layered with a peanut praline crunch.",
    taste:["Rich","Chocolatey","Nutty"],
    health:["Antioxidants From Cocoa"],
    nutrition:{cal:480,protein:7,carbs:46,fat:29}, diet:"veg", spice:0,
    pairing:"Espresso", prep:"3 mins", badges:[],
    ingredients:["Dark Chocolate","Ganache","Peanut Praline"],
    freshness:"Baked in-house every alternate day.",
    chefTip:"Let it come to room temperature so the ganache softens fully.", rating:4.7 }),
  D({id:"t2",cat:"teacakes",name:"Quatre-Quart",price:"₹290",img:"./img/quatre_quart.jpg",
    desc:"A traditional French pound cake — equal parts butter, sugar, flour and egg — served with whipped cream and fresh fruit.",
    taste:["Buttery","Light","Classic"],
    health:["Source Of Energy"],
    nutrition:{cal:340,protein:5,carbs:38,fat:18}, diet:"veg", spice:0,
    pairing:"Earl Grey Tea", prep:"3 mins", badges:[],
    ingredients:["Butter","Sugar","Flour","Egg","Fresh Fruit"],
    freshness:"Baked fresh every morning.",
    chefTip:"The French classic in its truest form — equal parts of everything, nothing hidden.", rating:4.5 }),
  D({id:"t3",cat:"teacakes",name:"Banana & Walnut Bread",price:"₹310",img:"./img/banana_&_walnut_bread.jpg",
    desc:"Moist banana bread studded with toasted walnuts, served warm with vanilla ice cream.",
    taste:["Moist","Nutty","Sweet"],
    health:["Potassium Rich","Good Fats From Walnuts"],
    nutrition:{cal:390,protein:6,carbs:44,fat:20}, diet:"veg", spice:0,
    pairing:"Filter Coffee", prep:"4 mins", badges:[],
    ingredients:["Ripe Banana","Walnuts","Flour","Vanilla Ice Cream"],
    freshness:"Baked fresh daily.",
    chefTip:"Ask for it warmed — the ice cream should just begin to melt at the edges.", rating:4.6 }),

  // ---------------- CRÊPE & WAFFLE ----------------
  D({id:"c1",cat:"crepewaffle",name:"Façon Tatin",price:"₹340 / ₹390",img:"./img/facon_tatin.jpg",
    desc:"Apple compote, whipped mascarpone and Biscoff crumble folded into a delicate crêpe or a crisp waffle.",
    taste:["Caramelised","Fruity","Creamy"],
    health:["Vitamin C From Apple"],
    nutrition:{cal:410,protein:7,carbs:52,fat:18}, diet:"veg", spice:0,
    pairing:"Cinnamon Latte", prep:"9 mins", badges:[],
    ingredients:["Apple Compote","Mascarpone","Biscoff","Crêpe / Waffle Batter"],
    freshness:"Compote made fresh each week.",
    chefTip:"Named for the classic tarte Tatin — order the waffle for extra crunch.", rating:4.6 }),
  D({id:"c2",cat:"crepewaffle",name:"Ganache",price:"₹440 / ₹480",img:"./img/ganache.jpg",
    desc:"Dark chocolate and praline ganache with a peanut butter drizzle, topped with mixed nuts.",
    taste:["Chocolatey","Nutty","Indulgent"],
    health:["Antioxidants From Cocoa"],
    nutrition:{cal:480,protein:9,carbs:48,fat:26}, diet:"veg", spice:0,
    pairing:"Cold Brew", prep:"9 mins", badges:["bestseller"],
    ingredients:["Chocolate Ganache","Praline","Peanut Butter","Mixed Nuts"],
    freshness:"Ganache made fresh in-house.",
    chefTip:"Ask for extra praline on the side if you like it truly decadent.", rating:4.8 }),
  D({id:"c3",cat:"crepewaffle",name:"Banoffee",price:"₹340 / ₹390",img:"./img/banoffee.jpg",
    desc:"Caramelised banana, miso caramel and whipped mascarpone, folded into a crêpe or a crisp waffle.",
    taste:["Caramelised","Sweet","Creamy"],
    health:["Potassium Rich"],
    nutrition:{cal:420,protein:7,carbs:54,fat:17}, diet:"veg", spice:0,
    pairing:"Salted Caramel Latte", prep:"9 mins", badges:[],
    ingredients:["Banana","Miso Caramel","Mascarpone","Crêpe / Waffle Batter"],
    freshness:"Caramel made fresh daily.",
    chefTip:"The miso caramel is our twist — it should taste sweet first, savoury after.", rating:4.7 }),
  D({id:"c4",cat:"crepewaffle",name:"Tutti Frutti",price:"₹430 / ₹450",img:"./img/tutti_frutti.jpg",
    desc:"Seasonal fresh fruit, berry compote and toasted nuts, folded into a delicate crêpe or crisp waffle.",
    taste:["Fresh","Fruity","Light"],
    health:["Vitamin C","High Fiber"],
    nutrition:{cal:360,protein:7,carbs:46,fat:14}, diet:"veg", spice:0,
    pairing:"Fresh Mint Lemonade", prep:"8 mins", badges:["healthy"],
    ingredients:["Seasonal Fruit","Berry Compote","Toasted Nuts"],
    freshness:"Fruit selected fresh each morning.",
    chefTip:"The lightest of our crêpe selection — a favourite after a heavier main.", rating:4.6 }),

  // ---------------- FRENCH FRIES ----------------
  D({id:"f1",cat:"fries",name:"Regular Salted Fries",price:"₹220",img:"./img/regular_salted_fries.jpg",
    desc:"Twice-fried until golden, tossed simply in sea salt, served with ketchup and house mayo.",
    taste:["Crispy","Salty","Simple"],
    health:["Made To Order"],
    nutrition:{cal:380,protein:5,carbs:48,fat:19}, diet:"veg", spice:0,
    pairing:"Iced Tea", prep:"7 mins", badges:[],
    ingredients:["Potato","Sea Salt","Ketchup","House Mayo"],
    freshness:"Fried fresh per order.",
    chefTip:"Order these first — they're best straight from the fryer.", rating:4.5 }),
  D({id:"f2",cat:"fries",name:"Truffle & Parmesan Fries",price:"₹290",img:"./img/truffle_parmesan_fries.jpg",
    desc:"Twice-fried potatoes tossed in truffle oil, shaved Parmesan and fresh herbs.",
    taste:["Earthy","Cheesy","Umami"],
    health:["Calcium From Parmesan"],
    nutrition:{cal:430,protein:8,carbs:48,fat:24}, diet:"veg", spice:0,
    pairing:"Sparkling Water", prep:"7 mins", badges:["chef"],
    ingredients:["Potato","Truffle Oil","Parmesan","Herbs"],
    freshness:"Tossed fresh the moment they leave the fryer.",
    chefTip:"Finish with an extra pinch of Parmesan tableside for the full aroma.", rating:4.8 }),
  D({id:"f3",cat:"fries",name:"Gunpowder Fries",price:"₹260",img:"./img/gunpowder_fries.jpg",
    desc:"Twice-fried potatoes tossed in a South Indian gunpowder spice blend, sharp and smoky.",
    taste:["Spicy","Smoky","Bold"],
    health:["Made To Order"],
    nutrition:{cal:390,protein:5,carbs:48,fat:20}, diet:"veg", spice:2,
    pairing:"Buttermilk", prep:"7 mins", badges:[],
    ingredients:["Potato","Gunpowder Spice Blend","Curry Leaves"],
    freshness:"Spice blend ground fresh weekly.",
    chefTip:"Order the buttermilk alongside — it tempers the gunpowder beautifully.", rating:4.6 }),

  // ---------------- SAVORY CRÊPES ----------------
  D({id:"s1",cat:"savorycrepes",name:"Mushroom & Spinach Crêpe",price:"₹410",img:"./img/mushroom_spinach_crepe.jpg",
    desc:"Breton-style crêpe made with ragi flour, filled with creamy sautéed mushroom, spinach and house blend cheese, served with house salad.",
    taste:["Earthy","Creamy","Nutty"],
    health:["High Fiber From Ragi","Iron Rich","Calcium Rich"],
    nutrition:{cal:420,protein:14,carbs:38,fat:22}, diet:"veg", spice:0,
    pairing:"Herbal Tea", prep:"11 mins", badges:["healthy"],
    ingredients:["Ragi Crêpe","Mushroom","Spinach","House Blend Cheese"],
    freshness:"Crêpe batter made fresh each morning.",
    chefTip:"The ragi flour gives this crêpe a nuttier bite than a classic buckwheat galette.", rating:4.6 }),
  D({id:"s2",cat:"savorycrepes",name:"Chicken & Basil Crêpe",price:"₹470",img:"./img/chicken_basil_crepe.jpg",
    desc:"Ragi-flour crêpe filled with grilled chicken thigh, basil pesto, charred cherry tomato and Parmesan.",
    taste:["Herby","Savory","Charred"],
    health:["High Protein","Vitamin C"],
    nutrition:{cal:480,protein:26,carbs:36,fat:24}, diet:"nonveg", spice:0,
    pairing:"Iced Peach Tea", prep:"12 mins", badges:[],
    ingredients:["Ragi Crêpe","Grilled Chicken","Basil Pesto","Cherry Tomato","Parmesan"],
    freshness:"Chicken grilled fresh to order.",
    chefTip:"Ask for extra pesto if you love the basil to lead over the chicken.", rating:4.7 }),
  D({id:"s3",cat:"savorycrepes",name:"Bacon & Cheese Crêpe",price:"₹460",img:"./img/bacon_cheese_crepe.jpg",
    desc:"Ragi-flour crêpe with crisp bacon bits, fried onion, house blend cheese and a poached egg.",
    taste:["Smoky","Cheesy","Savory"],
    health:["High Protein"],
    nutrition:{cal:520,protein:22,carbs:36,fat:32}, diet:"nonveg", spice:0,
    pairing:"Cold Brew", prep:"11 mins", badges:["bestseller"],
    ingredients:["Ragi Crêpe","Bacon","Fried Onion","Cheese","Poached Egg"],
    freshness:"Bacon crisped fresh to order.",
    chefTip:"Cut through the centre first, so the poached yolk runs through every bite.", rating:4.8 }),
  D({id:"s4",cat:"savorycrepes",name:"Pondy 'Chérie' Crêpe",price:"₹480",img:"./img/pondy_cherie_crepe.jpg",
    desc:"Ragi-flour crêpe filled with Pondicherry-style Créole minced chicken in a vibrant spiced tomato sauce.",
    taste:["Spiced","Tangy","Bold"],
    health:["High Protein","Vitamin C From Tomato"],
    nutrition:{cal:460,protein:24,carbs:34,fat:22}, diet:"nonveg", spice:2,
    pairing:"Ginger Lemonade", prep:"13 mins", badges:["chef"],
    ingredients:["Ragi Crêpe","Minced Chicken","Créole Spiced Tomato Sauce"],
    freshness:"Sauce simmered fresh each day.",
    chefTip:"Our homage to Pondicherry's Créole roots — ask for it spicier if you dare.", rating:4.9 }),

  // ---------------- SANDWICHES ----------------
  D({id:"sw1",cat:"sandwiches",name:"The Kiddo",price:"₹440",img:"./img/the_kiddo.jpg",
    desc:"A gratinated cheese omelette sandwich on country bread, served with French fries and ketchup.",
    taste:["Cheesy","Comforting","Simple"],
    health:["Calcium Rich","High Protein"],
    nutrition:{cal:520,protein:18,carbs:44,fat:28}, diet:"veg", spice:0,
    pairing:"Fresh Lime Soda", prep:"9 mins", badges:[],
    ingredients:["Country Bread","Egg","Cheese","Fries"],
    freshness:"Gratinated fresh under the grill.",
    chefTip:"A gentle, familiar plate — perfect for the youngest guests at the table.", rating:4.5 }),
  D({id:"sw2",cat:"sandwiches",name:"Banh Mi Chicken",price:"₹440",img:"./img/banh_mi_chicken.jpg",
    desc:"Chicken pâté and grilled chicken layered with pickled vegetables and herbs in a crisp baguette.",
    taste:["Tangy","Herby","Savory"],
    health:["High Protein","Vitamin C From Pickled Vegetables"],
    nutrition:{cal:490,protein:25,carbs:42,fat:22}, diet:"nonveg", spice:1,
    pairing:"Vietnamese Iced Coffee", prep:"10 mins", badges:["bestseller"],
    ingredients:["Baguette","Chicken Pâté","Grilled Chicken","Pickled Vegetables","Herbs"],
    freshness:"Pickles made fresh weekly.",
    chefTip:"A café classic, reimagined with a French baguette instead of the usual demi-loaf.", rating:4.8 }),
  D({id:"sw3",cat:"sandwiches",name:"Banh Mi Tofu",price:"₹380",img:"./img/banh_mi_tofu.jpg",
    desc:"Mushroom terrine and smoked tofu layered with pickled vegetables and herbs in a crisp baguette.",
    taste:["Smoky","Tangy","Herby"],
    health:["Plant-Based Protein","Vegan Friendly"],
    nutrition:{cal:420,protein:16,carbs:44,fat:16}, diet:"veg", spice:1,
    pairing:"Iced Jasmine Tea", prep:"10 mins", badges:["healthy"],
    ingredients:["Baguette","Mushroom Terrine","Smoked Tofu","Pickled Vegetables"],
    freshness:"Tofu smoked fresh in-house each week.",
    chefTip:"The plant-based answer to our Banh Mi Chicken, built with just as much care.", rating:4.6 }),

  // ---------------- SHARE ----------------
  D({id:"sh1",cat:"share",name:"Garlic Bread",price:"₹340",img:"./img/garlic_bread.jpg",
    desc:"Garlic and herb buttered, gratinated country bread — a simple table starter, done properly.",
    taste:["Garlicky","Buttery","Crisp"],
    health:["Made Fresh To Order"],
    nutrition:{cal:340,protein:7,carbs:36,fat:18}, diet:"veg", spice:0,
    pairing:"House Red Wine", prep:"7 mins", badges:[],
    ingredients:["Country Bread","Garlic","Herb Butter","Cheese"],
    freshness:"Buttered and grilled fresh to order.",
    chefTip:"Order it first — it's meant for the table while everyone decides on the rest.", rating:4.5 }),
  D({id:"sh2",cat:"share",name:"Chicken Liver Pâté",price:"₹380",img:"./img/chicken_liver_pate.jpg",
    desc:"House-made chicken liver pâté served with baguette slices and olive oil.",
    taste:["Rich","Earthy","Savory"],
    health:["Iron Rich","High Protein"],
    nutrition:{cal:360,protein:15,carbs:22,fat:22}, diet:"nonveg", spice:0,
    pairing:"House White Wine", prep:"5 mins", badges:["chef"],
    ingredients:["Chicken Liver","Butter","Baguette","Olive Oil"],
    freshness:"Made fresh in small batches.",
    chefTip:"A classic French bistro starter — spread it thick, don't be shy.", rating:4.7 }),
  D({id:"sh3",cat:"share",name:"Mushroom Terrine",price:"₹390",img:"./img/mushroom_terrine.jpg",
    desc:"A layered mushroom terrine, served with baguette slices and truffle oil.",
    taste:["Earthy","Silky","Umami"],
    health:["Vegetarian Friendly","Low Fat"],
    nutrition:{cal:300,protein:8,carbs:24,fat:16}, diet:"veg", spice:0,
    pairing:"House White Wine", prep:"5 mins", badges:["healthy"],
    ingredients:["Mixed Mushrooms","Butter","Baguette","Truffle Oil"],
    freshness:"Set fresh each morning.",
    chefTip:"Our vegetarian answer to the classic pâté board.", rating:4.6 }),
  D({id:"sh4",cat:"share",name:"Chicken Nuggets",price:"₹410",img:"./img/chicken_nuggets.jpg",
    desc:"House-made chicken nuggets, fried until golden, served with fries and dips.",
    taste:["Crispy","Savory","Comforting"],
    health:["High Protein"],
    nutrition:{cal:480,protein:24,carbs:32,fat:26}, diet:"nonveg", spice:0,
    pairing:"Cola", prep:"9 mins", badges:[],
    ingredients:["Chicken Breast","Breadcrumbs","Fries","House Dips"],
    freshness:"Breaded and fried fresh to order.",
    chefTip:"Made from whole chicken breast, not processed mince — you'll notice the difference.", rating:4.6 }),

  // ---------------- TARTINES ----------------
  D({id:"ta1",cat:"tartines",name:"Forest Tartine",price:"₹490",img:"./img/forest_tartine.jpg",
    desc:"A mix of sautéed and roasted mushrooms, Parmesan cheese and pomegranate molasses on baked sourdough.",
    taste:["Earthy","Umami","Tangy"],
    health:["Antioxidant Rich","Low Fat"],
    nutrition:{cal:380,protein:12,carbs:38,fat:18}, diet:"veg", spice:0,
    pairing:"Herbal Tea", prep:"9 mins", badges:["favourite"],
    ingredients:["Sourdough","Mixed Mushrooms","Parmesan","Pomegranate Molasses"],
    freshness:"Mushrooms roasted fresh to order.",
    chefTip:"Our guests' favourite tartine — the pomegranate molasses is the reason why.", rating:4.8 }),
  D({id:"ta2",cat:"tartines",name:"Caprese Tartine",price:"₹480",img:"./img/caprese_tartine.jpg",
    desc:"Stracciatella, basil pesto, cherry tomatoes and a balsamic drizzle on baked sourdough.",
    taste:["Creamy","Herby","Fresh"],
    health:["Calcium Rich","Vitamin C"],
    nutrition:{cal:400,protein:14,carbs:34,fat:22}, diet:"veg", spice:0,
    pairing:"Iced Green Tea", prep:"7 mins", badges:[],
    ingredients:["Sourdough","Stracciatella","Basil Pesto","Cherry Tomato"],
    freshness:"Stracciatella sourced fresh weekly.",
    chefTip:"A French tartine with an Italian heart — light enough for a warm afternoon.", rating:4.7 }),
  D({id:"ta3",cat:"tartines",name:"Mediterranean Tartine",price:"₹480",img:"./img/mediterranean_tartine.jpg",
    desc:"Tomato pesto, roasted bell pepper and zucchini, capers and mozzarella on baked sourdough.",
    taste:["Tangy","Savory","Fresh"],
    health:["Vitamin C","Low Sugar"],
    nutrition:{cal:390,protein:13,carbs:36,fat:19}, diet:"veg", spice:0,
    pairing:"Iced Lemon Tea", prep:"8 mins", badges:[],
    ingredients:["Sourdough","Tomato Pesto","Bell Pepper","Zucchini","Capers","Mozzarella"],
    freshness:"Vegetables roasted fresh daily.",
    chefTip:"Ask for extra capers if you like your tartines with a briny finish.", rating:4.6 }),
  D({id:"ta4",cat:"tartines",name:"Potimaron Tartine",price:"₹460",img:"./img/potimaron_tartine.jpg",
    desc:"Pumpkin purée, roasted pumpkin, Parmesan, dukkah and microgreens on baked sourdough.",
    taste:["Sweet","Nutty","Earthy"],
    health:["Vitamin A","High Fiber"],
    nutrition:{cal:360,protein:10,carbs:40,fat:16}, diet:"veg", spice:0,
    pairing:"Chai Latte", prep:"8 mins", badges:["seasonal"],
    ingredients:["Sourdough","Pumpkin Purée","Roasted Pumpkin","Dukkah","Microgreens"],
    freshness:"Pumpkin roasted fresh each week.",
    chefTip:"Named for the French potimarron squash — best while the pumpkin is still warm.", rating:4.6 }),

  // ---------------- SALADS ----------------
  D({id:"sa1",cat:"salads",name:"Baby Burrata Salad",price:"₹440",img:"./img/ ",
    desc:"Burrata served on seasonal fruits, mixed lettuces and arugula, with balsamic vinaigrette, nuts and seeds.",
    taste:["Creamy","Fresh","Sweet"],
    health:["Calcium Rich","High Fiber"],
    nutrition:{cal:420,protein:16,carbs:24,fat:28}, diet:"veg", spice:0,
    pairing:"Sparkling Rosé Lemonade", prep:"6 mins", badges:["chef"],
    ingredients:["Burrata","Seasonal Fruit","Mixed Lettuce","Arugula","Nuts","Seeds"],
    freshness:"Burrata delivered fresh twice weekly.",
    chefTip:"Let the burrata sit at room temperature for five minutes before eating.", rating:4.8 }),
  D({id:"sa2",cat:"salads",name:"Caesar Salad (Veg)",price:"₹390",img:"./img/caesar_salad_veg.jpg",
    desc:"Iceberg lettuce, Caesar dressing, croutons and Parmesan — the classic, without the chicken.",
    taste:["Creamy","Crunchy","Savory"],
    health:["Calcium Rich"],
    nutrition:{cal:340,protein:10,carbs:22,fat:22}, diet:"veg", spice:0,
    pairing:"Iced Tea", prep:"6 mins", badges:[],
    ingredients:["Iceberg Lettuce","Caesar Dressing","Croutons","Parmesan"],
    freshness:"Dressed fresh to order.",
    chefTip:"Ask for the dressing on the side if you prefer it lighter.", rating:4.5 }),
  D({id:"sa3",cat:"salads",name:"Caesar Salad (Chicken)",price:"₹490",img:"./img/caesar_salad_chicken.jpg",
    desc:"Fried and juicy chicken thighs, iceberg lettuce, Caesar dressing, croutons and Parmesan.",
    taste:["Crispy","Creamy","Savory"],
    health:["High Protein","Calcium Rich"],
    nutrition:{cal:460,protein:28,carbs:24,fat:26}, diet:"nonveg", spice:0,
    pairing:"Iced Tea", prep:"8 mins", badges:["bestseller"],
    ingredients:["Chicken Thigh","Iceberg Lettuce","Caesar Dressing","Croutons","Parmesan"],
    freshness:"Chicken fried fresh to order.",
    chefTip:"The chicken thigh stays juicier than breast — that's why we choose it here.", rating:4.7 }),
  D({id:"sa4",cat:"salads",name:"Parisian Salad",price:"₹430",img:"./img/parisian_salad.jpg",
    desc:"Potato, green beans and greens with cheddar, herbs and a soft egg, tossed in a French dressing.",
    taste:["Hearty","Tangy","Fresh"],
    health:["High Fiber","High Protein"],
    nutrition:{cal:400,protein:14,carbs:32,fat:22}, diet:"veg", spice:0,
    pairing:"House White Wine", prep:"7 mins", badges:[],
    ingredients:["Potato","Green Beans","Cheddar","Soft Egg","French Dressing"],
    freshness:"Assembled fresh to order.",
    chefTip:"A bistro salad built to be a light meal on its own, not just a side.", rating:4.6 })
];

const ADDONS = {
  morning:   [["Multigrain, Country Loaf or Sourdough Toast","+₹30"],["Butter","+₹20"],["Strawberry Compote","+₹40"],["Poached Egg","+₹60"]],
  afternoon: [["Butter","+₹20"],["Strawberry Compote","+₹40"],["Poached Egg","+₹60"],["Bacon Bits","+₹120"]]
};

const BADGE_META = {
  chef:      { label:"Chef's Recommendation", glyph:"✦", cls:"b-chef" },
  bestseller:{ label:"Best Seller",           glyph:"★", cls:"b-bestseller" },
  favourite: { label:"Most Loved",            glyph:"♥", cls:"b-favourite" },
  healthy:   { label:"Healthy Choice",        glyph:"✓", cls:"b-healthy" },
  new:       { label:"New Arrival",           glyph:"✦", cls:"b-new" },
  seasonal:  { label:"Seasonal Special",      glyph:"❦", cls:"b-seasonal" }
};

function imgUrl(seed){
  if(!seed) return "";
  if(typeof seed !== "string") seed = String(seed);
  const normalized = seed.trim();
  if(/^(?:https?:)?\/\//i.test(normalized) || /^\.|^\//.test(normalized) || /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(normalized)){
    return normalized;
  }
  return `https://picsum.photos/seed/${encodeURIComponent(normalized)}/640/480`;
}

/* ------------------------------------------------------------------------
   2. RENDERING
   ------------------------------------------------------------------------ */

const menuRoot = document.getElementById("menuRoot");
const categoryRail = document.getElementById("categoryRail");
const categorySheetList = document.getElementById("categorySheetList");

let currentFilter = "all";
let currentSearch = "";
let currentCategory = "all";

function itemMatchesFilter(item){
  switch(currentFilter){
    case "veg": return item.diet === "veg";
    case "nonveg": return item.diet === "nonveg";
    case "chef": return item.badges.includes("chef");
    case "bestseller": return item.badges.includes("bestseller");
    case "healthy": return item.badges.includes("healthy");
    case "new": return item.badges.includes("new");
    default: return true;
  }
}
function itemMatchesSearch(item){
  if(!currentSearch) return true;
  const q = currentSearch.toLowerCase();
  const hay = [item.name, item.desc, ...(item.taste||[]), ...(item.ingredients||[])].join(" ").toLowerCase();
  return hay.includes(q);
}
function itemMatchesCategory(item){
  return currentCategory === "all" || item.cat === currentCategory;
}

function spiceDots(level){
  let s = '<span class="spice-dots" aria-label="Spice level">';
  for(let i=0;i<3;i++) s += `<span class="spice-dot ${i<level ? "on" : ""}"></span>`;
  return s + "</span>";
}

function badgesHTML(badges){
  return badges.map(b=>{
    const m = BADGE_META[b];
    if(!m) return "";
    return `<span class="dish-badge ${m.cls}">${m.glyph} ${m.label}</span>`;
  }).join("");
}

function cardHTML(item){
  const imageUrl = imgUrl(item.img);
  return `
  <article class="dish-card" data-id="${item.id}" data-cat="${item.cat}" tabindex="0" role="button" aria-label="View details for ${item.name}">
    <div class="dish-media">
      <a class="dish-image-link" href="${imageUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image of ${item.name}">
        <img src="${imageUrl}" alt="${item.name}" loading="lazy">
      </a>
      <div class="dish-ribbon">${badgesHTML(item.badges)}</div>
      <div class="dish-diet-flag ${item.diet === "veg" ? "veg" : "nonveg"}" title="${item.diet === "veg" ? "Vegetarian" : "Non-Vegetarian"}"></div>
    </div>
    <div class="dish-body">
      <div class="dish-head">
        <span class="dish-name">${item.name}</span>
        <span class="dish-price">${item.price}</span>
      </div>
      <p class="dish-desc">${item.desc}</p>
      <div class="taste-tags">${item.taste.slice(0,4).map(t=>`<span class="taste-tag">${t}</span>`).join("")}</div>
      <div class="dish-foot">
        <div class="dish-meta">
          <span class="dish-meta-item">⏱ ${item.prep}</span>
          ${spiceDots(item.spice)}
        </div>
        <span class="view-more">View Details →</span>
      </div>
    </div>
  </article>`;
}

function sectionHTML(cat){
  const items = ITEMS.filter(i=>i.cat===cat.id);
  return `
  <div class="category-mast" id="mast-${cat.id}">
    <p class="category-kicker">${cat.kicker}</p>
    <h3 class="category-title">${cat.title}</h3>
    <p class="category-note">${cat.note}</p>
    <div class="category-divider"><span></span><span class="category-divider-glyph">❦</span><span></span></div>
  </div>
  <div class="menu-grid" data-cat-grid="${cat.id}">
    ${items.map(cardHTML).join("")}
  </div>`;
}

function addonsHTML(part){
  const rows = ADDONS[part] || [];
  return `
  <div class="category-mast" style="margin-top:10px;">
    <p class="category-kicker">Add-Ons</p>
    <h3 class="category-title" style="font-size:1.5rem;">Make It Yours</h3>
  </div>
  <div style="max-width:720px;margin:0 auto 30px;display:flex;flex-wrap:wrap;gap:12px;justify-content:center;">
    ${rows.map(([n,p])=>`<span class="taste-tag" style="font-size:.8rem;padding:9px 16px;">${n} <strong style="margin-left:6px;color:var(--primary)">${p}</strong></span>`).join("")}
  </div>`;
}

function buildMenu(){
  let html = "";
  ["morning","afternoon"].forEach(part=>{
    html += `<section class="menu-section" id="${part}" data-part="${part}">`;
    html += `<p class="section-part-label">${PARTS[part].label}</p>`;
    CATEGORIES.filter(c=>c.part===part).forEach(cat=>{ html += sectionHTML(cat); });
    html += addonsHTML(part);
    html += `</section>`;
  });
  menuRoot.innerHTML = html;

  // Category rail
  categoryRail.innerHTML = `<button class="rail-pill active" data-cat="all">All Categories</button>` +
    CATEGORIES.map(c=>`<button class="rail-pill" data-cat="${c.id}">${c.title}</button>`).join("");

  categorySheetList.innerHTML = `<button class="active" data-cat="all">All Categories</button>` +
    CATEGORIES.map(c=>`<button data-cat="${c.id}">${c.title}</button>`).join("");
}

function applyFilters(){
  const cards = document.querySelectorAll(".dish-card");
  let anyVisible = false;
  cards.forEach(card=>{
    const item = ITEMS.find(i=>i.id===card.dataset.id);
    const show = itemMatchesFilter(item) && itemMatchesSearch(item) && itemMatchesCategory(item);
    card.classList.toggle("hidden-card", !show);
    if(show) anyVisible = true;
  });

  // Hide/show whole category sections when filtering by category, and hide empty grids
  document.querySelectorAll(".menu-grid").forEach(grid=>{
    const catId = grid.dataset.catGrid;
    const mast = document.getElementById(`mast-${catId}`);
    const visibleCount = grid.querySelectorAll(".dish-card:not(.hidden-card)").length;
    const showSection = currentCategory === "all" || currentCategory === catId;
    const display = (showSection && visibleCount > 0) ? "" : "none";
    grid.style.display = display;
    if(mast) mast.style.display = display;
  });

  // existing empty-state
  let empty = document.getElementById("emptyState");
  if(!anyVisible){
    if(!empty){
      empty = document.createElement("div");
      empty.id = "emptyState";
      empty.className = "empty-state";
      empty.innerHTML = `<h3>No dishes found</h3><p>Try a different search term or clear your filters.</p>`;
      menuRoot.appendChild(empty);
    }
  } else if(empty){
    empty.remove();
  }
}

/* ------------------------------------------------------------------------
   3. MODAL
   ------------------------------------------------------------------------ */

const dishModal = document.getElementById("dishModal");
const dishModalPanel = document.getElementById("dishModalPanel");
const dishModalBackdrop = document.getElementById("dishModalBackdrop");

function starString(rating){
  const full = Math.round(rating);
  return "★★★★★".slice(0,full) + "☆☆☆☆☆".slice(0, 5-full);
}

function modalHTML(item){
  const tasteBars = item.taste.map((t,i)=>{
    const pct = 60 + ((i * 13) % 35);
    return `<div class="taste-meter"><span class="taste-meter-label">${t}</span><div class="taste-meter-track"><div class="taste-meter-fill" data-pct="${pct}"></div></div></div>`;
  }).join("");

  return `
  <button class="modal-close" id="modalCloseBtn" aria-label="Close">✕</button>
  <div class="modal-media">
    <img src="${imgUrl(item.img)}" alt="${item.name}">
    <div class="modal-media-caption">${item.name}</div>
  </div>
  <div class="modal-body">
    <div class="modal-topline">
      <div class="modal-badges">${badgesHTML(item.badges)}</div>
      <span class="modal-price">${item.price}</span>
    </div>
    <div class="modal-rating">
      <span class="stars">${starString(item.rating)}</span>
      <span class="rating-num">${item.rating.toFixed(1)} / 5 Customer Rating</span>
    </div>
    <p class="modal-desc">"${item.desc}"</p>

    <p class="modal-section-title">Taste Profile</p>
    <div class="taste-meter-list" style="margin-bottom:28px;">${tasteBars}</div>

    <div class="modal-grid">
      <div>
        <p class="modal-section-title">Health Benefits</p>
        <ul class="health-list">${item.health.map(h=>`<li>${h}</li>`).join("")}</ul>
      </div>
      <div>
        <p class="modal-section-title">Nutrition (Approx.)</p>
        <table class="nutri-table">
          <tr><td>Calories</td><td>${item.nutrition.cal} kcal</td></tr>
          <tr><td>Protein</td><td>${item.nutrition.protein} g</td></tr>
          <tr><td>Carbs</td><td>${item.nutrition.carbs} g</td></tr>
          <tr><td>Fat</td><td>${item.nutrition.fat} g</td></tr>
        </table>
      </div>
    </div>

    <p class="modal-section-title">Ingredients</p>
    <div class="ingredient-pills" style="margin-bottom:10px;">${item.ingredients.map(i=>`<span>${i}</span>`).join("")}</div>

    <div class="modal-footer-grid">
      <div class="modal-footer-item"><h5>Suitable For</h5><p>${item.diet === "veg" ? "Vegetarian" : "Non-Vegetarian"}</p></div>
      <div class="modal-footer-item"><h5>Spice Level</h5><p>${["None","Mild","Medium","Hot"][item.spice]}</p></div>
      <div class="modal-footer-item"><h5>Recommended Pairing</h5><p>${item.pairing}</p></div>
      <div class="modal-footer-item"><h5>Preparation Time</h5><p>${item.prep}</p></div>
      <div class="modal-footer-item"><h5>Freshness</h5><p>${item.freshness}</p></div>
    </div>

    <div class="chef-tip">
      <span class="chef-tip-glyph">❝</span>
      <p>${item.chefTip}</p>
    </div>
  </div>`;
}

let lastFocused = null;

function openModal(item){
  dishModalPanel.innerHTML = modalHTML(item);
  dishModal.classList.add("open");
  dishModal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
  lastFocused = document.activeElement;
  requestAnimationFrame(()=>{
    dishModalPanel.querySelectorAll(".taste-meter-fill").forEach(el=>{
      el.style.width = el.dataset.pct + "%";
    });
  });
  document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
}
function closeModal(){
  dishModal.classList.remove("open");
  dishModal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
  if(lastFocused) lastFocused.focus();
}

dishModalBackdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", e=>{ if(e.key === "Escape" && dishModal.classList.contains("open")) closeModal(); });

function imageModalHTML(item){
  return `
  <div class="image-modal-frame">
    <button class="image-modal-close" id="imageModalCloseBtn" aria-label="Close image">✕</button>
    <img src="${imgUrl(item.img)}" alt="${item.name}">
    <div class="image-modal-caption">${item.name}</div>
  </div>`;
}

const imageModal = document.getElementById("imageModal");
const imageModalPanel = document.getElementById("imageModalPanel");
const imageModalBackdrop = document.getElementById("imageModalBackdrop");

function openImageModal(item){
  imageModalPanel.innerHTML = imageModalHTML(item);
  imageModal.classList.add("open");
  imageModal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
  document.getElementById("imageModalCloseBtn").addEventListener("click", closeImageModal);
}
function closeImageModal(){
  imageModal.classList.remove("open");
  imageModal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
imageModalBackdrop.addEventListener("click", closeImageModal);
document.addEventListener("keydown", e=>{ if(e.key === "Escape" && imageModal.classList.contains("open")) closeImageModal(); });

menuRoot.addEventListener("click", e=>{
  const imageLink = e.target.closest(".dish-image-link");
  if(imageLink){
    const card = imageLink.closest(".dish-card");
    const item = card ? ITEMS.find(i=>i.id===card.dataset.id) : null;
    if(item){
      e.preventDefault();
      e.stopPropagation();
      openImageModal(item);
    }
    return;
  }

  const card = e.target.closest(".dish-card");
  if(!card) return;
  const item = ITEMS.find(i=>i.id===card.dataset.id);
  if(item) openModal(item);
});
menuRoot.addEventListener("keydown", e=>{
  if(e.key !== "Enter" && e.key !== " ") return;
  const imageLink = e.target.closest(".dish-image-link");
  if(imageLink){
    e.preventDefault();
    const card = imageLink.closest(".dish-card");
    const item = card ? ITEMS.find(i=>i.id===card.dataset.id) : null;
    if(item) openImageModal(item);
    return;
  }

  const card = e.target.closest(".dish-card");
  if(!card) return;
  e.preventDefault();
  const item = ITEMS.find(i=>i.id===card.dataset.id);
  if(item) openModal(item);
});

/* ------------------------------------------------------------------------
   4. SEARCH / FILTER UI
   ------------------------------------------------------------------------ */

const navSearchToggle = document.getElementById("navSearchToggle");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");
const searchClear = document.getElementById("searchClear");
const filterRow = document.getElementById("filterRow");

function toggleSearch(force){
  const shouldOpen = force !== undefined ? force : !searchPanel.classList.contains("open");
  searchPanel.classList.toggle("open", shouldOpen);
  navSearchToggle.setAttribute("aria-expanded", String(shouldOpen));
  if(shouldOpen) setTimeout(()=>searchInput.focus(), 200);
}
navSearchToggle.addEventListener("click", ()=>toggleSearch());
document.getElementById("heroSearchBtn").addEventListener("click", ()=>{ toggleSearch(true); window.scrollTo({top:0, behavior:"smooth"}); });
document.getElementById("mbnSearch").addEventListener("click", ()=>{ toggleSearch(true); window.scrollTo({top:0, behavior:"smooth"}); });

searchInput.addEventListener("input", e=>{
  currentSearch = e.target.value.trim();
  searchClear.classList.toggle("show", currentSearch.length > 0);
  applyFilters();
});
searchClear.addEventListener("click", ()=>{
  searchInput.value = "";
  currentSearch = "";
  searchClear.classList.remove("show");
  applyFilters();
  searchInput.focus();
});

filterRow.addEventListener("click", e=>{
  const chip = e.target.closest(".filter-chip");
  if(!chip) return;
  filterRow.querySelectorAll(".filter-chip").forEach(c=>c.classList.remove("active"));
  chip.classList.add("active");
  currentFilter = chip.dataset.filter;
  applyFilters();
});

/* ------------------------------------------------------------------------
   5. CATEGORY RAIL + MOBILE SHEET
   ------------------------------------------------------------------------ */

function setCategory(catId, {scroll=true} = {}){
  currentCategory = catId;
  document.querySelectorAll(".rail-pill").forEach(p=>p.classList.toggle("active", p.dataset.cat === catId));
  document.querySelectorAll(".category-sheet-list button").forEach(b=>b.classList.toggle("active", b.dataset.cat === catId));
  applyFilters();
  if(scroll && catId !== "all"){
    const mast = document.getElementById(`mast-${catId}`);
    if(mast) mast.scrollIntoView({behavior:"smooth", block:"start", inline:"nearest"});
  }
}

categoryRail.addEventListener("click", e=>{
  const pill = e.target.closest(".rail-pill");
  if(!pill) return;
  setCategory(pill.dataset.cat);
});

const categorySheet = document.getElementById("categorySheet");
document.getElementById("mbnCategories").addEventListener("click", ()=>categorySheet.classList.add("open"));
document.getElementById("categorySheetBackdrop").addEventListener("click", ()=>categorySheet.classList.remove("open"));
categorySheetList.addEventListener("click", e=>{
  const btn = e.target.closest("button");
  if(!btn) return;
  setCategory(btn.dataset.cat);
  categorySheet.classList.remove("open");
});

/* ------------------------------------------------------------------------
   6. SCROLL EFFECTS — progress bar, nav shadow, floating reserve, reveals
   ------------------------------------------------------------------------ */

const scrollProgress = document.getElementById("scrollProgress");
const siteNav = document.getElementById("siteNav");
const floatingReserve = document.getElementById("floatingReserve");
const hero = document.querySelector(".hero");

function onScroll(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + "%";
  siteNav.classList.toggle("scrolled", scrollTop > 10);
  floatingReserve.classList.toggle("show", scrollTop > (hero ? hero.offsetHeight * 0.7 : 400));
}
window.addEventListener("scroll", onScroll, { passive:true });

document.querySelectorAll('[data-scroll]').forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const target = document.getElementById(btn.dataset.scroll);
    if(target) target.scrollIntoView({behavior:"smooth"});
  });
});

// Reveal cards on scroll
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold:0.12, rootMargin:"0px 0px -40px 0px" });

function observeCards(){
  document.querySelectorAll(".dish-card:not(.revealed)").forEach(c=>revealObserver.observe(c));
}

// Update active rail pill based on which section is in view
const sectionObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const catId = entry.target.id.replace("mast-","");
      document.querySelectorAll(".rail-pill").forEach(p=>{
        p.classList.toggle("active", p.dataset.cat === catId);
      });
    }
  });
}, { rootMargin:`-${74+58+20}px 0px -70% 0px`, threshold:0 });

function observeSections(){
  document.querySelectorAll('[id^="mast-"]').forEach(m=>sectionObserver.observe(m));
}

/* ------------------------------------------------------------------------
   7. AMBIENT FLOATING ELEMENTS (leaves / beans / croissants)
   ------------------------------------------------------------------------ */

function buildAmbient(){
  const layer = document.getElementById("ambientLayer");
  const glyphs = ["❦","✦","☕","❧"];
  const count = window.innerWidth < 640 ? 6 : 12;
  for(let i=0;i<count;i++){
    const span = document.createElement("span");
    span.className = "drift";
    span.textContent = glyphs[i % glyphs.length];
    span.style.left = Math.random()*100 + "%";
    span.style.top = Math.random()*100 + "%";
    span.style.fontSize = (14 + Math.random()*20) + "px";
    span.style.animationDuration = (14 + Math.random()*14) + "s";
    span.style.animationDelay = (Math.random()*8) + "s";
    layer.appendChild(span);
  }

  const heroBeans = document.getElementById("heroBeans");
  const beanGlyphs = ["●","◍","❦"];
  for(let i=0;i<8;i++){
    const span = document.createElement("span");
    span.textContent = beanGlyphs[i % beanGlyphs.length];
    span.style.left = (5 + Math.random()*90) + "%";
    span.style.top = (10 + Math.random()*70) + "%";
    span.style.animationDuration = (6 + Math.random()*5) + "s";
    span.style.animationDelay = (Math.random()*4) + "s";
    heroBeans.appendChild(span);
  }
}

/* Subtle mouse-glow parallax on hero */
document.addEventListener("mousemove", (e)=>{
  if(window.innerWidth < 900) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  if(hero) hero.style.backgroundPosition = `${50 + x*3}% ${50 + y*3}%`;
});

/* ------------------------------------------------------------------------
   8. INIT
   ------------------------------------------------------------------------ */

function init(){
  buildMenu();
  buildAmbient();
  applyFilters();
  observeCards();
  observeSections();
  onScroll();
  document.getElementById("footerYear").textContent = new Date().getFullYear();

  // Re-observe cards if filters reveal previously-hidden ones (no-op safe guard)
  const mo = new MutationObserver(()=>observeCards());
  mo.observe(menuRoot, { childList:true, subtree:true });
}

document.addEventListener("DOMContentLoaded", init);

})();
