"use server"

import openai from "@/lib/openai";
import { GenerateSummaryInput, generateSummarySchema } from "@/lib/validation";

export async function generateSummary(input: GenerateSummaryInput) {

    // TODO Block for none premium users

    const { jobTitle, experiences, educations, skills } = generateSummarySchema.parse(input);

    const systemMessage = `
        You are a job resume generator AI. Your task is to generate a professional introduction summary for a resume given the user's provided data. only include the summary and do not include any other information  in the response. Keep it short and concise and it is professional and engaging.`;

    const userMessage = `
    Please generate a professional introduction summary for a resume for a ${jobTitle || "N/A"} with the following ${experiences?.map(exp => `
        Position as ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}. 
        Description : ${exp.description || "N/A"}`
    ).join("\n\n")}

    Education:
    ${educations?.map(edu => `
        Degree in ${edu.degree || "N/A"} from ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}. 
        Description : ${edu.description || "N/A"}`
    ).join("\n\n")}

    Skills:
    ${skills}`;

    console.log("SYSTEM_MESSAGE", systemMessage);
    console.log("USER_MESSAGE", userMessage);


    const completion = await openai.chat.completions.create({
        /*
        Cheaper models          Input             Output
        gpt-3.5-turbo-0125      $0.50/1M tokens $1.50/1M tokens
        gpt-3.5-turbo-instruct  $1.50/1M tokens $2.00/1M tokens
        gpt-3.5-turbo-1106      $1.00/1M tokens $2.00/1M tokens
        gpt-3.5-turbo-0613      $1.50/1M tokens $2.00/1M tokens
        */
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: userMessage }
        ],
        // max_tokens: 150, // 150 tokens is about 1 sentence
        // temperature: 0.5, // 0.5 is the default and gives the best results
        // stop: ["\n"] // Stop at the first newline

    });

    const aiResponse = completion.choices[0].message.content;

    if (!aiResponse) {
        throw new Error("Failed to generate AI response");
    }

    return aiResponse;
} 