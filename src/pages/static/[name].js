import axios from "axios";

const name = ({ user, time }) => {
  const username = user && user.name;
  return (
    <div>
      {username}
      {time}
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  try {
    const { data, status } = await axios.get(
      `https://api.github.com/users/${params.name}`,
    );
    if (status === 200)
      return { props: { user: data, time: new Date().toISOString() } };
    return { props: { time: new Date().toISOString() } };
  } catch (err) {
    console.log(err);
    return { props: { time: new Date().toISOString() } };
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { name: "leye" },
      },
    ],
    fallback: true,
  };
};

export default name;
