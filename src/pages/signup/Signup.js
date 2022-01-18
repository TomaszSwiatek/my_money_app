import { useState } from 'react'
import styles from './Signup.module.css'

export default function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password, name)

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
                <span>name:</span>
                <input
                    type="text"
                    onChange={(e) => { setName(e.target.value) }}
                    value={name}
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
            <button className='btn'>Sign up</button>
        </form>
    )
}
