// app/admin/dashboard/seminars/SeminarsClient.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createSeminar, updateSeminar, deleteSeminar } from './actions'
import { Plus, X } from 'lucide-react'

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
  const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [scheduleType, setScheduleType] = useState<'one-time' | 'recurring'>('one-time')
  const router = useRouter()

  // Helper to parse fee string to number
  const parseFee = (feeStr: string): number => {
    if (feeStr === 'Free') return 0
    const match = feeStr.match(/₱([0-9.]+)/)
    return match ? parseFloat(match[1]) : 0
  }

  // Reset form when closing
  const handleCancel = () => {
    setEditingId(null)
    setEditingSeminar(null)
    setShowForm(false)
    setScheduleType('one-time')
  }

  // Handle edit click
  const handleEdit = (seminar: Seminar) => {
    setEditingSeminar(seminar)
    setEditingId(seminar.id)
    setShowForm(true)
    // Determine schedule type based on content (simple heuristic: if contains 'Every', treat as recurring)
    if (seminar.schedule.toLowerCase().includes('every')) {
      setScheduleType('recurring')
    } else {
      setScheduleType('one-time')
    }
  }

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirm('Delete this seminar?')) {
      await deleteSeminar(id)
      setSeminars(seminars.filter(s => s.id !== id))
      router.refresh()
    }
  }

  // Form submission
  const handleSubmit = async (formData: FormData) => {
    // For one-time schedule, construct the schedule string from start and end
    if (scheduleType === 'one-time') {
      const startDate = formData.get('startDate') as string
      const endDate = formData.get('endDate') as string
      if (startDate && endDate) {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const formattedStart = start.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
        const formattedEnd = end.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' })
        formData.set('schedule', `${formattedStart} - ${formattedEnd}`)
      } else {
        alert('Please provide start and end dates')
        return
      }
    } else {
      // Recurring: schedule is just the text input
      const recurringSchedule = formData.get('recurringSchedule') as string
      if (!recurringSchedule) {
        alert('Please enter schedule description')
        return
      }
      formData.set('schedule', recurringSchedule)
    }

    // Fee handling: already in actions

    if (editingId) {
      await updateSeminar(editingId, formData)
      setEditingId(null)
      setEditingSeminar(null)
    } else {
      await createSeminar(formData)
    }
    setShowForm(false)
    // Refresh data
    const response = await fetch('/admin/dashboard/seminars/api?refresh=' + Date.now()) // Optional: force refresh
    router.refresh()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Seminars</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 p-2 rounded-full transition"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showForm || editingId) && (
        <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
          <h2 className="text-xl mb-4">{editingId ? 'Edit Seminar' : 'Add New Seminar'}</h2>
          <form action={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="block text-sm mb-1">Title *</label>
                <input
                  name="title"
                  defaultValue={editingSeminar?.title || ''}
                  placeholder="e.g., Basic Agarwood Cultivation"
                  required
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500"
                />
              </div>

              {/* Fee */}
              <div>
                <label className="block text-sm mb-1">Fee *</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-700 border border-r-0 border-gray-600 rounded-l">₱</span>
                  <input
                    name="fee"
                    type="number"
                    step="0.01"
                    defaultValue={editingSeminar ? parseFee(editingSeminar.fee) : ''}
                    placeholder="0.00"
                    required
                    className="w-full p-2 rounded-r bg-gray-700 text-white border border-gray-600 focus:border-green-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Schedule Type */}
              <div className="col-span-2">
                <label className="block text-sm mb-1">Schedule Type *</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="one-time"
                      checked={scheduleType === 'one-time'}
                      onChange={() => setScheduleType('one-time')}
                      className="rounded"
                    />
                    One-time
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="recurring"
                      checked={scheduleType === 'recurring'}
                      onChange={() => setScheduleType('recurring')}
                      className="rounded"
                    />
                    Recurring (e.g., Every Mon, Wed, Fri)
                  </label>
                </div>
              </div>

              {/* Conditional Schedule Inputs */}
              {scheduleType === 'one-time' ? (
                <>
                  <div>
                    <label className="block text-sm mb-1">Start Date & Time *</label>
                    <input
                      type="datetime-local"
                      name="startDate"
                      required
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">End Date & Time *</label>
                    <input
                      type="datetime-local"
                      name="endDate"
                      required
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500"
                    />
                  </div>
                </>
              ) : (
                <div className="col-span-2">
                  <label className="block text-sm mb-1">Schedule Description *</label>
                  <input
                    name="recurringSchedule"
                    defaultValue={editingSeminar?.schedule || ''}
                    placeholder="e.g., Every Monday, Wednesday, Friday 3:00 PM onwards"
                    required
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500"
                  />
                </div>
              )}

              {/* Instructor */}
              <div>
                <label className="block text-sm mb-1">Instructor *</label>
                <input
                  name="instructor"
                  defaultValue={editingSeminar?.instructor || ''}
                  placeholder="e.g., Juvelyn Quirog"
                  required
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500"
                />
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm mb-1">Level *</label>
                <select
                  name="level"
                  defaultValue={editingSeminar?.level || ''}
                  required
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500"
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              {/* Location */}
              <div className="col-span-2">
                <label className="block text-sm mb-1">Location *</label>
                <input
                  name="location"
                  defaultValue={editingSeminar?.location || ''}
                  placeholder="City Suites Unit 09, F. Ramos St., Cebu City"
                  required
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500"
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingSeminar?.description || ''}
                  placeholder="Optional details about the seminar"
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500"
                />
              </div>

              {/* Past Seminar */}
              <div className="col-span-2">
                <label className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    name="isPast"
                    defaultChecked={editingSeminar?.isPast || false}
                    className="rounded"
                  />
                  Past Seminar
                </label>
              </div>
            </div>

            {/* Form Buttons */}
            <div className="flex gap-2 pt-2">
              <button type="submit" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
                {editingId ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={handleCancel} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Seminars List */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Schedule</th>
              <th className="p-3 text-left">Fee</th>
              <th className="p-3 text-left">Instructor</th>
              <th className="p-3 text-left">Level</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {seminars.map(s => (
              <tr key={s.id} className="border-b border-gray-700 hover:bg-gray-750">
                <td className="p-3">{s.title}</td>
                <td className="p-3">{s.schedule}</td>
                <td className="p-3">{s.fee}</td>
                <td className="p-3">{s.instructor}</td>
                <td className="p-3">{s.level}</td>
                <td className="p-3">{s.location}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(s)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {seminars.length === 0 && (
          <p className="text-center p-4 text-gray-400">No seminars yet. Click the + button to add one.</p>
        )}
      </div>
    </div>
  )
}