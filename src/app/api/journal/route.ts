import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const { id } = await getUserByClerkId()
  const entry = await prisma.journalEntry.create({
    data: {
      content: 'Write about your day here!',
      userID: id,
    },
  })

  const analysis = await analyze(entry.content)
  console.log(analysis)

  await prisma.analysis.create({
    data: {
      userID: id,
      ...analysis,
      entryID: entry.id,
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
