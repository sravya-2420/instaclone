import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

const PostsList = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState({})
  const [showComments, setShowComments] = useState({})
  const [commentInput, setCommentInput] = useState({})

  const getPosts = async () => {
    const jwtToken = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('jwt_token='))
      ?.split('=')[1]

    const url = 'https://apis.ccbp.in/insta-share/posts'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        setPosts(data.posts || [])
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getPosts()
  }, [])

  const updateLike = async post => {
    const jwtToken = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('jwt_token='))
      ?.split('=')[1]

    const isLiked = post.is_liked

    const url = `https://apis.ccbp.in/insta-share/posts/${post.post_id}/like`

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        like_status: !isLiked,
      }),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        setPosts(currentPosts =>
          currentPosts.map(eachPost => {
            if (eachPost.post_id === post.post_id) {
              return {
                ...eachPost,
                is_liked: !isLiked,
                likes_count: isLiked
                  ? eachPost.likes_count - 1
                  : eachPost.likes_count + 1,
              }
            }

            return eachPost
          }),
        )
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getComments = async postId => {
    const jwtToken = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('jwt_token='))
      ?.split('=')[1]

    const url = `https://apis.ccbp.in/insta-share/comments/${postId}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      console.log('Comments response:', data)

      if (response.ok) {
        setComments(prevComments => ({
          ...prevComments,
          [postId]: data.comments || [],
        }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const toggleComments = postId => {
    const currentlyShowing = showComments[postId]

    setShowComments(prevState => ({
      ...prevState,
      [postId]: !currentlyShowing,
    }))

    if (!currentlyShowing) {
      getComments(postId)
    }
  }

  const updateCommentInput = (postId, value) => {
    setCommentInput(prevState => ({
      ...prevState,
      [postId]: value,
    }))
  }

  const addComment = async postId => {
    const commentText = commentInput[postId]?.trim()

    if (!commentText) {
      return
    }

    const jwtToken = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('jwt_token='))
      ?.split('=')[1]

    const url = `https://apis.ccbp.in/insta-share/comments/${postId}`

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: commentText,
      }),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      console.log('Add comment response:', data)

      if (response.ok) {
        setCommentInput(prevState => ({
          ...prevState,
          [postId]: '',
        }))

        getComments(postId)
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="posts-list">
      {posts.map(post => (
        <div className="post-card" key={post.post_id}>
          <div className="post-user">
            <img
              src={post.profile_pic}
              alt="profile"
              className="post-profile-image"
            />

            <Link to={`/users/${post.user_id}`}>
              {post.user_name}
            </Link>
          </div>

          <img
            src={post.post_details.image_url}
            alt="post"
            className="post-image"
          />

          <div className="post-content">
            <button
              type="button"
              onClick={() => updateLike(post)}
              className={`like-button ${
                post.is_liked ? 'liked' : ''
              }`}
            >
              {post.is_liked ? '♥' : '♡'}
            </button>

            <p>{post.likes_count} likes</p>

            <p>
              <strong>{post.user_name}</strong>{' '}
              {post.post_details.caption}
            </p>

            <button
              type="button"
              className="comments-button"
              onClick={() => toggleComments(post.post_id)}
            >
              {showComments[post.post_id]
                ? 'Hide comments'
                : 'View all comments'}
            </button>

            {showComments[post.post_id] && (
              <div className="comments-container">
                {comments[post.post_id]?.length > 0 ? (
                  comments[post.post_id].map(comment => (
                    <div
                      className="comment"
                      key={comment.comment_id}
                    >
                      <strong>{comment.user_name}</strong>{' '}
                      <span>{comment.comment}</span>
                    </div>
                  ))
                ) : (
                  <p>No comments yet</p>
                )}

                <div className="add-comment-container">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInput[post.post_id] || ''}
                    onChange={event =>
                      updateCommentInput(
                        post.post_id,
                        event.target.value,
                      )
                    }
                    className="comment-input"
                  />

                  <button
                    type="button"
                    className="comment-button"
                    onClick={() => addComment(post.post_id)}
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostsList