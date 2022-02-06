import { useState } from 'react'
import styles from './Signup.module.css'
import { useSignup } from './../../hooks/useSignup'

export default function Signup() {

    const [displayName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, isPending, error } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName)

        setName('')
        setPassword('')
        setEmail('')
    }
    return (
        <form
            className={styles['signup-form']}
            onSubmit={handleSubmit}>
            {/* user email, password, display name , when user submit logout to console this states  */}
            <label>
                <span>display name:</span>
                <input
                    type="text"
                    onChange={(e) => { setName(e.target.value) }}
                    value={displayName}
                />
            </label>
            <label>
                <span>email:</span>
                <input
                    type="email"
                    onChange={(e) => { setEmail(e.target.value) }}
                    value={email}
                />
            </label>
            <label>
                <span>password:</span>
                <input
                    type="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                    value={password}
                />
            </label>
            {!isPending && <button className='btn'>Sign up</button>}
            {error && <p>{error}</p>}
            {isPending && <button className='btn' disabled>loading</button>}
        </form>
    )
}
