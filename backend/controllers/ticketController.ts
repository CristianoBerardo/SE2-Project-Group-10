import { Request, Response } from "express";
import { pool } from "../connections/PostgreSQL/database";


/*
    Generates a unique, sequential ticket code using a PostgreSQL sequence.
    The code consists of the prefix "A" followed by a number padded with leading zeros.

    Example: 9 -> "A009", 10 -> "A010".
*/
async function generateTicketCode(): Promise<string> {
    const result = await pool.query(
        "SELECT nextval('ticket_code_seq') AS number"
    );

    const number = Number(result.rows[0].number);
    return `A${String(number).padStart(3, "0")}`;
}



export async function createTicket(req: Request, res: Response): Promise<void> {
    try {
        const { service_type } = req.body;

        if (
            typeof service_type !== "string" ||
            service_type.trim().length === 0
        ) {
            res.status(400).json({ error: "service_type is required" });
            return;
        }

        const code = await generateTicketCode();

        const result = await pool.query(
            `INSERT INTO ticket (code, service_type, status)
            VALUES ($1, $2, $3)
            RETURNING id, code, service_type, status,
                 creation_date, expiration_date`,
            [code, service_type.trim(), "QUEUE"]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating ticket:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export async function getAllTickets(
    _req: Request,
    res: Response
): Promise<void> {
    try {
        const result = await pool.query(
            `SELECT id, code, service_type, status,
    creation_date, expiration_date
             FROM ticket
             ORDER BY creation_date DESC`
        );

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error retrieving tickets:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function getTicketById(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `SELECT id, code, service_type, status,
    creation_date, expiration_date
             FROM ticket
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: "Ticket not found" });
            return;
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error retrieving ticket:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}