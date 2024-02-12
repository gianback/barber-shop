import { useLocation } from "react-router-dom";
import { AdminList } from "./AdminList";
import { Link } from "react-router-dom";

const pathList = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Servicios",
    path: "/",
  },
  {
    name: "Blogs",
    path: "/",
  },
];

export function Navbar({ isOpen }: { isOpen: boolean }) {
  const { pathname } = useLocation();

  return (
    <ul
      className={`${
        isOpen ? "translate-y-[0%]" : "-translate-y-[100%]"
      } [&>li]:text-black  [&>li]:border-b-black [&>li]:pl-8 [&>li]:p-4 [&>li]:w-full lg:[&>li]:w-auto [&>li]:border-b-[1px] [&>li]:font-medium lg:[&>li]:text-white fixed lg:translate-y-0 lg:bg-transparent z-[5]  rounded-br-xl rounded-bl-xl lg:rounded-none  pt-16 lg:pt-0 flex-col bg-primary inset-0 bottom-auto lg:flex-row top-0 lg:static flex items-center lg:[&>li]:p-4 [&>li]:cursor-pointer lg:[&>li]:rounded-lg [&>li]:transition-colors duration-75 ease-linear [&>li:hover]:text-black [&>li:hover]:bg-primary`}
    >
      {pathList.map(({ name, path }) =>
        pathname !== "/" ? (
          <li key={name}>
            <Link to={path}>{name}</Link>
          </li>
        ) : (
          <li key={name}>{name}</li>
        )
      )}
      <li className="lg:hidden">
        <Link to="/contact">Agendar cita</Link>
      </li>
      <AdminList />
    </ul>
  );
}
