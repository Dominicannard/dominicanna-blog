interface WidgetPost {
  slug: string;
  title: string;
}

interface WidgetProps {
  title?: string;
  posts?: WidgetPost[];
  footerText?: string;
  footerLink?: string;
}

export default function Widget({ 
  title = "Destacados", 
  posts = [],
  footerText = "Ver más de",
  footerLink = "#"
}: WidgetProps) {
  return (
    <div className="w-full max-w-2xl font-sans">
      {/* Header */}
      <div className="mb-8 mt-4 flex items-start">
        <div className="w-1 bg-black mr-6 self-stretch min-h-[50px]"></div>
        <div className="bg-black px-6 py-2">
          <h2 className="text-white text-md font-bold tracking-wide">{title}</h2>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div key={post.slug || index} className="flex items-start gap-4">
            <div className="bg-black text-white w-16 h-16 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold">{index + 1}</span>
            </div>
            <div className="flex-1 pt-2">
              <a 
                href={`/post/${post.slug}`}
                className="text-sm font-bold text-black leading-tight hover:opacity-70 transition-opacity block"
              >
                {post.title}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <div className="mt-8 mb-8">
        <a 
          href={footerLink}
          className="text-black font-bold text-lg border-b-2 border-black inline-block hover:opacity-70 transition-opacity"
        >
          {`${footerText} ${title}`}
        </a>
      </div>
    </div>
  );
}
