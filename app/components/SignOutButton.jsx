
function SignOutButton() {
  return (
    <form action='/auth/signOut' method="post">
        <button 
        type='submit'
        className="bg-red-500 text-white font-bold p-2 px-4 rounded hover:bg-red-600"
        >
            Sign Out
        </button>
    </form>
  )
}

export default SignOutButton