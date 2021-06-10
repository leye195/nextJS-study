import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { TodoType } from "types/todo";
import { checkTodoAPI } from "lib/api/todo";
import CheckMarkIcon from "../../public/statics/svg/check_mark.svg";
import TrashCanIcon from "../../public/statics/svg/trash_can.svg";

const Container = styled.div`
  width: 100%;

  .todo-num {
    margin-left: 12px;
  }

  .todo-list-header {
    padding: 1rem;
    position: relative;
    border-bottom: 1px solid ${palette.gray};

    .todo-list-last-todo {
      font-size: 14px;
      span {
        margin-left: 1rem;
      }
    }
  }

  .todo-list-header-colors {
    display: flex;
    padding-top: 1rem;

    .todo-list-header-color-num {
      display: flex;
      margin-right: 0.5rem;

      p {
        font-size: 14px;
        line-height: 1rem;
        margin: 0;
        margin-left: 6px;
      }

      .todo-list-header-round-color {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
      }
    }
  }

  .bg-red {
    background-color: ${palette.red};
  }

  .bg-orange {
    background-color: ${palette.orange};
  }

  .bg-yellow {
    background-color: ${palette.yellow};
  }

  .bg-green {
    background-color: ${palette.green};
  }

  .bg-blue {
    background-color: ${palette.blue};
  }

  .bg-navy {
    background-color: ${palette.navy};
  }

  .todo-list {
    margin-top: 1rem;

    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid ${palette.gray};

      .todo-left-side {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;

        .todo-color-block {
          width: 0.8rem;
          height: 100%;
        }
      }

      .todo-right-side {
        display: flex;
        margin-left: 0.7rem;

        & svg {
          &:first-child {
            margin-right: 1rem;
          }
          cursor: pointer;
        }

        .todo-trash-can {
          path {
            fill: ${palette.deep_red};
          }
        }

        .todo-check-mark {
          path {
            fill: ${palette.deep_green};
          }
        }

        .todo-button {
          display: flex;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          border: 1px solid ${palette.gray};
          background-color: transparent;
          outline: none;
          cursor: pointer;
        }
      }

      .checked-todo-text {
        color: ${palette.gray};
        text-decoration: line-through;
      }

      .todo-text {
        margin-left: 0.7rem;
        font-size: 1rem;
      }
    }
  }
`;

type Props = {
  todos: TodoType[];
};

const TodoList = ({ todos }: Props) => {
  const [localTodos, setLocalTodos] = useState<TodoType[]>(todos);

  const checkTodo = (id: number) => async () => {
    try {
      await checkTodoAPI(id);

      const newTodos = localTodos.map((todo) => {
        if (todo.id === id) return { ...todo, checked: !todo.checked };

        return todo;
      });
      setLocalTodos(newTodos);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = (id: number) => async () => {
    try {
      await deleteTodo(id);

      setLocalTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const getTodoColorNums = useCallback(() => {
    let red = 0;
    let orange = 0;
    let yellow = 0;
    let green = 0;
    let navy = 0;
    let blue = 0;

    todos.forEach((todo) => {
      switch (todo.color) {
        case "red":
          red += 1;
          break;
        case "orange":
          orange += 1;
          break;
        case "yellow":
          yellow += 1;
          break;
        case "green":
          green += 1;
          break;
        case "navy":
          navy += 1;
          break;
        case "blue":
          blue += 1;
          break;
        default:
          break;
      }
    });

    return {
      red,
      orange,
      yellow,
      green,
      navy,
      blue,
    };
  }, [todos]);

  const todoColorNums = useMemo(getTodoColorNums, [todos]);

  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          남은 ToDo
          <span>{localTodos.filter((todo) => !todo.checked).length}개</span>
        </p>
        <div className="todo-list-header-colors">
          {Object.keys(todoColorNums).map((color, idx) => (
            <div className="todo-list-header-color-num" key={idx}>
              <div className={`todo-list-header-round-color bg-${color}`} />
              <p>{todoColorNums[color]}개</p>
            </div>
          ))}
        </div>
        <ul className="todo-list">
          {localTodos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <div className="todo-left-side">
                <div className={`todo-color-block bg-${todo.color}`} />
                <div
                  className={`todo-text ${
                    todo.checked ? "checked-todo-text" : ""
                  }`}
                >
                  {todo.text}
                </div>
              </div>
              <div className="todo-right-side">
                {todo.checked ? (
                  <>
                    <TrashCanIcon
                      className="todo-trash-can"
                      onClick={deleteTodo(todo.id)}
                    />
                    <CheckMarkIcon
                      className="todo-check-mark"
                      onClick={checkTodo(todo.id)}
                    />
                  </>
                ) : (
                  <button
                    className="todo-button"
                    type="button"
                    onClick={checkTodo(todo.id)}
                  />
                )}
                {}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default TodoList;
