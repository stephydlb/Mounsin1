
import React from 'react';
import AuthForm from '@/components/AuthForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-600">Mounsin</h1>
          <p className="text-gray-600">Connectez-vous à votre compte</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;