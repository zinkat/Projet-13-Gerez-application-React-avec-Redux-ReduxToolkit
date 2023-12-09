import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile, profileFetchFailed } from '../../features/authSlice';
import Account from '../../components/Account/Account';
import '../Profile/profil.css'
import SignOut from '../../components/SignOut/SignOut';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Récupérez le token depuis le local storage
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

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
          // Ajoutez d'autres propriétés si nécessaire
        };

        dispatch(setUserProfile(userProfile));
      } catch (error) {
        console.error('Error fetching user profile:', error);
        dispatch(profileFetchFailed());
      }
    };

    fetchProfile();
  }, [dispatch]);

  if (!user) {
    // Gérez le cas où le profil n'est pas encore disponible
    return <div>Loading...</div>;
  }

  return (
    <>
      <SignOut />
      <main className="bg-dark">
        <div className="header">
          <h1 id="welcome-name">
            Welcome back<br />
            <span id="fullName">
                {user.firstName} {user.lastName}!
            </span>
          </h1>
            <button id="edit-button" type="button" >
              Edit Name
            </button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Account titre="Argent Bank Checking (x8349)" montant="$2,082.79" description="Available Balance" />
        <Account titre="Argent Bank Savings (x6712)" montant="$10,928.42" description="Available Balance" />
        <Account titre="Argent Bank Credit Card (x8349)" montant="$184.30" description="Current Balance" />
      </main>
    </>
  );
}

export default Profile;
