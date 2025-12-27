import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header } from '../../app/components/Header';
import { Sidebar } from '../../app/components/Sidebar';
import { VideoGrid } from '../../app/components/VideoGrid';
import { AddVideoModal } from '../../app/components/AddVideoModal';
import { VideoPlayerModal } from '../../app/components/VideoPlayerModal';
import { CategoryModal } from '../../app/components/CategoryModal';


// Mock data for initial state
const initialCategories = [
  'Guard Pass',
  'Takedown',
  'Submission',
  'Escape',
  'Sweep',
  'Position',
];

const initialVideos = [
  {
    id: '1',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Basic Guard Pass Fundamentals',
    type: 'long',
    note: 'Essential guard passing techniques for beginners. Focus on posture and pressure.',
    category: 'Guard Pass',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=450&fit=crop',
  },
  {
    id: '2',
    url: 'https://www.youtube.com/shorts/abc123',
    title: 'Quick Armbar Setup',
    type: 'shorts',
    note: 'Fast armbar transition from closed guard',
    category: 'Submission',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583473312262-d978f656f47e?w=800&h=450&fit=crop',
  },
  {
    id: '3',
    url: 'https://www.youtube.com/watch?v=example3',
    title: 'Double Leg Takedown Drilling',
    type: 'long',
    note: 'Step-by-step breakdown of the double leg takedown with common mistakes to avoid.',
    category: 'Takedown',
    thumbnailUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=450&fit=crop',
  },
  {
    id: '4',
    url: 'https://www.youtube.com/watch?v=example4',
    title: 'Triangle Choke from Guard',
    type: 'long',
    note: 'Complete guide to setting up and finishing the triangle choke',
    category: 'Submission',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=800&h=450&fit=crop',
  },
  {
    id: '5',
    url: 'https://www.youtube.com/shorts/def456',
    title: 'Hip Escape Drill',
    type: 'shorts',
    note: 'Quick tip for better hip mobility',
    category: 'Escape',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=450&fit=crop',
  },
  {
    id: '6',
    url: 'https://www.youtube.com/watch?v=example6',
    title: 'Mount Maintenance and Control',
    type: 'long',
    note: 'Learn how to maintain and control the mount position effectively',
    category: 'Position',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=450&fit=crop',
  },
  {
    id: '7',
    url: 'https://www.youtube.com/watch?v=example7',
    title: 'Scissor Sweep from Closed Guard',
    type: 'long',
    note: 'High percentage sweep for all levels',
    category: 'Sweep',
    thumbnailUrl: 'https://images.unsplash.com/photo-1577219492395-eef9ef6f77d8?w=800&h=450&fit=crop',
  },
  {
    id: '8',
    url: 'https://www.youtube.com/shorts/ghi789',
    title: 'Standing Guard Break',
    type: 'shorts',
    note: 'Simple standing guard break technique',
    category: 'Guard Pass',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551027136-e4440a1ea86f?w=800&h=450&fit=crop',
  },
];

function MainPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [videos, setVideos] = useState(initialVideos);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Modal states
  const [addVideoModalOpen, setAddVideoModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);

  // Filter videos by category
  const filteredVideos = selectedCategory
    ? videos.filter((v) => v.category === selectedCategory)
    : videos;

  // Handlers
  const handleLogin = () => {
    setIsAdmin(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleAddVideo = (videoData) => {
    const newVideo = {
      ...videoData,
      id: Date.now().toString(),
      thumbnailUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=800&h=450&fit=crop`,
    };
    setVideos([newVideo, ...videos]);
  };

  const handleEditVideo = (video) => {
    setEditingVideo(video);
    setAddVideoModalOpen(true);
  };

  const handleUpdateVideo = (videoData) => {
    if (editingVideo) {
      setVideos(
        videos.map((v) =>
          v.id === editingVideo.id
            ? { ...v, ...videoData }
            : v
        )
      );
      setEditingVideo(null);
    }
  };

  const handleDeleteVideo = (videoId) => {
    if (confirm('Are you sure you want to delete this video?')) {
      setVideos(videos.filter((v) => v.id !== videoId));
    }
  };

  const handleAddCategory = (name) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
    }
  };

  const handleDeleteCategory = (name) => {
    if (confirm(`Delete category "${name}"? Videos in this category will remain but be uncategorized.`)) {
      setCategories(categories.filter((c) => c !== name));
      // Optionally update videos in this category
      setVideos(
        videos.map((v) =>
          v.category === name ? { ...v, category: 'Uncategorized' } : v
        )
      );
    }
  };

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        isAdmin={isAdmin}
        onManageCategories={() => setCategoryModalOpen(true)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          isAdmin={isAdmin}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-[1800px] mx-auto">
            <div className="mb-6">
              <h2 className="text-white text-2xl font-semibold">
                {selectedCategory || 'All Videos'}
              </h2>
              <p className="text-gray-400 mt-1">
                {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'}
              </p>
            </div>

            <VideoGrid
              videos={filteredVideos}
              isAdmin={isAdmin}
              onPlay={handlePlayVideo}
              onEdit={handleEditVideo}
              onDelete={handleDeleteVideo}
            />
          </div>
        </main>
      </div>

      {/* Floating Action Button (Admin Only) */}
      {isAdmin && (
        <button
          onClick={() => {
            setEditingVideo(null);
            setAddVideoModalOpen(true);
          }}
          className="fixed bottom-6 right-6 w-16 h-16 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all hover:scale-110 flex items-center justify-center z-30"
          aria-label="Add video"
        >
          <Plus className="w-8 h-8" />
        </button>
      )}

      {/* Modals */}
      <AddVideoModal
        isOpen={addVideoModalOpen}
        onClose={() => {
          setAddVideoModalOpen(false);
          setEditingVideo(null);
        }}
        onSave={editingVideo ? handleUpdateVideo : handleAddVideo}
        categories={categories}
        editVideo={editingVideo}
      />

      <CategoryModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}

export default MainPage;