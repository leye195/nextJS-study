import { useRouter } from "next/router";
import Link from "next/link";
import css from "styled-jsx/css";
import { formatDistance } from "date-fns";

const style = css`
  .repos-wrapper {
    width: 100%;
    height: 100vh;
    overflow: scroll;
    padding: 0 1rem;
  }

  .repos-header {
    padding: 1rem 0;
    font-size: 0.8rem;
    font-size: 800;
    border-bottom: 1px solid #e1e4e8;
  }

  .repos-count {
    display: inline-block;
    padding: 2px 5px;
    margin-left: 6px;
    font-size: 0.75rem;
    font-weight: 800;
    line-height: 1;
    color: #586069;
    background-color: rgba(27, 31, 35, 0.08);
    border-radius: 1.2rem;
  }

  .repository-wrapper {
    width: 100%;
    border-bottom: 1px solid #e1e4e8;
    padding: 1.5rem 0;
  }

  .repository-description {
    padding: 12px 0;
  }

  a {
    text-decoration: none;
  }

  .repository-name {
    margin: 0;
    color: #0366d6;
    font-size: 1.2rem;
    display: inline-block;
    cursor: pointer;
  }

  .repository-name:hover {
    text-decoration: underline;
  }

  .repository-description,
  .repository-language {
    margin: 0;
    font-size: 14px;
  }

  .repository-updated-at {
    margin-left: 20px;
  }

  .repository-pagination {
    border: 1px soli rgba(27, 31, 35, 0.15);
    border-radius: 3px;
    width: fit-content;
    margin: auto;
    margin-top: 20px;
  }

  .repository-pagination button {
    padding: 6px 12px;
    font-size: 0.7rem;
    border: 0;
    color: #0366d6;
    background-color: white;
    font-weight: 800;
    cursor: pointer;
    outline: none;
  }

  .repository-pagination button:first-child {
    border-right: 1px solid rgba(27, 31, 35, 0.15);
    border-left: 1px solid rgba(27, 31, 35, 0.15);
  }

  .repository-pagination button:hover {
    border-right: 1px solid rgba(27, 31, 35, 0.15);
  }

  .repository-pagniation button:hover:not([disabled]) {
    background-color: #0366d6;
    color: white;
  }

  .repository-pagination button:disabled {
    cursor: no-drop;
    color: rgba(27, 31, 35, 0.3);
  }
`;

const Repositories = ({ user, repos }) => {
  const router = useRouter();
  const { page = "1" } = router.query;

  if (!user || !repos) return null;

  return (
    <div className="repos-wrapper">
      <div className="repos-header">
        Repositories
        <span className="repos-count">{user.public_repos}</span>
      </div>
      {repos &&
        repos.map((repo) => (
          <div className="repository-wrapper" key={repo.id}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://github.com/${user.login}/${repo.name}`}
            >
              <h2 className="repository-name">{repo.name}</h2>
            </a>
            <p className="repository-description">{repo.description}</p>
            <p className="repository-language">
              {repo.language}
              <span className={repo.language && "repository-updated-at"}>
                {formatDistance(new Date(repo.updated_at), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </p>
          </div>
        ))}
      <div className="repository-pagination">
        <Link href={`/users/${user.login}?page=${Number(page) - 1}`}>
          <a>
            <button type="button" disabled={page && page === "1"}>
              Previous
            </button>
          </a>
        </Link>
        <Link
          href={`/users/${user.login}?page=${!page ? "2" : Number(page) + 1}`}
        >
          <a>
            <button type="button" disabled={repos.length < 10}>
              Next
            </button>
          </a>
        </Link>
      </div>
      <style jsx>{style}</style>
    </div>
  );
};

export default Repositories;
