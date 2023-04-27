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
  