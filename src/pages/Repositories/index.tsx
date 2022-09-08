import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Header, Issues, RepoInfo } from './styles';
import logo from '../../assets/logo.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { api } from '../../services/api';

interface IRepositoryParams {
  repository: string;
}

export const Repositories: React.FC = () => {
  const { params } = useRouteMatch<IRepositoryParams>();

  React.useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {
      console.log(response.data);
    });
    api.get(`repos/${params.repository}/issues`).then(response => {
      console.log(response.data);
    });
  }, [params.repository]);
  return (
    <>
      <Header>
        <img src={logo} alt="GitCollection" />
        <Link to="/">
          <FiChevronLeft />
          Back
        </Link>
      </Header>
      <RepoInfo>
        <header>
          <img src="" alt="Murilo Dev" />
          <div>
            <strong>muriloux/api</strong>
            <p>API repo</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>213213</strong>
            <span>stars</span>
          </li>
          <li>
            <strong>232</strong>
            <span>stars</span>
          </li>
          <li>
            <strong>567546</strong>
            <span>stars</span>
          </li>
        </ul>
      </RepoInfo>

      <Issues>
        <Link to="/">
          <div>
            <strong>sdoljapdasd</strong>
            <p>sdadojasiojdas</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  );
};
