import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

function HomePage() {
  const { pathname } = useLocation();

  return (
    <div className="h-full grid grid-rows-[_1fr,auto]">
      {pathname === "/" ? (
        <Hero />
      ) : (
        <div>
          <Header />
          <div className="max-w-5xl mx-auto p-4">
            <Outlet />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default HomePage;
