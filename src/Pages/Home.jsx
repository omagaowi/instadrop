import '../styles/home.css'

import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    return (
        <div className="home container">
            <div className="logo">
                <img src="/icon250.png" alt="" />
            </div>
            <form action="" onSubmit={(e) => {
                e.preventDefault()
                const link = e.target.link.value
                if(link.startsWith('https://www.instagram.com/')){
                    navigate(`/share/?link=${link}`)
                }
            }}>
                <div className="input">
                    <input type="text" placeholder='Enter a valid link...' name='link' autoComplete='false'/>
                    <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                            </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Home