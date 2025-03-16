import Link from 'next/link'
import SignOutButton from './SignOutButton'

export default function Nav() {
  return (
    <nav className='fixed top-0 left-0 p-4 bg-gray-900 w-full flex justify-between items-center shadow-md'>
        <ul className='flex space-x-4'>
            <li>
                <Link href="/photos" className='text-gray-700 hover:text-gray-800'>
                    Photos
                </Link>
            </li>
            <li>
                <Link href="/favorites" className='text-gray-700 hover:text-gray-800'>
                    Favorites
                </Link>
            </li>
        </ul>
        <div className="absolute top-2 right-4">
            <SignOutButton />
        </div>
    </nav>
  )
}
