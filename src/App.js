import React, { useState } from "react";
import "./style.css";

const App = () => {
  const [columns, setColumns] = useState([
    { title: "Column A", childs: ["A1", "A2", "A3"] },
    { title: "Column B", childs: ["B1", "B2", "B3"] },
    { title: "Column C", childs: ["C1", "C2", "C3"] },
  ]);

  const addColumn = () => {
    setColumns([
      ...columns,
      { title: `Column ${columns.length + 1}`, childs: [] },
    ]);
  };

  const deleteColumn = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const onDragStart = (event, columnIndex, itemIndex) => {
    event.dataTransfer.setData("columnIndex", columnIndex);
    event.dataTransfer.setData("itemIndex", itemIndex);
  };

  const onColumnDragStart = (event, columnIndex) => {
    event.dataTransfer.setData("columnIndex", columnIndex);
    event.dataTransfer.setData("isColumn", "true");
  };

  const onDrop = (event, toColumnIndex) => {
    const fromColumnIndex = parseInt(
      event.dataTransfer.getData("columnIndex")
    );
    const isColumn = event.dataTransfer.getData("isColumn") === "true";
    if (isColumn) {
      const newColumns = [...columns];
      const [column] = newColumns.splice(fromColumnIndex, 1);
      newColumns.splice(toColumnIndex, 0, column);
      setColumns(newColumns);
    } else {
      const itemIndex = parseInt(event.dataTransfer.getData("itemIndex"));
      const newColumns = [...columns];
      const [item] = newColumns[fromColumnIndex].childs.splice(itemIndex, 1);
      newColumns[toColumnIndex].childs.push(item);
      setColumns(newColumns);
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      {columns.map((column, index) => (
        <div
          className="column"
          key={index}
          onDrop={(event) => onDrop(event, index)}
          onDragOver={onDragOver}
        >
          <div
            className="column-header"
            draggable
            onDragStart={(event) => onColumnDragStart(event, index)}
          >
            {column.title}
            <span
              className="delete-icon"
              onClick={() => deleteColumn(index)}
            >
              &#10005;
            </span>
          </div>
          
          <div className="column-body">
            {column.childs.map((child, i) => (
              <div
                className="item"
                key={i}
                draggable
                onDragStart={(event) => onDragStart(event, index, i)}
         
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="add-column" onClick={addColumn}>
        Add Column
      </button>
    </div>
  );
};

export default App;

