import '../styles/globals.scss';

import { QuestionsProvider } from '../context/questionsContext';

function MyApp({ Component, pageProps }) {
  return (
    <QuestionsProvider>
      <Component {...pageProps} />
    </QuestionsProvider>
  )
}

export default MyApp
