'use client';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function LoginPage() {
  const router = useRouter();
  const { userData } = useAuth();

  useEffect(() => {
    if (userData.userInfo && userData.token) {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  if (userData.userInfo) return <></>;

  return <LoginForm />;
}

export default LoginPage;
