import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { TodoType } from "types/todo";

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
`;

type Props = {
  todos: TodoType[];
};

const TodoList = ({ todos }: Props) => {
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
  console.log(todos);
  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          남은 ToDo
          <span>{todos.length}개</span>
        </p>
        <div className="todo-list-header-colors">
          {Object.keys(todoColorNums).map((color, idx) => (
            <div className="todo-list-header-color-num" key={idx}>
              <div className={`todo-list-header-round-color bg-${color}`} />
              <p>{todoColorNums[color]}개</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default TodoList;
