import dynamic from 'next/dynamic';
import React from 'react';

const RegisterForm = dynamic(() => import('@/components/Auth/RegisterForm'), {
  ssr: false,
});

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto p-8">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
