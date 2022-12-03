import { useState, useEffect } from "react";
import CallApi from "./CallApi";
import Form from 'react-bootstrap/Form';

function ImageNumber({breed, subBreed}) {
    const [number, setNumber] = useState(0);
    let url = '';
    if (subBreed) {
      url = 'https://dog.ceo/api/breed/' + breed + '/' + subBreed + '/images';
    } else {
      url = 'https://dog.ceo/api/breed/' + breed + '/images';
    }
    
    useEffect(() => {
        if (breed) {
            const apiResult = CallApi(url);
        
            apiResult.then((data) => {
                setNumber(Object.keys(data));
            })
        }
    }, []);
    return (
        <div className="flex-grow-0 mx-2">
            <Form.Select>
                <option>Select Number of Images</option>
                {number && number.length > 0 && number.map((record) => {
                    return <option key={record} value={record.toString()}>{record}</option>
                })}
            </Form.Select>
        </div>
    );
}

export default ImageNumber;