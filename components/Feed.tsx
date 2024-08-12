"use client"

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

import PromptItem from "@interfaces/PromptItem";

interface Props {
  data: PromptItem[];
  // handleTagClick: (tag: string) => void;
  // handleTagClick: (e: any) => Promise<void>;
  handleTagClick?: any;
  handleEdit?: (post: PromptItem) => void;
  handleDelete?: (post: PromptItem) => Promise<void>;
}

const PromptCardList: React.FC<Props> = ({ data, handleTagClick, handleEdit, handleDelete }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: PromptItem) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

const Feed: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: any) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for prompts, a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        //handleTagClick={() => { }}
        //handleEdit={() => { }}
        //handleDelete={() => Promise.resolve()}
      />
    </section>
  )
}

export default Feed;