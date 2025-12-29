export default function AddTaskFAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-6 w-14 h-14 bg-blue-600 text-white rounded-full text-3xl shadow-lg flex items-center justify-center"
    >
      +
    </button>
  );
}
