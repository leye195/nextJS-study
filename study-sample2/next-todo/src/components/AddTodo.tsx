import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;

  .add-to-header-title {
    font-size: 1.25rem;
  }

  .add-todo-header {
    display: flex;
    justify-content: space-between;
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
`;

const AddTodo: React.FC = () => {
  return (
    <Container>
      <div className="add-todo-header">
        <h1 className="add-todo-header-title">Add Todo</h1>
        <button
          className="add-todo-submit-button"
          type="button"
          onClick={() => {}}
        >
          추가하기
        </button>
      </div>
    </Container>
  );
};

export default AddTodo;
