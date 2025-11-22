import { useNavigate, useParams } from "react-router-dom";

export default function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const isCompleted = localStorage.getItem(`task-${taskId}-complete`) === "true";

  const handleStart = () => navigate(`/tasks/${taskId}/snake`);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task {taskId} Details</h1>

      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3 max-w-md">
        <h2 className="text-lg font-semibold">Available Mini-Games</h2>

        <div className="flex justify-between items-center p-3 border rounded">
          <div>
            <p className="font-medium">Snake</p>
            <p className="text-sm text-gray-500">
              Classic snake game challenge.
            </p>
          </div>

          {isCompleted ? (
            <button
              onClick={handleStart}
              className="px-3 py-1 bg-purple-600 text-white rounded"
            >
              Start Again
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              {localStorage.getItem(`task-${taskId}-progress`) ? "Resume" : "Start"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
