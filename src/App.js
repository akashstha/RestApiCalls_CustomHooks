import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHTTP from "./components/Custom-hooks/customHooks";

function App() {
  const [tasks, setTasks] = useState([]);

  const callFetchApi = useHTTP();
  const { isLoading, error, sendReq: fetchTasks } = callFetchApi;

  useEffect(() => {
    const useTransformetedData = (data) => {
      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    };
    fetchTasks(
      {
        url: "https://react-http-98265-default-rtdb.firebaseio.com/tasks.json",
        headers: {
          "content-Type": "application/json",
        },
      },
      useTransformetedData
    );
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
    </React.Fragment>
  );
}

export default App;
