"use client";

export default function Loader() {
  return (
    <div className="ring-loader-wrapper">
      <div className="ring"></div>

      <div className="bottom-progress-bar">
        <div className="progress-line"></div>
      </div>

      <h2 className="loader-text">Loading your personalized dashboard...</h2>
    </div>
  );
}
