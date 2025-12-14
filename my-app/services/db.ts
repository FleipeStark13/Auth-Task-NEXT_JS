import {getFirestore, collection, addDoc, setDoc, doc, getDoc, query, where, getDocs} from 'firebase/firestore';
import { app } from '@/services/firebase';

const db = getFirestore(app);

interface User {
    email: string;
    password: string;
}

export default async function addUser(user: User) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            ...user
        })
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (err) {
        console.error("Error adding document: ", err);
        return false;
    }
}


export async function checkUser(email: string) {
    try {
        const ref = collection(db, 'users');
        const q = query(ref, where('email', '==', email));

        const snapshot = await getDocs(q);
        console.log(snapshot);
        if (snapshot.empty) {
            return false;
        } else {
            return true;
        }
    } catch(err) {
        return false;
    }
}

export async function getUser(email: string, password: string) {
    try {
        const ref = collection(db, 'users');
        const q = query(ref, where('email', '==', email));

        const snapshot = await getDocs(q);

        const hashPassword = snapshot.docs[0].get('password');
        if (snapshot.empty) {
            return false;
        } else {
            return hashPassword;
        }
    } catch (e) {
        return false;
    }
}