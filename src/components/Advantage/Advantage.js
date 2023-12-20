import './Advantage.css'

/**
 * Composant représentant un avantage ou une caractéristique.
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.imgSrc - L'URL de la source de l'image.
 * @param {string} props.imgAlt - Le texte alternatif de l'image.
 * @param {string} props.titre - Le titre de l'avantage.
 * @param {string} props.description - La description de l'avantage.
 * @returns {JSX.Element} Composant Advantage
 */
function Advantage({ imgSrc, imgAlt, titre, description }) {
  return (
    <div className="feature-item">
      <img src={imgSrc} alt={imgAlt} className="feature-icon" />
      <h3 className="feature-item-title">{titre}</h3>
      <p>{description}</p>
    </div>
  )
}

export default Advantage
