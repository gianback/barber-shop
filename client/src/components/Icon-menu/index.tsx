import styles from "./style.module.css";

interface IconMenuProps {
  isActive: boolean;
  setIsActive: () => void;
}
export function IconMenu({ setIsActive, isActive }: IconMenuProps) {
  return (
    <div
      onClick={setIsActive}
      className={`${styles["Icon-Menu"]} ${isActive ? styles.change : null}`}
    >
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
    </div>
  );
}
