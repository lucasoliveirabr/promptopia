import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (_req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    
    const prompts = await Prompt.find({
      creator: params.id
    }).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    })
  } catch (error) {
    return new Response("Failed to fetch all user prompts.", {
      status: 500,
    })
  }
}