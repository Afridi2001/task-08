const express = require('express');
const fs = require('fs').promises; 

const app = express();
const PORT = 3000;

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to my file handling API!');
  });
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    res.send(content);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }


app.post('/writeFile', async (req, res) => {
  const filePath = 'example.txt'; 
  const { data } = req.body;
  if (!data) {
    return res.status(400).send('Bad Request: No data provided in the request body');
  }
  try {
    await fs.writeFile(filePath, data);
    res.send('File successfully written');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.put('/updateFile', async (req, res) => {
  const filePath = 'example.txt'; 
  const { newData } = req.body;
  if (!newData) {
    return res.status(400).send('Bad Request: No new data provided in the request body');
  }
  try {
    await fs.appendFile(filePath, `\n${newData}`);
    res.send('File successfully updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
