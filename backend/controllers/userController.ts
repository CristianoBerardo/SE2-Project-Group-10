import { Request, Response } from "express";
import { pool } from "../connections/PostgreSQL/database";
import { CreateUserDTO } from "../models/dto/UserDTO";

/**
 * Creates a new user in the database based on the provided user data.
 * @param req - The Express request object containing the user data in the request body.
 * @param res - The Express response object used to send the response.
 * @returns A Promise that resolves when the operation is complete.
 * @throws An error if there is an issue with the database operation.
*/

export async function createUser(req: Request, res: Response): Promise<void> {
    try {
        const user_data: CreateUserDTO = req.body;

        console.log("BODY RICEVUTO:", req.body);

        console.log("Username:", user_data?.username);
        console.log("Username type:", typeof user_data?.username);
        console.log("Password type:", typeof user_data?.password);
        console.log("Body keys:", Object.keys(req.body ?? {}));

        if (
            typeof user_data.username !== "string" ||
            user_data.username.trim().length === 0 || typeof user_data.password !== "string" ||
            user_data.password.trim().length === 0
        ) {
            res.status(400).json({ error: "Username and password are required" });
            return;
        }

        if (await usernameExists(user_data.username.trim())) {
            res.status(409).json({ error: "Username already exists" });
            return;
        }
        else {
            const result = await pool.query(
                `INSERT INTO "user" (username, password, role)
                VALUES ($1, $2, $3)
                RETURNING id, username, role`
            , [user_data.username.trim(), user_data.password.trim(), user_data.role || "GUEST"]);

            res.status(201).json(result.rows[0]);
        }


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

export async function getUserByUsername(req: Request, res: Response): Promise<void> {
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
            `SELECT id, username, role FROM "user" WHERE username = $1`,
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
        const user_data = req.body;

        if (
            typeof username !== "string" ||
            username.trim().length === 0
        ) {
            res.status(400).json({
                error: "Username is required"
            });
            return;
        }

        if (!await usernameExists(username.trim())) {
            res.status(409).json({
                error: "Username does not exist"
            });
            return;
        }

        if (
            req.body === undefined
        ) {
            res.status(400).json({
                error: "Body is required"
            });
            return;
        }

        if (await usernameExists(user_data.username.trim())) {
            res.status(409).json({
                error: `Username ${user_data.username} already exists`
            });
            return;
        }

        const result = await pool.query(
            `UPDATE "user"
             SET username = COALESCE($1, username), password = COALESCE($2, password), role = COALESCE($3, role)
             WHERE username = $4
             RETURNING id, username, role`,
            [user_data.username.trim(), user_data.password.trim(), user_data.role.trim(), username.trim()]
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
            `DELETE FROM "user" WHERE username = $1 RETURNING id, username, role`,
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

/**
 * Checks if a username already exists in the database.
 * @param username 
 * @returns 
 */
async function usernameExists(username: string): Promise<boolean> {
    const result = await pool.query(
        `SELECT 1 FROM "user" WHERE username = $1 LIMIT 1`,
        [username]
    );

    return (result.rowCount ?? 0) > 0;
}