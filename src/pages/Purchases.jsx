import { useEffect, useState } from "react";
import {
  addPurchaseItem,
  loadPurchaseItems
} from "../firebase/firestore";

export default function Purchases() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    loadPurchaseItems().then(setItems);
  }, []);

  const addItem = async () => {
    if (!text) return;
    await addPurchaseItem(text);
    setItems([...items, { name: text, completed: false }]);
    setText("");
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        🛒 Purchase List
      </h2>

      <div className="flex mb-4">
        <input
          className="flex-1 border p-2 rounded"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add item"
        />
        <button
          onClick={addItem}
          className="ml-2 bg-blue-600 text-white px-4 rounded"
        >
          +
        </button>
      </div>

      {items.map((i, idx) => (
        <label key={idx} className="flex gap-2 mb-2">
          <input type="checkbox" />
          {i.name}
        </label>
      ))}
    </div>
  );
}