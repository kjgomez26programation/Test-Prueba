import React, { useState } from "react";
import "../Notes/note.scss"
import useNotes from "../../hooks/useNotes";
import { useNavigate } from "react-router-dom";
import logo from "../../LoginAssets/logo.png"
//import ui
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";



import { Link } from "react-router-dom";

const Notes = () => {
  const email = localStorage.getItem("email");
  const { notes, addNote, updateNoteById, deleteNoteById } = useNotes(email);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  const irRutaAnterior = () => {
    navigate(-1);
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

  return (
    <>
        <div className="container-flex">
          <div className="logo"> 
            <img src={logo} alt="" />
          </div>
          <h1>Welcome</h1>
        </div>
      

      

      {Array.isArray(notes) && notes.length > 0 ? (
      <div style={{ width: "100%", overflowX: "auto" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table style={{ width: "80%", paddingTop: "40px" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "center", }}>Title</th>
              <th style={{ textAlign: "center" }}>Description</th>
              <th style={{ textAlign: "center" }}>Importance</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td style={{ textAlign: "center" }}>
                  {selectedNote && selectedNote.id === note.id ? (
                    <input
                      className="txt-tamaño"
                      id="title"
                      value={selectedNote.title}
                      onChange={(e) =>
                        setSelectedNote({
                          ...selectedNote,
                          title: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>{note.title}</span>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  {selectedNote && selectedNote.id === note.id ? (
                    <input
                      className="txt-tamaño"
                      id="content"
                      value={selectedNote.content}
                      onChange={(e) =>
                        setSelectedNote({
                          ...selectedNote,
                          content: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>{note.content}</span>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  {selectedNote && selectedNote.id === note.id ? (
                    <select
                      value={selectedNote.relevance}
                      id="relevance"
                      onChange={(e) =>
                        setSelectedNote({
                          ...selectedNote,
                          relevance: e.target.value,
                        })
                      }
                    >
                      <option value="importante">High</option>
                      <option value="normal">Medium</option>
                      <option value="leve">Low</option>
                    </select>
                  ) : (
                    <span>{note.relevance}</span>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  {selectedNote && selectedNote.id === note.id ? (
                    <>
                      <button className="btn-dark" onClick={handleEditChange}>
                        Keep
                      </button>
                      <button
                        className="btn-gray"
                        onClick={() => setSelectedNote(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {email === note.email ? (
                        <button
                          className="btn-gray"
                          onClick={() => setSelectedNote(note)}
                        >
                          Keep
                        </button>
                      ) : null}
                      {email === note.email ? (
                        <button
                          className="btn-dark"
                          onClick={() => deleteNoteById(note.id)}
                        >
                          Cancel
                        </button>
                      ) : null}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        ) : (
        <div>No notes available</div>
      )}

      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
         <p
           onClick={irRutaAnterior}
          style={{
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                padding: "10px",
                border: "1px solid black"
                }}
         >
         Back
       </p>
    </div>

    </>
  );
};

export default Notes;
