import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "olx-clone-d576d.firebaseapp.com",
    projectId: "olx-clone-d576d",
    storageBucket: "olx-clone-d576d.appspot.com",
    messagingSenderId: "4406532695",
    appId: "1:4406532695:web:2dbea0de29b5dc0ce1a112",
    measurementId: "G-X8PRFDS3SX"
  };

const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const db=getFirestore(app)
const storage=getStorage(app)

export {app,auth,db,storage};