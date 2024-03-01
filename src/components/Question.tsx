'use client'
import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [answer, setAnswer] = useState('')
  const onChange = (e: any) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    const answer = await askQuestion(value)
    setValue('')
    setAnswer(answer)
    setIsLoading(false)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask a question"
          onChange={onChange}
          value={value}
          className="bg-black border border-white/20 px-4 py-2 text-lg rounded-lg text-white"
        />
        <button
          type="submit"
          className="bg-gray-900 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>
      {isLoading && <div>Loading...</div>}
      {answer && <div>{answer}</div>}
    </div>
  )
}

export default Question
