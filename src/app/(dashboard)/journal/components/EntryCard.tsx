const EntryCard = ({
  entry,
}: {
  entry: {
    id: string
  }
}) => {
  return <div>{entry.id}</div>
}
export default EntryCard
