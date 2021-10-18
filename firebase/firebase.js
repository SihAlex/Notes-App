import auth from '@react-native-firebase/auth';

export const loginUser = async (email, password) => {
  await auth().signInWithEmailAndPassword(email, password);
};

export const registerUser = async (email, password) => {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};

export const logoutUser = async () => {
  await auth().signOut();
};
