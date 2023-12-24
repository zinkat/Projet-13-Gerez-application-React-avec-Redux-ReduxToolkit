/**
 * Profile component displays user profile information.
 * @module Profile
 */

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserProfile, profileFetchFailed } from '../../features/authSlice'
import Account from '../../components/Account/Account'
import '../Profile/profil.css'
import {
  getTokenFromLocalStorage,
  fetchUserProfile,
  updateProfile,
} from '../../services/api'
import Loading from '../../components/loader/Loading'
import { useNavigate } from 'react-router-dom'

/**
 * Profile component.
 * @function Profile
 * @returns {JSX.Element} - Rendered Profile component.
 */
function Profile() {
  const dispatch = useDispatch() //Envoie une action au store qui déclenche des mises à jour de l'état
  const user = useSelector((state) => state.auth.user) //extraire des données du store Redux
  const navigate = useNavigate()
  const token = getTokenFromLocalStorage()

  useEffect(() => {
    /**
     * Fetches user profile on component mount.
     * @function
     * @async
     */
    // Fonction asynchrone pour récupérer le profil utilisateur
    const fetchProfile = async () => {
      try {
        // Appeler l'action Redux pour récupérer le profil utilisateur
        const userProfile = await dispatch(fetchUserProfile(token))
        // Mettre à jour le profil utilisateur dans le store
        dispatch(setUserProfile(userProfile.payload))
        // Rediriger vers la page de connexion si le token n'est pas présent
        if (!token) {
          navigate('/login')
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
        dispatch(profileFetchFailed(error.message))
      }
    }
    // Exécutez la fonction pour récupérer le profil lors du montage du composant
    fetchProfile()
  }, [dispatch, navigate, token])

  if (!user) {
    // Gérez le cas où le profil n'est pas encore disponible
    return <Loading />
  }
  //*************** Mise à jour du nom et prénom de l'utilisateur ***** */

  // Fonction pour activer le mode d'édition du nom
  const handleEdit = () => {
    document.getElementById('userName').style.display = 'none'
    document.getElementById('editBtn').style.display = 'none'
    document.getElementById('editForm').style.display = 'block'
  }
  // Fonction pour annuler l'édition du nom
  const handleEditCancel = () => {
    document.getElementById('userName').style.display = 'block'
    document.getElementById('editBtn').style.display = 'initial'
    document.getElementById('editForm').style.display = 'none'
  }
  // Fonction asynchrone pour sauvegarder les modifications du profil
  const handleSaveEdit = async () => {
    try {
      // Récupérer les nouveaux prénoms et noms à partir du formulaire d'édition
      const firstName = document.edit.firstName.value
      const lastName = document.edit.lastName.value

      // Vérifier si les champs sont vides
      if (!firstName || !lastName) {
        console.error('First name and last name are required.')
        alert('First name and last name are required')
        return // Ne pas continuer si les champs sont vides
      }

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
    <main className="bg-darkProfil">
      <div className="header">
        <h1 id="profile-name">
          Welcome back
          <br />
          <span id="userName">
            {user.firstName} {user.lastName}!
          </span>
        </h1>
        <button id="editBtn" type="button" onClick={handleEdit}>
          Edit Name
        </button>
        <div id="editForm">
          <form name="edit" onSubmit={handleSaveEdit}>
            <div className="input-name">
              <input
                type="text"
                name="firstName"
                placeholder={user.firstName}
                required
              />
            </div>
            <div className="input-name">
              <input
                type="text"
                name="lastName"
                placeholder={user.lastName}
                required
              />
            </div>
          </form>
          <div>
            <button type="submit" className="saveBtn" onClick={handleSaveEdit}>
              Save
            </button>
            <button
              type="button"
              className="cancelBtn"
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
