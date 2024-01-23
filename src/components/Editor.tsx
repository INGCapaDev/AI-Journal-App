'use client'

import { useState } from 'react'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  return (
    <div className="w-full h-full">
      <textarea
        className="dark:bg-black dark:text-white p-8 text-xl w-full h-full outline-none"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      ></textarea>
    </div>
  )
}
export default Editor
