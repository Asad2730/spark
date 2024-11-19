import express from "express";
import dotenv from "dotenv";
import router from "./routes/main";
import cors from 'cors'

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors())
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


