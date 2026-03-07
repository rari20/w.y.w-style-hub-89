import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-8">
      <div className="text-center max-w-[40ch]">
        <h1 className="font-display text-[4rem] md:text-[6rem] italic leading-none mb-6">
          Lost in<br />the Atelier
        </h1>
        <p className="font-body text-[0.9375rem] text-muted-foreground font-light mb-8 leading-relaxed">
          The page you're looking for has been relocated — or perhaps it never existed at all.
        </p>
        <Link
          to="/home"
          className="inline-block bg-foreground text-background font-body text-[0.7rem] uppercase tracking-[0.18em] px-10 py-4 hover:bg-primary transition-colors duration-[400ms]"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
