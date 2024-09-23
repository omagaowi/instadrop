import { useSearchParams } from 'react-router-dom'
import '../styles/share.css'

import { useEffect, useState } from 'react'


const ShareScreen = () => {
    const [ searchParams ] = useSearchParams()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const linkParams = searchParams.get('link')
    const [allContent, setContent] = useState([])

    const fetchContent = async (link) => {
        try {
            const response = await fetch('https://intsadrop-api.onrender.com/submit_link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    link:  link
                })
            })
            const data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    const runFetch = (link) => {
        setLoading(prev => true)
        setError(prev => false)
        fetchContent(link).then((data) => {
            setLoading(prev => false)
            if(data.status){
                setError(false)
                setContent(prev => data.data)
                console.log(data)
            }else{
                setContent(prev => [])
                setError(prev => 'Error processing link! Please retry later.')
            }
      }).catch(error => {
          setLoading(prev => false)
          setError(prev => 'An Error Occured! Check your Connection!')
          console.log(error)
      })
    }

    useEffect(() => {
        if(linkParams){
            if(linkParams.startsWith('https://www.instagram.com/')){
                runFetch(linkParams)
            }else{
                setError(prev => 'Invalid instagram link!')
            }
        }else{
            setError(prev => 'Invalid instagram link!')
        }
    }, [])
    return (
        <div className="share container">
            <div className="share-heading">
                <div className="input">
                    <input type="text" placeholder='Enter a valid link...' value={ linkParams }/>
                </div>
            </div>
            {
                loading? (
                   <>
                     <img src='/bouncing-ball.svg' className='loader'/>
                     <p className='loading'>Loading Content...</p>
                   </>
                ):(
                    <>
                        {
                            error? (
                                <>
                                    <p className='error'>{error}</p>
                                    <button className='error-retry' onClick={ () => {
                                        runFetch(linkParams)
                                    } }>Retry</button>
                                </>
                            ):(
                                <div className="carousel" style={ { justifyContent: allContent.length == 1? 'center' : '' } }>
                                        {
                                            allContent.map((post, index) => (
                                                <div className="post">
                                                    {
                                                        post.type == 'image'? (
                                                            <img src={ post.url } alt="" />
                                                        ):(
                                                            <video src={ post.url } alt=""/>
                                                        )
                                                    }
                                                    <div className="actions">
                                                        <div className="type">
                                                            {
                                                                post.type == 'image'? (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                                                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                                                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
                                                                    </svg>
                                                                ):(
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-reels" viewBox="0 0 16 16">
                                                                    <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0M1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/>
                                                                    <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm6 8.73V7.27l-3.5 1.555v4.35zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1"/>
                                                                    <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6M7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                                                                    </svg>
                                                                )
                                                            }
                                                        </div>
                                                        <div className="label">
                                                            { index + 1  } / { allContent.length }
                                                        </div>
                                                        <div className="buttons">
                                                            <button>
                                                                <a href={ post.url }>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                                                                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                                                                </svg>
                                                                </a>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                </div>
                            )   
                        }
                    </>
                )
            }
            {/* <button className="download-all" onClick={() => {
                allContent.forEach(link => {
                    window.location.href = link.url
                })
                console.log('d')
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                </svg>
                Download All
            </button> */}
            {/* <img style={{ width: '100px', height: '100px' }} src='/bouncing-ball.svg' alt="Logo" /> */}
        </div>
    )
}

export default ShareScreen