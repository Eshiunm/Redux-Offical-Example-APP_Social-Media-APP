import { useAppSelector } from '@/app/hooks'
import { RootState } from '@/app/store'
import { Link } from 'react-router-dom'
import { ReactionButtons } from './ReactionButtons';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from '@/components/TimeAgo';

export const selectAllPosts = (state: RootState) => state.posts;
export const selectPostById = (state: RootState, postId: string) => state.posts.find(post => post.id === postId);

export const PostsList = () => {
  // Select the `state.posts` value from the store into the component
  const posts = useAppSelector(selectAllPosts);
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  const renderedPosts = orderedPosts.map(post => (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link> 
      </h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}