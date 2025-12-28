import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { VideoCard } from "./VideoCard";

export function AddVideoModal({
  isOpen,
  onClose,
  onSave,
  categories,
  editVideo,
}) {
  const [url, setUrl] = useState("");
  const [type, setType] = useState("long");
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

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
      setCategory(categories[0] || "");
    }
  }, [editVideo, categories, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url || !category) return;

    onSave({
      url,
      type,
      note,
      title: title || note,
      category,
    });

    // Reset form
    setUrl("");
    setType("long");
    setNote("");
    setTitle("");
    setCategory(categories[0] || "");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-lg w-full max-w-md border border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-white text-xl font-semibold">
            {editVideo ? "Edit Video" : "Add New Video"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="video-url" className="block text-gray-300 mb-2">
              YouTube URL
            </label>
            <input
              id="video-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-800 focus:border-purple-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Video Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="long"
                  checked={type === "long"}
                  onChange={(e) => setType(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-white">Long-form</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="shorts"
                  checked={type === "shorts"}
                  onChange={(e) => setType(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-white">Shorts</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-300 mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-800 focus:border-purple-600 focus:outline-none"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="title" className="block text-gray-300 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Video title"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-800 focus:border-purple-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="note" className="block text-gray-300 mb-2">
              Note
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note or description..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-800 focus:border-purple-600 focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            {editVideo ? "Update Video" : "Save Video"}
          </button>
        </form>
      </div>
    </div>
  );
}
