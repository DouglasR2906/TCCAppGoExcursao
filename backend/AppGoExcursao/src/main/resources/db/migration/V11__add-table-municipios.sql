/*--------------------------- CRIANDO MUNICIPIOS --------------------------*/
DROP TABLE IF EXISTS `municipios`;

CREATE TABLE `municipios` (
  `id_municipio` BIGINT NOT NULL AUTO_INCREMENT,
  `nome_municipio` VARCHAR(50) NOT NULL DEFAULT ' ',
  `uf_municipio` VARCHAR(2) NOT NULL DEFAULT ' ',
  PRIMARY KEY (`id_municipio`));

/*--------------------------- CRIANDO MUNICIPIOS --------------------------*/