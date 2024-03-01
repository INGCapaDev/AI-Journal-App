import { OpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from 'langchain/prompts'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

type Entry = {
  id: string
  content: string
  createdAt: Date
}

const schema = z.object({
  sentimentScore: z
    .number()
    .describe(
      'Sentiment of the text and rated from -10 to 10, where -10 is extremely negative and 10 is extremely positive.'
    ),
  mood: z
    .string()
    .describe('The mood of the person who wrote the journal entry.'),
  summary: z.string().describe('Quick summary of the journal entry.'),
  subject: z.string().describe('The subject of the journal entry.'),
  color: z
    .string()
    .describe(
      'A color that represents the mood of the person who wrote the journal entry, this color needs to be in hex format (e.g. #0101FE for blue representing happiness).'
    ),
  negative: z
    .boolean()
    .describe(
      'is the journal entry negative? (i.e. does it have a negative emotions?).'
    ),
})

const parser = StructuredOutputParser.fromZodSchema(schema)

const getPrompt = async (content: string) => {
  const formatted_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{formatted_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { formatted_instructions },
  })

  const input = await prompt.format({ entry: content })
  return input
}

export const analyze = async (content: string) => {
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const prompt = await getPrompt(content)
  const result = await model.invoke(prompt)
  try {
    const parsed = parser.parse(result)
    return parsed
  } catch (e) {
    console.log(e)
    return {
      mood: 'unknown',
      summary: 'unknown',
      subject: 'unknown',
      color: 'unknown',
      negative: false,
      sentimentScore: 0,
    }
  }
}

export const qa = async (question: string, entries: Entry[]) => {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content || 'No count this document has no content.',
        metadata: {
          id: entry.id,
          createdAt: entry.createdAt,
        },
      })
  )

  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const chain = loadQARefineChain(model)

  const store = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings()
  )

  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.invoke({ input_documents: relevantDocs, question })

  return res.output_text
}
