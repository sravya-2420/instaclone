import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const jwtToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('jwt_token='))
    ?.split('=')[1]

  if (!jwtToken) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute