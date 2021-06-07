import axios from "axios";
import css from "styled-jsx/css";
import Profile from "components/profile";
import Repositories from "components/repositories";

const style = css`
  .user-contents-wrapper {
    display: flex;
    padding: 20px;
  }
`;

const name = ({ user, repos }) => {
  if (!user) return null;
  return (
    <div className="user-contents-wrapper">
      <Profile user={user} />
      <Repositories user={user} repos={repos} />
      <style jsx>{style}</style>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  try {
    const { name, page } = query;
    const { data: user, status: userStatus } = await axios.get(
      `https://api.github.com/users/${name}`,
    );
    const { data: repos, status: repoStatus } = await axios.get(
      `https://api.github.com/users/${name}/repos?sort=updated&page=${page}&per_page=10`,
    );
    if (userStatus === 200 && repoStatus === 200) {
      return {
        props: {
          user,
          repos,
        },
      };
    }
    return {
      props: {},
    };
  } catch (e) {
    console.log(e);
    return {
      props: {},
    };
  }
};

export default name;
