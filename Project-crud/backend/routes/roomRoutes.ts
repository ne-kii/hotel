import { Router, Request, Response, NextFunction } from "express";
import { db } from "../database";
import { ResultSetHeader } from 'mysql2';

const router = Router();

// POST: Menambahkan room baru
router.post("/rooms", (req: Request, res: Response) => {
    const { type, price, status } = req.body;
    const query = "INSERT INTO rooms (type, price, status) VALUES (?, ?, ?)";

    db.query(query, [type, price, status], (err: any, results: ResultSetHeader) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: "Failed to add room" });
        }
        res.status(201).json({ id: results.insertId, type, price, status });
    });
});

// GET: Mengambil semua rooms
router.get("/rooms", (_, res: Response) => {
    db.query("SELECT * FROM rooms", (err: any, results: any) => {
        if (err) {
            console.error("Error fetching rooms:", err);
            return res.status(500).send({ error: "Error fetching rooms" });
        }
        res.json(results);
    });
});

// PUT: Mengupdate room berdasarkan ID
router.put("/rooms/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const { type, price, status } = req.body;
    const query = "UPDATE rooms SET type = ?, price = ?, status = ? WHERE id = ?";

    db.query(query, [type, price, status, id], (err: any, results: ResultSetHeader) => {
        if (err) {
            console.error("Error updating room:", err);
            return res.status(500).json({ error: "Failed to update room" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Room not found" });
        }
        res.json({ message: "Room updated successfully", id, type, price, status });
    });
});

// DELETE: Menghapus room berdasarkan ID
router.delete("/rooms/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const query = "DELETE FROM rooms WHERE id = ?";

    db.query(query, [id], (err: any, results: ResultSetHeader) => {
        if (err) {
            console.error("Error deleting room:", err);
            return res.status(500).json({ error: "Failed to delete room" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Room not found" });
        }
        res.json({ message: "Room deleted successfully", id });
    });
});

export default router;
