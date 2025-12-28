import { Edit2, Trash2 } from "lucide-react";

// Helper function to convert YouTube watch URL to embed URL
const getYouTubeEmbedUrl = (url) => {
  console.log(url);
  if (!url) return "";
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=0&controls=1`;
  }
  return "";
};

export function VideoCard({ video, isAdmin, onPlay, onEdit, onDelete }) {
  return (
    <div className="group relative bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-purple-600 transition-all">
      {/* Embedded Video */}
      <div className="relative aspect-video bg-gray-900">
        <iframe
          src={getYouTubeEmbedUrl(video.videoUrl)}
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
            {video.type === "shorts" ? "Shorts" : "Long-form"}
          </span>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(video);
              }}
              className="p-2 bg-gray-900/90 text-white rounded-lg hover:bg-purple-600 transition-colors"
              aria-label="Edit video"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(video.id);
              }}
              className="p-2 bg-gray-900/90 text-white rounded-lg hover:bg-red-600 transition-colors"
              aria-label="Delete video"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold mb-1 line-clamp-2">
          {video.title || "Untitled Video"}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2">{video.note}</p>
        <div className="mt-2">
          <span className="text-purple-400 text-xs">{video.category}</span>
        </div>
      </div>
    </div>
  );
}
