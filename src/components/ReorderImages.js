import React , { useEffect,useState }from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import axios from 'axios';

function ReorderImages({ refreshPage, toggleReorderModal }) {
    const [images, setImages] = useState([]); // Store images for reordering
    useEffect(() => {
        axios.get('http://localhost:5000/images')
            .then(response => setImages(response.data))
            .catch(err => console.error(err));
    }, []);

    const updateImageSequence = (newSequence) => {
        console.log("=================>\n",newSequence)
        // Optionally, send updated sequence to backend
        axios.post('http://localhost:5000/images/sequence', newSequence)
            .then(() => {console.log("Sequence updated"); window.location.reload(false);})
            .catch(err => console.error(err));
    };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = images.findIndex((image) => image._id === active.id);
      const newIndex = images.findIndex((image) => image._id === over.id);
      const newOrder = arrayMove(images, oldIndex, newIndex);
      setImages(newOrder);
    //   updateImageSequence(newOrder); // Send reordered images to the backend
    }
  };

  return (
    <div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images.map((image) => image._id)} strategy={verticalListSortingStrategy}>
          <div className="reorder-list">
            {images.map((image) => (
              <SortableItem key={image._id} id={image._id} image={image} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="mt-3 text-end">
        <button
          className="btn btn-secondary me-2"
          onClick={toggleReorderModal}
        >
          Close
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            updateImageSequence(images);
            toggleReorderModal();
            refreshPage();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ReorderImages;
