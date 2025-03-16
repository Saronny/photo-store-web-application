import Link from 'next/link'

export default function Nav() {
  return (
    <nav className='fixed top-0 left-0 p-4 z-10'>
        <ul className='flex space-x-4'>
            <li>
                <Link href="/photos" className='text-blue-500 hover:text-blue-800'>
                    Photos
                </Link>
            </li>
            <li>
                <Link href="/favorites" className='text-blue-500 hover:text-blue-800'>
                    Favorites
                </Link>
            </li>
        </ul>
    </nav>
  )
}
