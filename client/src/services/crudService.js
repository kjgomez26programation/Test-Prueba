export const createNote = async (notes, email) => {
  try {
    const response = await fetch("http://localhost:3001/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...notes, email }),
    });

    if (!response.ok) {
      throw new Error("Error creating user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNotes = async (email) => {
  try {
    const response = await fetch(`http://localhost:3001/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Error creating user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    await fetch(`http://localhost:3001/notes/${id}`, {
      method: "DELETE",
    });
    // alert("La nota se eliminó exitosamente");
    // window.location.reload();
  } catch (error) {
    console.error("Error al eliminar la nota:", error);
  }
};

export const updateNote = async (data, id) => {
  console.log(data, "ID: _", id);
  try {
    await fetch(`http://localhost:3001/notes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    alert("The note has been successfully modified");
  } catch (error) {
    console.error("Error al modificar la nota:", error);
  }
};
