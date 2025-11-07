import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export const getAiResponse = async (prompt: string) => {
  const { text } = await generateText({
    model: google('gemini-2.5-flash-lite'),
    prompt: prompt,
  })

  return text
}
