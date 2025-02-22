import "./Home.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import React from "react";
export default function Home({ orderCount }) {

    return (
        <div className="home">
             <Header />
            
            <main>
            <p>KOD ACIKTIRIR<br/>
            PİZZA, DOYURUR</p>
            <Link className="button" to="/order">ACIKTIM</Link>
</main>

            </div>
        );
}