import { collection, CollectionReference, getDocs, doc, getFirestore, query, snapshotEqual, updateDoc, where} from "firebase/firestore";
import {app} from '@/services/firebase';

const db = getFirestore(app)

export default async function UpdateHomeMessage(email: string, message:string) {
    try {
        const parent_ref = collection(db, 'users');
        const parent_query = query(parent_ref, where('email', '==', email));
        const parent_snapshot = await getDocs(parent_query);

        if (parent_snapshot.docs.length > 0) {
            const parent_doc_id = parent_snapshot.docs[0].id;
            const user_ref: any = collection(db, 'users/' + parent_doc_id + '/home_page');

            const user_snap = await getDocs(user_ref);

            if (user_snap.docs.length === 0) {
                console.log('Subcolecao home_page nao encontrada');
                return false;
            }

            const message_doc_id = user_snap.docs[0].id;

            const document_ref = doc(db, 'users', parent_doc_id, 'home_page', message_doc_id);
            
            try {
                await updateDoc(document_ref, {
                    home_message: message
                });
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }

        } else {
            return false;
        }
    } catch (e) {
        console.log(e)
        return false;
    }
}