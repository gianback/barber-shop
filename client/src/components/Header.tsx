import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Container } from "./Container";
import { IconMenu } from "./Icon-menu";
import { useState } from "react";
import { AdminList } from "./AdminList";
import Cookie from "js-cookie";
import { useUserStore } from "@/store/user.store";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  const navigate = useNavigate();

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleGoToContact = () => {
    const token = Cookie.get("token");

    if (!token) {
      navigate("/login");
    } else {
      navigate("/contact");
    }
  };

  return (
    <header className="bg-tertiary py-3">
      <Container className="flex justify-between items-center">
        <div className="flex items-center gap-24">
          <Logo />
          <ul
            className={`${
              isOpen ? "translate-y-[0%]" : "-translate-y-[100%]"
            } fixed lg:translate-y-0 lg:bg-transparent z-[5]  rounded-br-xl rounded-bl-xl lg:rounded-none  pt-16 lg:pt-0 flex-col bg-primary inset-0 bottom-auto lg:flex-row top-0 lg:static flex items-center [&>li]:p-4 [&>li]:cursor-pointer [&>li]:rounded-lg [&>li]:transition-colors duration-75 ease-linear [&>li:hover]:bg-primary`}
          >
            <li>
              {/* <Link to="/">Inicio</Link> */}
              Inicio
            </li>
            <li>
              {/* <Link to="/">Servicios</Link> */}
              Servicios
            </li>
            <li>Blogs</li>
            <li className="lg:hidden">
              <Link to="/contact">Agendar cita</Link>
            </li>
            <AdminList />
          </ul>
        </div>
        <div className="flex items-center gap-8">
          {user.name && <span className="text-white">¡Hola {user.name}!</span>}
          <Button
            onClick={handleGoToContact}
            className="bg-primary  hover:bg-primary/80 hidden lg:inline-block"
          >
            Agendar cita
            {/* <Link to="/contact"></Link> */}
          </Button>
        </div>

        <IconMenu isActive={isOpen} setIsActive={handleIsOpen} />
      </Container>
    </header>
  );
}
