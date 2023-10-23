import styles from "./Rodape.module.scss";

function Rodape() {
  return (
    <footer className={styles.rodape}>
      <img
        style={{ width: "7rem", height: "3rem" }}
        src="/imagens/logo.png"
        alt="logo-cabeçalho"
      />
    </footer>
  );
}

export default Rodape;