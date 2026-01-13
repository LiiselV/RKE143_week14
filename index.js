const API_BASE = 'https://rke143-week14.onrender.com';

const images = {
  'Korvitsa pirukad': 'https://images.pexels.com/photos/18932267/pexels-photo-18932267/free-photo-of-ornamental-pumpkins-and-a-plate-with-baked-pastry.jpeg',
  'Korvitsa koogikesed': 'https://images.pexels.com/photos/4917092/pexels-photo-4917092.jpeg',
  'Korvitsasupp': 'https://images.pexels.com/photos/5605535/pexels-photo-5605535.jpeg',
  'Korvitsa pannkoogid': 'https://images.pexels.com/photos/5377574/pexels-photo-5377574.jpeg',
};

const nameMap = {
  'Pumpkin Pasties': 'Korvitsa pirukad',
  'Pumpkin Tartlets': 'Korvitsa koogikesed',
  'Creamy Pumpkin Soup': 'Korvitsasupp',
  'Pumpkin Pancakes': 'Korvitsa pannkoogid',
};

const btn = document.getElementById('btn');
const titleEl = document.getElementById('title');
const imgEl = document.getElementById('img');
const ingredientsEl = document.getElementById('ingredients');
const instructionsEl = document.getElementById('instructions');
const statusEl = document.getElementById('status');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  loadRandomRecipe();
});

loadRandomRecipe();

async function loadRandomRecipe() {
  statusEl.textContent = 'Loading recipe...';

  try {
    const response = await fetch(`${API_BASE}/random`);

    if (!response.ok) {
      const t = await response.text();
      throw new Error(t || 'API error');
    }

    const data = await response.json();

    const recipeObj = data.recipe || {};
    const recipeNameEN =
      recipeObj.recipename ||
      recipeObj.recipeName ||
      recipeObj.recipe ||
      '';

    if (!recipeNameEN) {
      throw new Error('Recipe name missing from API response');
    }

    const recipeNameET = nameMap[recipeNameEN] || recipeNameEN;

    const instructionsRaw =
      recipeObj.instructions ||
      recipeObj.instruction ||
      '';

    const ingredients = Array.isArray(data.ingredients) ? data.ingredients : [];

    titleEl.textContent = recipeNameET;

    const imgUrl = images[recipeNameET] || images['Korvitsasupp'];
    imgEl.src = imgUrl;
    imgEl.alt = recipeNameET;

    ingredientsEl.innerHTML = '';
    ingredients.forEach((ing) => {
      const li = document.createElement('li');
      li.textContent = ing;
      ingredientsEl.appendChild(li);
    });

    const safeInstructions = String(instructionsRaw)
      .replaceAll('<br>', '\n')
      .replaceAll('\\n', '\n');

    instructionsEl.innerHTML = '';
    safeInstructions
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .forEach((line) => {
        const p = document.createElement('p');
        p.textContent = line;
        instructionsEl.appendChild(p);
      });

    statusEl.textContent = '';
  } catch (error) {
    statusEl.textContent = error.message || 'Load failed';
  }
}
