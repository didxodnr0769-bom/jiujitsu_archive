import { Edit2, Trash2, Play } from 'lucide-react';

export interface Video {
  id: string;
  url: string;
  title: string;
  type: 'shorts' | 'long';
  note: string;
  category: string;
  thumbnailUrl: string;
}

interface VideoCardProps {
  video: Video;
  isAdmin: boolean;
  onPlay: (video: Video) => void;
  onEdit: (video: Video) => void;
  onDelete: (videoId: string) => void;
}

export function VideoCard({ video, isAdmin, onPlay, onEdit, onDelete }: VideoCardProps) {
  return (
    <div className="group relative bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-purple-600 transition-all">
      {/* Thumbnail */}
      <div
        className="relative aspect-video bg-gray-900 cursor-pointer"
        onClick={() => onPlay(video)}
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </div>
        </div>
        
        {/* Type Badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`
              px-2 py-1 text-xs font-semibold rounded
              ${
                video.type === 'shorts'
                  ? 'bg-red-600 text-white'
                  : 'bg-blue-600 text-white'
              }
            `}
          >
            {video.type === 'shorts' ? 'Shorts' : 'Long-form'}
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
          {video.title || 'Untitled Video'}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2">{video.note}</p>
        <div className="mt-2">
          <span className="text-purple-400 text-xs">{video.category}</span>
        </div>
      </div>
    </div>
  );
}
