import React from "react";
import styles from "./Paginated.module.css";

export default function Paginated({
  pokesPerPage,
  usePoke,
  paginated,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(usePoke / pokesPerPage) - 1; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <ul className={styles.paginated}>
      {pageNumbers &&
        pageNumbers.map(
          (
            number //map para recorrer el array
          ) => (
            <li
              className={currentPage === number ? styles.active : ""}
              key={number}
              onClick={() => paginated(number)}
            >
              {" "}
              {/* si el numero de pagina es igual al currentPage, le pongo la clase active /}{/ muestro el numero de pagina */}
              <p className={styles.current}>{number}</p>
            </li>
          )
        )}
    </ul>
  );
}
