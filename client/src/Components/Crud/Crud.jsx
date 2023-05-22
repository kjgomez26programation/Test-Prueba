import React, { useContext, useEffect, useState } from "react";
import "../Crud/crud.scss";
import { GlobalContext } from "../context/globalContext";
import { Link, useNavigate } from "react-router-dom";
import useNotes from "../../hooks/useNotes";
import logo from "../../LoginAssets/logo.png";


//import ui
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const Crud = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(GlobalContext);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const [hotUpdate, setHotUpdate] = useState(0);
  const [selectedNote, setSelectedNote] = useState(null);

  const { notes, addNote, updateNoteById, deleteNoteById } = useNotes(email);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    relevance: "normal",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addNote(formData);
      setHotUpdate(hotUpdate + 1);
      alert("Se ha creado la nota exitosamente");
      setFormData({
        title: "",
        content: "",
        relevance: "normal",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditChange = async (event) => {
    event.preventDefault();

    try {
      const updatedNote = {
        id: selectedNote.id,
        title: selectedNote.title,
        content: selectedNote.content,
        relevance: selectedNote.relevance,
      };

      await updateNoteById(selectedNote.id, updatedNote);
      setSelectedNote(null);
      setHotUpdate(hotUpdate + 1);
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
    }
  };

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      <header>
        <div className="logo">
          <img src={logo} alt="Logo" className="img" />
        </div>
        <h1>Welcome</h1>

        <button
          className="button-tx"
          onClick={() => {
            setIsLoggedIn(false);
            localStorage.clear();
            navigate("/");
          }}
        >
          Salir
        </button>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="task-form">
          <h2>Add Note</h2>
          <span>Title</span>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
          ></input>
          <span>Description</span>
          <input
            type="text"
            id="content"
            value={formData.content}
            onChange={handleChange}
          ></input>
          <span>Importance</span>
          <select
            className="select"
            value={formData.relevance}
            id="relevance"
            onChange={handleChange}
          >
            <option value="importante">High</option>
            <option value="normal" defaultValue>
              Medium
            </option>
            <option value="leve">Low</option>
          </select>
          <button className="button-txt">Add</button>
        </form>
      </div>
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
  <Link className="link"
    to={"/notes"}
    style={{
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      padding: "10px",
      border: "1px solid black"
    
    }}
  >
    Go to list
  </Link>

           
   </div>
    </>
  );
};

export default Crud;
