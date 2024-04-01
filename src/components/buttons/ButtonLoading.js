import { Button, Spinner } from "react-bootstrap";

export default function ButtonLoading(props) {
  const { variant, type, className, titleButton, isLoading, handleOnClick } = props;
  
  return (
    <>
      <Button
        variant={variant}
        type={type}
        {...(!!className ? { className: className } : {})}
        disabled={isLoading}
        {...(!!handleOnClick ? { onClick: handleOnClick } : {})}
      >
        {isLoading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />{" "}
            Loading...
          </>
        ) : (
          titleButton
        )}
      </Button>
    </>
  );
}
