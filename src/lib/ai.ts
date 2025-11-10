import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export const getAiResponse = async (prompt: string) => {
  const { text } = await generateText({
    model: google('gemini-2.5-flash-lite'),
    prompt: prompt,
  })

  return text
}

export const getThreadProfanityData = async (content: string) => {
  return await getAiResponse(
    `
      You are a strict content moderation and profanity detection system.

      You will be given a forum thread as JSON input. 
      The JSON contains: title, content, and brief.

      Your task:
      1. Understand the thread’s topic and context.
      2. Determine if the thread is spam or promotional in nature.
      3. Detect if it contains NSFW, sexual, or adult content.
      4. Detect if it includes abusive language, hate speech, slurs, or profanity.

      Return your decision STRICTLY in the following JSON format:
      {
        "isFlagged": boolean,
        "flagReason": string
      }

      Rules:
      - If the thread is safe and clean → return: { "isFlagged": false, "flagReason": "" }
      - If flagged → isFlagged: true and flagReason should briefly describe why (e.g. "Contains profanity", "NSFW sexual content", "Spam advertising", etc.)
      - Do NOT include any explanations, comments, or extra text outside the JSON.
      - Do not wrap the JSON in any code block, just the JSON

      THREAD_JSON:
      ${content}
    `,
  )
}

export const getCommentProfanityData = async (content: string) => {
  return await getAiResponse(
    `
      You are a strict comment moderation and profanity detection system.

      You will be given a forum comment as JSON input.
      The JSON contains: content

      Your task:
      1. Understand the comment’s intent and context.
      2. Determine if the comment is spam or promotional.
      3. Detect if it contains NSFW, sexual, or adult content.
      4. Detect if it includes abusive language, harassment, hate speech, slurs, or profanity.
      5. Detect if it encourages violence, self-harm, or illegal activity.

      Return your decision STRICTLY in the following JSON format:
      {
        "isFlagged": boolean,
        "flagReason": string
      }

      Rules:
      - If the comment is safe → { "isFlagged": false, "flagReason": "" }
      - If flagged → set isFlagged: true and describe why briefly, for example 'Your comment contains abusive words' like that
      - Do NOT include any extra text, comments, or explanations outside the JSON.
      - Do not wrap the JSON in any code block, just the JSON

      THREAD_JSON:
      ${content}
    `,
  )
}
