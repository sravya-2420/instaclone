import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'



import rahulProfileImage from '../../assets/Rectangle 1687.png'
import varunProfileImage from '../../assets/Mask Group.png'
import dabbooProfileImage from '../../assets/Dabbo profile.png'


   

import rahulHighlight1 from '../../assets/Group 7339.png'
import rahulHighlight2 from '../../assets/Group 7338.png'
import rahulHighlight3 from '../../assets/Group 7342.png'
import rahulHighlight4 from '../../assets/Group 7351.png'
import rahulHighlight5 from '../../assets/Group 7352.png'
import rahulHighlight6 from '../../assets/Group 7353.png'
import rahulHighlight7 from '../../assets/Group 7354.png'



import highlightImage1 from '../../assets/Group 7326.png'
import highlightImage2 from '../../assets/Group 7324.png'
import highlightImage3 from '../../assets/Group 7325.png'



import post70 from '../../assets/Rectangle 70.png'
import post71 from '../../assets/Rectangle 71.png'
import post72 from '../../assets/Rectangle 72.png'
import post73 from '../../assets/Rectangle 73.png'
import post74 from '../../assets/Rectangle 74.png'
import post75 from '../../assets/Rectangle 75.png'
import post76 from '../../assets/Rectangle 76.png'
import post77 from '../../assets/Rectangle 77.png'
import post78 from '../../assets/Rectangle 78.png'
import post79 from '../../assets/Rectangle 79.png'
import post80 from '../../assets/Rectangle 80.png'
import post81 from '../../assets/Rectangle 81.png'

import './index.css'

const rahulHighlights = [
  rahulHighlight1,
  rahulHighlight2,
  rahulHighlight3,
  rahulHighlight4,
  rahulHighlight5,
  rahulHighlight6,
  rahulHighlight7,
]

const localPosts = [
  post70,
  post71,
  post72,
  post73,
  post74,
  post75,
  post76,
  post77,
  post78,
  post79,
  post80,
  post81,
]

