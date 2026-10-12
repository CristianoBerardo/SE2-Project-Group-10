export type AggregationType = "day" | "week" | "month";

export interface StatsDTO {
    date: string;
    serviceType: string;
    ticketNr: number;
    avgElapsedTime: number;
}