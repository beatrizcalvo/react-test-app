import "../../assets/css/loading-page.css";

export default function LoadingPage(props) {
  return (
    <>
      <div className="loader">
        <div className="loader-centered">
          <div className="object square-one" />
		      <div className="object square-two" />
		      <div className="object square-three" />
        </div>
      </div>
    </>
  );
}
