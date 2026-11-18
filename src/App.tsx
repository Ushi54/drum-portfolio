import { About } from './components/About';
import { Drums } from './components/Drums';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Links } from './components/Links';
import { Side } from './components/Side';
import { ZoneShift } from './components/ZoneShift';

// 2026-11-18 組み替え：主役はドラム。note とアプリは「ドラムのほかに」として1つにまとめる。
// 色の切り替えは「ドラム（黒）→ ほかの活動（明るい）→ リンク（黒）」の2回だけ。
const App = () => (
  <>
    <Header />
    <main>
      {/* 主役：ドラム（スタジオの黒）。プロフィールもドラマーとしての中身なのでここに置く */}
      <div data-zone="zone-night" className="zone-night">
        <Hero />
        <Drums />
        <About />
      </div>

      <ZoneShift from="zone-night" to="zone-paper" />

      {/* サブ：ドラムのほかの活動（note・アプリ）。背景は真っ白 */}
      <div data-zone="zone-paper" className="zone-paper">
        <Side />
      </div>

      <ZoneShift from="zone-paper" to="zone-night" />

      <div data-zone="zone-night" className="zone-night">
        <Links />
      </div>
    </main>
    <div data-zone="zone-night" className="zone-night">
      <Footer />
    </div>
  </>
);

export default App;
