import Header from "../../components/Header/Header";
import "./error404.css";
import { NavLink } from "react-router-dom";


function Error404() {
    return(
        <>
        <Header />
        <main className="bg-dark">
            <section className="erreur-404">
                <h1>Error 404</h1>
                <h2 >page not found</h2>
                <NavLink to="/" className="link-btn-404">
                    <button className="btn-404">Back to the homepage</button>
                </NavLink>
            </section>
        </main>
        </>
    );
}

export default Error404;