import Link from 'next/link'

export default function React_Projects() {
    return (

            <div className='card'>
                <h2 className="text-xl font-bold">React Projects</h2>

                <h2>
                    
                    <ul>
                        <Link className="link" href="/ReactProjects/ToDoList"> ✔️ Todo list ✔️</Link>
                    </ul>
                    <ul>
                        <Link className="link" href="/ReactProjects/LoginPage">🔑 Login Page 🔒</Link>
                    </ul>
                    <ul>
                        <Link className="link" href="/ReactProjects/Haskell_Is_Hard">👷 Haskell_Is_Hard.AI 👷</Link>
                    </ul>
                </h2>

            </div>
    );

}