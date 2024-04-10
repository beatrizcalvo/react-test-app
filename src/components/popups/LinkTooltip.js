import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function LinkTooltip({ id, title, showTooltip, children }) {
  if (!showTooltip) return children;

  return (
    <>
      <OverlayTrigger placement="bottom" overlay={<Tooltip id={id}>{title}</Tooltip>}>
        {children}
      </OverlayTrigger>
    </>
  );
}
