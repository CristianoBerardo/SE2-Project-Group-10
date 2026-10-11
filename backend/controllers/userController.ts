import { Request, Response } from "express";
import { pool } from "../connections/PostgreSQL/database";

/**
 * Creates a new user in the database based on the provided user data.
 * @param req - The Express request object containing the user data in the request body.
 * @param res - The Express response object used to send the response.
 * @returns A Promise that resolves when the operation is complete.
 * @throws An error if there is an issue with the database operation.
*/

export async function createUser(req: Request, res: Response): Promise<void> {
    try {
        const { user_data } = req.body;

        if (
            typeof user_data.username !== "string" ||
            user_data.username.trim().length === 0 || typeof user_data.password !== "string" ||
            user_data.password.trim().length === 0
        ) {
            res.status(400).json({ error: "Username and password are required" });
            return;
        }

        const result = await pool.query(
            `INSERT INTO users (username, password, role)
            VALUES ($1, $2, $3)
            RETURNING id, username, role`
        , [user_data.username.trim(), user_data.password.trim(), user_data.role || "GUEST"]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
/**
 * Retrieves a user from the database based on the provided username.
 * @param req - The Express request object containing the username parameter.
 * @param res - The Express response object used to send the response.
 * @returns A Promise that resolves when the operation is complete.
 * @throws An error if there is an issue with the database operation.
 */

export async function getUserById(req: Request, res: Response): Promise<void> {
    try {
        const { username } = req.params;

        if (
            typeof username !== "string" ||
            username.trim().length === 0
        ) {
            res.status(400).json({ error: "Username is required" });
            return;
        }

        const result = await pool.query(
            `SELECT id, username, role FROM users WHERE username = $1`,
            [username.trim()]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

/**
 * Updates a user in the database based on the provided username.
 * @param req - The Express request object containing the username parameter and updated user data.
 * @param res - The Express response object used to send the response.
 * @returns A Promise that resolves when the operation is complete.
 * @throws An error if there is an issue with the database operation.
 */

export async function updateUser(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const { username } = req.params;
        const { user_data } = req.body;

        if (
            typeof username !== "string" ||
            username.trim().length === 0
        ) {
            res.status(400).json({
                error: "Username is required"
            });
            return;
        }

        if (
            typeof user_data.username !== "string" ||
            user_data.username.trim().length === 0 || typeof user_data.password !== "string" ||
            user_data.password.trim().length === 0
        ) {
            res.status(400).json({
                error: "Username and password are required"
            });
            return;
        }

        const result = await pool.query(
            `UPDATE users
             SET username = $1, password = $2, role = $3
             WHERE username = $4
             RETURNING id, username, role`,
            [user_data.username.trim(), user_data.password.trim(), user_data.role || "GUEST", username.trim()]
        );

        if (result.rows.length === 0) {
            res.status(404).json({
                error: "User not found"
            });
            return;
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error updating user:", error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
}

/**
 * Deletes a user from the database based on the provided username.
 * @param req - The Express request object containing the username parameter.
 * @param res - The Express response object used to send the response.
 * @returns A Promise that resolves when the operation is complete.
 * @throws An error if there is an issue with the database operation.
 */

export async function deleteUser(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const { username } = req.params;

        if (
            typeof username !== "string" ||
            username.trim().length === 0
        ) {
            res.status(400).json({
                error: "Username is required"
            });
            return;
        }

        const result = await pool.query(
            `DELETE FROM users WHERE username = $1 RETURNING id, username, role`,
            [username.trim()]
        );

        if (result.rows.length === 0) {
            res.status(404).json({
                error: "User not found"
            });
            return;
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}