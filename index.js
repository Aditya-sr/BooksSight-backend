const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const profileRoutes = require('./routes/profile.routes');
const db = require('./model'); // Adjust path to match your Sequelize setup
const authRoutes = require('./routes/authRoute');


dotenv.config(); // Load environment variables

const app = express();
app.use(cookieParser()); 

const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const SECRET_KEY = process.env.JWT_SECRET;


app.use(express.json());


app.use('/auth', authRoutes);

app.use('/api', profileRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await db.sequelize.sync();
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
});
