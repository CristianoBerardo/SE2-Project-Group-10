import { Router } from "express";
import {
    createTicket,
    getAllTickets,
    getTicketById
 } from "../controllers/ticketController";

const router = Router();

router.post("/", createTicket);
router.get("/", getAllTickets);
router.get("/:id", getTicketById);

export default router;
