import { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import { TodoType } from "types/todo";
import TodoList from "components/TodoList";
import { getTodoAPI } from "lib/api/todo";
import { RootState, wrapper, useSelector } from "store";
import { todoActions } from "store/todo";

interface Props {
  todos: TodoType[];
}

const Container = styled.div`
  font-weight: bold;
`;

const index: NextPage<Props> = () => {
  const todos = useSelector((state) => state.todo.todos);
  return (
    <Container>
      <TodoList todos={todos} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) => async (): Promise<any> => {
    try {
      const res = await getTodoAPI();

      if (res.status === 200) {
        dispatch(todoActions.setToDo(res.data));
      }

      return {
        props: { todos: [] },
      };
    } catch (e) {
      return { props: {} };
    }
  }
);

export default index;
