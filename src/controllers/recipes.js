const service = require("../services/recipes");

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


module.exports = {
 getAll,
 save
};