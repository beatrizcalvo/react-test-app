import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function LinkTooltip(props) {
  const { id, title, showTooltip, children } = props;

  if (!showTooltip) return children;

  return (
    <>
      <OverlayTrigger placement="bottom" overlay={<Tooltip id={id}>{title}</Tooltip>}>
        {children}
      </OverlayTrigger>
    </>
  );
}
