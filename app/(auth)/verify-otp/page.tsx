'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import VerifyOtpForm from '@/components/VerifyOtpForm';
import NameForm from '@/components/NameForm';

function VerifyOTPContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const phoneNumber = searchParams.get('phone');
  const otpFromServer = searchParams.get('otp');

  const [step, setStep] = useState<'otp' | 'name'>('otp');
  const [loading, setLoading] = useState(false);

  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);

  if (!phoneNumber || !otpFromServer) {
    router.push('/login');
    return null;
  }

  const handleRegister = async (name: string) => {
    setLoading(true);

    const response = await authAPI.loginRegister({
      name,
      phone_number: phoneNumber,
    });

    const token = response.data.token.access;

    document.cookie = `auth-token=${token}; path=/;`;
    localStorage.setItem('auth-token', token);

    setToken(token);
    setUser({
      id: response.data.user_id,
      name: response.data.name,
      phone_number: response.data.phone_number,
    });

    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {step === 'otp' ? (
          <VerifyOtpForm
            phoneNumber={phoneNumber}
            otpFromServer={otpFromServer}
            onVerified={() => setStep('name')}
          />
        ) : (
          <NameForm onSubmit={handleRegister} loading={loading} />
        )}
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={null}>
      <VerifyOTPContent />
    </Suspense>
  );
}
