import Footer from "./components/Footer";
import MusicPlayer from "./MusicPlayer";


function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full">
      <main className="flex-grow">
        <MusicPlayer />
      </main>
      <footer className="p-4 text-center">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
