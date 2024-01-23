'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import Loader from './Loader'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsSaving(true)
      const updated = await updateEntry(entry.id, _value)
      setIsSaving(false)
    },
  })
  return (
    <div className="w-full h-full">
      <div className="flex items-center p-4">
        <span className="text-2xl">Entry</span>
        {isSaving && <Loader />}
      </div>
      <textarea
        className="dark:bg-black dark:text-white p-8 text-xl w-full h-full outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  )
}
export default Editor
