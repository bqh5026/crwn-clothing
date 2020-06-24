import firebase from 'firebase/app'; 
import 'firebase/firestore';
import 'firebase/auth'; 

const config = {
        apiKey: "AIzaSyByIOcHylkfR2X2EIrIuvy23_L2KSY_pCg",
        authDomain: "crwn-db-8dd35.firebaseapp.com",
        databaseURL: "https://crwn-db-8dd35.firebaseio.com",
        projectId: "crwn-db-8dd35",
        storageBucket: "",
        messagingSenderId: "198528788666",
        appId: "1:198528788666:web:5b9be768598b2b3a"
}; 

firebase.initializeApp(config); 

export const createUserProfileDocument = async (userAuth, additionalData) => {
        if(!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`); 

        const snapShot = await userRef.get(); 

        if(!snapShot.exists) {
           const { displayName, email } = userAuth; 
           const createdAt = new Date();

           try {
                   await userRef.set({
                        displayName,
                        email,
                        createdAt,   
                        ...additionalData
                   })
           } catch (error) {
                   console.log('error creating user', error.message);
           }
        }

        return userRef; 
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
        const collectionRef = firestore.collection(collectionKey);
        console.log(collectionRef);

        const batch = firestore.batch(); 
        objectsToAdd.forEach(obj => {
                const newDocRef = collectionRef.doc();
                batch.set(newDocRef, obj);  
        });

        return await batch.commit(); 
}; 

export const convertCollectionsSnapshotToMap = (collections) => {
        const transformedCollection = collections.docs.map(doc => {
                const { title, items } = doc.data(); 
                return {
                        routeName: encodeURI(title.toLowerCase()),
                        id: doc.id,
                        title,
                        items
                }
         });
         return transformedCollection.reduce((accumulator, collection) => {
                 accumulator[collection.title.toLowerCase()] = collection;
                 return accumulator;
         }, {});
};

export const auth = firebase.auth(); 
export const firestore = firebase.firestore(); 

const provider = new firebase.auth.GoogleAuthProvider(); 
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider); 

export default firebase; 