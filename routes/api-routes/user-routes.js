const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getById,
} = require("../../controllers/user-controllers");
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getById);

module.exports = router;
