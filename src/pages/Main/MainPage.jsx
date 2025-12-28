import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { VideoGrid } from "../../app/components/VideoGrid";
import { AddVideoModal } from "../../app/components/AddVideoModal";
import { VideoPlayerModal } from "../../app/components/VideoPlayerModal";
import { useParams } from "react-router-dom";
import useVideo from "@/features/video/presentation/hook/useVideo";
import useAuthStore from "@/features/auth/infrastructure/store/useAuthStore";

function MainPage({ isAdmin, categories }) {
  const { categoryId: selectedCategory } = useParams();
  const { videoList, isPending, isError } = useVideo(selectedCategory);
  const isAuthenticated = useAuthStore(
    (statusbar) => statusbar.isAuthenticated
  );

  // Modal states
  const [addVideoModalOpen, setAddVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);

  // Video-specific handlers
  const handleAddVideo = (videoData) => {
    const newVideo = {
      ...videoData,
      id: Date.now().toString(),
    };
    // setVideos([newVideo, ...videos]);
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
            {videoList.length} {videoList.length === 1 ? "video" : "videos"}
          </p>
        </div>

        <VideoGrid
          videos={videoList}
          isAdmin={isAdmin}
          onPlay={handlePlayVideo}
          onEdit={handleEditVideo}
          onDelete={handleDeleteVideo}
        />
      </div>

      {/* Floating Action Button (Admin Only) */}
      {isAuthenticated && (
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
    </>
  );
}

export default MainPage;
