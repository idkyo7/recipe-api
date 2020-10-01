module.exports = (app) => {
    const recipes = require("../controllers/recipes.controller.js");

    app.post('/recipes', recipes.create);

    app.get('/recipes', recipes.findAll);

    app.get('/recipes/:recipeId', recipes.findOne);

    app.put('/recipes/:recipeId', recipes.update);

    app.delete('/recipes/:recipeId', recipes.delete);
}