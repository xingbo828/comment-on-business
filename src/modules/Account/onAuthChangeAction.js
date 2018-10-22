
import { auth, firestore } from '../../firebaseClient';
const userCollectionRef = firestore.collection('users');

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const onAuthChange = () => dispatch => {
  auth.onAuthStateChanged(async (user) => {
    if (user && user.emailVerified) {
      const userDocRef = userCollectionRef.doc(user.uid);
      const userDoc = await userDocRef.get();
      if(userDoc.exists){
        let additionalUserData = await userDoc.data();
        if(additionalUserData.providers && Object.keys(additionalUserData.providers).length > 0) {
          const providersPromises = Object.keys(additionalUserData.providers).map(async key => {
            const a = await additionalUserData.providers[key].get()
            return { ...a.data(), id: key };
          })
          const providers = await Promise.all(providersPromises);
          additionalUserData.providers = providers;
        } else {
          additionalUserData.providers = [];
        }
        dispatch({
          type: USER_LOGIN,
          data: {...user.toJSON(), ...additionalUserData}
        });
      } else {
        dispatch({
          type: USER_LOGIN,
          data: {...user.toJSON()}
        });
      }
    } else {
      auth.signOut()
      dispatch({
        type: USER_LOGOUT
      });
    }
  });
};