import { logout } from "../../firebase/auth";

export default function UserSettings() {
  return (
    <div className="p-4">
      <img
        src="https://i.pravatar.cc/100"
        className="w-20 h-20 rounded-full mb-4"
        alt="User"
      />

      <div className="font-medium mb-6">
        Settings
      </div>

      <button
        onClick={logout}
        className="text-red-600 font-medium"
      >
        Logout
      </button>
    </div>
  );
}
