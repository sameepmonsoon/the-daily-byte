import Hero from "./hero-section";
import Newsletter from "../common/news-letter";
import Categories from "./categories";

function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <Newsletter />
    </div>
  );
}

export default Home;
