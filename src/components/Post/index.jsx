import {useState} from 'react'
import {Link} from 'react-router-dom'

import profileImage from '../../assets/Mask Group.png'

import './index.css'

const initialPosts = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80',
    userName: 'Leslie Alexander',
    userId: 'Leslie_Alexander',
    likes: 1081,
    caption: 'Enjoying the nature with the beautiful sunrise',
    comments: [
      'Bessie Cooper so nice we are bringing our memories back',
      'Esther Howard my favourite spot',
    ],
    time: '1 Hour Ago',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80',
    userName: 'Cody Fisher',
    userId: 'Cody_Fisher',
    likes: 1024,
    caption: 'Enjoying a beautiful moment',
    comments: [
      'Beautiful picture',
      'Amazing memories',
    ],
    time: '2 Hours Ago',
  },
]

const Posts = () => {
  const [posts, setPosts] = useState(initialPosts)

  const [likedPosts, setLikedPosts] = useState({})

  const [showComments, setShowComments] = useState({})

  const [commentInputs, setCommentInputs] = useState({})

  const onLikePost = postId => {
    const alreadyLiked = likedPosts[postId]

    setPosts(currentPosts =>
      currentPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: alreadyLiked
              ? post.likes - 1
              : post.likes + 1,
          }
        }

        return post
      }),
    )

    setLikedPosts(current => ({
      ...current,
      [postId]: !alreadyLiked,
    }))
  }

  const onCommentClick = postId => {
    setShowComments(current => ({
      ...current,
      [postId]: !current[postId],
    }))
  }

  const onCommentChange = (postId, value) => {
    setCommentInputs(current => ({
      ...current,
      [postId]: value,
    }))
  }

  const onAddComment = postId => {
    const comment = commentInputs[postId]?.trim()

    if (!comment) {
      return
    }

    setPosts(currentPosts =>
      currentPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          }
        }

        return post
      }),
    )

    setCommentInputs(current => ({
      ...current,
      [postId]: '',
    }))
  }

  const onSharePost = post => {
    const text = `${post.userName} - ${post.caption}`

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert('Post copied to clipboard')
        })
        .catch(() => {
          alert('Unable to share post')
        })
    }
  }

  return (
    <div className="posts-container">
      {posts.map(post => (
        <article className="post-card" key={post.id}>

          {/* USER */}
          <div className="post-user">
            <img
              src={profileImage}
              alt={post.userName}
            />

            <Link to={`/users/${post.userId}`}>
              {post.userName}
            </Link>
          </div>

          {/* POST IMAGE */}
          <img
            src={post.image}
            alt={post.caption}
            className="post-image"
          />

          <div className="post-content">

            {/* ACTION BUTTONS */}
            <div className="post-actions">

              {/* LIKE */}
              <button
                type="button"
                className={
                  likedPosts[post.id]
                    ? 'action-button liked'
                    : 'action-button'
                }
                onClick={() => onLikePost(post.id)}
                aria-label="Like post"
              >
                {likedPosts[post.id] ? '♥' : '♡'}
              </button>

              {/* COMMENT */}
              <button
                type="button"
                className="action-button comment-button"
                onClick={() => onCommentClick(post.id)}
                aria-label="Comment on post"
              >
                💬
              </button>

              {/* SHARE */}
              <button
                type="button"
                className="action-button"
                onClick={() => onSharePost(post)}
                aria-label="Share post"
              >
                ↗
              </button>

            </div>

            {/* LIKE COUNT */}
            <p className="likes">
              {post.likes.toLocaleString()} likes
            </p>

            {/* CAPTION */}
            <p className="caption">
              <strong>{post.userName}</strong>{' '}
              {post.caption}
            </p>

            {/* COMMENTS */}
            {post.comments.map((comment, index) => (
              <p
                className="comment"
                key={`${post.id}-${index}`}
              >
                {comment}
              </p>
            ))}

            {/* COMMENT INPUT */}
            {showComments[post.id] && (
              <div className="comment-box">

                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInputs[post.id] || ''}
                  onChange={event =>
                    onCommentChange(
                      post.id,
                      event.target.value,
                    )
                  }
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      onAddComment(post.id)
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={() => onAddComment(post.id)}
                >
                  Post
                </button>

              </div>
            )}

            {/* TIME */}
            <p className="created-at">
              {post.time}
            </p>

          </div>
        </article>
      ))}
    </div>
  )
}

export default Posts