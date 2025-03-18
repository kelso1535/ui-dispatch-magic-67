
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dispatch-dark">
      <div className="glass-panel p-8 rounded-lg max-w-md animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 text-dispatch-accent">404</h1>
        <p className="text-xl text-white/80 mb-6">This dispatch does not exist</p>
        <a href="/" className="text-dispatch-accent hover:text-dispatch-accent/80 transition-colors underline">
          Return to Dispatch Center
        </a>
      </div>
    </div>
  );
};

export default NotFound;
