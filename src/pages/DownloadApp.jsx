import React from 'react';
import { Link } from 'react-router-dom';
import './DownloadApp.css';

const DownloadApp = () => {
  return (
    <div className="download-page-container">
      <div className="download-card">
        <div className="download-badge">Tewea</div>
        <h1 className="download-title">Download the Tewea App</h1>
        <p className="download-description">
          Tewea is Tipde's first mobile application. The APK can be downloaded here once it is available.
        </p>

        <a href="/tewea.apk" className="download-button" download>
          Download Tewea APK
        </a>

        <p className="download-note">
          If you want to add the APK now, place <code>tewea.apk</code> in the project's public folder.
        </p>

        <Link to="/" className="download-back-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default DownloadApp;
