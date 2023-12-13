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

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        const userProfile = await dispatch(fetchUserProfile(token))
        dispatch(setUserProfile(userProfile.payload))
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

  // Edit name
  const handleEdit = () => {
    document.getElementById('fullName').style.display = 'none'
    document.getElementById('edit-button').style.display = 'none'
    document.getElementById('edit-section').style.display = 'block'
  }

  // Cancel Edit
  const handleEditCancel = () => {
    document.getElementById('fullName').style.display = 'block'
    document.getElementById('edit-button').style.display = 'initial'
    document.getElementById('edit-section').style.display = 'none'
  }
  // Save Edit
  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token')
      const firstName = document.edit.firstName.value
      const lastName = document.edit.lastName.value

      const updatedProfile = {
        firstName: firstName,
        lastName: lastName,
      }

      await dispatch(updateProfile({ token, updatedProfile }))

      console.log('Profile changes saved successfully!')
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
