"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"
export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            const response = await fetch('/api/auth/login', {
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
                router.push('/dashboard')

            }

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-zinc-900 h-dvh flex flex-col justify-center items-center">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="bg-zinc-600 p-5 rounded-md flex flex-col gap-2">
                <div>

                    <label>E-mail:</label>
                    <br />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="outline-none border-1 border-zinc-500 p-1.5 placeholder:text-zinc-900" />

                </div>

                <div>
                    <label>Password:</label>
                    <br />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="outline-none border-1 border-zinc-500 p-1.5 placeholder:text-zinc-900" />
                </div>

                <button className="bg-blue-900 hover:bg-blue-500 cursor-pointer text-white text-zinc-900" type="submit">Login</button>
            
            </form>
        </div>
    )


}