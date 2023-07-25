import { ChangeEvent, useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Modes, todo } from "../types";
import {
  addTodo,
  completeTodo,
  deleteTodo,
  getTodos,
  unCompleteTodo,
} from "../api";

export function Todo() {
  const [todoList, setTodoList] = useState<todo[] | []>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [showMode, setShowMode] = useState<Modes>(Modes.ALL);

  useEffect(() => {
    getTodos().then((data: todo[]) => {
      if (data) setTodoList(data);
    });
  }, []);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault;
        handleAddNewTodo();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [newTodo]);

  const handleAddNewTodo = () => {
    addTodo(newTodo).then((todo) => setTodoList((prev) => [...prev, todo]));
  };

  const handleNewTodo = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNewTodo(value);
  };

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { id, checked },
    } = event;
    const todos = todoList;
    if (!checked) {
      unCompleteTodo(+id)
        .then((updatedTodo) => {
          const updatedTodos = (todos as todo[]).reduce((prev, todo): any => {
            if (todo.id === updatedTodo.id) {
              return [...prev, updatedTodo];
            }
            return [...prev, todo];
          }, []);
          setTodoList(updatedTodos);
        })
        .catch(console.error);
    } else {
      completeTodo(+id)
        .then((updatedTodo) => {
          const updatedTodos = (todos as todo[]).reduce((prev, todo): any => {
            if (todo.id === updatedTodo.id) {
              return [...prev, updatedTodo];
            }
            return [...prev, todo];
          }, []);
          setTodoList(updatedTodos);
        })
        .catch(console.error);
    }
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(+id)
      .then(() => {
        setTodoList((prev) => prev.filter((todo) => todo.id !== +id));
      })
      .catch(console.error);
  };

  return (
    <Card title="Todo List" customeStyle={{ minHeight: 437 }}>
      <Input placeholder="Add a new todo" onChange={handleNewTodo} />

      {todoList
        .filter((todo) => {
          switch (showMode) {
            case Modes.COMPLETED:
              return todo.completed === true;
            case Modes.INCOMPLETED:
              return todo.completed === false;
            default:
              return todo;
          }
        })
        .map(({ title, completed, id }: todo, idx) => (
          <div className="flex items-center w-full" key={`todo-${idx}`}>
            <div className="space-x-2 flex items-center w-full">
              <Input
                id={id?.toString()}
                type="checkbox"
                checked={completed}
                style={{ width: 18, height: 18, cursor: "pointer" }}
                onChange={handleCheckbox}
              />
              <label
                htmlFor={idx.toString()}
                className="py-4 ml-2 text-base text-sm text-gray-900 dark:text-gray-300"
              >
                {title}
              </label>
            </div>
            <button
              onClick={() => handleDeleteTodo(id?.toString())}
              className="order-last text-slate-400 text-xl"
            >
              x
            </button>
          </div>
        ))}
      <div className="flex flex-row text-sm space-x-4">
        <p className="text-slate-400 font-medium">Show: </p>
        <button
          onClick={() => setShowMode(Modes.ALL)}
          className={
            showMode !== Modes.ALL ? "text-link underline" : "disabled"
          }
        >
          All
        </button>
        <button
          onClick={() => setShowMode(Modes.COMPLETED)}
          className={
            showMode !== Modes.COMPLETED ? "text-link underline" : "disabled"
          }
        >
          Completed
        </button>
        <button
          onClick={() => setShowMode(Modes.INCOMPLETED)}
          className={
            showMode !== Modes.INCOMPLETED ? "text-link underline" : "disabled"
          }
        >
          Incompleted
        </button>
      </div>
    </Card>
  );
}
