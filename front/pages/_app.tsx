import PropTypes from 'prop-types'
import Head from 'next/head'
import wrapper from '../store/configureStore'
import 'antd/dist/antd.css';

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>노드버드</title>
      </Head>
      <Component />
    </>
  )
}

App.prototype = {
  Component: PropTypes.elementType.isRequired
}

export default wrapper.withRedux(App);