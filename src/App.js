import { useState } from "react";
export default function App() {

  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id))
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleEditItem(item) {
    if (editingItem && editingItem.id === item.id) {
      setEditingItem(null);
    } else {
      setEditingItem(item);
    }
  }
  function handleUpdateItem(id, updatedDescription, updatedQuantity) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ?
          { ...item, description: updatedDescription, quantity: updatedQuantity } :
          item
        )
    );
    setEditingItem(null);
  }
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form
        onAddItems={handleAddItems}
        editingItem={editingItem}
        onUpdateItem={handleUpdateItem}

      />
      <PackageList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
        onEditItem={handleEditItem}
      />
      <Stats items={items} />

    </div>
  )

}
function Logo() {
  return (
    <h1>🏝️ Far Away 👜</h1>
  )
}
function Form({ onAddItems, editingItem, onUpdateItem }) {
  const [description, setDescription] = useState('')
  const [quantity, SetQuantity] = useState(1)
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    if (editingItem) {
      onUpdateItem(editingItem.id, description);
      SetQuantity(editingItem.quantity);

    } else {
      const newItem = {
        id: Date.now(),
        description,
        quantity,
        packed: false,
      };
      onAddItems(newItem);
    }

    setDescription("");
    SetQuantity(1);
  }


  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>{editingItem ? "Edit your item" : "What do you need for your trip 😍?"}</h3>
      <select value={quantity} onChange={(e) => SetQuantity(Number(e.target.value))}>
        {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">
        {editingItem ? "Update" : "Add"}
      </button>
    </form>
  );

}
function PackageList({ items, onDeleteItem, onToggleItem, onClearList, onEditItem }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            onEditItem={onEditItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
function Item({ item, onDeleteItem, onToggleItem, onEditItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
      <button onClick={() => onEditItem(item)}>✏️</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : ` 💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}