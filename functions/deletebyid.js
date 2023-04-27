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