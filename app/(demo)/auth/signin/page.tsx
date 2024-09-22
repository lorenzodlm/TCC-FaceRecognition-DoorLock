'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            console.log('API response:', data);
            if (res.ok) {
                localStorage.setItem('_id', data._id);
                localStorage.setItem('id', data.id);
                localStorage.setItem('role', data.role); 
                console.log('_id:', data._id);
                console.log('User ID:', data.id);
                console.log('User role:', data.role);
                window.location.href = '/dashboard';
            } else {
                setError(data.message); 
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
                <h1 className="text-2xl mb-6">Sign In</h1>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                    Sign In
                </button>
            </form>
        </div>
    );
}
