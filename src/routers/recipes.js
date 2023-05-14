const express = require('express')
const router = express.Router();

const { getAll, save, get, update, remove } = require("../controllers/recipes");


router.route("/").get(getAll).post(save);
router.route('/:id').get(get).put(update).delete(remove);
module.exports = router