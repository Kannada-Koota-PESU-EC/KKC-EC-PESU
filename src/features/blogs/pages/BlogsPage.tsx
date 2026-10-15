const videos = [
  {
    id: 1,
    title: "Blog 1",
    src: "/blog1.mp4",
  },
  {
    id: 2,
    title: "Blog 2",
    src: "/blog2.mp4",
  },
  {
    id: 3,
    title: "Blog 3",
    src: "/blog3.mp4",
  },
];

const Blogs = () => {
  return (
    <div className="koota-subpage koota-blogs min-h-screen bg-background py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-2 text-center">
          ನಮ್ಮ ದಿನಚರಿ
        </h1>
        <p className="mb-10 text-center text-base font-semibold text-muted-foreground">Blogs</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="rounded-xl overflow-hidden shadow-lg bg-black"
            >
              <video
                src={video.src}
                controls
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-foreground">
                  {video.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
