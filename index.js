const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the our app!');
});

const PORT = process.env.PORT || 3000;

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    const fullName = "john_doe";
    const dob = "17091999"; // DDMMYYYY
    const userId = `${fullName.toLowerCase()}_${dob}`;

    const email = "john@xyz.com";
    const rollNumber = "ABCD123";

    let odd = [], even = [], alpha = [], special = [], sum = 0;

    data.forEach(item => {
      if (/^\d+$/.test(item)) {
        let num = parseInt(item);
        sum += num;
        (num % 2 === 0 ? even : odd).push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alpha.push(item.toUpperCase());
      } else {
        special.push(item);
      }
    });

    // Concatenate and reverse alphabets for alternating caps
    let concatString = alpha
      .map(a => a.toLowerCase())
      .reverse()
      .join('')
      .split('')
      .map((ch, i) => i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())
      .join('');

    res.status(200).json({
      is_success: true,
      user_id: userId,
      email: email,
      roll_number: rollNumber,
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alpha,
      special_characters: special,
      sum: sum.toString(),
      concat_string: concatString
    });
  } catch (err) {
    res.status(500).json({
      is_success: false,
      message: "Something went wrong"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

