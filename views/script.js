// Write your code below:
function handleFormSubmit(event) {
    event.preventDefault();
  
    let expense_cost = event.target.expense_cost
    let description = event.target.description
    let category = event.target.category
  
    const expense_details = {
      "expense_cost": expense_cost.value,
      "description": description.value,
      "category": category.value,
    };

    fetch('http://localhost:4000/expenses',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(expense_details),
      }).then((response) => {
          if(response.ok){
            return response.json()
          }else{
            throw new Error('Error submitting the form')
          }
      }).then((res) => displayExpenseOnScreen(res))
        .catch((err) => console.log(err));
    
      // Clearing the input fields
      document.getElementById('expense_cost').value = ''
      document.getElementById('description').value = ''
      document.getElementById('category').value = ''
}

function displayExpenseOnScreen(expense_details) {
    const expenseItem = document.createElement('li')
    expenseItem.appendChild(
      document.createTextNode(
        `${expense_details.expense_cost} - ${expense_details.description} - ${expense_details.category}`
      )
    )
    //adding delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    expenseItem.appendChild(deleteBtn);
  
    //adding edit button
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    expenseItem.appendChild(editBtn);


    const expensList = document.querySelector('ul');
    expensList.appendChild(expenseItem);
    deleteBtn.addEventListener('click', function (event) {
      fetch(`http://localhost:4000/expenses/${expense_details.id}`, {
        method: 'DELETE',
      })
        .then(() => {
          expensList.removeChild(event.target.parentElement);
        })
        .catch((error) => console.log(error));
    })
    editBtn.addEventListener('click', function (event) {
        fetch(`http://localhost:4000/expenses/${expense_details.id}`, {
            method: 'DELETE',
        }).then(() => {
            expensList.removeChild(event.target.parentElement)
        }).catch((error) => console.log(error))

        document.getElementById('expense_cost').value = expense_details.expense_cost
        document.getElementById('description').value = expense_details.description
        document.getElementById('category').value = expense_details.category
    })
}
