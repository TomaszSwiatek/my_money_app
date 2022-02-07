import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {

    const { user } = useAuthContext()
    const { logout } = useLogout()
    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>My money</li>
                {!user && (
                    <>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signup'>Signup</Link></li>
                    </>
                )}
                {user &&
                    <>
                        <li>Hello, {user.displayName}</li>
                        <li>
                            <button className='btn' onClick={() => { logout() }} >logout</button>
                        </li>
                    </>
                }




            </ul>
        </nav>
    )
}
