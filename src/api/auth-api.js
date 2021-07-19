import firebase from "firebase/app";
import "firebase/auth";
// import firestore from "firebase/firestore";

export const logoutUser = () => {
  firebase.auth().signOut();
};

export const signUpUser = async ({ name, email, password }) => {
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password).then(cred => {
          return firebase.firestore().collection('users').doc(cred.uid).set({
              user_name: name,
              user_email: email,
              user_password: password,
              user_bio: "",
              user_phone: "",
              user_location: ""
          })
      });
    // console.log("user", user);
    // const docSnapshot = await firebase.firestore().collection("users").add({
    //   email,
    //   name,
    //   uid: user.uid
    // });

    // firebase.auth().currentUser.updateProfile({
    //   displayName: name,
    // })

    return { user };
  } catch (error) {
    console.log({ error });
    return {
      error: error.message,
    };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return { user };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const sendEmailWithPassword = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return {};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
