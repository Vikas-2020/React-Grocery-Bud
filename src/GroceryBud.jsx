import React, { useState } from "react";
import "./GroceryBud.css";

const GroceryBud = () => {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [toasts, setToasts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item) {
      showToast("Please Provide Value", false);
      return;
    }
    const newItem = { id: Date.now(), name: item, completed: false };
    setList([...list, newItem]);
    setItem("");
    showToast("Item added to list!", true);
  };

  const toggleComplete = (id) => {
    const newList = list.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setList(newList);
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showToast("Item removed!", true);
  };

  const showToast = (message, isSuccess) => {
    const id = Date.now();
    const newToast = { id, message, isSuccess };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Remove this toast after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 5000);
  };

  return (
    <section className="section-center">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <button
              className="close-btn"
              onClick={() =>
                setToasts((prevToasts) =>
                  prevToasts.filter((t) => t.id !== toast.id)
                )
              }
            >
              ×
            </button>
            <p>{toast.message}</p>
            <div
              className="timer"
              style={{ backgroundColor: toast.isSuccess ? "#00ff00" : "#ff0000" }}
            ></div>
          </div>
        ))}
      </div>

      <form className="grocery-form" onSubmit={handleSubmit}>
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            Add
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="grocery-container">
          <ul className="grocery-list">
            {list.map((grocery) => (
              <li key={grocery.id} className="grocery-item">
                <div className="item-content">
                  <input
                    type="checkbox"
                    checked={grocery.completed}
                    onChange={() => toggleComplete(grocery.id)}
                  />
                  <span className={grocery.completed ? "completed" : ""}>
                    {grocery.name}
                  </span>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => removeItem(grocery.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default GroceryBud;
