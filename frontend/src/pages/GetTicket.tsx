import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function GetTicket() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="get-ticket-container">
                <h1>Choose the service you need</h1>
                <div className="button-container">
                    <button onClick={() => navigate("/")} className="nav-button">
                        Account management
                    </button>
                    <button onClick={() => navigate("/")} className="nav-button">
                        Billing support
                    </button>
                    <button onClick={() => navigate("/")} className="nav-button">
                        General Information
                    </button>
                    <button onClick={() => navigate("/")} className="nav-button">
                        Technical assistance
                    </button>
                </div>
            </div>
        </>
    );
}

export default GetTicket;