import { createSignal, Show } from "solid-js";
import {
  Home,
  MessageCircle,
  Plus,
  Search,
  Settings,
  Users,
  X,
} from "lucide-solid";
import SidebarItem from "./sidebarItem";
import CommunityList from "./communityList";
import CreateCommunityForm from "././Community/CreateCommunityForm";

export default function Sidebar() {
  const [showCommunitiesPanel, setShowCommunitiesPanel] = createSignal(false);
  const [showCreateForm, setShowCreateForm] = createSignal(false);

  const toggleCommunitiesPanel = () => {
    setShowCommunitiesPanel((prev) => !prev);
  };

  return (
    <>
      {/* Left Sidebar */}
      <aside class="fixed left-0 top-0 h-screen w-20 bg-white border-r border-gray-200 text-gray-700 flex flex-col justify-between items-center py-4 shadow-sm z-30">
        <div class="flex flex-col gap-4 items-center">
          <SidebarItem
            icon={<Users size={20} />}
            label="Communities"
            onClick={toggleCommunitiesPanel}
          />
          <SidebarItem icon={<MessageCircle size={20} />} label="Chats" />
          <SidebarItem
            icon={<Plus size={20} />}
            label="Add"
            onClick={() => setShowCreateForm(true)}
          />
          <SidebarItem icon={<Search size={20} />} label="Search" />
        </div>

        <div class="flex flex-col items-center">
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* Communities Panel */}
      <Show when={showCommunitiesPanel()}>
        <aside class="fixed left-20 top-0 h-screen w-72 bg-white border-r border-gray-200 shadow-md z-40">
          <CommunityList />
        </aside>
      </Show>

      {/* Create Community Form Modal */}
      <Show when={showCreateForm()}>
        <div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div class="relative w-full max-w-2xl bg-white p-6 rounded-lg shadow-xl">
            <button
              onClick={() => setShowCreateForm(false)}
              class="absolute top-3 right-3 text-gray-500 hover:text-red-600"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <CreateCommunityForm />
          </div>
        </div>
      </Show>
    </>
  );
}
