import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { VideoGrid } from "../../app/components/VideoGrid";
import { VideoPlayerModal } from "../../app/components/VideoPlayerModal";
import { useParams } from "react-router-dom";
import useVideo from "@/features/video/presentation/hook/useVideo";
import useAuthStore from "@/features/auth/infrastructure/store/useAuthStore";
import { AddVideoModal } from "@/features/video/presentation/components/AddVideoModal";

function MainPage({ isAdmin, categories }) {
  const { categoryId: selectedCategory } = useParams();
  const { videoList, categoryName, isPending, isError } =
    useVideo(selectedCategory);
  const isAuthenticated = useAuthStore(
    (statusbar) => statusbar.isAuthenticated,
  );

  // Modal states
  const [addVideoModalOpen, setAddVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);

  // Video-specific handlers
  const handleEditVideo = (video) => {
    setEditingVideo(video);
    setAddVideoModalOpen(true);
  };

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
  };

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400">비디오를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-6">
          <h2 className="text-white text-2xl font-semibold">{categoryName}</h2>
          <p className="text-gray-400 mt-1">
            {videoList.length}{" "}
            {videoList.length === 1 ? "개의 비디오" : "개의 비디오"}
          </p>
        </div>

        <VideoGrid
          videos={videoList}
          isAdmin={isAuthenticated}
          onPlay={handlePlayVideo}
          onEdit={handleEditVideo}
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
          aria-label="비디오 추가"
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
        categories={categories}
        editVideo={editingVideo}
      />
    </>
  );
}

export default MainPage;
