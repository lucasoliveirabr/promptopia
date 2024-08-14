"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

import PromptItem from "@interfaces/PromptItem";

interface Props {
  params: {
    id: string;
  }
}

const UserProfile: React.FC<Props> = ({ params }) => {
  const searchParams = useSearchParams();
  const userName: string = searchParams.get("name") ?? "";

  const [userPosts, setUserPosts] = useState<PromptItem[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    }

    if (params?.id) fetchPosts();
  }, [params?.id])

  return (
    <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s prompts and be inspired by the power of their imagination.`}
      data={userPosts}
    />
  )
}

export default UserProfile;