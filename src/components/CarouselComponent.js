import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
// import { sortableContainer, sortableElement } from 'react-sortable-hoc';
// import { arrayMoveMutable } from 'array-move';

function CarouselComponent() {
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);
    const [interval, setInterval] = useState(5);

    // Fetch images
    useEffect(() => {
        axios.get('http://localhost:5000/images')
            .then(response => setImages(response.data))
            .catch(err => console.error(err));
    }, []);

    // Handle sequence update
    // const updateImageSequence = (newSequence) => {
    //     setImages(newSequence);
    //     // Optionally, send updated sequence to backend
    //     axios.put('http://localhost:5000/images/sequence', newSequence)
    //         .then(() => console.log("Sequence updated"))
    //         .catch(err => console.error(err));
    // };

    // // Handle drag-and-drop sorting
    // const SortableContainer = sortableContainer(({ children }) => {
    //     return <div>{children}</div>;
    // });

    // const SortableItem = sortableElement(({ image, idx }) => (
    //     <Carousel.Item key={image._id}>
    //         <img className="d-block w-100" src={`http://localhost:5000${image.imageUrl}`} alt={image.title} />
    //         <Carousel.Caption>
    //             <h3>{image.title}</h3>
    //             <p>{image.description}</p>
    //         </Carousel.Caption>
    //     </Carousel.Item>
    // ));

    // const onSortEnd = ({ oldIndex, newIndex }) => {
    //     const newOrder = arrayMoveMutable(images, oldIndex, newIndex);
    //     updateImageSequence(newOrder);
    // };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-3">
                {/* AdjustInterval Input */}
                <div className="mb-3 d-flex justify-content-between align-items-center">
                    <h5 className='fw-bold d-none d-md-block'>Carousel Settings</h5>
                    <div>
                        <label className="me-2 fw-bold d-none d-md-block">Set Interval(sec):</label>
                        <input
                            type="number"
                            value={interval}
                            onChange={(e) => setInterval(Number(e.target.value))}
                            className="form-control d-inline w-auto fw-bold"
                        />
                    </div>
                </div>

                {/* Carousel */}
                <Carousel fade activeIndex={index} onSelect={(selectedIndex) => setIndex(selectedIndex)} interval={interval*1000}>
                    {images.map((image, idx) => (
                        <Carousel.Item key={image._id}>
                            <img className="d-block w-100" src={`http://localhost:5000${image.imageUrl}`} alt={image.title} />
                            <Carousel.Caption>
                                <h3>{image.title}</h3>
                                <p>{image.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
                {/* <SortableContainer onSortEnd={onSortEnd} axis="x"> */}
                    {/* <Carousel activeIndex={index} onSelect={(selectedIndex) => setIndex(selectedIndex)} interval={interval}>
                        {images.map((image, idx) => (
                            <SortableItem key={image._id} index={idx} image={image} />
                        ))}
                    </Carousel> */}
                {/* </SortableContainer> */}
            </div>
        </div>
    );
}

export default CarouselComponent;
