import { NavLink } from "react-router-dom";
import "./menu.css";

export function Menu() {

    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>

            <NavLink to="/ask" end>Ask</NavLink>

            <NavLink to="/about">About</NavLink>

        </div>
    );
}
