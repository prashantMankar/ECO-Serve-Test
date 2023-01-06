import React, { useState, useEffect } from 'react';
import CallApi from './CallApi';
import BreedSelect from './Form';
import './style.css'

function App() {
  const breedListUrl = 'https://dog.ceo/api/breeds/list/all';
  const subBreedListUrl = 'https://dog.ceo/api/breed/hound/list'; 

  const [apiResponse, setApiResponse] = useState('');
  useEffect(() => {
    const apiResult = CallApi(breedListUrl);

    apiResult.then((data) => {
      setApiResponse(data);
    })
    
}, []);

  return (
    
    <main>
      <div className='form-content'>
        <BreedSelect breed={apiResponse}/>
      </div>
    </main>
  );
}

export default App;
