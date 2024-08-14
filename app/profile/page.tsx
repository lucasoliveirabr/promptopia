"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

import PromptItem from "@interfaces/PromptItem";

const MyProfile: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState<PromptItem[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    if (session?.user?.id) fetchPosts();
  }, [session?.user?.id])

  const handleEdit = (post: PromptItem) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post: PromptItem) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE"
        });
        
        const filteredPosts = posts.filter((p: PromptItem) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your prompts and inspire others with the power of your imagination."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile;