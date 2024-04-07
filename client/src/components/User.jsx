import useAuth from "../hooks/useAuth"

const User = () => {
    const { auth } = useAuth()
  return (
    auth && <div className="bg-gray-500 bg-opacity-10 font-bold px-2 py-1 rounded">{auth.user.name}</div>
  )
}

export default User