import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AddVideoModal } from "./AddVideoModal";

// Mock Hooks
const mockUseCategory = vi.fn();
const mockUseAddVideo = vi.fn();
const mockUseUpdateVideo = vi.fn();

vi.mock("@/features/category/presentation/hook/useCategory", () => ({
  default: () => mockUseCategory(),
}));

vi.mock("../hook/useAddVideo", () => ({
  default: () => mockUseAddVideo(),
}));

vi.mock("../hook/useUpdateVideo", () => ({
  default: () => mockUseUpdateVideo(),
}));

describe("AddVideoModal", () => {
  const mockOnClose = vi.fn();
  const mockAddVideoMutate = vi.fn();
  const mockUpdateVideoMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseCategory.mockReturnValue({
      categoryList: [
        { categoryId: 1, name: "BJJ" },
        { categoryId: 2, name: "Judo" },
      ],
      isPending: false,
      isError: false,
    });

    mockUseAddVideo.mockReturnValue({
      mutate: mockAddVideoMutate,
    });

    mockUseUpdateVideo.mockReturnValue({
      mutate: mockUpdateVideoMutate,
    });
  });

  it("should not render when isOpen is false", () => {
    render(<AddVideoModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByText("새 비디오 추가")).not.toBeInTheDocument();
  });

  it("should render correctly when isOpen is true", () => {
    render(<AddVideoModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText("새 비디오 추가")).toBeInTheDocument();
    expect(screen.getByLabelText("유튜브 URL")).toBeInTheDocument();
    expect(screen.getByLabelText("카테고리")).toBeInTheDocument();
  });

  it("should submit new video data", async () => {
    const user = userEvent.setup();
    render(<AddVideoModal isOpen={true} onClose={mockOnClose} />);

    const urlInput = screen.getByLabelText("유튜브 URL");
    const categorySelect = screen.getByLabelText("카테고리");
    const titleInput = screen.getByLabelText("제목");
    const submitButton = screen.getByText("비디오 저장");

    await user.type(urlInput, "https://youtube.com/watch?v=123");
    await user.selectOptions(categorySelect, "1");
    await user.type(titleInput, "My Technique");

    await user.click(submitButton);

    expect(mockAddVideoMutate).toHaveBeenCalledWith({
      url: "https://youtube.com/watch?v=123",
      type: "long",
      note: "",
      title: "My Technique",
      categoryId: 1,
    });
  });

  it("should populate form and submit update when editVideo is provided", async () => {
    const editVideoData = {
      id: 10,
      url: "https://youtube.com/watch?v=999",
      type: "shorts",
      note: "Important note",
      title: "Existing Video",
      category: 2,
    };

    const user = userEvent.setup();
    render(
      <AddVideoModal
        isOpen={true}
        onClose={mockOnClose}
        editVideo={editVideoData}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "비디오 수정" }),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Existing Video")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Important note")).toBeInTheDocument();
    // Check radio button
    const shortsRadio = screen.getByLabelText("쇼츠");
    expect(shortsRadio).toBeChecked();

    const submitButton = screen.getByRole("button", { name: "비디오 수정" });
    await user.click(submitButton);

    expect(mockUpdateVideoMutate).toHaveBeenCalledWith({
      videoId: 10,
      videoData: {
        url: "https://youtube.com/watch?v=999",
        type: "shorts",
        note: "Important note",
        title: "Existing Video",
        categoryId: 2,
      },
    });
  });

  it("should auto-detect shorts URL", async () => {
    const user = userEvent.setup();
    render(<AddVideoModal isOpen={true} onClose={mockOnClose} />);

    const urlInput = screen.getByLabelText("유튜브 URL");
    await user.type(urlInput, "https://youtube.com/shorts/abcde");

    const shortsRadio = screen.getByLabelText("쇼츠");
    expect(shortsRadio).toBeChecked();
  });

  it("should call onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<AddVideoModal isOpen={true} onClose={mockOnClose} />);
    
    // The close button has an X icon inside
    const closeButton = screen.getByRole('button', { name: '' }); // X icon button usually has no text, might need aria-label in component if not present
    // Looking at component: <button onClick={onClose} ...><X .../></button>
    // It doesn't have aria-label. Let's rely on finding the button that contains the SVG or is the close button.
    // In the previous test we saw the close button has X icon.
    // We can find it by class or structure, but better to add aria-label to component for accessiblity and easy testing.
    // However, I must not modify component code here unless I use a separate tool call.
    // I'll assume I can find it by `role="button"` and filtering or index if multiple.
    // Actually, there is a header with title and close button.
    
    // Let's use the container query or querySelector if needed, but `getAllByRole('button')` is safer.
    const buttons = screen.getAllByRole('button');
    // The close button is likely the first one or we can check the icon.
    // Let's modify the component to have aria-label in a separate step if this is hard,
    // but looking at `Header.jsx`, it had aria-label. `AddVideoModal.jsx` does NOT have aria-label for close button.
    // It renders <X /> icon.
    
    // Strategy: click the button that is NOT the submit button.
    const closeBtn = buttons.find(btn => !btn.textContent); 
    await user.click(closeBtn);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should not submit if required fields are missing", async () => {
    const user = userEvent.setup();
    render(<AddVideoModal isOpen={true} onClose={mockOnClose} />);
    
    // Clear URL input (it might be empty initially but let's be sure)
    const urlInput = screen.getByLabelText("유튜브 URL");
    await user.clear(urlInput);
    
    const submitButton = screen.getByText("비디오 저장");
    await user.click(submitButton);
    
    expect(mockAddVideoMutate).not.toHaveBeenCalled();
  });

  it("should update category state when select is changed", async () => {
    const user = userEvent.setup();
    render(<AddVideoModal isOpen={true} onClose={mockOnClose} />);

    const categorySelect = screen.getByLabelText("카테고리");
    await user.selectOptions(categorySelect, "2"); // Select Judo (id: 2)
    
    expect(categorySelect.value).toBe("2");
  });
  
  it("should reset form when reopened (useEffect coverage)", () => {
      const { rerender } = render(<AddVideoModal isOpen={false} onClose={mockOnClose} />);
      
      // Re-render with open
      rerender(<AddVideoModal isOpen={true} onClose={mockOnClose} />);
      
      // Check default values
      expect(screen.getByLabelText("유튜브 URL")).toHaveValue("");
      // Category should default to empty string now
      expect(screen.getByLabelText("카테고리")).toHaveValue("");
  });

  it("should render all categories in the select options", () => {
    render(<AddVideoModal isOpen={true} onClose={mockOnClose} />);
    
    const options = screen.getAllByRole("option");
    // 1 default option ("카테고리 선택") + 2 mock categories
    expect(options).toHaveLength(3); 
    expect(screen.getByRole('option', { name: 'BJJ' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Judo' })).toBeInTheDocument();
  });

  it("should prevent submission if category is not selected (even if default might be set, force empty)", async () => {
     // Override mock to return empty list or handle empty state to force empty category
     mockUseCategory.mockReturnValue({
        categoryList: [], // No categories
        isPending: false,
        isError: false,
     });
     
     const user = userEvent.setup();
     render(<AddVideoModal isOpen={true} onClose={mockOnClose} />);
     
     // URL is entered
     await user.type(screen.getByLabelText("유튜브 URL"), "https://youtube.com/watch?v=123");
     
     // Category select should have only default option with value ""
     const categorySelect = screen.getByLabelText("카테고리");
     expect(categorySelect).toHaveValue("");
     
     await user.click(screen.getByText("비디오 저장"));
     
     expect(mockAddVideoMutate).not.toHaveBeenCalled();
     expect(screen.getByText("URL과 카테고리를 모두 입력해주세요.")).toBeInTheDocument();
  });
});
