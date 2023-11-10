import renderer from 'react-test-renderer'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Home from '../src/pages/index';

jest.mock('next/head');
jest.mock('../styles/Home.module.css');

const renderTree = (tree: any) => renderer.create(tree);
describe('<Home>', () => {
  it('should render component', () => {
    expect(renderTree(<Home 
    />).toJSON()).toMatchSnapshot();
  });
  
});