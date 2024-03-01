export default function Login(props) {
  return (
    <>
	  <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
	    <div className="filter" />
        <h1>Hello from Login!</h1>
	  </div>
    </>
  );
}
