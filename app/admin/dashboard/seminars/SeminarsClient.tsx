'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSeminar, updateSeminar, deleteSeminar } from './actions'

interface Seminar {
  id: string
  title: string
  schedule: string
  fee: string
  instructor: string
  level: string
  location: string
  description: string | null
  isPast: boolean
}

export default function SeminarsClient({ seminars: initialSeminars }: { seminars: Seminar[] }) {
  const [seminars, setSeminars] = useState(initialSeminars)
  const [editingId, setEditingId] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (confirm('Delete this seminar?')) {
      await deleteSeminar(id)
      setSeminars(seminars.filter(s => s.id !== id))
      router.refresh()
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Seminars</h1>
      
      {/* Add/Edit Form */}
      <div className="bg-gray-800 p-4 rounded mb-6">
        <h2 className="text-xl mb-4">{editingId ? 'Edit Seminar' : 'Add New Seminar'}</h2>
        <form
          action={async (formData) => {
            if (editingId) {
              await updateSeminar(editingId, formData)
              setEditingId(null)
            } else {
              await createSeminar(formData)
            }
            setSeminars(await getSeminars()) // refresh local state
            router.refresh()
          }}
          className="space-y-3"
        >
          <input name="title" placeholder="Title" required className="w-full p-2 rounded text-black" />
          <input name="schedule" placeholder="Schedule" required className="w-full p-2 rounded text-black" />
          <input name="fee" placeholder="Fee (e.g., Free or ₱250)" required className="w-full p-2 rounded text-black" />
          <input name="instructor" placeholder="Instructor" required className="w-full p-2 rounded text-black" />
          <input name="level" placeholder="Level (e.g., Beginner)" required className="w-full p-2 rounded text-black" />
          <input name="location" placeholder="Location" required className="w-full p-2 rounded text-black" />
          <textarea name="description" placeholder="Description" className="w-full p-2 rounded text-black" rows={3} />
          <label className="flex items-center gap-2 text-white">
            <input type="checkbox" name="isPast" className="rounded" />
            Past Seminar
          </label>
          <div className="flex gap-2">
            <button type="submit" className="bg-green-600 px-4 py-2 rounded">
              {editingId ? 'Update' : 'Create'}
            </button>
            {editingId && (
              <button type="button" onClick={() => setEditingId(null)} className="bg-gray-600 px-4 py-2 rounded">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Seminars List */}
      <table className="w-full bg-gray-800 rounded">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Schedule</th>
            <th className="p-2 text-left">Fee</th>
            <th className="p-2 text-left">Instructor</th>
            <th className="p-2 text-left">Level</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {seminars.map(s => (
            <tr key={s.id} className="border-b border-gray-700">
              <td className="p-2">{s.title}</td>
              <td className="p-2">{s.schedule}</td>
              <td className="p-2">{s.fee}</td>
              <td className="p-2">{s.instructor}</td>
              <td className="p-2">{s.level}</td>
              <td className="p-2 flex gap-2 justify-center">
                <button onClick={() => setEditingId(s.id)} className="text-blue-400 hover:underline">
                  Edit
                </button>
                <button onClick={() => handleDelete(s.id)} className="text-red-400 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}