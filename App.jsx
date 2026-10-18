import React, { useState, useEffect } from "react";

// Helper to fetch a random food image URL from Foodish API
async function fetchRandomFoodImage() {
  const response = await fetch("https://foodish-api.com/api/");
  const data = await response.json();
  return data.image;
}

// Small pool of whimsical recipe titles and descriptions
const RECIPE_TITLES = [
  "Sunny Pancake Parade",
  "Rainbow Veggie Wrap",
  "Merry Mushroom Risotto",
  "Cheesy Cloud Pizza",
  "Berry Bliss Smoothie",
  "Twisty Taco Fiesta"
];

const RECIPE_DESCRIPTIONS = [
  "Fluffy pancakes that dance on your tongue.",
  "A colorful wrap that sings with crunch.",
  "Creamy risotto that hugs every mushroom.",
  "Pizza so light it floats like a cloud.",
  "Smoothie bursting with berry fireworks.",
  "Tacos that twirl and tumble with flavor."
];

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load a set of random recipes on mount or when refreshed
  const loadRecipes = async () => {
    setLoading(true);
    try {
      const imagePromises = RECIPE_TITLES.map(() => fetchRandomFoodImage());
      const images = await Promise.all(imagePromises);
      const newRecipes = RECIPE_TITLES.map((title, idx) => ({
        id: idx,
        name: title,
        description: RECIPE_DESCRIPTIONS[idx],
        imageUrl: images[idx]
      }));
      setRecipes(newRecipes);
    } catch (e) {
      console.error("Failed to load recipes", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    loadRecipes();
  };

  const containerStyle = {
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    backgroundColor: "#fff8f0",
    minHeight: "100vh",
    padding: "1rem",
    color: "#333"
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "1.5rem"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem"
  };

  const cardStyle = {
    backgroundColor: "#fffbf5",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  };

  const imgStyle = {
    width: "100%",
    height: "180px",
    objectFit: "cover"
  };

  const contentStyle = {
    padding: "0.75rem",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  };

  const buttonStyle = {
    backgroundColor: "#ff8c42",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "1rem",
    alignSelf: "center"
  };

  const refreshButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ff5a5f"
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1>🍽️ Cute & Delicious Recipes</h1>
        <p>Random tasty dishes served with a splash of cartoon fun!</p>
        <button
          onClick={handleRefresh}
          style={refreshButtonStyle}
          aria-label="Refresh recipes"
        >
          🔄 Refresh Recipes
        </button>
      </header>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading yummy recipes…</p>
      ) : (
        <section style={gridStyle} aria-label="Recipe list">
          {recipes.map((recipe) => (
            <article key={recipe.id} style={cardStyle} aria-label={recipe.name}>
              <img
                src={recipe.imageUrl}
                alt={recipe.name + " illustration"}
                style={imgStyle}
                loading="lazy"
              />
              <div style={contentStyle}>
                <h2 style={{ margin: "0 0 0.5rem" }}>{recipe.name}</h2>
                <p style={{ flexGrow: 1 }}>{recipe.description}</p>
                <button
                  style={buttonStyle}
                  aria-label={"View details for " + recipe.name}
                >
                  🍴 View Recipe
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
