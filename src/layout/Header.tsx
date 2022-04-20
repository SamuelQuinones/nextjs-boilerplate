import { FC, ReactNode } from "react";
import styles from "./Header.module.css";

const Header: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.content}>{children}</div>
      </nav>
    </header>
  );
};

export default Header;
