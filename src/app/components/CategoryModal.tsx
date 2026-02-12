import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Loader2, Pencil, Check } from 'lucide-react';

interface Category {
  categoryId: number;
  name: string;
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onAddCategory: (name: string) => void;
  onUpdateCategory: (categoryId: number, name: string) => void;
  onDeleteCategory: (categoryId: number) => void;
  isAdding?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export function CategoryModal({
  isOpen,
  onClose,
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  isAdding = false,
  isUpdating = false,
  isDeleting = false,
}: CategoryModalProps) {
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setEditingId(null);
      setEditName('');
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const startEditing = (category: Category) => {
    setEditingId(category.categoryId);
    setEditName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
  };

  const saveEditing = (categoryId: number) => {
    if (editName.trim() && editName !== categories.find(c => c.categoryId === categoryId)?.name) {
      onUpdateCategory(categoryId, editName.trim());
    }
    setEditingId(null);
    setEditName('');
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-lg w-full max-w-md border border-gray-800 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 shrink-0">
          <h2 className="text-white text-xl font-semibold">카테고리 관리</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Add Category Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <label htmlFor="new-category" className="block text-gray-300 mb-2">
              새 카테고리 추가
            </label>
            <div className="flex gap-2">
              <input
                id="new-category"
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="카테고리 이름"
                className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-800 focus:border-purple-600 focus:outline-none"
                disabled={isAdding}
              />
              <button
                type="submit"
                disabled={isAdding}
                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[3.5rem]"
              >
                {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              </button>
            </div>
          </form>

          {/* Categories List */}
          <div>
            <h3 className="text-gray-300 mb-3">기존 카테고리</h3>
            {categories.length === 0 ? (
              <p className="text-gray-500 text-center py-4">등록된 카테고리가 없습니다</p>
            ) : (
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.categoryId}
                    className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-800"
                  >
                    {editingId === category.categoryId ? (
                      <div className="flex flex-1 gap-2 mr-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="flex-1 px-2 py-1 bg-gray-800 text-white rounded border border-gray-700 focus:border-purple-600 focus:outline-none"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEditing(category.categoryId);
                            if (e.key === 'Escape') cancelEditing();
                          }}
                        />
                        <button
                          onClick={() => saveEditing(category.categoryId)}
                          disabled={isUpdating}
                          className="p-1 text-green-500 hover:bg-gray-800 rounded transition-colors"
                        >
                          {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={cancelEditing}
                          disabled={isUpdating}
                          className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-white">{category.name}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEditing(category)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            aria-label={`${category.name} 수정`}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteCategory(category.categoryId)}
                            disabled={isDeleting}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label={`${category.name} 삭제`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
