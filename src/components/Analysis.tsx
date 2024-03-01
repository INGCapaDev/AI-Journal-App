import React, { FC } from 'react'

type Props = {
  analysis: {
    mood: string
    summary: string
    color: string
    subject: string
    negative: boolean
  }
}

const Analysis: FC<Props> = ({ analysis }) => {
  const { mood, summary, color, subject, negative } = analysis
  const analysisData = [
    {
      name: 'Subject',
      value: subject,
    },
    {
      name: 'Summary',
      value: summary,
    },
    {
      name: 'Mood',
      value: mood,
    },
    {
      name: 'Negative',
      value: negative,
    },
  ]
  return (
    <>
      <div
        className=" px-6 py-10"
        style={{
          background: color,
        }}
      >
        <h2 className="text-2xl">Analysis</h2>
      </div>
      <div>
        <ul>
          {analysisData.map((data) => (
            <li
              key={data.name}
              className="flex items-center justify-between px-2 py-4 border-b border-white/50 "
            >
              <span className="text-lg font-semibold">{data.name}</span>
              <span>{data?.value?.toString() || ''}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Analysis
