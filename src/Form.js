import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import CallApi from "./CallApi";

function BreedSelect({breed}) {
    const [myBreed, setMyBreed] = useState('');
    const [breedValue, setBreedValue] = useState('');
    const [subBreedValue, setSubBreedValue] = useState('');
    const [numberOfImages, setNumberOfImages] = useState(0);
    const [number, setNumber] = useState(0);
    const [images, setImages] = useState('');
    const [breedStyle, setBreedStyle] = useState('');
    const [numberStyle, setNumberStyle] = useState('');
    const breedList = Object.keys(breed);
    
    const handleBreedChange = (event) => {
        setMyBreed(breed[event.target.value]);
        setBreedValue(event.target.value);
        setImages('');
        setSubBreedValue('');
        setBreedStyle('');
        setNumber('');
        setNumberOfImages(0);
        let url = 'https://dog.ceo/api/breed/' + event.target.value + '/images';
        const apiResult = CallApi(url).then((data) => setNumber(Object.keys(data)));
    };

    const handleSubBreedChange = (event) => {
        setSubBreedValue(event.target.value);
        setImages('');
        setNumber('');
        setNumberOfImages(0);
        let url = 'https://dog.ceo/api/breed/' + breedValue + '/' + event.target.value + '/images';
        const apiResult = CallApi(url).then((data) => setNumber(Object.keys(data)));
    };

    const handleNumberChange = (event) => {
        setNumberOfImages(event.target.value);
        setNumberStyle('');
    }

    const handleViewImages = (e) => {
        let error = false;
        if (!breedValue) {
            setBreedStyle("border border-danger");
            error = true;
        }
        
        if (numberOfImages <= 0) {
            setNumberStyle("border border-danger");
            error = true;
        }

        if (error) {
            return;
        }
        
        let subBreedValue1 = (subBreedValue) ? '/' + subBreedValue : '';
        let url = 'https://dog.ceo/api/breed/' + breedValue + subBreedValue1  + '/images/random/'+numberOfImages;
        const apiResult = CallApi(url).then((data) => setImages(data));
    }

    return (
        <div className="container py-3">
            <div className="d-flex">
                <div className="flex-grow-0">
                    <Form.Label>Breed</Form.Label>
                    <Form.Select name="breed" className={breedStyle} onChange={handleBreedChange}>
                        <option>Select Breed</option>
                        {breedList && breedList.length > 0 && breedList.map((record) => {
                            return <option key={record} value={record.toString()}>{record}</option>
                        })}
                    </Form.Select>
                </div>
                <div className="flex-grow-0 mx-2 w-auto">
                    
                { myBreed && myBreed.length > 0 && 
                    <><Form.Label>Sub Breed</Form.Label>
                    <Form.Select name="subBreed" onChange={handleSubBreedChange}>
                        <option>Select Subbreed</option>
                        { myBreed.map((record) => {
                            return <option key={record} value={record.toString()}>{record}</option>
                        })}
                    </Form.Select>
                    </>
                }
                </div>
                <div className="flex-grow-0 mx-2">
                    <Form.Label>Number Of Images</Form.Label>
                    <Form.Select name="numberOfImages" className={numberStyle} onChange={handleNumberChange}>
                        <option>Select Number of Images</option>
                        {number && number.length > 0 && number.map((record) => {
                            return <option key={record} value={record.toString()}>{record}</option>
                        })}
                    </Form.Select>
                </div>
                <div className="flex-grow-0 mx-2 pt-4 mt-1">
                    <Button type="submit" name="breedError" onClick={handleViewImages}>View Images</Button>
                </div>
            </div>
            <div className="container mt-3">
                <div className="row">
                {images && images.map((record) => {
                    return <div key={record} className="col-md-4 w-25 h-25">
                        <div className="card w-100 mb-3 ">
                            <img  className="img-fluid rounded card-img-top img-fluid" alt=""  src={record} />
                        </div>
                    </div>
                })}
                </div>
            </div>
        </div>
    );
}

export default BreedSelect;
