

export function Item({ item, onDeleteItem, onToggleItem, onEditItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
      <button onClick={() => onEditItem(item)}>✏️</button>
    </li>
  );
}
