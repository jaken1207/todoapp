import React from "react";
import { TodoType } from "../types";
import { useTodos } from "../hooks/useTodos";

type TodoProps = {
  todo: TodoType;
};

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

const Todo = ({ todo }: TodoProps) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [editedTitle, setEditedTitle] = React.useState<string>(todo.title);
  const { todos, isLoading, error, mutate } = useTodos();
  const handleEdit = async () => {
    if (!isEditing) {
      // 編集モードに入る時は元のタイトルで初期化
      setEditedTitle(todo.title);
      setIsEditing(true);
    } else {
      // 編集モードを終了して保存
      const response = await fetch(
        `http://localhost:8080/editTodo/${todo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editedTitle,
            isCompleted: false,
          }),
        },
      );
      if (response.ok) {
        mutate();
        setIsEditing(false);
      }
    }
  };
  const handleDelete = async (id: number) => {
    const response = await fetch(
      `http://localhost:8080/deleteTodo/${todo.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      const deletedTodo = await response.json();
      const updatadTodos = todos?.filter(
        (t: TodoType) => t.id !== deletedTodo.id,
      );
      mutate(updatadTodos);
    }
  };
  return (
    <div>
      <li className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="todo1"
              name="todo1"
              type="checkbox"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500
                  border-gray-300 rounded"
            />
            <label className="ml-3 block text-gray-900">
              {isEditing ? (
                <input
                  type="text"
                  className="border rounded py-1 px-2"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <span className="text-lg font-medium mr-2"> {todo.title} </span>
              )}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEdit}
              className="duration-150 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 rounded"
            >
              {isEditing ? "📄" : "✒"}
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
            >
              🗑️
            </button>
          </div>
        </div>
      </li>
    </div>
  );
};

export default Todo;
