const Recipe = require("../models/recipes.model.js")

exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Recipe content cannot be empty!"
        })
    }

    const recipe = new Recipe({
        title: req.body.title || "No recipe Title",
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        company: req.body.company,
    });

    recipe.save()
    .then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the recipe."
        })
    })
}

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: { $regex: new RegExp(title), $options: "i" }} : {};
    
    Recipe.find(condition)
    .then(data => {
        const jsonData = {
            message: "Success",
            data: data
        }
        res.send(jsonData)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving recipe."
        })
    })
}

exports.findOne = (req, res) => {
    Recipe.findById(req.params.recipeId)
    .then(recipe => {
        if(!recipe) {
            return res.status(404).send({
                message: "recipe not found with id " + req.params.recipeId
            })
        }
        const jsonData = {
            message: "Success",
            data: recipe
        }
        res.send(jsonData)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "recipe not found with id " + req.params.recipeId
            })
        }
        return res.status(500).send({
            message: "Something wrong retrieving recipe with id " + req.params.recipeId
        });
    })
}

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "recipe content can not be empty"
        });
    }

    Recipe.findByIdAndUpdate(req.params.recipeId, {
        title: req.body.title || "No recipe title", 
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        company: req.body.company,
    }, { new: true })
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "recipe not found with id " + req.params.recipeId
            });
        }
        res.send(data)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "recipe not found with id " + req.params.recipeId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.recipeId
        });
    });
}

exports.delete = (req, res) => {
    Recipe.findByIdAndRemove(req.params.recipeId)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "recipe not found with id " + req.params.recipeId
            });
        }
        res.send({ message: "recipe deleted successfully" })
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "recipe not found with id " + req.params.recipeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete recipe with id " + req.params.recipeId
        });
    })
}
