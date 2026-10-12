import type {
    AggregationType,
    StatsDTO,
} from "../dto/StatsDTO";

const API_BASE_URL = "http://localhost:3000/api/v1/stats";

/**
 * Creates a new ticket for the selected service.
 *
 * @param ticketData - Ticket information.
 * @returns The created ticket.
 */
export async function getStats(
    aggregation: AggregationType
): Promise<StatsDTO[]> {

    const response = await fetch(`${API_BASE_URL}?aggregation=${aggregation}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });

     if (!response.ok) {
        throw new Error(`Failed to load statistics (${response.status})`);
    }

    return response.json();
}