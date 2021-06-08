import TodoList from "components/TodoList";
import { NextPage } from "next";
import styled from "styled-components";
import { TodoType } from "types/todo";

const Container = styled.div`
  font-weight: bold;
`;

const todos: TodoType[] = [
  { id: 1, text: "마트 가기", color: "red", checked: false },
  { id: 2, text: "코딩 하기", color: "orange", checked: false },
  { id: 3, text: "청소 하기", color: "yellow", checked: false },
  { id: 4, text: "잠 자기", color: "green", checked: false },
  { id: 5, text: "요리하기", color: "blue", checked: false },
];

const index: NextPage = () => {
  return (
    <Container>
      <TodoList todos={todos} />
    </Container>
  );
};

export default index;
