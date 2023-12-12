import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile, profileFetchFailed } from '../../features/authSlice';
import Account from '../../components/Account/Account';
import '../Profile/profil.css'
//import {  updateProfile } from '../../services/api';


function Profile() {
  const dispatch = useDispatch();  //Envoie une action au store qui déclenche des mises à jour de l'état 
  const user = useSelector((state) => state.auth.user);//extraire des données du store Redux

  useEffect(() => {
    const fetchProfile = async () => {
      try {
       // Récupérez le token depuis le local storage
       const token = localStorage.getItem('token');
       // Effectuez une requête pour récupérer le profil de l'utilisateur avec le token
     const response = await fetch('http://localhost:3001/api/v1/user/profile', {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${token}`,
       },
     });
      // Gérez les erreurs lors de la récupération du profil
     if (!response.ok) {
       const errorData = await response.json();
       console.error('Error fetching user profile:', errorData);
       throw new Error('Failed to fetch user profile');
     }

     const profileData = await response.json();

     // Assurez-vous que le corps de la réponse contient les propriétés correctes du profil
     const userProfile = {
       id: profileData.body.id,
       email: profileData.body.email,
       firstName: profileData.body.firstName,
       lastName: profileData.body.lastName,
    
     };
 // Mettez à jour le profil de l'utilisateur dans le store Redux
     dispatch(setUserProfile(userProfile));
      } catch (error) {
        console.error('Error fetching user profile:', error);
        dispatch(profileFetchFailed());
      }
    };
    // Exécutez la fonction pour récupérer le profil lors du montage du composant
    fetchProfile();
  }, [dispatch]);

  if (!user) {
    // Gérez le cas où le profil n'est pas encore disponible
    return <div>Loading...</div>;
  }
     // Edit name
     const handleEdit = () => {
      document.getElementById("fullName").style.display = "none";
      document.getElementById("edit-button").style.display = "none";
      document.getElementById("edit-section").style.display = "block";
  }



     // Cancel Edit
     const handleEditCancel = () => {
      document.getElementById("fullName").style.display = "block";
      document.getElementById("edit-button").style.display = "initial";
      document.getElementById("edit-section").style.display = "none";
  }
// Save Edit
const handleSaveEdit = async () => {
  console.log('Attempting to save profile changes...');
  const firstName = document.edit.firstName.value;
  const lastName = document.edit.lastName.value;

  const updatedProfile = {
    firstName: firstName,
    lastName: lastName,
  };

  console.log(updatedProfile);

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProfile),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to save user profile:', errorData);
      throw new Error('Failed to save user profile');
    }

    console.log('Profile changes saved successfully!');
    window.location.reload();
  } catch (error) {
    console.error('Failed to save user profile:', error);
  }
};

  
  return (
   
      <main className="bg-dark">
        <div className="header">
          <h1 id="welcome-name">
            Welcome back<br />
            <span id="fullName">
                {user.firstName} {user.lastName}!
            </span>
          </h1>
            <button id="edit-button" type="button"onClick={handleEdit}>
              Edit Name
            </button>
            <div id="edit-section">
                    <form name="edit" onSubmit={handleSaveEdit}>
                        <div className="profil-input-wrapper">
                            <input type="text"  name='firstName' placeholder={user.firstName}  required />
                        </div>
                        <div className="profil-input-wrapper">
                            <input type="text" name='lastName'   placeholder={user.lastName}  required />
                        </div>
                    </form>
                    <div className="btn-form">
                        <button type="submit" className="save-button" onClick={handleSaveEdit} >Save</button>
                        <button type="button" className="cancel-button" onClick={handleEditCancel}>Cancel</button>
                    </div>
                </div>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Account titre="Argent Bank Checking (x8349)" montant="$2,082.79" description="Available Balance" />
        <Account titre="Argent Bank Savings (x6712)" montant="$10,928.42" description="Available Balance" />
        <Account titre="Argent Bank Credit Card (x8349)" montant="$184.30" description="Current Balance" />
      </main>
  
  );
}

export default Profile;
