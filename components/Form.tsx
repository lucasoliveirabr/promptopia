import Link from "next/link";

interface Post {
  prompt: string;
  tag: string;
}

interface Props {
  type: string;
  typeDoing: string;
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  submitting: boolean;
  handleSubmit: (e: any) => Promise<void>;
}

const Form: React.FC<Props> = ({ type, typeDoing, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
          <style jsx>
              {`
              textarea {
                color: #000; /* Cor do placeholder */
                opacity: 1; /* Para garantir que a opacidade seja 1 */
              }
              `}
            </style>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>

          <span className="flex items-center">
            <span className="flex items-center mr-1 pt-2 h-11 text-xl">#</span>
            <input
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              onKeyDown={(e) => e.key === "#" && e.preventDefault()}
              placeholder="tag"
              required
              className="form_input h-11"
            />
            <style jsx>
              {`
              input {
                color: #000; /* Cor do placeholder */
                opacity: 1; /* Para garantir que a opacidade seja 1 */
              }
              `}
            </style>
          </span>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${typeDoing}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form;