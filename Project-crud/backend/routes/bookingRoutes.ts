import { Router } from "express";
import { db } from "../database";

const router = Router();

// POST route to add a new room booking
router.post("/bookings", (req, res) => {
  console.log(req.body);  // Log the incoming body to check the structure
  const { name, email, phone, checkinDate, checkoutDate, numGuests } = req.body;
  const query = "INSERT INTO bookings (name, email, phone, checkinDate, checkoutDate, numGuests) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(query, [name, email, phone, checkinDate, checkoutDate, numGuests], (err, results: any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({ id: results.insertId, name, email, phone, checkinDate, checkoutDate, numGuests });
    }
  });
});


// GET route to fetch all room bookings
router.get("/bookings", (_, res) => {
    db.query("SELECT * FROM bookings", (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// PUT route to update a room booking by ID
router.put("/bookings/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, phone, checkinDate, checkoutDate, numGuests } = req.body;
    const query = "UPDATE bookings SET name = ?, email = ?, phone = ?, checkinDate = ?, checkoutDate = ?, numGuests = ? WHERE id = ?";
  
    db.query(query, [name, email, phone, checkinDate, checkoutDate, numGuests, id], (err, results: any) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.sendStatus(200);
      }
    });
});

// DELETE route to remove a room booking by ID
router.delete("/bookings/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM bookings WHERE id = ?";
  
    db.query(query, [id], (err, results: any) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.sendStatus(200);
      }
    });
});
  
export default router;
