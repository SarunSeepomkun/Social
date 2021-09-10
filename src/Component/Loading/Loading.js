import React from "react";

const Loading = () => {
  return (
    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-grow spinner-grow-sm text-success m-1" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow spinner-grow-sm text-success m-1" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow spinner-grow-sm text-success m-1" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
