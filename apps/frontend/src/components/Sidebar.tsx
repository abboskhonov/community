import { createSignal, For, Show } from "solid-js";
import {
  Home,
  MessageCircle,
  Bell,
  Clock,
  Settings,
  Users,
  Plus,
  Search,
} from "lucide-solid";
import CreateCommunityForm from "././Community/CreateCommunityForm";

const communities = ["SolidJS", "GoFiber", "NextGen", "OpenDev"];

type NavItem = {
  label: string;
  href: string;
};



const Sidebar = () => {
  const [selectedCommunity, setSelectedCommunity] = createSignal(communities[0]);
  const [showDropdown, setShowDropdown] = createSignal(false);
  const [showCreateForm, setShowCreateForm] = createSignal(false);
  const [activeNav, setActiveNav] = createSignal("Home");
  

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
    
    // Handle specific navigation actions
    switch (navItem) {
      case "New":
        setShowCreateForm(true);
        break;
      case "Home":
        // Handle home navigation
        console.log("Navigate to Home");
        break;
      case "DMs":
        // Handle DMs navigation  
        console.log("Navigate to DMs");
        break;
      case "Search":
        // Handle search navigation
        console.log("Open Search");
        break;
      case "Settings":
        // Handle settings navigation
        console.log("Open Settings");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div class="w-20 h-screen bg-white border-r border-gray-200 flex flex-col items-center py-4 relative justify-between">
        <div class="flex flex-col items-center">
          {/* Top - Community Selector */}
          <div class="relative mb-6">
            <button
              class="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center text-white font-semibold text-sm transition-colors mb-2"
              onClick={() => setShowDropdown(!showDropdown())}
            >
              {selectedCommunity().charAt(0)}
            </button>
            <Show when={showDropdown()}>
              <div class="absolute left-12 top-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48 z-50">
                <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                  Communities
                </div>
                <For each={communities}>
                  {(community) => (
                    <button
                      class="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      onClick={() => {
                        setSelectedCommunity(community);
                        setShowDropdown(false);
                      }}
                    >
                      <div class="w-6 h-6 bg-purple-600 rounded text-white text-xs font-semibold flex items-center justify-center">
                        {community.charAt(0)}
                      </div>
                      {community}
                    </button>
                  )}
                </For>
                <div class="border-t border-gray-100 mt-2 pt-2">
                  <button
                    class="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-gray-50"
                    onClick={() => {
                      setShowDropdown(false);
                      setShowCreateForm(true);
                    }}
                  >
                    + Add Community
                  </button>
                </div>
              </div>
            </Show>
          </div>

          {/* Navigation Icons */}
          <div class="flex flex-col gap-4">
            <SidebarItem 
              icon={<Home size={20} />} 
              label="Home" 
              isActive={activeNav() === "Home"}
              onClick={() => handleNavClick("Home")}
            />
            <SidebarItem 
              icon={<MessageCircle size={20} />} 
              label="DMs" 
              isActive={activeNav() === "DMs"}
              onClick={() => handleNavClick("DMs")}
            />
            <SidebarItem 
              icon={<Search size={20} />} 
              label="Search" 
              isActive={activeNav() === "Search"}
              onClick={() => handleNavClick("Search")}
            />
            <SidebarItem 
              icon={<Plus size={20} />} 
              label="New" 
              isActive={activeNav() === "New"}
              onClick={() => handleNavClick("New")}
            />
          </div>
        </div>

        {/* Bottom - Settings */}
        <div class="mb-4">
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            isActive={activeNav() === "Settings"}
            onClick={() => handleNavClick("Settings")}
          />
        </div>
      </div>

      {/* Outside click to close dropdown */}
      <Show when={showDropdown()}>
        <div class="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
      </Show>

      {/* Modal form - moved outside sidebar container */}
      <Show when={showCreateForm()}>
        <div class="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background overlay */}
          <div 
            class="absolute inset-0 bg-black sm-blur bg-opacity-[0.05]" 
            onClick={() => setShowCreateForm(false)}
          />
          {/* Form container */}
          <div class="relative z-10">
            <CreateCommunityForm onClose={() => setShowCreateForm(false)} />
          </div>
        </div>
      </Show>
    </>
  );
};

function SidebarItem(props: { 
  icon: any; 
  label: string; 
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <div 
      class={`flex flex-col items-center text-xs cursor-pointer transition-colors ${
        props.isActive 
          ? 'text-blue-600' 
          : 'text-gray-500 hover:text-blue-600'
      }`}
      onClick={props.onClick}
    >
      <div class={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
        props.isActive 
          ? 'bg-blue-100 text-blue-600' 
          : 'hover:bg-gray-100'
      }`}>
        {props.icon}
      </div>
      <span class="mt-1 text-[10px]">{props.label}</span>
    </div>
  );
}

export default Sidebar;