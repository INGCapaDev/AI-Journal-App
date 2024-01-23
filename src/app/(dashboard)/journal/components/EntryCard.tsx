const EntryCard = ({
  entry,
}: {
  entry: {
    id: string
    createdAt: Date
    analysis: {
      summary: string
      mood: string
    }
  }
}) => {
  const date = new Date(entry.createdAt).toDateString()

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow dark:bg-black dark:shadow-white dark:divide-gray-900">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:p-6">summary</div>
      <div className="px-4 py-5 sm:px-6">mood</div>
    </div>
  )
}
export default EntryCard
