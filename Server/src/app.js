const express = require("express");
const cors = require("cors"); // Importa o middleware CORS
const userRoutes = require("./Routes/userRouter");
const authRoutes = require("./Routes/authRoutes");

const app = express();

// Configurações de CORS
const allowedOrigins = ["http://localhost:5500", "http://127.0.0.1:5500"]; // Liste todas as origens permitidas

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Permite o acesso
        } else {
            callback(new Error("Not allowed by CORS")); // Bloqueia o acesso
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

module.exports = app;
