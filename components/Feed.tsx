"use client"

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

interface Props {
  data: any;
  // handleTagClick: (tag: string) => void;
  // handleTagClick: (e: any) => Promise<void>;
  handleTagClick: any;
  handleEdit: any;
  handleDelete: any;
}

const PromptCardList: React.FC<Props> = ({ data, handleTagClick, handleEdit, handleDelete }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: any) => (
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
  const [posts, setPosts]  = useState([]);

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
        handleTagClick={() => {}}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    </section>
  )
}

export default Feed;