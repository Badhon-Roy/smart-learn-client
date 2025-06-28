import React from "react";

const CommunityPage = () => {
  return (
    <div className="min-h-screen container mx-auto bg-gradient-to-b from-white to-base-200 text-base-content px-4 md:px-12 lg:px-20 py-10 space-y-24">

      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary">👥 Community Hub</h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          Collaborate, learn, and grow with fellow students and instructors. Share ideas, ask questions, and never learn alone again.
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn btn-primary btn-lg">Start a Discussion</button>
          <button className="btn btn-outline btn-secondary btn-lg">Join Live Chat</button>
        </div>
      </section>

      {/* Trending Discussions */}
      <section>
        <h2 className="text-3xl font-bold mb-6">🔥 Trending Discussions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white shadow-xl rounded-2xl p-6 hover:scale-[1.02] transition-all"
            >
              <h3 className="font-semibold text-lg mb-2">Discussion Title #{i + 1}</h3>
              <p className="text-sm text-gray-500 mb-2">Short preview of the discussion topic...</p>
              <div className="flex justify-between text-xs text-gray-400">
                <span>👤 John Doe</span>
                <span>💬 25 replies</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Contributors */}
      <section>
        <h2 className="text-3xl font-bold mb-6">🏆 Featured Contributors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-base-100 rounded-xl shadow-md p-4 text-center hover:ring-2 hover:ring-primary"
            >
              <div className="avatar mb-3">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img className="rounded-full" src={`https://i.pravatar.cc/150?img=${i + 1}`} alt="user" />
                </div>
              </div>
              <h4 className="font-semibold">User {i + 1}</h4>
              <p className="text-sm text-gray-500">150+ contributions</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Events */}
      <section className="bg-base-100 p-10 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">📅 Upcoming Live Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl">
            <h3 className="font-bold text-lg">React Performance Tips</h3>
            <p className="text-sm text-gray-600">July 5th, 2025 at 6 PM</p>
            <p className="mt-2 text-sm">Join a live session on optimizing React apps with expert developers.</p>
          </div>
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl">
            <h3 className="font-bold text-lg">Firebase Deep Dive</h3>
            <p className="text-sm text-gray-600">July 8th, 2025 at 8 PM</p>
            <p className="mt-2 text-sm">Explore Firebase features for real-time apps with hands-on guidance.</p>
          </div>
        </div>
      </section>

      {/* Resources & Articles */}
      <section>
        <h2 className="text-3xl font-bold mb-6">📚 Community Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Getting Started Guide", "Best Learning Paths", "Top Tools for Web Dev"].map((title, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-primary"
            >
              <h4 className="font-semibold text-lg mb-2">{title}</h4>
              <p className="text-sm text-gray-500">Helpful community-created article to boost your learning curve.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Get Support */}
      <section className="bg-gradient-to-r from-white via-base-100 to-white py-12 px-6 rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">❓ Need Help?</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Reach out to the community or contact support directly. We’re here to help you grow and succeed!
        </p>
        <button className="btn btn-secondary btn-lg">Go to Help Center</button>
      </section>

    </div>
  );
};

export default CommunityPage;