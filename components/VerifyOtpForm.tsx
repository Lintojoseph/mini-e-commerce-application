'use client';

import { useState, useEffect } from 'react';

interface Props {
  phoneNumber: string;
  otpFromServer: string;
  onVerified: () => void;
}

export default function VerifyOtpForm({
  phoneNumber,
  otpFromServer,
  onVerified,
}: Props) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(34);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const isOtpValid = otp.join('') === otpFromServer;

  return (
    <div className="text-center">
      <h1 className="text-white text-xl font-medium mb-2">
        Verify phone
      </h1>

      <p className="text-gray-400 text-sm mb-8">
        Enter the OTP sent to {phoneNumber}
      </p>

      <p className="text-gray-400 text-sm mb-3 text-left">
        Enter OTP
      </p>
      <p className="text-gray-500 text-xs mb-4">
        Test OTP: <span className="text-white">{otpFromServer}</span>
    </p>

      {/* OTP boxes */}
      <div className="flex justify-center gap-4 mb-6">
        {otp.map((digit, i) => (
          <input
            key={i}
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            className="
              w-14 h-14
              bg-neutral-900
              text-white
              text-xl
              text-center
              rounded-md
              outline-none
              border border-neutral-800
              focus:border-neutral-600
            "
            maxLength={1}
          />
        ))}
      </div>

      <p className="text-gray-500 text-xs mb-6">
        Resend OTP in <span className="text-white">{timer}s</span>
      </p>

      <button
        disabled={!isOtpValid}
        onClick={onVerified}
        className="
          w-full
          bg-white
          text-black
          py-3
          rounded-md
          font-medium
          disabled:opacity-40
        "
      >
        Verify
      </button>
    </div>
  );
}
