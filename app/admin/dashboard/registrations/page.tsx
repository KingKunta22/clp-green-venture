'use client';

import { useState, useEffect } from 'react';
import { getRegistrations, toggleVerification } from './actions';

interface Registration {
  id: string;
  name: string;
  seminar: string;
  participants: number;
  fee: number;
  paymentMethod: string;
  code: string;
  verified: boolean;
  createdAt: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    setLoading(true);
    const data = await getRegistrations();
    setRegistrations(data);
    setLoading(false);
  };

  const handleToggleVerify = async (id: string, currentVerified: boolean) => {
    await toggleVerification(id, !currentVerified);
    // Update local state for immediate feedback
    setRegistrations(prev =>
      prev.map(r => (r.id === id ? { ...r, verified: !currentVerified } : r))
    );
  };

  const exportCSV = () => {
    const filtered = getFiltered();
    const csv = filtered.map(r =>
      [
        r.name,
        r.seminar,
        r.participants,
        r.fee,
        r.paymentMethod,
        r.verified ? 'Verified' : 'Unverified',
        r.code,
        new Date(r.createdAt).toLocaleString(),
      ].join(',')
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrations.csv';
    a.click();
  };

  const getFiltered = () => {
    if (filter === 'verified') return registrations.filter(r => r.verified);
    if (filter === 'unverified') return registrations.filter(r => !r.verified);
    return registrations;
  };

  const filtered = getFiltered();

  if (loading) {
    return <div className="text-white p-6 text-center">Loading registrations...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Registrations</h1>
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="bg-gray-800 p-2 rounded text-white"
          >
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
          <button
            onClick={exportCSV}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            Export CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 rounded">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Seminar</th>
              <th className="p-2 text-left">Participants</th>
              <th className="p-2 text-left">Fee</th>
              <th className="p-2 text-left">Payment</th>
              <th className="p-2 text-left">Code</th>
              <th className="p-2 text-left">Verified</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-gray-700">
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.seminar || 'Unknown Seminar'}</td>
                <td className="p-2">{r.participants}</td>
                <td className="p-2">₱{r.fee}</td>
                <td className="p-2">{r.paymentMethod}</td>
                <td className="p-2 font-mono text-sm">{r.code}</td>
                <td className="p-2">{r.verified ? '✅' : '❌'}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleToggleVerify(r.id, r.verified)}
                    className={`px-3 py-1 rounded ${
                      r.verified ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {r.verified ? 'Unverify' : 'Verify'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No registrations found.</p>
      )}
    </div>
  );
}