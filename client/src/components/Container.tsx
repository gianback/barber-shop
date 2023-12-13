type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className }: Props) {
  return (
    <div className={`px-4 max-w-[90rem] w-full lg:w-auto mx-auto ${className}`}>
      {children}
    </div>
  );
}
