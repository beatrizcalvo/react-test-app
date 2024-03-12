import SidebarMenu from 'react-bootstrap-sidebar-menu';

export default function SidebarDashboard(props) {
  return (
    <>
      <SidebarMenu
        expand="xs"
        variant="vertical"
      >
        <SidebarMenu.Header>
          <SidebarMenu.Brand>
          </SidebarMenu.Brand>
        </SidebarMenu.Header>
        <hr class="horizontal light mt-0 mb-2" />
      </SidebarMenu>
    </>
  );
};
