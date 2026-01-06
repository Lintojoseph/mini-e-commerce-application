'use client';

import { useState } from 'react';

interface Props {
  onSubmit: (name: string) => void;
  loading: boolean;
}

export default function NameForm({ onSubmit, loading }: Props) {
  const [name, setName] = useState('');

  return (
    <div className="text-center">
      <h1 className="text-white text-xl font-medium mb-10">
        Welcome, You are?
      </h1>

      <div className="mb-8 text-left">
        <label className="text-gray-400 text-xs mb-2 block">
          Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Eg: John Mathew"
          className="
            w-full
            bg-neutral-900
            text-white
            px-4
            py-3
            rounded-md
            border border-neutral-800
            outline-none
            focus:border-neutral-600
          "
        />
      </div>

      <button
        disabled={!name || loading}
        onClick={() => onSubmit(name)}
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
        {loading ? 'Please wait…' : 'Continue'}
      </button>
    </div>
  );
}
