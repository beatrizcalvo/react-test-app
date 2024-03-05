import { Outlet, useLocation } from "react-router-dom";

export default function Auth(props) {
  const location = useLocation();

  const backgroundImage =
    location.pathname === "/login"
      ? require("../../assets/img/illustration/illustration-signin.jpg")
      : require("../../assets/img/illustration/illustration-signup.jpg");

  return (
    <>
      <main className="main-content mt-0 ps">
        <section>
          <div className="page-header min-vh-100">
            <div className="container">
              <div className="row">
                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                  <div
                    className="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                    style={{
                      backgroundImage: "url(" + backgroundImage + ")",
                      backgroundSize: "cover",
                    }}
                  />
                </div>
                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
