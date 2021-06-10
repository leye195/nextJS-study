import { addTodoAPI } from "lib/api/todo";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import styled from "styled-components";
import palette from "styles/palette";
import { TodoType } from "types/todo";
import PaintBrushIcon from "../../public/statics/svg/paint_brush.svg";

const Container = styled.div`
  padding: 1rem;

  .add-to-header-title {
    font-size: 1.25rem;
  }

  .add-todo-header {
    display: flex;
    flex-direction: column;
    align-items: center;

    .add-todo-submit-button {
      padding: 0.25rem 0.5rem;
      border: 1px solid black;
      border-radius: 5px;
      background-color: white;
      outline: none;
      font-size: 0.7rem;
      cursor: pointer;
    }
  }

  .add-todo-header-title-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .add-todo-colors-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;

    .add-todo-color-list {
      display: flex;

      button {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1rem;
        border: 0;
        outline: 0;
        border-radius: 50%;
        cursor: pointer;

        &:last-child {
          margin: 0;
        }

        &.add-todo-selected-color {
          border: 2.5px solid black;
        }
      }
    }

    .bg-red {
      background-color: ${palette.red};
    }

    .bg-blue {
      background-color: ${palette.blue};
    }

    .bg-green {
      background-color: ${palette.green};
    }

    .bg-yellow {
      background-color: ${palette.yellow};
    }

    .bg-orange {
      background-color: ${palette.orange};
    }

    .bg-gray {
      background-color: ${palette.gray};
    }

    .bg-navy {
      background-color: ${palette.navy};
    }
  }

  textarea {
    width: 100%;
    height: 20rem;
    margin-top: 1rem;
    padding: 1rem;
    font-size: 1rem;
    border-color: ${palette.gray};
    resize: none;
  }
`;

const AddTodo: React.FC = () => {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<TodoType["color"]>();

  const handleSelectColor = (color: TodoType["color"]) => () => {
    setSelectedColor(color);
  };

  const handleOnChange = (e: any) => {
    setText(e.target.value);
  };

  const handleAddTodo = (
    text: string,
    color: TodoType["color"]
  ) => async () => {
    try {
      if (!text || !selectedColor) {
        alert("색상과 테스크를 입력해주세요");
        return;
      }
      await addTodoAPI({ text, color });
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <div className="add-todo-header">
        <div className="add-todo-header-title-wrapper">
          <h1 className="add-todo-header-title">Add Todo</h1>
          <button
            className="add-todo-submit-button"
            type="button"
            onClick={handleAddTodo(text, selectedColor as TodoType["color"])}
          >
            추가하기
          </button>
        </div>
        <div className="add-todo-colors-wrapper">
          <div className="add-todo-color-list">
            {["red", "orange", "yellow", "green", "blue", "navy", "gray"].map(
              (color) => (
                <button
                  type="button"
                  className={`bg-${color} ${
                    color === selectedColor ? "add-todo-selected-color" : ""
                  }`}
                  onClick={handleSelectColor(color as TodoType["color"])}
                />
              )
            )}
          </div>
          <PaintBrushIcon />
        </div>
      </div>
      <textarea
        placeholder="할 일은 무엇?"
        defaultValue={text}
        onChange={handleOnChange}
      />
    </Container>
  );
};

export default AddTodo;
