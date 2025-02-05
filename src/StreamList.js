import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";

const categories = ["All", "Movies", "Shows", "Games"];

const StreamList = () => {
  const [userInput, setUserInput] = useState("");
  const [streams, setStreams] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    const storedStreams = JSON.parse(localStorage.getItem("streams"));
    if (storedStreams) {
      setStreams(storedStreams);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("streams", JSON.stringify(streams));
  }, [streams]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userInput.trim()) {
      setStreams([...streams, { id: Date.now(), text: userInput, category: "Movies", watched: false, isEditing: false }]);
      setUserInput("");
    }
  };

  const handleDelete = (id) => {
    setStreams(streams.filter((stream) => stream.id !== id));
  };

  const handleToggleWatched = (id) => {
    setStreams(streams.map((stream) =>
      stream.id === id ? { ...stream, watched: !stream.watched } : stream
    ));
  };

  const handleEdit = (id) => {
    setStreams(streams.map((stream) =>
      stream.id === id && !stream.isEditing ? { ...stream, isEditing: true } : stream
    ));
  };

  const handleUpdate = (id, newText) => {
    setStreams(streams.map((stream) =>
      stream.id === id ? { ...stream, text: newText } : stream
    ));
  };

  const handleSave = (id) => {
    setStreams(streams.map((stream) =>
      stream.id === id ? { ...stream, isEditing: false } : stream
    ));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedStreams = [...streams];
    const [movedStream] = reorderedStreams.splice(result.source.index, 1);
    reorderedStreams.splice(result.destination.index, 0, movedStream);
    setStreams(reorderedStreams);
  };

  return (
    <div className="home-container">
      <div className="overlay">
        <div className="content">
          <h1>🎬 Welcome to Stream List</h1>
          <p className="subheading">Discover and track your favorite streams!</p>

          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter a movie, show, or stream..."
            />
            <button type="submit" className="submit-button">Add to List</button>
          </form>

          {/* Category Filter */}
          <select className="filter-dropdown" onChange={(e) => setFilterCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Display user-submitted streams */}
          {streams.length > 0 && (
            <div className="stream-list">
              <h2 className="streamlist-title">📺 Your Stream List</h2>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="streams">
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className="stream-list">
                      {streams
                        .filter((stream) => filterCategory === "All" || stream.category === filterCategory)
                        .map((stream, index) => (
                          <Draggable key={stream.id} draggableId={stream.id.toString()} index={index}>
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`stream-item ${stream.watched ? "watched" : ""}`}
                              >
                                {stream.isEditing ? (
                                  <input
                                    type="text"
                                    value={stream.text}
                                    onChange={(e) => handleUpdate(stream.id, e.target.value)}
                                    className="edit-input"
                                    autoFocus
                                    onBlur={() => handleSave(stream.id)} // Save on blur
                                    onKeyDown={(e) => e.key === "Enter" && handleSave(stream.id)} // Save on Enter key
                                  />
                                ) : (
                                  <span>{stream.text}</span>
                                )}

                                <div className="stream-buttons">
                                  <button onClick={() => handleToggleWatched(stream.id)} className="watch-button">
                                    {stream.watched ? "Unwatch" : "Watched"}
                                  </button>
                                  <button onClick={() => stream.isEditing ? handleSave(stream.id) : handleEdit(stream.id)} className="edit-button">
                                    {stream.isEditing ? "Save" : "Edit"}
                                  </button>
                                  <button onClick={() => handleDelete(stream.id)} className="delete-button">
                                    Delete
                                  </button>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreamList;
