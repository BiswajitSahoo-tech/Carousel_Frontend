import React, { useEffect,useState } from "react";
import Navbar from "./components/Navbar";
import UploadImageForm from "./components/UploadImageForm";
import CarouselComponent from "./components/CarouselComponent";
import { Modal, Button } from "react-bootstrap";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./components/SortableItem";
import "./App.css";
import { Router } from "react-router-dom";
import axios from 'axios';

function App() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [images, setImages] = useState([]); // Store images for reordering
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/images')
        .then(response => setImages(response.data))
        .catch(err => console.error(err));
}, []);
  // Toggle modal visibility
  const toggleUploadForm = () => setShowUploadForm((prev) => !prev);
  const toggleReorderModal = () => setShowReorderModal((prev) => !prev);

  // Refresh carousel
  const refreshPage = () => setRefreshFlag((prev) => !prev);
  // Handle sequence update
  const updateImageSequence = (newSequence) => {
    console.log("=================>\n",newSequence)
    // Optionally, send updated sequence to backend
    axios.post('http://localhost:5000/images/sequence', newSequence)
        .then(() => console.log("Sequence updated"))
        .catch(err => console.error(err));
  };
  // Handle drag-and-drop reordering
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = images.findIndex((image) => image._id === active.id);
      const newIndex = images.findIndex((image) => image._id === over.id);
      const newOrder = arrayMove(images, oldIndex, newIndex);
      setImages(newOrder); // Update local state with the new order
      
    }
  };

  const handleReorderSubmit = () => {
    // Optionally send the reordered images to the backend
    // axios.put("/api/reordered-images", images)
    //   .then(response => console.log("Reordered images submitted"))
    //   .catch(error => console.error("Error submitting reordered images:", error));
    updateImageSequence(images);
    toggleReorderModal();
    refreshPage();
  };

  return (
    
    <div className="container mt-5">
      {/* Navbar with Add and Reorder buttons */}
      <Navbar toggleUploadForm={toggleUploadForm} toggleReorderModal={toggleReorderModal} />

      {/* Modal for UploadImageForm */}
      <Modal show={showUploadForm} onHide={toggleUploadForm}>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadImageForm
            onSuccess={() => {
              toggleUploadForm();
              refreshPage();
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleUploadForm}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Reordering Images */}
      <Modal show={showReorderModal} onHide={toggleReorderModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Reorder Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={images.map((image) => image._id)} strategy={verticalListSortingStrategy}>
              <div className="reorder-list">
                {images.map((image) => (
                  <SortableItem key={image._id} id={image._id} image={image} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleReorderModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleReorderSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Carousel */}
      <CarouselComponent key={refreshFlag} />
      
        <footer className="footer mt-5 py-3 bg-dark text-white text-center">
          <div className="container">
            <p className="mb-0">© 2024 Carousal. All rights reserved.</p>
            <p>Built with ❤️ by Biswajit Sahoo</p>
          </div>
        </footer>
    </div>
    

    

  );
}

export default App;
