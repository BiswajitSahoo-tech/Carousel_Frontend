import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BsPlusCircle , BsListNested} from "react-icons/bs"; // "+" icon


function Navbar({ toggleUploadForm, toggleReorderModal }) {
  return (
    <div className="navbar custom-navbar">
      <div className="branding">Carousel</div>
      <div className="menu-buttons">
        <Button variant="success" onClick={toggleUploadForm}>
          <BsPlusCircle /> Add
        </Button>
        <Button variant="info" onClick={toggleReorderModal}>
          <BsListNested/> Reorder
        </Button>
      </div>
    </div>
  );
}


export default Navbar;
