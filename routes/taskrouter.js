const router = require("express").Router();

const {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:taskId", getSingleTask);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);



module.exports = router;
