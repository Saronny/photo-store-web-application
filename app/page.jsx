import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-500">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Welcome to PixelSafe</h2>
        <p className="mt-2 text-gray-600 text-center">
          Sign in to upload and save your photos.
        </p>
        <AuthForm />
      </div>
    </main>
  );
}
