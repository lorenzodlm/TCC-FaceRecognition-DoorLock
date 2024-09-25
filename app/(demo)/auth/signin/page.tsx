'use client';

import { useState } from 'react';
import { ContentLayout } from "@/app/components/admin-panel/content-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        <ContentLayout title="Sign In">
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <Card className="max-w-md w-full bg-white dark:bg-gray-800">
                    <CardHeader>
                        <CardTitle className="text-2xl text-gray-800 dark:text-gray-100">Sign In</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {error && <p className="text-red-500">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="block mb-2 text-gray-700 dark:text-gray-300">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="border rounded px-3 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password" className="block mb-2 text-gray-700 dark:text-gray-300">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="border rounded px-3 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500">
                                Sign In
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </ContentLayout>
    );
}
