import logo from "@/assets/logo.svg";

export function Logo() {
  return (
    <picture className="flex flex-shrink-0">
      <img src={logo} alt="Logo Barber Shop" />
    </picture>
  );
}
