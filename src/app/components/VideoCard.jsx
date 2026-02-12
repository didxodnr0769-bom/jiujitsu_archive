import { Edit2, Trash2, Loader2 } from "lucide-react";
import useDeleteVideo from "@/features/video/presentation/hook/useDeleteVideo";

// Helper function to convert YouTube watch URL to embed URL
const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    const videoUrl = `https://www.youtube.com/embed/${match[2]}?autoplay=0&controls=1`;
    return videoUrl;
  }
  return "";
};

export function VideoCard({ video, isAdmin, onPlay, onEdit }) {
  const { mutate: deleteVideo, isPending: isDeleting } = useDeleteVideo();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteVideo(video.id);
    }
  };

  return (
    <div className="group relative bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-purple-600 transition-all">
      {/* Embedded Video */}
      <div className="relative aspect-video bg-gray-900">
        <iframe
          src={getYouTubeEmbedUrl(video.url)}
          // src="https://www.youtube.com/embed/m7hrbYSsL68"
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full absolute top-0 left-0"
          frameBorder="0"
        ></iframe>

        {/* Type Badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`
              px-2 py-1 text-xs font-semibold rounded
              ${
                video.type === "shorts"
                  ? "bg-red-600 text-white"
                  : "bg-blue-600 text-white"
              }
            `}
          >
            {video.type === "shorts" ? "쇼츠" : "일반 영상"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold mb-1 line-clamp-2">
          {video.title || "제목 없음"}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2">{video.note}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-purple-400 text-xs">{video.category}</span>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(video);
                }}
                className="p-1.5 text-gray-400 hover:text-purple-400 hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="비디오 수정"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="비디오 삭제"
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
