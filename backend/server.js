const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
// app.use(cors({
//   origin: 'https://astrologer-frontend.onrender.com',
//   credentials: true
// }));


app.use(express.json());

mongoose.connect(process.env.MONGO_CLOUD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get('/', (req,res)=>{
  res.send("welcome to Appointment Booking system");

})

app.use('/auth', require('./routes/auth'));
app.use('/astrologers', require('./routes/astrologers'));
app.use('/appointments', require('./routes/appointments'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
