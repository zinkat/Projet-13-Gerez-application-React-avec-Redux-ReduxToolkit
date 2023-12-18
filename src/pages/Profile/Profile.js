import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserProfile, profileFetchFailed, } from '../../features/authSlice'
import Account from '../../components/Account/Account'
import '../Profile/profil.css'
import { fetchUserProfile, updateProfile } from '../../services/api'
import Loading from '../../components/loader/Loading'
import { useNavigate } from 'react-router-dom'

function Profile() {

  const dispatch = useDispatch() //Envoie une action au store qui déclenche des mises à jour de l'état
  const user = useSelector((state) => state.auth.user) //extraire des données du store Redux
  const navigate = useNavigate()



  useEffect(() => {
 // Fonction asynchrone pour récupérer le profil utilisateur
    const fetchProfile = async () => {
      try {
        // Récupérer le token d'authentification depuis le stockage local
        const token = localStorage.getItem('token')
        // Appeler l'action Redux pour récupérer le profil utilisateur
        const userProfile = await dispatch(fetchUserProfile(token))
         // Mettre à jour le profil utilisateur dans le store 
        dispatch(setUserProfile(userProfile.payload))
         // Rediriger vers la page de connexion si le token n'est pas présent
        if(!token){
          navigate('/login')
        }
        // Gérez la déconnexion automatique lors du démontage du composant
    
      } catch (error) {
        console.error('Error fetching user profile:', error)
        dispatch(profileFetchFailed())
      }
      
    }
 
    // Exécutez la fonction pour récupérer le profil lors du montage du composant
    fetchProfile()
  }, [dispatch, navigate ])
  

  if (!user) {
  // Gérez le cas où le profil n'est pas encore disponible
    return <Loading />
  }

   // Fonction pour activer le mode d'édition du nom
  const handleEdit = () => {
    document.getElementById('fullName').style.display = 'none'
    document.getElementById('edit-button').style.display = 'none'
    document.getElementById('edit-section').style.display = 'block'
  }

   // Fonction pour annuler l'édition du nom
  const handleEditCancel = () => {
    document.getElementById('fullName').style.display = 'block'
    document.getElementById('edit-button').style.display = 'initial'
    document.getElementById('edit-section').style.display = 'none'
  }
  // Fonction asynchrone pour sauvegarder les modifications du profil
  const handleSaveEdit = async () => {
    try {
      // Récupérer le token d'authentification depuis le stockage local
      const token = localStorage.getItem('token')
       // Récupérer les nouveaux prénoms et noms à partir du formulaire d'édition
      const firstName = document.edit.firstName.value
      const lastName = document.edit.lastName.value
   // Construire l'objet avec les modifications du profil
      const updatedProfile = {
        firstName: firstName,
        lastName: lastName,
      }
// Appeler l'action Redux pour mettre à jour le profil utilisateur
      await dispatch(updateProfile({ token, updatedProfile }))
// Afficher un message dans la console après la sauvegarde réussie
      console.log('Profile changes saved successfully!')
      // Recharger la page pour refléter les modifications dans le rendu
      window.location.reload()
    } catch (error) {
      console.error('Failed to save user profile:', error)
    }
  }

  return (
    <main className="bg-dark">
      <div className="header">
        <h1 id="welcome-name">
          Welcome back
          <br />
          <span id="fullName">
            {user.firstName} {user.lastName}!
          </span>
        </h1>
        <button id="edit-button" type="button" onClick={handleEdit}>
          Edit Name
        </button>
        <div id="edit-section">
          <form name="edit" onSubmit={handleSaveEdit}>
            <div className="profil-input-wrapper">
              <input
                type="text"
                name="firstName"
                placeholder={user.firstName}
                required
              />
            </div>
            <div className="profil-input-wrapper">
              <input
                type="text"
                name="lastName"
                placeholder={user.lastName}
                required
              />
            </div>
          </form>
          <div className="btn-form">
            <button
              type="submit"
              className="save-button"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleEditCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account
        titre="Argent Bank Checking (x8349)"
        montant="$2,082.79"
        description="Available Balance"
      />
      <Account
        titre="Argent Bank Savings (x6712)"
        montant="$10,928.42"
        description="Available Balance"
      />
      <Account
        titre="Argent Bank Credit Card (x8349)"
        montant="$184.30"
        description="Current Balance"
      />
    </main>
  )
}

export default Profile