import { useEffect, useState } from "react";
import {
  addPurchaseItem,
  loadPurchaseItems,
  deletePurchaseItem,
  updatePurchaseItem
} from "../firebase/firestore";

const CATEGORIES = [
  "Groceries",
  "Health",
  "Electronics",
  "Home",
  "Other"
];

export default function Purchases() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Groceries");
  const [hideCompleted, setHideCompleted] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    loadPurchaseItems().then(setItems);
  }, []);

  const reload = async () => {
    setItems(await loadPurchaseItems());
  };

  const addItem = async () => {
    if (!text.trim()) return;
    await addPurchaseItem({
      name: text,
      category,
      completed: false
    });
    setText("");
    setCategory("Groceries");
    reload();
  };

  const toggleCompleted = async (item) => {
    await updatePurchaseItem(item.id, {
      completed: !item.completed
    });
    reload();
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this item?")) return;
    await deletePurchaseItem(id);
    reload();
  };

  const saveEdit = async (item) => {
    if (!editText.trim()) {
      setEditingId(null);
      return;
    }
    await updatePurchaseItem(item.id, { name: editText });
    setEditingId(null);
    reload();
  };

  const visibleItems = hideCompleted
    ? items.filter(i => !i.completed)
    : items;

  // Group by category
  const grouped = visibleItems.reduce((acc, item) => {
    const cat = item.category || "Other";
    acc[cat] = acc[cat] || [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">🛒 Purchase List</h2>

      {/* Add item */}
      <div className="flex gap-2 mb-3">
        <input
          className="flex-1 border rounded p-2"
          placeholder="Add item"
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <select
          className="border rounded p-2"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={addItem}
          className="bg-blue-600 text-white px-4 rounded"
        >
          +
        </button>
      </div>

      {/* Controls */}
      <label className="flex items-center gap-2 text-sm mb-3">
        <input
          type="checkbox"
          checked={hideCompleted}
          onChange={() => setHideCompleted(!hideCompleted)}
        />
        Hide purchased items
      </label>

      {/* Grouped list */}
      <div className="space-y-4">
        {Object.keys(grouped).map(cat => (
          <div key={cat}>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              {cat}
            </h3>

            <div className="space-y-2">
              {grouped[cat].map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white border rounded p-2"
                >
                  <label className="flex items-center gap-2 flex-1">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleCompleted(item)}
                    />

                    {editingId === item.id ? (
                      <input
                        className="flex-1 border-b outline-none"
                        value={editText}
                        autoFocus
                        onChange={e => setEditText(e.target.value)}
                        onBlur={() => saveEdit(item)}
                        onKeyDown={e =>
                          e.key === "Enter" && saveEdit(item)
                        }
                      />
                    ) : (
                      <span
                        className={
                          item.completed
                            ? "line-through text-gray-400"
                            : ""
                        }
                      >
                        {item.name}
                      </span>
                    )}
                  </label>

                  {/* Actions */}
                  {editingId !== item.id && (
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditText(item.name);
                      }}
                      className="text-blue-600 text-sm mr-2"
                    >
                      ✏️
                    </button>
                  )}

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 text-sm"
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {visibleItems.length === 0 && (
          <div className="text-sm text-gray-500">
            No items to show
          </div>
        )}
      </div>
    </div>
  );
}
