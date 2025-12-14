'use client'
import { useEffect, useState } from "react"

export default function Page() {
    const [homeMessage, setHomeMessage] = useState<string>('');
    const api = '/api/user'

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
    }, []);


    return (
        <div className="flex flex-col gap-2 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h1 className="text-2xl">Welcome to Dashboard!</h1>
            <p>User mail:</p>
            <p>{homeMessage}</p>
        </div>
    )
}