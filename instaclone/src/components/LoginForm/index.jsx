import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import loginImage from '../../assets/Group.png'
import logoImage from '../../assets/Illustration.png'

import './index.css'

const LoginForm = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const submitForm = async event => {
    event.preventDefault()

    setErrorMsg('')

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(
        'https://apis.ccbp.in/login',
        options,
      )

      const data = await response.json()

      if (response.ok) {
        document.cookie = `jwt_token=${data.jwt_token}; path=/`

        navigate('/', {replace: true})
      } else {
        setErrorMsg(data.error_msg)
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="login-page">

      
      <div className="login-image-container">
        <img
          src={logoImage}
          alt="website login"
          className="login-image"
        />
      </div>

      <div className="login-form-container">

        
        <img
          src={loginImage}
          alt="website logo"
          className="login-logo"
        />

        <form
          className="login-form"
          onSubmit={submitForm}
        >

          <label htmlFor="username">
            USERNAME
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={event =>
              setUsername(event.target.value)
            }
            placeholder="Username"
          />

          <label htmlFor="password">
            PASSWORD
          </label>

          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={event =>
              setPassword(event.target.value)
            }
            placeholder="Password"
          />

          <div className="show-password-container">

            <input
              id="show-password"
              type="checkbox"
              checked={showPassword}
              onChange={event =>
                setShowPassword(event.target.checked)
              }
            />

            <label htmlFor="show-password">
              Show Password
            </label>

          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

          {errorMsg !== '' && (
            <p className="error-message">
              *{errorMsg}
            </p>
          )}

        </form>
      </div>
    </div>
  )
}

export default LoginForm