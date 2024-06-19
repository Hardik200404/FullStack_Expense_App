const express = require('express')
const router = express.Router();

const expense_controller = require('../controllers/expense_controller')

router.get('/',expense_controller.get_all_expenses)
router.post('/',expense_controller.post_expense)
router.delete('/:id',expense_controller.delete_expenes)

module.exports = router;