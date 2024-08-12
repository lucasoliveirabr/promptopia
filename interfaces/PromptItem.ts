export default interface PromptItem {
  __v: number;
  _id: string;
  creator: {
    __v: number;
    _id: string;
    email: string;
    image: string;
    username: string;
  }
  prompt: string;
  tag: string;
}