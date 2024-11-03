import Link from 'next/link'
import LandingLayout from './(landing)/layout'

export default function NotFound() {
    return (
        <LandingLayout>
            <div className='border-t py-2 px-2'>
                <h2>Not Found</h2>
                <p>Could not find requested resource</p>
                <Link href="/">Return Home</Link>
            </div>
        </LandingLayout>
    )
}