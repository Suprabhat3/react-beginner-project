import {
  fetchVideos,
  formatViewCount,
  formatDuration,
  timeAgo,
  type VideoItem,
} from "./services/api";
import { useState, useEffect } from "react";

function VideoCard({ video }: { video: VideoItem }) {
  const { items } = video;
  const { snippet, statistics, contentDetails } = items;
  const thumbnail = snippet.thumbnails.maxres || snippet.thumbnails.high || snippet.thumbnails.medium;
  const videoUrl = `https://www.youtube.com/watch?v=${items.id}`;

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group cursor-pointer"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-200">
        <img
          src={thumbnail.url}
          alt={snippet.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
          {formatDuration(contentDetails.duration)}
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <div className="shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center text-white font-semibold text-sm">
            {snippet.channelTitle.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-stone-900 line-clamp-2 text-sm leading-snug group-hover:text-rose-600 transition-colors">
            {snippet.title}
          </h3>
          <p className="text-stone-500 text-sm mt-0.5 hover:text-stone-700">
            {snippet.channelTitle}
          </p>
          <p className="text-stone-500 text-sm">
            {formatViewCount(statistics.viewCount)} views • {timeAgo(snippet.publishedAt)}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function App() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchVideos()
      .then(setVideos)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredVideos = videos.filter((video) => {
    const query = searchQuery.toLowerCase();
    const title = video.items.snippet.title.toLowerCase();
    const channel = video.items.snippet.channelTitle.toLowerCase();
    return title.includes(query) || channel.includes(query);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-rose-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-stone-500 font-medium">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-10 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            <span className="text-xl font-semibold text-stone-800">YouTube</span>
          </div>
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-stone-300 rounded-full bg-stone-50 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
              />
              <svg className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {filteredVideos.length === 0 && searchQuery ? (
          <div className="text-center py-12">
            <p className="text-stone-500">No videos found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVideos.map((video) => (
              <VideoCard key={video.items.id} video={video} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
