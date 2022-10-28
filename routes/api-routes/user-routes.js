const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getById,
  updateById,
  deleteUser,
} = require("../../controllers/user-controllers");
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getById).put(updateById).delete(deleteUser);

module.exports = router;
