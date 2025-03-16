import PhotoGrid from "../components/PhotoGrid";
import PhotoUploader from "../components/PhotoUploader";
import Nav from "../components/Nav";

export default function Photos() {
    return (
        <main className="min-h-screen bg-gray-500 relative p-20">
            <Nav />
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-4xl font-bold mb-4">Photos</h1>
                    <PhotoUploader />
                </div>
                <PhotoGrid />
            </div>
        </main>
    );
}
