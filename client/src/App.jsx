import "./App.css";
import MoviePage from "./Pages/MoviePage.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  return (
    <div className="app">
      <Header />
      <MoviePage />
      <Footer />
    </div>
  );
}

export default App;
