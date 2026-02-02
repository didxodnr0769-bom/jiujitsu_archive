import { VideoCard } from "./VideoCard";

export function VideoGrid({ videos, isAdmin, onPlay, onEdit, onDelete }) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-gray-500 text-center">
          <p className="text-xl mb-2">비디오를 찾을 수 없습니다</p>
          <p className="text-sm">
            {isAdmin
              ? "+ 버튼을 눌러 첫 번째 비디오를 추가하세요"
              : "나중에 다시 확인해주세요"}
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
