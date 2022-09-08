import React from 'react';
import { Title, Form, Repos, Error } from './styles';
import logo from '../../assets/logo.svg';
import { FiChevronRight } from 'react-icons/fi';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

interface IGithubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const Dashboard: React.FC = () => {
  const [repos, setRepos] = React.useState<IGithubRepository[]>(() => {
    const storageRepos = localStorage.getItem('@Gitcollection:repositories');

    if (storageRepos) {
      return JSON.parse(storageRepos);
    }
    return [];
  });
  const [newRepo, setNewRepo] = React.useState('');
  const [inputError, setInputError] = React.useState('');
  const formEl = React.useRef<HTMLFormElement | null>(null);

  React.useEffect(() => {
    localStorage.setItem('@Gitcollection:repositories', JSON.stringify(repos));
  }, [repos]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  async function handleAddRepo(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Insert username/repository');
      return;
    }
    try {
      const response = await api.get<IGithubRepository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepos([...repos, repository]);
      formEl.current?.reset();
      setNewRepo('');
      setInputError('');
    } catch {
      setInputError('Repository not found');
    }
  }

  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catálago de repositórios do Github</Title>

      <Form
        ref={formEl}
        hasError={Boolean(inputError)}
        onSubmit={handleAddRepo}
      >
        <input placeholder="username/repository" onChange={handleInputChange} />
        <button type="submit">Buscar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repos>
        {repos.map(repository => (
          <Link
            to={`/repositories/${repository.full_name}`}
            key={repository.full_name}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repos>
    </>
  );
};
