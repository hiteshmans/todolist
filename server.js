const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { validateTask } = require('./test-branch');

const app = express();
app.use(bodyParser.json());

const dataFile = './data.json';

// Get all tasks
app.get('/tasklist', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    const tasklist = JSON.parse(data);
    res.json(tasklist);
  });
});

// Create a new task
app.post('/tasklist', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    const tasklist = JSON.parse(data);
    const newTask = req.body;
    newTask.id = tasklist.length + 1; // Set id as the number of tasks + 1
    tasklist.push(newTask);
    fs.writeFile(dataFile, JSON.stringify(tasklist), err => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred');
      }
      res.send('Task added successfully');
    });
  });
});


// Update an existing task
app.put('/tasklist/:id', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    const tasklist = JSON.parse(data);
    const taskId = req.params.id;
    const updatedTask = req.body;
    const taskIndex = tasklist.findIndex(task => task.id == taskId);
    if (taskIndex === -1) {
      res.status(404).send('Task not found');
    } else {
      // Update the task fields
      tasklist[taskIndex].title = updatedTask.title;
      tasklist[taskIndex].description = updatedTask.description;
      tasklist[taskIndex].status = updatedTask.status;

      fs.writeFile(dataFile, JSON.stringify(tasklist), err => {
        if (err) {
          console.error(err);
          return res.status(500).send('An error occurred');
        }
        res.send('Task updated successfully');
      });
    }
  });
});

// Delete a task
app.delete('/tasklist/:id', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    const tasklist = JSON.parse(data);
    const taskId = req.params.id;
    const taskIndex = tasklist.findIndex(task => task.id == taskId);
    if (taskIndex === -1) {
      res.status(404).send('Task not found');
    } else {
      tasklist.splice(taskIndex, 1);
      fs.writeFile(dataFile, JSON.stringify(tasklist), err => {
        if (err) {
          console.error(err);
          return res.status(500).send('An error occurred');
        }
        res.send('Task deleted successfully');
      });
    }
  });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
