'use client'
import { useEffect, useState } from "react"
import Loader from "../components/loader/page";

export default function Page() {
    const [homeMessage, setHomeMessage] = useState<string>('');
    const [newMessage, setNewMessage] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(true);
    const api = '/api/user';

    useEffect(() => {
        fetch(`${api}/homeMessage`)
        .then((resp) => {
            if(resp.ok) {
                resp.json()
                .then((data) => {
                    const home_message = data?.body;
                    setHomeMessage(home_message);
                    console.log(home_message);
                })
            }

        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setLoader(false);
        })
    }, []);

    const handleUpdateMessage = () => {
        fetch(`${api}/updateMessage`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: newMessage,
            })
        })
        .then((res) => {
            if(res.ok) {
                console.log('Update com sucesso!');
                window.location.reload();
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }

    return (
        <div className="flex flex-col gap-2 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            
            { loader ? <Loader /> : <></>}
            
            
            <h1 className="text-2xl">Welcome to Dashboard!</h1>
            <p>User mail:</p>
            <p>{homeMessage}</p>
        
            <div className="flex flex-col gap-2 items-center justify-center bg-zinc-800 p-4 rounded-md">
                <label>Nova mensagem de usuario:</label>
                <input className="bg-zinc-600 text-white p-2 rounded-md outline-none" type="text" placeholder="Insira a nova mensagem!" onChange={(e) => setNewMessage(e.target.value)} />
            
                <button className="bg-blue-700 p-2 rounded-md" onClick={handleUpdateMessage}>Atualizar</button>
            </div>
        </div>
    )
}