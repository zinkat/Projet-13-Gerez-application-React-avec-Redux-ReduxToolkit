import './error404.css'
import { NavLink } from 'react-router-dom'

/**
 * Composant pour la page d'erreur 404.
 * @component
 * @returns {JSX.Element} Composant Error404
 */
function Error404() {
  return (
    <main className="bg-dark">
      <section className="erreur-404">
        <h1>Error 404</h1>
        <h2>page not found</h2>
        <NavLink to="/" className="link-btn-404">
          <button className="btn-404">Back to the homepage</button>
        </NavLink>
      </section>
    </main>
  )
}

export default Error404
