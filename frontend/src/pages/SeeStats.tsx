import { useState } from "react";

import type {
    AggregationType
} from "../dto/StatsDTO";

import "../App.css";
import Navbar from "../components/Navbar";

/**
 * Formats seconds into minutes and seconds.
 */
function formatElapsedTime(seconds: number): string {
    const totalSeconds = Math.round(seconds);

    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function Stats() {
    const [aggregation, setAggregation] =
        useState<AggregationType>("day");

    return (
        <>
            <Navbar />
            <div>

                <main className="stats-container">
                    <h1>Ticket Statistics</h1>

                    <p>
                        View ticket statistics aggregated by day, week or month.
                    </p>

                    {/* Aggregation selector */}
                    <div className="stats-controls">
                        <label htmlFor="aggregation">
                            Aggregate by:
                        </label>

                        <select
                            id="aggregation"
                            value={aggregation}
                            onChange={(event) =>
                                setAggregation(
                                    event.target.value as AggregationType
                                )
                            }
                        >
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </select>
                    </div>

                    {/* Statistics table */}
                    <div className="stats-table-wrapper">
                        <table className="stats-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Service Type</th>
                                    <th>Ticket Nr</th>
                                    <th>Avg Elapsed Time</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Sample data */}
                                <tr>
                                    <td>2023-06-01</td>
                                    <td>Account management</td>
                                    <td>10</td>
                                    <td>{formatElapsedTime(120)}</td>
                                </tr>

                                <tr>
                                    <td>2023-06-01</td>
                                    <td>Billing support</td>
                                    <td>5</td>
                                    <td>{formatElapsedTime(90)}</td>
                                </tr>

                                <tr>
                                    <td>2023-06-01</td>
                                    <td>General Information</td>
                                    <td>8</td>
                                    <td>{formatElapsedTime(60)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="stats-note">
                        {aggregation === "day" &&
                            "Showing daily statistics."}

                        {aggregation === "week" &&
                            "Showing weekly statistics (weeks start on Monday)."}

                        {aggregation === "month" &&
                            "Showing monthly statistics."}
                    </p>

                    <p className="stats-note">
                        Currently displaying sample data.
                    </p>
                </main>
            </div>
        </>
    );
}

export default Stats;