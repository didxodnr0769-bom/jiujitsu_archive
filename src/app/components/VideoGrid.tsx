import { VideoCard, Video } from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  isAdmin: boolean;
  onPlay: (video: Video) => void;
  onEdit: (video: Video) => void;
  onDelete: (videoId: string) => void;
}

export function VideoGrid({ videos, isAdmin, onPlay, onEdit, onDelete }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-gray-500 text-center">
          <p className="text-xl mb-2">No videos found</p>
          <p className="text-sm">
            {isAdmin ? 'Click the + button to add your first video' : 'Check back later for content'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          isAdmin={isAdmin}
          onPlay={onPlay}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
