import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { signIn } from '@/lib/auth';

export function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <AuthForm
          type="login"
          onSubmit={handleLogin}
          error={error}
        />
      </div>
    </div>
  );
}