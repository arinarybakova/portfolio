import { useParams } from "react-router-dom";

export default function TaskDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl mb-4">Minigame #{id}</h1>
      <p>Task details and gameplay will be shown here.</p>

      <button className="bg-green-600 text-white p-2 mt-4">
        Start Game
      </button>
    </div>
  );
}
