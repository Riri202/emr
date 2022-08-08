import React from 'react';
import { useNavigate } from 'react-router';

function Unauthorized() {
  const navigate = useNavigate();

  const GoBack = () => navigate(-1);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full p-8">
        <h1 className="text-xl font-bold">
          Ooops! Looks like you tried to visit a page you are not authorized to
        </h1>
        <button onClick={GoBack}>Go back</button>
      </div>
    </div>
  );
}

export default Unauthorized;
