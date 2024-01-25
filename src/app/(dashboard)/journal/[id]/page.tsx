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
    include: {
      analysis: true,
    },
  })
  return entry
}

const EntryPage: React.FC<Props> = async ({ params }) => {
  const entry = await getEntry(params.id)
  const { mood, summary, color, subject, negative } = entry?.analysis || {}
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
    <div className="w-full h-full grid grid-cols-3 ">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-white/50">
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
      </div>
    </div>
  )
}
export default EntryPage
