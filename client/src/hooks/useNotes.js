import { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/crudService";

const useNotes = (email) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const data = await getNotes(email);

      if (Array.isArray(data)) {
        setNotes(data);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addNote = async (note) => {
    try {
      const data = await createNote(note, email);
      setNotes((prevNotes) => [...prevNotes, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateNoteById = async (id, updatedNote) => {
    try {
      await updateNote(updatedNote, id);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, ...updatedNote } : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNoteById = async (id) => {
    // console.log("BORRO 1");
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      //   console.log("BORRO 2");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [email]);

  return { notes, addNote, updateNoteById, deleteNoteById };
};

export default useNotes;
