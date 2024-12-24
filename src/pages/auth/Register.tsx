import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { signUp } from '@/lib/auth';

export function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const handleRegister = async (email: string, password: string) => {
    try {
      await signUp(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <AuthForm
          type="register"
          onSubmit={handleRegister}
          error={error}
        />
      </div>
    </div>
  );
}