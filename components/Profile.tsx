import PromptCard from "./PromptCard";

import PromptItem from "@interfaces/PromptItem";

interface Props {
  name: string;
  desc: string;
  data: PromptItem[];
  handleEdit?: (post: PromptItem) => void;
  handleDelete?: (post: PromptItem) => Promise<void>;
}

const Profile: React.FC<Props> = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post: PromptItem) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={async () => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile;