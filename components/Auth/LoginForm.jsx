'use client';

import Link from 'next/link';
import PasswordInput from './PasswordInput';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              placeholder="Email address"
              className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <PasswordInput
              register={register}
              name="password"
              placeholder="Password"
              error={errors.password}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white   bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500"
          >
            <span className="block text-yellow-900 font-semibold">Sign in</span>
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-yellow-600 hover:text-yellow-500"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
