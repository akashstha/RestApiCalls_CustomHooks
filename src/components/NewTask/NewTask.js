import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHTTP from "../Custom-hooks/customHooks";

const NewTask = (props) => {
  const { isLoading, error, sendReq: taskReq } = useHTTP();

  const taskTransformation = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    taskReq(
      {
        url: "https://react-http-98265-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      taskTransformation.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
