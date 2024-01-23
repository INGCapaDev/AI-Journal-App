import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

type Props = {
  params: {
    id: string
  }
}

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userID_id: {
        id: id,
        userID: user.id,
      },
    },
  })
  return entry
}

const EntryPage: React.FC<Props> = async ({ params }) => {
  const entry = await getEntry(params.id)
  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  )
}
export default EntryPage
