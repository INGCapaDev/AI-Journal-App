import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import React from 'react'
import HistoryChart from '../journal/components/HistoryChart'

const getData = async () => {
  const user = await getUserByClerkId()
  const analyses = await prisma.analysis.findMany({
    where: {
      userID: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analyses.reduce((all, curr) => all + curr.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  return { avg, analyses }
}

const History = async () => {
  const { avg, analyses } = await getData()

  return (
    <div className="w-full h-full">
      <h1>Your average sentiment score is {avg}</h1>
      <div className="w-full h-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default History
