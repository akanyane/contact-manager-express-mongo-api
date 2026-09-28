import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConnection";
import errorHandler from "./middlewares/errorHandler";
import userRoutes from "./routes/user.route";
import contactRoutes from "./routes/contact.route";

dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
