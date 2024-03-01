'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import Loader from './Loader'
import Analysis from './Analysis'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis || {})
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsSaving(true)
      const updated = await updateEntry(entry.id, _value)
      setAnalysis(updated.analysis || {})
      setIsSaving(false)
    },
  })
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
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
      <div className="border-l border-white/50 col-auto">
        <Analysis analysis={analysis} />
      </div>
    </div>
  )
}
export default Editor
