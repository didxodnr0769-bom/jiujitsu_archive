import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { VideoGrid } from "./VideoGrid";

describe("VideoGrid Component", () => {
  const mockVideos = [
    {
      id: 1,
      title: "Video 1",
      url: "https://youtu.be/abc",
      type: "long",
      note: "Note 1",
    },
    {
      id: 2,
      title: "Video 2",
      url: "https://youtu.be/def",
      type: "shorts",
      note: "Note 2",
    },
  ];

  it("should render empty state message when no videos", () => {
    render(
      <VideoGrid
        videos={[]}
        isAdmin={false}
        onPlay={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText("비디오를 찾을 수 없습니다")).toBeInTheDocument();
    expect(screen.getByText("나중에 다시 확인해주세요")).toBeInTheDocument();
  });

  it("should render empty state message for admin when no videos", () => {
    render(
      <VideoGrid
        videos={[]}
        isAdmin={true}
        onPlay={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(
      screen.getByText("+ 버튼을 눌러 첫 번째 비디오를 추가하세요"),
    ).toBeInTheDocument();
  });

  it("should render a list of VideoCards", () => {
    render(
      <VideoGrid
        videos={mockVideos}
        isAdmin={false}
        onPlay={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText("Video 1")).toBeInTheDocument();
    expect(screen.getByText("Video 2")).toBeInTheDocument();
    // VideoCards are rendered, so we expect 2 headings (titles)
    // Note: VideoCard uses h3 for title
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(2);
  });
});
