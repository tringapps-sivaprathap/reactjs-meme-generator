import { useState, useEffect } from 'react'
import Meme from './Meme';

const MemeForm = () => {
  const [allMemes, setAllMemes] = useState([]);
  const [meme, setMeme] = useState({
      topText: '',
      bottomText: '',
      randomImage: 'http://i.imgflip.com/1bij.jpg' 
  });
  const [loaded, setLoaded] = useState(false);
  const [fetched, setFetched] = useState(false);
  const { REACT_APP_DOMAIN_NAME } = process.env;
  
  useEffect(() => {
      fetch(`${REACT_APP_DOMAIN_NAME}/get_memes`)
        .then((response) => response.json())
        .then((data) => {
          setAllMemes(data.data.memes);
          setLoaded(true);
          setFetched(true);
        })
        .catch(() => {
          setLoaded(true);
        })
  }, [])

  const handleChange = (event) => {
    const {name, value} = event.target;
    setMeme(prevMeme => ({...prevMeme, [name]: value}));
  }
  
  const getMemeImage = () => {
      const randomNumber = Math.floor(Math.random() * allMemes.length);
      const url = allMemes[randomNumber].url;
      setMeme(prevMeme => ({...prevMeme, randomImage: url}));
  }
  
  const showMeme = () => {
      if(fetched)
        return allMemes.length !== 0 ? <Meme meme={meme} /> : <p className="empty-error">No Users Available</p>
      else
        return <p className="fetch-error">Failed to fetch</p>
  }

  return (
    <main>
        <div className='form'>
          <div>
          <input type='text' placeholder='Top text' className='form-input' name='topText' value={meme.topText} onChange={handleChange} />
            <input type='text' placeholder='Bottom text' className='form-input' name='bottomText' value={meme.bottomText} onChange={handleChange} />
          </div>
          <button className='form-button' onClick={getMemeImage}>Get a new meme image</button>
        </div>

        {loaded ? showMeme() : <p>Loading...</p>}
    </main>
  );
}

export default MemeForm;