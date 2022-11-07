import { Outlet } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <div>
        <div>
          <h1>I am navigating behehehe</h1>
        </div>
        <Outlet />
      </div>
    </>
  );
}
