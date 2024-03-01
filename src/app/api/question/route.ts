import { qa } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const { question } = await request.json()
  if (!question)
    return NextResponse.json({ data: 'You need to provide a question' })
  const user = await getUserByClerkId()

  const entries = await prisma.journalEntry.findMany({
    where: {
      userID: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, entries)
  return NextResponse.json({ data: answer })
}

export const GET = async () => {
  return NextResponse.json({ data: 'Hello' })
}
