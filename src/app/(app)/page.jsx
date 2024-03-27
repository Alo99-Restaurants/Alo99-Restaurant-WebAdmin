'use client';
import React, { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

function App() {
  const router = useRouter();
  useLayoutEffect(() => {
    router.replace('/dashboard');
  }, []);
  return <>Loading...</>;
}

export default App;
