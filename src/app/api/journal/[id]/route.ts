import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const PATCH = async (
  request: Request,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) => {
  const { content } = await request.json()
  const { id: userID } = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userID_id: {
        id: params.id,
        userID,
      },
    },
    data: {
      content: content,
    },
  })

  const analysis = await analyze(updatedEntry.content)

  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryID: updatedEntry.id,
    },
    create: {
      userID: userID,
      entryID: updatedEntry.id,
      ...analysis,
    },
    update: analysis,
  })

  revalidatePath(`/journal/${updatedEntry.id}`)

  const updatedEntryWithAnalysis = {
    ...updatedEntry,
    analysis: updatedAnalysis,
  }

  return NextResponse.json({ data: updatedEntryWithAnalysis })
}
