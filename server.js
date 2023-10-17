const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;
let url = 'mongodb://localhost:27017/ITCS_5166_NBAD';

app.use(express.json());
// app.use(express.static('public'));
app.use('/', express.static('public'));

mongoose.connect('mongodb://localhost:27017/ITCS_5166_NBAD', { useNewUrlParser: true, useUnifiedTopology: true}
  );
const budgetItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }, 
  budget: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
    minlength: 7, 
    maxlength: 7,
  }
 });

const budgetSchema = new mongoose.Schema({myBudget: [budgetItemSchema]
});
const Budget = mongoose.model('Budget', budgetSchema, 'Budget'
);



 app.get('/budget', async (req, res) => {
  try {
    console.log('Inside /budget route');
    const budget = await Budget.findOne(); 
    console.log(budget);
    if (!budget) {
      console.error('No budget data found');
      return res.status(404).send('No budget data found');
    }
    
    res.status(200).send(budget);
  } catch (err) {
    console.error('Error fetching data from MongoDB', err);
    res.status(500).send('Error fetching data from MongoDB');
  }
});


app.post('/add-document', async (req, res) => {
  try {
    const { title, budget, color } = req.body;

    const newBudgetItem = { title, budget, color };
    
    const result = await Budget.findOneAndUpdate(
      { _id: '652c71211a817672025cfb31' },
      { $push: { myBudget: newBudgetItem } },
      { new: true, upsert: true }
    );

    if (!result) {
      return res.status(404).send('Document not found.');
    }

    res.status(201).send({ _id: result._id, added: newBudgetItem });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// app.get('/budget', async (req, res) => {
//   const budgetData = await BudgetItem.find({});
//   res.json(budgetData);
// });

// app.post('/budget', async (req, res) => {
//   const { title, relatedValue, color } = req.body;
//   const newEntry = new BudgetItem({ title, relatedValue, color });
//   await newEntry.save();
//   res.status(201).json(newEntry);
// });
// app.get('/budget', async (req, res) => {
//   try {
//     const budgetData = await BudgetItem.find();
//     res.json(budgetData);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// app.post('/budget', async (req, res) => {
//   try {
//     const newItem = new BudgetItem(req.body);
//     const savedItem = await newItem.save();
//     res.json(savedItem);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
// app.get('/budget', (req, res) => {
//     fs.readFile('data.json', 'utf8', (err, data) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//       } else {
//         const budgetData = JSON.parse(data);
//         res.json(budgetData);
//       }
//     });
//   });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });