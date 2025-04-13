const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const pickupRoutes = require("./routes/pickupRoutes");
const billRoutes = require("./routes/billRoutes");
const cartRoutes = require("./routes/cart")
const orderRoutes = require('./routes/orderRoute');
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pickup", pickupRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
