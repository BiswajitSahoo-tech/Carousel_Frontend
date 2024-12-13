import React, { useEffect,useState } from "react";
import Navbar from "./components/Navbar";
import UploadImageForm from "./components/UploadImageForm";
import CarouselComponent from "./components/CarouselComponent";
import { Modal, Button } from "react-bootstrap";
// import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
// import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
// import SortableItem from "./components/SortableItem";
import "./App.css";
// import { Router } from "react-router-dom";
import axios from 'axios';
import ReorderImages from "./components/ReorderImages"; 

function App() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Toggle modal visibility
  const toggleUploadForm = () => setShowUploadForm((prev) => !prev);
  const toggleReorderModal = () => setShowReorderModal((prev) => !prev);

  // Refresh carousel
  const refreshPage = () => setRefreshFlag((prev) => !prev);
  // Handle sequence update

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

      
       <Modal show={showReorderModal} onHide={toggleReorderModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Reorder Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReorderImages
            refreshPage={refreshPage}
            toggleReorderModal={toggleReorderModal}
          />
        </Modal.Body>
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
