import React from "react";
import "./style.scss";

export const LoadingCircle = () => {
  return (
    <div class="profile-main-loader">
      <div class="loader">
        <svg class="circular-loader" viewBox="25 25 50 50">
          <circle
            class="loader-path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="#70c542"
            stroke-width="2"
          />
        </svg>
      </div>
      <span>Carregando...</span>
    </div>
  );
};
