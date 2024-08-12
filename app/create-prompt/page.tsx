"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

interface Post {
  prompt: string;
  tag: string;
}

const CreatePrompt: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });

  const createPromptFunction = async (e: any): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        })
      })

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Create"
      typeDoing="Creating"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPromptFunction}
    />
  )
}

export default CreatePrompt;