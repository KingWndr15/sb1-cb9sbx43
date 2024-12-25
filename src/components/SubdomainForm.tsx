import React, { useState } from 'react';
import { saveUserWebsite } from '@/lib/supabase';

interface SubdomainFormProps {
  userId: string;
  templateId: string;
  onSuccess: () => void;
}

export function SubdomainForm({ userId, templateId, onSuccess }: SubdomainFormProps) {
  const [subdomain, setSubdomain] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await saveUserWebsite(userId, templateId, subdomain);
      onSuccess();
    } catch (err) {
      console.error('Error saving subdomain:', err);
      setError('Failed to save subdomain. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700">
          Subdomain
        </label>
        <input
          id="subdomain"
          type="text"
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md"
      >
        Save Subdomain
      </button>
    </form>
  );
}