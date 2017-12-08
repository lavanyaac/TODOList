const express = require('express');
const router = express.Router();
const TodoController = require('../controllers').Todo;

router.route('/').get(TodoController.getAll);
router.route('/:id').put(TodoController.updateItem);
router.route('/').post(TodoController.addItem);
router.route('/:id').delete(TodoController.deleteItem);
router.route('/tasks/completed').delete(TodoController.deleteCompletedItems);
router.route('/').patch(TodoController.patchItems);

module.exports = router;