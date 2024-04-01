import { Button, Spinner } from "react-bootstrap";

export default function ButtonLoading(props) {
  const { variant, type, className, titleButton, disabled, isLoading, handleOnClick } = props;
  
  return (
    <>
      <Button
        variant={variant}
        type={type}
        {...(!!className ? { className: className } : {})}
        disabled={disabled || isLoading}
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
