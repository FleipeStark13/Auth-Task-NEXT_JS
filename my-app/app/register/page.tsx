'use client'

import React, { useState } from "react"
export default function Page() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
    
            if (response.ok) {
                console.log(response);
                setMessage((await response.text()).toString());
            } else {
                setMessage("Error");
            }
        } catch (err) {
            setMessage(`Erro ao fazer envio: ${err}`)
        }
    }
    
    return (
        <div className="bg-zinc-950 flex flex-col p-5">
            
            {<p className="text-zinc-100">{message}</p>}
            
            <div className="bg-zinc-600 max-w-72 p-3 rounded-2xl flex flex-col gap-2">
                <form onSubmit={handleSubmit} className="flex flex-col p-5 bg-zinc-500 rounded-2xl gap-2">
                    <input className="w-max bg-zinc-600 text-white border-zinc-950 border-1 rounded-md p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input className="w-max bg-zinc-600 text-white border-zinc-950 border-1 rounded-md p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button className="bg-blue-700 text-white rounded-md" type="submit">Register</button>
                
                </form>

            </div>
        </div>
    )
}