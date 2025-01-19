export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-4 text-2xl text-red-600 font-bold">Your User ID</h1>
      <hr />
      <p className="text-4xl ml-2 rounded bg-gray-300 text-gray-700 px-5 py-1">
        {params.id}
      </p>
    </div>
  );
}
