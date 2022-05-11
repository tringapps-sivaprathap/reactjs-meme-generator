const Meme = ({meme}) => {
  return (
    <div className='meme'>
            <img src={meme.randomImage} alt='Meme Template' className='meme-image' />
            <h2 className='meme-text top'>{meme.topText}</h2>
            <h2 className='meme-text bottom'>{meme.bottomText}</h2>
        </div>
  );
}

export default Meme;