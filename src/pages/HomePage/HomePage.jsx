import "./HomePage.scss"
import Header from "../../components/Header/Header";
function HomePage() {
  return (
    <div className="homepage">
      <Header />
      <main className="homepage__main">
        <h1 className="homepage__main-title">EMS</h1>
        <h2 className="homepage__main-subtitle">
          Empowering the Future of Workforce Management
        </h2>
      </main>
    </div>
  )
}
export default HomePage;