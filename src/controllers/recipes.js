const service = require("../services/recipes");


const recipeExists = async (req, res, next) => {
  const recipe = await service.get(req.params.id);

  if (recipe === undefined) {
    const err = new Error("Recipe not found");
    err.statusCode = 404;
    next(err);
  } else {
    res.locals.recipe = recipe;
    next();
  }
};

const getAll = async (req, res, next) => {
  try {
    res.json({ data: await service.getAll() });
  } catch (error) {
    next(error);
  }
};

const save = async (req, res, next) => {
  try {
    const {
      name,
      healthLabels,
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients,
    } = req.body;

    const newRecipe = {
      name,
      healthLabels: [...healthLabels], 
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients: [...ingredients], 
    };

    res.status(201).json({ data: await service.save(newRecipe) });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
    try{
        res.json({data: res.locals.recipe})
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const {
            name,
            healthLabels,
            cookTimeMinutes,
            prepTimeMinutes,
            ingredients,
        } = req.body
        const updated = await service.update(req.params.id, {
            name,
            healthLabels: [...healthLabels],
            cookTimeMinutes,
            prepTimeMinutes,
            ingredients: [...ingredients],
        })
        res.json({data: updated})
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try{
        await service.remove(req.params.id)
    } catch (error) {
        next(error)
    }
}


module.exports = {
 getAll,
 save,
 get: [recipeExists, get],
  update: [recipeExists, update],
  remove: [recipeExists, remove],
};