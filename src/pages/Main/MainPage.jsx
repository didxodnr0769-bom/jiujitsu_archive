import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { VideoGrid } from "../../app/components/VideoGrid";
import { AddVideoModal } from "../../app/components/AddVideoModal";
import { VideoPlayerModal } from "../../app/components/VideoPlayerModal";
import { useParams } from "react-router-dom";

// Mock data for initial state
const initialVideos = [
  {
    id: "1",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Basic Guard Pass Fundamentals",
    type: "long",
    note: "Essential guard passing techniques for beginners. Focus on posture and pressure.",
    category: "Guard Pass",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=450&fit=crop",
  },
  {
    id: "2",
    url: "https://www.youtube.com/shorts/abc123",
    title: "Quick Armbar Setup",
    type: "shorts",
    note: "Fast armbar transition from closed guard",
    category: "Submission",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1583473312262-d978f656f47e?w=800&h=450&fit=crop",
  },
  // ... more videos
];

function MainPage({ isAdmin, categories }) {
  const [videos, setVideos] = useState(initialVideos);
  const { categoryId: selectedCategory } = useParams();

  // Modal states
  const [addVideoModalOpen, setAddVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);

  // When categories change (e.g., one is deleted), update videos
  useEffect(() => {
    console.log(selectedCategory);
    // setVideos((currentVideos) =>
    //   currentVideos.map((v) =>
    //     categories.includes(v.category)
    //       ? v
    //       : { ...v, category: "Uncategorized" }
    //   )
    // );
  }, [selectedCategory]);

  // Filter videos by category
  const filteredVideos = selectedCategory
    ? videos.filter((v) => v.category === selectedCategory)
    : videos;

  // Video-specific handlers
  const handleAddVideo = (videoData) => {
    const newVideo = {
      ...videoData,
      id: Date.now().toString(),
      thumbnailUrl: `https://images.unsplash.com/photo-${Math.floor(
        Math.random() * 1000000000
      )}?w=800&h=450&fit=crop`,
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
          v.id === editingVideo.id ? { ...v, ...videoData } : v
        )
      );
      setEditingVideo(null);
    }
  };

  const handleDeleteVideo = (videoId) => {
    if (confirm("Are you sure you want to delete this video?")) {
      setVideos(videos.filter((v) => v.id !== videoId));
    }
  };

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
  };

  return (
    <>
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-6">
          <h2 className="text-white text-2xl font-semibold">
            {selectedCategory || "All Videos"}
          </h2>
          <p className="text-gray-400 mt-1">
            {filteredVideos.length}{" "}
            {filteredVideos.length === 1 ? "video" : "videos"}
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
      {/* <AddVideoModal
        isOpen={addVideoModalOpen}
        onClose={() => {
          setAddVideoModalOpen(false);
          setEditingVideo(null);
        }}
        onSave={editingVideo ? handleUpdateVideo : handleAddVideo}
        categories={categories}
        editVideo={editingVideo}
      /> */}

      {/* <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      /> */}
    </>
  );
}

export default MainPage;
