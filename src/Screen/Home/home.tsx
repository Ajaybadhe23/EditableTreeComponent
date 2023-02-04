import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import Detail from "../../Component/Detail";
import Header from "../../Component/Header";
import Sidebar from "../../Component/Sidebar";

const Home = () => {
  return (
    <Container>
      <Header />
      <div className="MainContainer">
        <Sidebar />
        <Outlet />
      </div>
    </Container>
  );
};

export default Home;
