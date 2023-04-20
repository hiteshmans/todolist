const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dataFile = './data.json';

app.get('/todos', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    const todos = JSON.parse(data);
    res.json(todos);
  });
});

app.post('/todos', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    const todos = JSON.parse(data);
    const newTodo = req.body;
    newTodo.id = Date.now();
    todos.push(newTodo);
    fs.writeFile(dataFile, JSON.stringify(todos), err => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred');
      }
      res.send('Todo added successfully');
    });
  });
});

app.delete('/todos/:id', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    const todos = JSON.parse(data);
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));
    if (todoIndex === -1) {
      return res.status(404).send('Todo not found');
    }
    todos.splice(todoIndex, 1);
    fs.writeFile(dataFile, JSON.stringify(todos), err => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred');
      }
      res.send('Todo deleted successfully');
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
