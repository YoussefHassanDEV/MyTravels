import { useState } from "react";
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
export default Form;