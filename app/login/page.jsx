import dynamic from 'next/dynamic';
import React from 'react';

const LoginForm = dynamic(() => import('@/components/Auth/LoginForm'), {
  ssr: false,
});

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto p-8">
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
