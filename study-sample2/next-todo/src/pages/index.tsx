import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import styled from "styled-components";
import { TodoType } from "types/todo";
import TodoList from "components/TodoList";
import api from "lib/api";
import { getTodoAPI } from "lib/api/todo";

interface Props {
  todos: TodoType[];
}

const Container = styled.div`
  font-weight: bold;
`;

const index: NextPage<Props> = ({ todos }) => {
  return (
    <Container>
      <TodoList todos={todos} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getTodoAPI();

    if (res.status === 200) return { props: { todos: res.data } };

    return {
      props: { todos: [] },
    };
  } catch (e) {
    return { props: {} };
  }
};

export default index;
