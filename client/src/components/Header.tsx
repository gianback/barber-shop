import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Container } from "./Container";
import { IconMenu } from "./Icon-menu";
import { useLayoutEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserStore } from "@/store/user.store";
import JsCookie from "js-cookie";
import { Navbar } from "./Navbar";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isToken, setIsToken] = useState(false);

  const user = useUserStore((state) => state.user);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  useLayoutEffect(() => {
    const token = JsCookie.get("token");
    setIsToken(!!token);
  }, []);

  const handleOpenDialog = () => {
    setModalOpen(!isModalOpen);
  };

  const handleNavigateToGetAppointment = (route: string) => {
    handleOpenDialog();
    navigate(route);
  };

  const disableBtn = () => {
    return pathname.includes("/contact");
  };

  const isVisibleBtn = disableBtn();

  return (
    <header className="bg-tertiary py-3 sticky top-0 z-50">
      <Container className="flex justify-between items-center">
        <div className="flex items-center gap-24">
          <Logo />
          <Navbar isOpen={isOpen} />
        </div>
        <div className="flex items-center gap-8">
          {user.name && isToken && (
            <span className="text-white">¡Hola {user.name}!</span>
          )}
          {isToken && !isVisibleBtn && (
            <Link to={"/contact"}>
              <Button
                className={` bg-primary/80 text-white  hover:bg-primary/80 hidden lg:inline-block`}
              >
                Agendar cita
              </Button>
            </Link>
          )}
          {!isToken && !isVisibleBtn && (
            <Dialog open={isModalOpen} onOpenChange={handleOpenDialog}>
              <DialogTrigger
                className={` bg-primary text-white py-2 rounded-md px-3 hover:bg-primary/80 hidden lg:inline-block`}
              >
                Agendar cita
              </DialogTrigger>
              <DialogContent className="bg-secondary text-white">
                <DialogHeader>
                  <DialogTitle>¿Cómo deseas continuar?</DialogTitle>
                  <div className="flex items-center justify-center gap-8 !mt-12">
                    <Button
                      onClick={() => handleNavigateToGetAppointment("/contact")}
                      className="bg-primary/80 text-white  hover:bg-primary/80 hidden lg:inline-block"
                    >
                      Invitado
                    </Button>
                    <Button
                      onClick={() => handleNavigateToGetAppointment("/login")}
                      className="bg-primary/80 text-white  hover:bg-primary/80 hidden lg:inline-block"
                    >
                      Ir a iniciar sesión
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <IconMenu isActive={isOpen} setIsActive={handleIsOpen} />
      </Container>
    </header>
  );
}
