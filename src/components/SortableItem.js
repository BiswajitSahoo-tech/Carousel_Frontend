import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id, image }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    background: "#f8f9fa",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img src={`http://localhost:5000${image.imageUrl}`} alt={image.title} style={{ width: "80px", height: "auto" }} />
      <span>{image.title}</span>
    </div>
  );
}

export default SortableItem;
