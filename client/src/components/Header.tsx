import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Container } from "./Container";
import { IconMenu } from "./Icon-menu";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
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
          </ul>
        </div>
        <Button className="bg-primary  hover:bg-primary/80 hidden lg:inline-block">
          <Link to="/contact">Agendar cita</Link>
        </Button>
        <IconMenu isActive={isOpen} setIsActive={handleIsOpen} />
      </Container>
    </header>
  );
}
