import express from "express";
import products from "./fs/products.fs.js";
import users from "./fs/users.fs.js";

const server = express();

const PORT = 8080;
const ready = () => console.log("The server is ready in port " + PORT);

server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

server.get("/api/products", (req, res) => {
    try {
    const all = products.read();
    if (Array.isArray(all)) {
        return res.status(200).json({
        success: true,
        response: all,
        });
    } else {
        return res.status(404).json({
        success: false,
        message: all,
        });
    }
    } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
    }
});

server.get("/api/products/:pid", (req, res) => {
    try {
    const { pid } = req.params;
    const one = products.readOne(pid);
    if (typeof one === "string") {
        return res.status(404).json({
        success: false,
        message: one,
        });
    } else {
        return res.status(200).json({
        success: true,
        response: one,
        });
    }
    } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
    }
});

server.get("/api/users", (req, res) => {
    try {
    const all = users.read();
    if (Array.isArray(all)) {
        return res.status(200).json({
        success: true,
        response: all,
        });
    } else {
        return res.status(404).json({
        success: false,
        message: all,
        });
    }
    } catch (error) {
    return res.status(500).json({ succsess: false, message: error.message });
    }
});

server.get("/api/users/:uid", (req, res) => {
    try {
    const { uid } = req.params;
    const one = users.readOne(uid);
    if (typeof one === "string") {
        return res.status(404).json({
        success: false,
        message: one,
        });
    } else {
        return res.status(200).json({
        success: true,
        response: one,
        });
    }
    } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message,
    });
    }
});