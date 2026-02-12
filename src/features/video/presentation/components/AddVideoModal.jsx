import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import useCategory from "@/features/category/presentation/hook/useCategory";
import useAddVideo from "../hook/useAddVideo";
import useUpdateVideo from "../hook/useUpdateVideo";

export function AddVideoModal({ isOpen, onClose, editVideo }) {
  const [url, setUrl] = useState("");
  const [type, setType] = useState("long");
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const { categoryList, isPending, isError } = useCategory();
  const { mutate: addVideo, isPending: isAdding } = useAddVideo();
  const { mutate: updateVideo, isPending: isUpdating } = useUpdateVideo();

  const isSubmitting = isAdding || isUpdating;

  useEffect(() => {
    if (editVideo) {
      setUrl(editVideo.url);
      setType(editVideo.type);
      setNote(editVideo.note);
      setTitle(editVideo.title);
      setCategory(editVideo.category);
    } else {
      setUrl("");
      setType("long");
      setNote("");
      setTitle("");
      setCategory(""); // 카테고리 초기값 빈 문자열로 변경
    }
    setError(""); // 모달 열리거나 모드 변경 시 에러 초기화
  }, [editVideo, categoryList, isOpen]);

  useEffect(() => {
    if (url.includes("youtube.com/shorts/")) {
      setType("shorts");
    }
  }, [url]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url || !category) {
      setError("URL과 카테고리를 모두 입력해주세요.");
      return;
    }
    setError("");

    const videoData = {
      url,
      type,
      note,
      title: title || note,
      categoryId: category,
    };

    if (editVideo) {
      updateVideo(
        { videoId: editVideo.id, videoData },
        {
          onSuccess: () => onClose(),
        }
      );
    } else {
      addVideo(videoData, {
        onSuccess: () => {
          // Reset form and close
          setUrl("");
          setType("long");
          setNote("");
          setTitle("");
          setCategory("");
          onClose();
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-lg w-full max-w-md border border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-white text-xl font-semibold">
            {editVideo ? "비디오 수정" : "새 비디오 추가"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
          <div>
            <label htmlFor="video-url" className="block text-gray-300 mb-2">
              유튜브 URL
            </label>
            <input
              id="video-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-800 focus:border-purple-600 focus:outline-none"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">비디오 유형</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="long"
                  checked={type === "long"}
                  onChange={(e) => setType(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                  disabled={isSubmitting}
                />
                <span className="text-white">일반 영상</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="shorts"
                  checked={type === "shorts"}
                  onChange={(e) => setType(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                  disabled={isSubmitting}
                />
                <span className="text-white">쇼츠</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-300 mb-2">
              카테고리
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-800 focus:border-purple-600 focus:outline-none"
              required
              disabled={isSubmitting}
            >
              <option value="">카테고리 선택</option>
              {categoryList.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="title" className="block text-gray-300 mb-2">
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="비디오 제목"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-800 focus:border-purple-600 focus:outline-none"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="note" className="block text-gray-300 mb-2">
              메모
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="메모나 설명을 추가하세요..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-800 focus:border-purple-600 focus:outline-none resize-none"
              disabled={isSubmitting}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>처리 중...</span>
              </>
            ) : editVideo ? (
              "비디오 수정"
            ) : (
              "비디오 저장"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
