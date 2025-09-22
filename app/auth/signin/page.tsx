import React, { Suspense } from 'react';
import Join from './Join'

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Join />
    </Suspense>
  );
}