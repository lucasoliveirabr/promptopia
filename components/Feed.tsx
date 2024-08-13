"use client"

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

import PromptItem from "@interfaces/PromptItem";

interface Props {
  data: PromptItem[];
  handleTagClick: (tagName: string) => void;
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
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<any | null>(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, [])

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i");

    return posts.filter((item: PromptItem) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    );
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    searchTimeout !== null && clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  }

  const handleTagClick = (tagName: string): void => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  }

  return (
    <section className="feed">
      <form onSubmit={(e: any) => e.preventDefault()} className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for prompts, a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={posts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed;