import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function VideoPage() {
  const { id } = useParams();

  // In a real app, you would fetch video data based on the id
  const video = {
    title: `Video ${id}`,
    url: `https://www.youtube.com/embed/dQw4w9WgXcQ`, // Example video
    description: 'This is a sample video description. In a real application, this would be fetched from a database based on the video ID from the URL. This page demonstrates the basic structure of a video detail page.',
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            &larr; Back to Home
          </Link>
        </div>
        <div className="aspect-w-16 aspect-h-9 mb-6">
          <iframe
            src={video.url}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg shadow-xl"
          ></iframe>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">{video.title}</h1>
          <p className="text-gray-400">{video.description}</p>
        </div>
      </div>
    </div>
  );
}