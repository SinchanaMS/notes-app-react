import axios from "axios";
import Toast from "../components/Toast";

export const addToNotesList = async (note, noteDispatch) => {
  try {
    const response = await axios.post(
      "/api/notes",
      { note },
      {
        headers: {
          authorization: localStorage.getItem("userToken"),
        },
      }
    );
    if (response.status === 201) {
      noteDispatch({ type: "ADD_NOTE", payload: response.data.notes });
    }
  } catch (error) {
    Toast({ type: "error", message: "Please login" });
    console.log(error);
  }
};

export const editNote = async (note, noteDispatch) => {
  try {
    const response = await axios.post(
      `/api/notes/${note._id}`,
      { note },
      {
        headers: {
          authorization: localStorage.getItem("userToken"),
        },
      }
    );
    if (response.status === 201) {
      noteDispatch({ type: "EDIT_NOTE", payload: response.data.notes });
    }
  } catch (error) {
    Toast({ type: "error", message: "Oops! Some error occurred." });
    console.log(error);
  }
};

export const deleteNote = async (note, noteDispatch) => {
  try {
    const response = await axios.delete(`/api/notes/${note._id}`, {
      headers: {
        authorization: localStorage.getItem("userToken"),
      },
    });
    if (response.status === 200) {
      noteDispatch({ type: "DELETE_NOTE", payload: response.data.notes });
      noteDispatch({ type: "ADD_TO_TRASH", payload: note });
      Toast({ type: "success", message: "Note deleted" });
    }
  } catch (error) {
    console.log(error);
    Toast({ type: "error", message: "Oops! Some error occurred." });
  }
};

export const restoreFromTrash = async (note, noteDispatch) => {
  try {
    const response = await axios.post(
      "/api/notes",
      { note },
      {
        headers: {
          authorization: localStorage.getItem("userToken"),
        },
      }
    );
    if (response.status === 201) {
      noteDispatch({ type: "RESTORE_FROM_TRASH", payload: note });
      noteDispatch({ type: "RESTORE_NOTE", payload: response.data.notes });
      Toast({ type: "success", message: "Note restored from trash" });
    }
  } catch (error) {
    console.log(error);
    Toast({ type: "error", message: "Oops! Some error occurred." });
  }
};

export const archiveNote = async (note, noteDispatch) => {
  try {
    const response = await axios.post(
      `/api/notes/archives/${note._id}`,
      { note },
      {
        headers: {
          authorization: localStorage.getItem("userToken"),
        },
      }
    );
    if (response.status === 201) {
      noteDispatch({ type: "ARCHIVE_NOTE", payload: response.data });
      Toast({ type: "success", message: "Note archived" });
    }
  } catch (error) {
    console.log(error);
    Toast({ type: "error", message: "Oops! Some error occurred." });
  }
};

export const restoreFromArchive = async (note, noteDispatch) => {
  try {
    const response = await axios.post(
      `/api/archives/restore/${note._id}`,
      {},
      {
        headers: {
          authorization: localStorage.getItem("userToken"),
        },
      }
    );
    if (response.status === 200) {
      noteDispatch({ type: "RESTORE_FROM_ARCHIVE", payload: response.data });
      Toast({ type: "success", message: "Note restored from archives" });
    }
  } catch (error) {
    console.log(error);
    Toast({ type: "error", message: "Oops! Some error occurred." });
  }
};

export const deleteFromArchive = async (note, noteDispatch) => {
  try {
    const response = await axios.delete(`/api/archives/delete/${note._id}`, {
      headers: {
        authorization: localStorage.getItem("userToken"),
      },
    });
    if (response.status === 200) {
      noteDispatch({ type: "DELETE_FROM_ARCHIVE", payload: response.data });
      Toast({ type: "success", message: "Note deleted" });
    }
  } catch (error) {
    console.log(error);
    Toast({ type: "error", message: "Oops! Some error occurred." });
  }
};

export const addLabels = (label, noteDispatch) => {
  noteDispatch({ type: "ADD_LABEL", payload: label });
};

export const deleteLabel = (label, noteDispatch) => {
  noteDispatch({ type: "DELETE_LABEL", payload: label });
};
