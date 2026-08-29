import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 py-12 text-center" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col items-center">
        {/* Animated Icon Container */}
        <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 animate-bounce">
          <svg
            className="w-10 h-10 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          The business page you are looking for does not exist or may have been moved. Please check the link or search again.
        </p>

        <Link
          href="https://marketingsetu.com"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-200 transform active:scale-95 shadow-md shadow-indigo-200 hover:shadow-indigo-300"
        >
          Go to MarketingSetu
        </Link>
      </div>
    </div>
  );
}
