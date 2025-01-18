import React from "react";

function MainScreen({ title, children }) {
  return (
    <div className="container mx-auto p-4  pl-12">
      {title && (
        <>
          <h1 className="text-4xl font-bold mb-5 ">{title}</h1>

          <hr />
        </>
      )}
      <div className="mt-8">{children}</div>
    </div>
  );
}

export default MainScreen;
