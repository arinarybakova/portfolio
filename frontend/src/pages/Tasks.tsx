import { Link } from "react-router-dom";

export default function Tasks() {
  const dummyTasks = [
    { id: 1, title: "Game 1" },
    { id: 2, title: "Game 2" },
  ];

  return (
    <div>
      <h1 className="text-2xl mb-4">All Tasks / Minigames</h1>

      <ul className="flex flex-col gap-2">
        {dummyTasks.map((t) => (
          <li key={t.id} className="border p-2">
            <Link to={`/tasks/${t.id}`} className="text-blue-500 underline">
              {t.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
