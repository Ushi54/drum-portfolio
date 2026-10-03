import { About } from './components/About';
import { Apps } from './components/Apps';
import { Drums } from './components/Drums';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Links } from './components/Links';
import { Writing } from './components/Writing';
import { ZoneShift } from './components/ZoneShift';

const App = () => (
  <>
    <Header />
    <main>
      {/* 夜：スタジオ（演奏まわり） */}
      <div data-zone="zone-night" className="zone-night">
        <Hero />
        <Drums />
      </div>

      {/* 夜明け */}
      <ZoneShift from="zone-night" to="zone-day" />

      {/* 昼：机の上（書いたもの・作ったもの） */}
      <div data-zone="zone-day" className="zone-day">
        <Writing />
        <Apps />
      </div>

      {/* 夕暮れ：またスタジオへ */}
      <ZoneShift from="zone-day" to="zone-night" />

      {/* 夜：ドラマーとしてのプロフィールとリンク */}
      <div data-zone="zone-night" className="zone-night">
        <About />
        <Links />
      </div>
    </main>
    <div data-zone="zone-night" className="zone-night">
      <Footer />
    </div>
  </>
);

export default App;
