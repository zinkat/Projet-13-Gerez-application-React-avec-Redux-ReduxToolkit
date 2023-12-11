// Définition de l'URL de base pour les requêtes API
const BASE_URL = 'http://localhost:3001/api/v1';

// Fonction pour effectuer la requête de connexion (login)
export const loginUser = async (credentials) => {

  try {
     // Envoi de la requête POST au endpoint /user/login
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    // Vérification si la requête a réussi (status 200)
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error during login:', errorData);
      throw new Error('Login failed');
    }
   // Extraction du token de la réponse JSON
    const responseData = await response.json();
    const token = responseData.body.token; // Assurez-vous que la propriété du token est correcte

    console.log('Token stocké in local storage:', token);
    localStorage.setItem('token', token);

    return responseData; // Retournez l'ensemble des données, y compris le token
  } catch (error) {
    // Gestion des erreurs lors de la requête de connexion
    console.error('Error during login:', error);
    throw error;
  }
};

// // Fonction pour effectuer la requête de récupération du profil utilisateur
// export const fetchUserProfile = async (token) => {
//   try {
//      // Envoi de la requête POST au endpoint /user/profile avec le token d'authentification
//     const response = await fetch(`${BASE_URL}/user/profile`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     // Vérification si la requête a réussi (status 200)
//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Error fetching user profile:', errorData);
//       throw new Error(errorData.message || 'Failed to fetch user profile');
//     }
//     // Retour des données JSON de la réponse
//     return response.json();
//   } catch (error) {
//     // Gestion des erreurs lors de la récupération du profil utilisateur
//     console.error('Error fetching user profile:', error);
//     throw error;
//   }
// };
