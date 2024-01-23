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

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
