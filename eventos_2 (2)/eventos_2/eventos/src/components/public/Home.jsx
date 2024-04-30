import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-body-tertiary rounded">
          <div className="container-fluid py-5 ">
            <h1 className="display-5 fw-bold">Olá👋</h1>
            <div className="d-flex justify-content">
              <Link to={"/login"} className="btn btn-info btn-lg px-4">
                Entrar
              </Link>
              <Link to={"/register"} className="btn btn-success btn-lg px-4 mx-2">
                Registar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;