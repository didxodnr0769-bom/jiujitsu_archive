import { X } from 'lucide-react';
import { Video } from './VideoCard';

interface VideoPlayerModalProps {
  video: Video | null;
  onClose: () => void;
}

export function VideoPlayerModal({ video, onClose }: VideoPlayerModalProps) {
  if (!video) return null;

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const videoId = getYouTubeVideoId(video.url);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video Player */}
        <div
          className={`
            bg-black rounded-lg overflow-hidden mx-auto
            ${video.type === 'shorts' ? 'max-w-md aspect-[9/16]' : 'aspect-video'}
          `}
        >
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <p>유효하지 않은 비디오 URL</p>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="mt-4 text-white">
          <h2 className="text-2xl font-semibold mb-2">{video.title}</h2>
          {video.note && <p className="text-gray-300">{video.note}</p>}
          <div className="mt-2 flex gap-2 items-center">
            <span
              className={`
                px-3 py-1 text-xs font-semibold rounded
                ${video.type === 'shorts' ? 'bg-red-600' : 'bg-blue-600'}
              `}
            >
              {video.type === 'shorts' ? '쇼츠' : '일반 영상'}
            </span>
            <span className="text-purple-400 text-sm">{video.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
