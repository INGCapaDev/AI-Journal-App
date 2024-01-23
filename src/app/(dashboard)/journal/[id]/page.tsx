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
  const analysisData = [
    {
      name: 'Subject',
      value: 'Maths',
    },
    {
      name: 'Summary',
      value: 'This is a summary of the entry',
    },
    {
      name: 'Mood',
      value: 'Happy',
    },
    {
      name: 'Negative',
      value: true,
    },
  ]
  return (
    <div className="w-full h-full grid grid-cols-3 ">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-white/50">
        <div className="bg-blue-900 px-6 py-10">
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
                <span>{data.value.toString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default EntryPage
