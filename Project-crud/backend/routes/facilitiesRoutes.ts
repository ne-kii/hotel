import { Router, Request, Response, NextFunction } from "express";
import { db } from "../database";
import { ResultSetHeader } from 'mysql2';

const router = Router();

// POST: Menambahkan facility baru
router.post("/facilities", (req: Request, res: Response) => {
    const { roomId, name, description } = req.body;
    const query = "INSERT INTO facilities (roomId, name, description) VALUES (?, ?, ?)";

    db.query(query, [roomId, name, description], (err: any, results: ResultSetHeader) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: "Failed to add facility" });
        }
        res.status(201).json({ id: results.insertId, roomId, name, description });
    });
});

// GET: Mengambil semua facilities
router.get("/facilities", (_, res: Response) => {
    db.query("SELECT * FROM facilities", (err: any, results: any) => {
        if (err) {
            console.error("Error fetching facilities:", err);
            return res.status(500).send({ error: "Error fetching facilities" });
        }
        res.json(results);
    });
});

// PUT: Mengupdate facility berdasarkan ID
router.put("/facilities/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const { roomId, name, description } = req.body;
    const query = "UPDATE facilities SET roomId = ?, name = ?, description = ? WHERE id = ?";

    db.query(query, [roomId, name, description, id], (err: any, results: ResultSetHeader) => {
        if (err) {
            console.error("Error updating facility:", err);
            return res.status(500).json({ error: "Failed to update facility" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Facility not found" });
        }
        res.json({ message: "Facility updated successfully", id, roomId, name, description });
    });
});

// DELETE: Menghapus facility berdasarkan ID
router.delete("/facilities/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const query = "DELETE FROM facilities WHERE id = ?";

    db.query(query, [id], (err: any, results: ResultSetHeader) => {
        if (err) {
            console.error("Error deleting facility:", err);
            return res.status(500).json({ error: "Failed to delete facility" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Facility not found" });
        }
        res.json({ message: "Facility deleted successfully", id });
    });
});

export default router;
