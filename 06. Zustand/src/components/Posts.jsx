import { useEffect } from "react";
import { usePostStore } from "../store/postStore";

// We have added fetchPosts to the dependency array, which means whenever there is chnage in data or response, this component will be re-rendered.
function Posts() {
  const { posts, loading, error, fetchPosts } = usePostStore();
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}

export default Posts;
