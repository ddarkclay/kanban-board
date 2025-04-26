import React from "react";
import Button from "../UI/Button";

const BoardHeader = () => {

  return (
    <div className="sm:ml-64 flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md transition-colors">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white transition-colors">
        Platform Launch
      </h1>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          // onClick={handleReset}
        >
          Add New Task
        </Button>
      </div>
    </div>
  );
};

export default BoardHeader;
