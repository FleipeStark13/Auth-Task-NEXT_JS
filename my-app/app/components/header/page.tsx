'use client'
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
export default function Header() {
    const [load, setLoad] = useState<boolean>(false);
    const [logOut, setLogout] = useState<boolean>(false);

    const router = useRouter();

    const api = '/api/auth';

    useEffect(() => {
        setLoad(true);
        fetch(`${api}/getCookie`, {
            method: 'GET'
        })
        .then((res) => {
            if(res.ok) {
                setLogout(true);
            }
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setLoad(false);
        })

    }, []);

    const handleExit = () => {
        fetch(`${api}/logout`, {
            method: 'DELETE',
        })
        .then((res) => {
            if(res.ok) {
                setLogout(false);
                router.push('/');
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <header className="header flex items-center justify-between p-2">
            <h1>Next Todo App</h1>
            <nav>
                <ul className="p-0 flex gap-5">
                    <li className="bg-zinc-900 p-2 rounded-md hover:bg-zinc-600">
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li className="bg-zinc-900 p-2 rounded-md hover:bg-zinc-600">
                        <Link href={"/login"}>Login</Link>
                    </li>
                    <li className="bg-zinc-900 p-2 rounded-md hover:bg-zinc-600">
                        <Link href={"/register"}>Register</Link>
                    </li>

                    {
                        logOut ? <li>
                            <button className="bg-blue-900 p-2 rounded-md hover:bg-blue-600" onClick={handleExit}>Sair</button>
                        </li> : <></>
                    }


                </ul>
            </nav>
        </header>
    )
    
}