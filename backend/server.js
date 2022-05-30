const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: 'config/config.env' });

const app = require('./app');


mongoose.connect(process.env.DB_LOCAL_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// DATABASE CONNECTION
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DATABASE CONNECTION SUCCESS ...");
});



app.listen(process.env.PORT, () => {
  console.log(`SERVER RUN ON ${process.env.PORT}`);
});


