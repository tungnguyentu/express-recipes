const fs = require("fs").promises;
const path = require("path");

const recipesFilePath = path.join(__dirname, "../../db/recipes.json"); // Contruct the path to the recipes data

const getAll = async () => JSON.parse(await fs.readFile(recipesFilePath));

const save = async (recipe) => {
    const recipes = await getAll();

    recipe.id = recipes.length + 1;
    recipes.push(recipe);
    await fs.writeFile(recipesFilePath, JSON.stringify(recipes));
    return recipe
}

module.exports = {
 getAll,
 save
};