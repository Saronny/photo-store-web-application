import { Logout } from "@mui/icons-material"

function SignOutButton() {
  return (
    <form action='/auth/signOut' method="post">
        <button 
        type='submit'
        className="bg-red-500 text-white font-bold p-1 px-4 rounded hover:bg-red-600"
        >
            <Logout />
        </button>
    </form>
  )
}

export default SignOutButton