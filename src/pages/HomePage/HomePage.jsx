import "./HomePage.scss"
import Header from "../../components/Header/Header";
function HomePage({ handleLogin }) {
  return (
    <div className="homepage">
      <Header handleLogin={handleLogin} />
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