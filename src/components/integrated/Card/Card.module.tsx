import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

function CustomProgressBar() {
  return (
    <>
      <style type="text/css">
        {`
        .progress-flat {
          background-color: purple;
          height: 30px;
          border-radius: 15px;
        }
        
        .progress-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.2rem;
          color: white;
        }
        `}
      </style>

      <ProgressBar className="progress-flat">
        <ProgressBar
          variant="flat"
          now={60}
          label={`${60}%`}
          striped
          animated
          className="progress-label"
        />
      </ProgressBar>
    </>
  );
}

export default CustomProgressBar;