const UserDetails = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionExpired, setSessionExpired] = useState(false)

  useEffect(() => {
    const getUserDetails = async () => {
      setIsLoading(true)
      setSessionExpired(false)
      setUserDetails(null)

      const cookie = document.cookie
        .split('; ')
        .find(item => item.startsWith('jwt_token='))

      const jwtToken = cookie ? cookie.split('=')[1] : ''

      if (!jwtToken) {
        setIsLoading(false)
        setSessionExpired(true)
        return
      }


      if (
        id &&
        id.toLowerCase() === 'rahul'
      ) {
        setUserDetails({
          user_id: 'rahul',
          user_name: 'Rahul',
          posts_count: 79,
          followers_count: 379,
          following_count: 179,
          user_bio:
            'It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.',
          profile_pic: rahulProfileImage,
          isRahul: true,
          isDabboo: false,
          posts: localPosts,
        })

        setIsLoading(false)
        return
      }

      /* =========================
         DABBOO RATNANI
         ========================= */

      if (
        id &&
        id.toLowerCase() === 'dabboo_ratnani'
      ) {
        setUserDetails({
          user_id: 'Dabboo_Ratnani',
          user_name: 'Dabboo Ratnani',
          posts_count: 0,
          followers_count: 379,
          following_count: 179,
          user_bio:
            'Dabboo Ratnani Photography, Mumbai, Maharashtra. 2073644 likes · 50600 talking about this. Celebrity & Fashion Photographer.',
          profile_pic: dabbooProfileImage,
          isRahul: false,
          isDabboo: true,
          posts: [],
        })

        setIsLoading(false)
        return
      }


      try {
        const response = await fetch(
          `https://apis.ccbp.in/insta-share/users/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        )

        const data = await response.json()

        console.log(
          'User Details API Response:',
          data,
        )

        if (response.status === 401) {
          setSessionExpired(true)
          setUserDetails(null)
          setIsLoading(false)
          return
        }

        if (
          response.ok &&
          data.user_details
        ) {
          setUserDetails({
            ...data.user_details,
            profile_pic: varunProfileImage,
            posts: localPosts,
            isRahul: false,
            isDabboo: false,
          })
        } else {
          setUserDetails(null)
        }
      } catch (error) {
        console.log(
          'User Details Error:',
          error,
        )

        setUserDetails(null)
      }

      setIsLoading(false)
    }

    getUserDetails()
  }, [id])

  
  if (isLoading) {
    return (
      <p className="loading">
        Loading...
      </p>
    )
  }


  if (sessionExpired) {
    return (
      <div className="loading">

        <p>
          Session expired. Please login again.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate('/login')
          }
        >
          Login
        </button>

      </div>
    )
  }


  if (userDetails === null) {
    return (
      <p className="loading">
        User not found
      </p>
    )
  }

  

  if (userDetails.isDabboo) {
    return (
      <div className="user-details-container dabboo-page">

        <div className="dabboo-profile-section">

          <img
            src={dabbooProfileImage}
            alt="Dabboo Ratnani profile"
            className="dabboo-profile-image"
          />

          <div className="dabboo-profile-info">

            <h1>
              Dabboo Ratnani
            </h1>

            <div className="dabboo-profile-stats">

              <p>
                <strong>0</strong>
                <span> posts</span>
              </p>

              <p>
                <strong>379</strong>
                <span> followers</span>
              </p>

              <p>
                <strong>179</strong>
                <span> following</span>
              </p>

            </div>

            <h2>
              Dabboo_Ratnani
            </h2>

            <p className="dabboo-bio">
              Dabboo Ratnani Photography, Mumbai,
              Maharashtra. 2073644 likes · 50600
              talking about this.
              <br />
              Celebrity &amp; Fashion Photographer.
            </p>

          </div>

        </div>

        <div className="dabboo-posts-section">

          <div className="dabboo-posts-heading">

            <span className="dabboo-grid-icon">
              ▦
            </span>

            <h2>
              Posts
            </h2>

          </div>

          <div className="dabboo-no-posts">

            <div className="dabboo-camera">

              <div className="dabboo-camera-body">

                <div className="dabboo-camera-lens">
                  <span></span>
                </div>

              </div>

            </div>

            <p>
              No Posts Yet
            </p>

          </div>

        </div>

      </div>
    )
  }

  

  return (
    <div className="user-details-container">

      <div className="profile-section">

        <img
          src={userDetails.profile_pic}
          alt="user profile"
          className="user-profile-image"
        />

        <div className="profile-info">

          <h1>
            {userDetails.user_name}
          </h1>

          <div className="profile-stats">

            <p>
              <strong>
                {userDetails.posts_count}
              </strong>

              <span>
                {' '}
                posts
              </span>
            </p>

            <p>
              <strong>
                {userDetails.followers_count}
              </strong>

              <span>
                {' '}
                followers
              </span>
            </p>

            <p>
              <strong>
                {userDetails.following_count}
              </strong>

              <span>
                {' '}
                following
              </span>
            </p>

          </div>

          <h2>
            {userDetails.user_name}
          </h2>

          <p className="bio">
            {userDetails.user_bio}
          </p>

        </div>

      </div>

     

      {userDetails.isRahul && (
        <div className="highlights">

          {rahulHighlights.map(
            (image, index) => (
              <div
                className="highlight"
                key={index}
              >

                <img
                  src={image}
                  alt="Rahul highlight"
                  className="highlight-image"
                />

              </div>
            ),
          )}

        </div>
      )}

      

      {!userDetails.isRahul && (
        <div className="highlights">

          <div className="highlight">

            <img
              src={highlightImage1}
              alt="user highlight"
              className="highlight-image"
            />

          </div>

          <div className="highlight">

            <img
              src={highlightImage2}
              alt="user highlight"
              className="highlight-image"
            />

          </div>

          <div className="highlight">

            <img
              src={highlightImage3}
              alt="user highlight"
              className="highlight-image"
            />

          </div>

        </div>
      )}

      <hr />

      <div className="posts-heading">

        <span className="grid-icon">
          ▦
        </span>

        <h2>
          Posts
        </h2>

      </div>

      <div className="user-posts">

        {userDetails.posts.map(
          (post, index) => (
            <img
              key={index}
              src={post}
              alt={`${userDetails.user_name} post ${
                index + 1
              }`}
            />
          ),
        )}

      </div>

    </div>
  )
}

export default UserDetails