import { OpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from 'langchain/prompts'

const schema = z.object({
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
    }
  }
}
