const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.static('public'));
// app.use('/', express.static('public'));

// const budget = {
//     mybudget:[
//         {
//             title: 'Eat out',
//             budget: 25
//         },
//         {
//             title: 'Rent',
//             budget: 275
//         },
//         {
//             title: 'Grocery',
//             budget: 110
//         },
//         {
//             title: 'laundry',
//             budget: 20
//         },
//         {
//             title: 'shopping',
//             budget: 100
//         },
//         {
//             title: 'house appliances',
//             budget: 50
//         },
//         {
//             title: 'car',
//             budget: 200
//         },
//     ]
// };


app.get('/budget', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        const budgetData = JSON.parse(data);
        res.json(budgetData);
      }
    });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });