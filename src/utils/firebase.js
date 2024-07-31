import { initializeApp } from "firebase/app";

import {getFirestore, collection, addDoc, getDocs, query, where, doc, setDoc, orderBy, getDoc} from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_SECURE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const storage = getStorage();

// Storage reference
export const fileUpload = async (path, file) => {
  const imageRef = ref(storage, path)

  try {
    await uploadBytes(imageRef, file)
    console.log("file uploaded")
  } catch (e) {
    console.log(e);
  }
}

// download url from cloud storage
export const getImageUrl = (path) => {
  return getDownloadURL(ref(storage, path))
}

// Article document object state
const docArticleRef = collection(db, "article");

// Quote document object state
const docQuoteRef = collection(db, "quote");

// Article document object state
const docAboutRef = doc(db, "about", "About Me");

// Add document to article
export const createdocArticle = async (title, articleObj) => {
  try {
    const articleRef = doc(db, 'article', title);
    await setDoc(articleRef, articleObj);
  } catch (e) {
    console.log(e);
  }
}

// Add document to quote
export const createdocQuote = async (quoteObj) => {
  try{
    await addDoc(docQuoteRef, quoteObj);
  } catch (e) {
    console.log(e);
  }
}

// Add document to about
export const createdocAbout = async (aboutObj) =>  {
  try {
    const aboutRef = doc(db, "about", "About Me")
    await setDoc(aboutRef, aboutObj);
  } catch (e) {
    console.log(e)
  }
}

// Get Document from Article
export const getAllDocArticle = async() => {
  try{
    const q = query(docArticleRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (e) {
    console.log(e);
  }
}

// Get Document from Article
export const getDocArticle = async (title) => {
  try {
    const q = query(docArticleRef, where ("title", "==", title));

    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (e) {
    console.log(e);
  }
}

// Get Document from Quote
export const getDocQuote = async () => {
  try {
    const querySnapshot = await getDocs(docQuoteRef);
    return querySnapshot;
  } catch (e) {
    console.log(e);
  }
}

export const getDocAbout = async () => {
  try{
    const aboutSnap = await getDoc(docAboutRef);
    return aboutSnap;
  } catch (e){
    console.log(e);
  }
}

// Get Document from Empty Article
export const getDocArticleEmpty = async (title) => {
  try {
    const q = query(docArticleRef, where ("title", "==", title));

    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  } catch(e) {
    console.log(e);
  }
}


export const signInAuthEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

