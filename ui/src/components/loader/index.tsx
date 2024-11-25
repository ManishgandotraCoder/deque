import React from "react";
import "./styles.css";

const LoaderComponent: React.FC = () => {
  return (
    <div className="loader-wrapper" role="region" aria-label="loader-wrapper">
      <div className="loader" role="status" aria-label="loader"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoaderComponent;
