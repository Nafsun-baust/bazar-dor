export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
      <div className="h-52 w-full animate-pulse rounded-2xl bg-gray-200" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl border border-gray-100 bg-gray-100"
          />
        ))}
      </div>
    </div>
  );
}