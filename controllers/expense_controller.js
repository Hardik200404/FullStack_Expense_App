const expense_model = require('../models/expense_model')

exports.get_all_expenses =  (req, res) => {
    expense_model.findAll()
    .then(expenses => {
        res.status(200).json(expenses)
    }).catch(error => {
        res.status(500).json({ error:error.message })
    })
}

exports.post_expense =(req,res,next) => {
    let expense_cost = req.body.expense_cost
    let description = req.body.description
    let category = req.body.category

    expense_model.create({
        expense_cost:expense_cost,
        description:description,
        category:category
    }).then(expense => {
        console.log('expense added')
        res.status(201).json(expense)
    }).catch(err => res.status(500).json({ error:error.message }))
    
}

exports.delete_expenes = (req,res,next) => {
    const expense_id = req.params.id
    expense_model.findByPk(expense_id)
    .then(expense => {
        if(expense){
            expense.destroy()
            res.status(204).json()
        }
    }).catch(error => {
        res.status(500).json({ error: error.message })
    })
}