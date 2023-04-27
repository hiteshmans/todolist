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