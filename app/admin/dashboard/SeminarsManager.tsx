'use client';

import { useState } from 'react';

interface Seminar {
  id: number;
  title: string;
  schedule: string;
  fee: string;
}

export default function SeminarsManager() {
  const [seminars, setSeminars] = useState<Seminar[]>([
    { id: 1, title: 'Basic Agarwood Cultivation', schedule: 'Mon, Wed, Fri 3:00 PM', fee: 'Free' },
    { id: 2, title: 'Scientific Forum on Growing Agarwood', schedule: 'Mar 28, 2026 10:00 AM', fee: '₱250' },
  ]);

  const handleDelete = (id: number) => {
    if (confirm('Delete this seminar?')) {
      setSeminars(seminars.filter(s => s.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl">Seminars</h2>
        <button className="bg-green-600 px-4 py-2 rounded">Add New Seminar</button>
      </div>
      <table className="w-full bg-gray-800 rounded">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Schedule</th>
            <th className="p-2 text-left">Fee</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {seminars.map(s => (
            <tr key={s.id} className="border-b border-gray-700">
              <td className="p-2">{s.title}</td>
              <td className="p-2">{s.schedule}</td>
              <td className="p-2">{s.fee}</td>
              <td className="p-2 flex gap-2 justify-center">
                <button className="text-blue-400 hover:underline">Edit</button>
                <button onClick={() => handleDelete(s.id)} className="text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}