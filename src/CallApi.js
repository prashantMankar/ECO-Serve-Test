import axios from 'axios';
import React from 'react';

function CallApi(callUrl) {
    return (
        axios.get(callUrl)
        .then((response) => {
            const result = response.data.message;
            
            return result;
        })
        .catch((error) => {
            console.log(error);
        })
    );
}

export default CallApi;