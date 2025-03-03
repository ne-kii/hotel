import { Router } from "express";
import { db } from "../database";

const router = Router();

// Create User
router.post("/users", (req, res) => {
    const { name, email, address } = req.body;
    const query = "INSERT INTO users (name, email, address) VALUES (?, ?, ?)";

    db.query(query, [name, email, address], (err, results: any) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ id: results.insertId, name, email, address });
        }
    });
});

// Read Users
router.get("/users", (_, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// Update User
router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, address } = req.body;
    const query = "UPDATE users SET name = ?, email = ?, address = ? WHERE id = ?";
  
    db.query(query, [name, email, address, id], (err, results: any) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

// Delete User
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM users WHERE id = ?";
  
    db.query(query, [id], (err, results: any) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});
  
export default router;
