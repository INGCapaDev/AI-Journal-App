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

  revalidatePath(`/journal/${params.id}`)

  return NextResponse.json({ data: updatedEntry })
}
