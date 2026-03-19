'use client';

import { useState } from 'react';

interface Registration {
  id: number;
  name: string;
  seminar: string;
  participants: number;
  fee: number;
  verified: boolean;
  code: string;
}

const mockRegistrations: Registration[] = [
  { id: 1, name: 'John Doe', seminar: 'Basic Agarwood Cultivation', participants: 2, fee: 0, verified: false, code: 'CLP-A1B2-C3D4' },
  { id: 2, name: 'Jane Smith', seminar: 'Scientific Forum', participants: 1, fee: 250, verified: true, code: 'CLP-E5F6-G7H8' },
];

export default function RegistrationsManager() {
  const [registrations, setRegistrations] = useState<Registration[]>(mockRegistrations);
  const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');

  const toggleVerify = (id: number) => {
    setRegistrations(regs =>
      regs.map(r => r.id === id ? { ...r, verified: !r.verified } : r)
    );
    // TODO: call server action to update DB
  };

  const exportCSV = () => {
    const csv = registrations.map(r => `${r.name},${r.seminar},${r.participants},${r.fee},${r.verified},${r.code}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrations.csv';
    a.click();
  };

  const filtered = registrations.filter(r => {
    if (filter === 'verified') return r.verified;
    if (filter === 'unverified') return !r.verified;
    return true;
  });

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl">Registrations</h2>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'verified' | 'unverified')}
            className="bg-gray-800 p-2 rounded"
          >
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
          <button onClick={exportCSV} className="bg-green-600 px-4 py-2 rounded">Export CSV</button>
        </div>
      </div>
      <table className="w-full bg-gray-800 rounded">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Seminar</th>
            <th className="p-2 text-left">Participants</th>
            <th className="p-2 text-left">Fee</th>
            <th className="p-2 text-left">Code</th>
            <th className="p-2 text-left">Verified</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r.id} className="border-b border-gray-700">
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.seminar}</td>
              <td className="p-2">{r.participants}</td>
              <td className="p-2">₱{r.fee}</td>
              <td className="p-2">{r.code}</td>
              <td className="p-2">{r.verified ? '✅' : '❌'}</td>
              <td className="p-2">
                <button
                  onClick={() => toggleVerify(r.id)}
                  className={`px-3 py-1 rounded ${r.verified ? 'bg-yellow-600' : 'bg-green-600'}`}
                >
                  {r.verified ? 'Unverify' : 'Verify'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}