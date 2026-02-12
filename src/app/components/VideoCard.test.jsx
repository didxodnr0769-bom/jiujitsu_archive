import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { VideoCard } from "./VideoCard";

describe("VideoCard Component", () => {
  const mockVideo = {
    id: 1,
    title: "Awesome Technique",
    url: "https://www.youtube.com/watch?v=12345678901",
    type: "long",
    note: "Very useful for beginners",
    category: "BJJ",
  };

  const mockShortsVideo = {
    ...mockVideo,
    type: "shorts",
    url: "https://www.youtube.com/shorts/12345678901",
  };

  it("should render video information correctly", () => {
    render(
      <VideoCard
        video={mockVideo}
        isAdmin={false}
        onPlay={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText("Awesome Technique")).toBeInTheDocument();
    expect(screen.getByText("Very useful for beginners")).toBeInTheDocument();
    expect(screen.getByText("일반 영상")).toBeInTheDocument();
    expect(screen.getByText("BJJ")).toBeInTheDocument();
  });

  it("should render correct badge for shorts", () => {
    render(
      <VideoCard
        video={mockShortsVideo}
        isAdmin={false}
        onPlay={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText("쇼츠")).toBeInTheDocument();
    expect(screen.queryByText("일반 영상")).not.toBeInTheDocument();
  });

  it("should not show edit/delete buttons when not admin", () => {
    render(
      <VideoCard
        video={mockVideo}
        isAdmin={false}
        onPlay={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.queryByLabelText("비디오 수정")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("비디오 삭제")).not.toBeInTheDocument();
  });

  it("should show edit/delete buttons when admin", () => {
    render(
      <VideoCard
        video={mockVideo}
        isAdmin={true}
        onPlay={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("비디오 수정")).toBeInTheDocument();
    expect(screen.getByLabelText("비디오 삭제")).toBeInTheDocument();
  });

  it("should call onEdit when edit button is clicked", () => {
    const handleEdit = vi.fn();
    render(
      <VideoCard
        video={mockVideo}
        isAdmin={true}
        onPlay={vi.fn()}
        onEdit={handleEdit}
        onDelete={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByLabelText("비디오 수정"));
    expect(handleEdit).toHaveBeenCalledWith(mockVideo);
  });

  it("should call onDelete when delete button is clicked", () => {
    const handleDelete = vi.fn();
    render(
      <VideoCard
        video={mockVideo}
        isAdmin={true}
        onPlay={vi.fn()}
        onEdit={vi.fn()}
        onDelete={handleDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText("비디오 삭제"));
    expect(handleDelete).toHaveBeenCalledWith(mockVideo.id);
  });

  it("should handle various YouTube URL formats correctly", () => {
    const urls = [
      {
        raw: "https://youtu.be/abcdefghijk",
        expected: "https://www.youtube.com/embed/abcdefghijk?autoplay=0&controls=1",
      },
      {
        raw: "https://www.youtube.com/embed/abcdefghijk",
        expected: "https://www.youtube.com/embed/abcdefghijk?autoplay=0&controls=1",
      },
      {
        raw: "invalid-url",
        expected: "", // Should handle gracefully (empty src or logic in component)
      },
    ];

    urls.forEach(({ raw, expected }) => {
      const { unmount } = render(
        <VideoCard
          video={{ ...mockVideo, url: raw }}
          isAdmin={false}
          onPlay={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />,
      );
      
      // If expected is empty, iframe src might be empty or about:blank depending on browser/jsdom
      // Here we check if it contains the ID if valid, or just check the attribute
      const iframe = screen.getByTitle(mockVideo.title);
      
      if (expected) {
        expect(iframe).toHaveAttribute("src", expected);
      } else {
         // Invalid URL case: src might be empty string based on helper function
         expect(iframe).toHaveAttribute("src", "");
      }
      
      unmount();
    });
  });

  it("should return empty embed URL when video URL is missing", () => {
    // This covers `if (!url) return ""` in helper
    render(
      <VideoCard
        video={{ ...mockVideo, url: "" }}
        isAdmin={false}
        onPlay={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    // When URL is empty, src attribute might be empty or missing depending on browser behavior,
    // checking for empty string or just rendering without crash is enough for coverage.
    // The iframe is rendered with src=""
    const iframe = screen.getByTitle(mockVideo.title);
    expect(iframe).toHaveAttribute("src", "");
  });

  it("should stop propagation when clicking edit/delete buttons", async () => {
    const handlePlay = vi.fn();
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();
    const user = userEvent.setup();

    // Wrap VideoCard in a clickable container to simulate the card click (onPlay usually triggers on card click)
    // Actually, looking at component code, `onPlay` is passed but NOT USED in the JSX provided in `read_file` output earlier!
    // Wait, let me check the file content again.
    // The previous read_file output for VideoCard.jsx showed:
    // export function VideoCard({ video, isAdmin, onPlay, onEdit, onDelete }) { ... }
    // But `onPlay` was NOT attached to any onClick handler in the returned JSX.
    // The outer div has no onClick.
    
    // IF the component doesn't use onPlay, I cannot test it.
    // However, I see `e.stopPropagation()` in the Edit/Delete buttons. 
    // This implies the parent (VideoCard or its container) is expected to have a click handler.
    // Since I can't change the component structure to add onClick={onPlay} without request (and it might be handled by parent Grid),
    // I can test stopPropagation by wrapping VideoCard in a div with onClick.
    
    const Wrapper = () => (
      <div onClick={handlePlay} data-testid="wrapper">
        <VideoCard
            video={mockVideo}
            isAdmin={true}
            onPlay={handlePlay} // passing it even if unused inside
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
      </div>
    );

    render(<Wrapper />);

    // Click Edit button
    await user.click(screen.getByLabelText("비디오 수정"));
    expect(handleEdit).toHaveBeenCalled();
    expect(handlePlay).not.toHaveBeenCalled();

    // Click Delete button
    await user.click(screen.getByLabelText("비디오 삭제"));
    expect(handleDelete).toHaveBeenCalled();
    expect(handlePlay).not.toHaveBeenCalled();
    
    // Click outside buttons (on the wrapper area, but strictly on the card content that bubbles up)
    // Since VideoCard doesn't stop propagation on itself, clicking text inside should bubble.
    await user.click(screen.getByText(mockVideo.title));
    expect(handlePlay).toHaveBeenCalled();
  });
});
