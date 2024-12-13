import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SequenceManager() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/images')
            .then(response => setImages(response.data))
            .catch(err => console.error(err));
    }, []);

    const updateSequence = () => {
        const sequenceUpdates = images.map((image, index) => ({ id: image._id, sequence: index + 1 }));
        axios.put('http://localhost:5000/images/sequence', { sequenceUpdates })
            .then(() => alert('Sequence updated successfully'))
            .catch(err => console.error(err));
    };

    return (
        <div className="mt-4">
            <h3>Manage Image Sequence</h3>
            <button onClick={updateSequence} className="btn btn-primary mb-3">Save Sequence</button>
            <ul className="list-group">
                {images.map((image, index) => (
                    <li key={image._id} className="list-group-item">
                        {index + 1}. {image.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SequenceManager;
