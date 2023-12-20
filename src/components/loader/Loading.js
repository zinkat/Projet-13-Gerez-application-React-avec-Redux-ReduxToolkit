import './loader.css'

/**
 * Composant représentant un écran de chargement.
 * @component
 * @returns {JSX.Element} Composant Loading
 */

function Loading() {
  return (
    <main className="bg-dark">
      <section className="spinner">
        <span className="loader loaderCircle"></span>
        Loading...
      </section>
    </main>
  )
}

export default Loading
