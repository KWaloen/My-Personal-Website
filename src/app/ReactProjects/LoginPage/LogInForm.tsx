import { useState } from "react"

interface LoginFormProps {
    onSubmit: (newUser: string, newPassword: string) => void;
}

export default function LogInForm(props: LoginFormProps) {

    const [username, setNewUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok && username === process.env.NEXT_PUBLIC_SECRET_USER) {
                    alert('User login successful ' + process.env.NEXT_PUBLIC_CTF_FLAG);
                } else if (response.ok) {
                    alert('User login successful but no flag')
                } else {
                    alert('User login failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error during login');
            }
        }
    

    function fieldsFilled(event: React.FormEvent) {
        if (username.length >= 5 && password.length >= 5) {
            return handleSubmit(event);    
        } else {
            alert('User login failed');
            return false;
        }
    }

    return (
        <div className="logInContainer">
            <form onSubmit={fieldsFilled} className="new-item-form">
                <div className="form-row">
                    <label htmlFor="user">User</label>
                    <input
                        value={username}
                        onChange={user => setNewUsername(user.target.value)}
                        type="text"
                        id="user" />
                </div>
                <div className="form-row">
                    <label htmlFor="password">Password</label>
                    <input
                        value={password}
                        onChange={password => setPassword(password.target.value)}
                        type="text"
                        id="password" />
                </div>
                <button className="btn" type="submit">Login</button>
            </form>
        </div>
    );
} 