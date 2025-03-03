import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes"
import facilitiesRoutes from "./routes/facilitiesRoutes"
import roomRoutes from "./routes/roomRoutes"
import userRoutes from "./routes/userRoutes"

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", bookingRoutes);
app.use(bodyParser.json());
app.use("/api", facilitiesRoutes);
app.use(bodyParser.json());
app.use("/api", roomRoutes);
app.use(bodyParser.json());
app.use("/api", userRoutes);
app.use(bodyParser.json());


const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));