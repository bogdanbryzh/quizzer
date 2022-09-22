import { Link } from "react-router-dom";

function Hero() {
  return (
    <main className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Quizzer - quiz creator</h1>
          <div className="btn-group mt-8">
            <Link to="/teams" className="btn btn-outline">
              Команди
            </Link>
            <Link to="/questions" className="btn btn-outline">
              Запитання
            </Link>
            <Link to="/answers" className="btn btn-outline">
              Відповіді
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
