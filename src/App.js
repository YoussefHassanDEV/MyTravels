import { useState } from "react";
import Logo from "./Logo.js"
import Form from "./Form.js";
import { PackageList } from "./PackageList.js";
import { Stats } from "./Stats.js";
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