export default function BottomNav({ page, setPage }) {
  const btn = (p) =>
    `flex flex-col items-center text-xs ${
      page === p ? "text-blue-600" : "text-gray-400"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
      <button className={btn("home")} onClick={() => setPage("home")}>
        <span className="text-xl">🏠</span>
        Home
      </button>

      <button className={btn("history")} onClick={() => setPage("history")}>
        <span className="text-xl">📊</span>
        History
      </button>
      
      <button className={btn("calendar")} onClick={() => setPage("calendar")}>
        <span className="text-xl">📅</span>
        Calendar
      </button>
      
      <button className={btn("purchases")} onClick={() => setPage("purchases")}>
        <span className="text-xl">🛒</span>
        Purchases
      </button>

      <button className={btn("settings")} onClick={() => setPage("settings")}>
        <span className="text-xl">⚙️</span>
        Settings
      </button>
    </div>
  );
}
