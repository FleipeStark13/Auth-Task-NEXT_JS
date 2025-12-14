import {app} from '@/services/firebase';
import { collection, getFirestore, getDoc, query, where, getDocs, doc,  } from 'firebase/firestore';

const db = getFirestore(app);

export default async function homeMessage(email: string) {
    try {
        const ref = collection(db, 'users');
        const q = query(ref, where('email', '==', email));
        const snapshot = await getDocs(q);

        if (snapshot.docs.length > 0) {
            const user_doc_id = snapshot.docs[0].id;
            const user_ref: any = collection(db, 'users/' + user_doc_id + '/home_page');
            const user_snap = await getDocs(user_ref);
    
            const home_message = user_snap.docs[0].get('home_message');
    
            if (!home_message) {
                return false
            } else {
                return home_message;
            }
        } else {
            return false;
        }

    } catch (e) {
        return false;
    }
}