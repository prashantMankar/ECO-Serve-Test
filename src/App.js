import React, { useState, useEffect } from 'react';
import CallApi from './CallApi';
import BreedSelect from './Form';

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
    <div>
      <BreedSelect breed={apiResponse}/>
    </div>
  );
}

export default App;
