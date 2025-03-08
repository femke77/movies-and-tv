import { Link } from "react-router-dom";
import { Tv } from "lucide-react";
const Footer = () => {
  return (
    <footer className="border-t-gray-500  border-t-1 my-8  pt-6 text-center py-4 bg-black relative z-50 text-[#726c6c]  text-lg">
      <div className="flex justify-between items-top mx-20 pr-30 pb-10">
        <div className="flex flex-col items-left text-left  ">
          <h3>About</h3>
          <p className="text-white/70 text-sm text-left flex items-center">
            Stream movies & tv shows on demand. More features to come. Stay
            tuned. <Tv className="ml-2 text-white/70" />
          </p>
        </div>
        <div className="flex flex-col items-left text-left">
          <h3>Discover</h3>
          <div className="mt-2 flex flex-col items-left text-left text-white/70 text-sm">
            <Link to="/explore/toprated" className="">
              Top Rated Movies
            </Link>
            <Link to="/explore/top-series" className="">
              Top Rated TV
            </Link>
            <Link to="/explore/popular" className="">
              Popular Movies
            </Link>
            <Link to="/explore/popular-tv" className="">
              Popular TV
            </Link>
            <Link to="/explore/movies" className="">
              Trending Movies
            </Link>
            <Link to="/explore/tv" className="">
              Trending TV
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-left text-left">
          <h3>Genres</h3>
          <div className="mt-2 flex flex-col items-left text-left text-white/70 text-sm">
            <Link to="/explore/toprated" className="">
              Action
            </Link>
            <Link to="/explore/top-series" className="">
              Adventure
            </Link>
            <Link to="/explore/popular" className="">
              Horror
            </Link>
            <Link to="/explore/popular-tv" className="">
              Animation
            </Link>
            <Link to="/explore/movies" className="">
              Sci Fi
            </Link>
            <Link to="/explore/tv" className="">
              Romance
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 border-t-gray-500 border-t-1 pt-10">
        <p className="text-white/70 text-sm">
          &copy; {new Date().getFullYear()} Movies Unlimited. All rights reserved.
        </p>
      </div>
      <div></div>
    </footer>
  );
};

export default Footer;
