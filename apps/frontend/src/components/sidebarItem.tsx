export default function SidebarItem({ icon, label, onClick }) {
  return (
    <button
      title={label}
      onClick={onClick}  // Make sure this is just onClick, not onClick()
      class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200"
    >
      {icon}
    </button>
  );
}