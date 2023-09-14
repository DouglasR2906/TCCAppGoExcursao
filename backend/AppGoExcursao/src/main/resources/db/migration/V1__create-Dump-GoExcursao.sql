-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema goexcursao
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema goexcursao
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `goexcursao` DEFAULT CHARACTER SET utf8 ;
USE `goexcursao` ;

-- -----------------------------------------------------
-- Table `goexcursao`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goexcursao`.`usuarios` (
  `id_usuarios` BIGINT NOT NULL AUTO_INCREMENT,
  `login_usuarios` VARCHAR(100) NOT NULL DEFAULT ' ',
  `senha_usuarios` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_usuarios`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goexcursao`.`dadosCadastrais`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goexcursao`.`dadosCadastrais` (
  `id_usuario_dadosCadastrais` BIGINT NOT NULL,
  `nome_dadosCadastrais` VARCHAR(50) NOT NULL DEFAULT ' ',
  `documento_dadosCadastrais` VARCHAR(14) NOT NULL DEFAULT ' ',
  `data_nascimento_dadosCadastrais` DATE NULL,
  `pais_dadosCadastrais` VARCHAR(35) NULL,
  `cidade_dadosCadastrais` VARCHAR(45) NULL,
  `uf_dadosCadastrais` VARCHAR(2) NULL DEFAULT ' ',
  `email_dadosCadastrais` VARCHAR(100) NOT NULL,
  `telefone_1_dadosCadastrais` VARCHAR(11) NOT NULL,
  `telefone_2_dadosCadastrais` VARCHAR(11) NULL,
  `sexo_dadosCadastrais` VARCHAR(10),
  PRIMARY KEY (`id_usuario_dadosCadastrais`),
  CONSTRAINT `fk_dadosCadastrais_usuarios1`
    FOREIGN KEY (`id_usuario_dadosCadastrais`)
    REFERENCES `goexcursao`.`usuarios` (`id_usuarios`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goexcursao`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goexcursao`.`categoria` (
  `id_categoria` BIGINT NOT NULL,
  `descricao_categoria` VARCHAR(45) NOT NULL DEFAULT ' ',
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goexcursao`.`excursao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goexcursao`.`excursao` (
  `id_excursao` BIGINT NOT NULL AUTO_INCREMENT,
  `id_usuario_excursao` BIGINT NOT NULL,
  `titulo_excursao` VARCHAR(50) NOT NULL DEFAULT ' ',
  `cidade_origem_excursao` VARCHAR(45) NOT NULL DEFAULT ' ',
  `cidade_destino_excursao` VARCHAR(45) NOT NULL DEFAULT ' ',
  `descricao_excursao` VARCHAR(1000) NOT NULL DEFAULT ' ',
  `valor_excursao` DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  `data_ida_excursao` DATE NOT NULL,
  `data_volta_excursao` DATE NOT NULL,
  `hora_ida_excursao` TIME NOT NULL,
  `hora_volta_excursao` TIME NOT NULL,
  `id_categoria_excursao` BIGINT NOT NULL,
  PRIMARY KEY (`id_excursao`, `id_usuario_excursao`),
  INDEX `fk_excursao_categoria1_idx` (`id_categoria_excursao` ASC) VISIBLE,
  INDEX `fk_excursao_usuarios_idx` (`id_usuario_excursao` ASC) VISIBLE,
  CONSTRAINT `fk_excursao_categoria1`
    FOREIGN KEY (`id_categoria_excursao`)
    REFERENCES `goexcursao`.`categoria` (`id_categoria`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_excursao_usuarios`
    FOREIGN KEY (`id_usuario_excursao`)
    REFERENCES `goexcursao`.`usuarios` (`id_usuarios`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goexcursao`.`reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goexcursao`.`reserva` (
  `id_reserva` BIGINT NOT NULL AUTO_INCREMENT,
  `id_usuario_reserva` BIGINT NOT NULL,
  `id_excursao_reserva` BIGINT NOT NULL,
  `qtd_viajantes_reserva` INT NULL DEFAULT 0,
  `valor_total_reserva` DECIMAL(10,2) NULL DEFAULT '0.00',
  `forma_pagto_reserva` INT NULL,
  PRIMARY KEY (`id_reserva`, `id_usuario_reserva`, `id_excursao_reserva`),
  INDEX `fk_reserva_excursao1_idx` (`id_excursao_reserva` ASC) VISIBLE,
  INDEX `fk_reserva_usuarios1_idx` (`id_usuario_reserva` ASC) VISIBLE,
  CONSTRAINT `fk_reserva_usuarios1`
    FOREIGN KEY (`id_usuario_reserva`)
    REFERENCES `goexcursao`.`usuarios` (`id_usuarios`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_reserva_excursao1`
    FOREIGN KEY (`id_excursao_reserva`)
    REFERENCES `goexcursao`.`excursao` (`id_excursao`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goexcursao`.`viajantes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goexcursao`.`viajantes` (
  `id_viajantes` BIGINT NOT NULL AUTO_INCREMENT,
  `id_reserva_viajantes` BIGINT NOT NULL,
  `id_usuario_reserva_viajantes` BIGINT NOT NULL,
  `id_excursao_reserva_viajantes` BIGINT NOT NULL,
  `nome_viajantes` VARCHAR(50) NULL,
  `documento_viajantes` VARCHAR(11) NULL,
  PRIMARY KEY (`id_viajantes`, `id_reserva_viajantes`, `id_usuario_reserva_viajantes`, `id_excursao_reserva_viajantes`),
  INDEX `fk_viajantes_reserva1_idx` (`id_reserva_viajantes` ASC, `id_usuario_reserva_viajantes` ASC, `id_excursao_reserva_viajantes` ASC) VISIBLE,
  CONSTRAINT `fk_viajantes_reserva1`
    FOREIGN KEY (`id_reserva_viajantes` , `id_usuario_reserva_viajantes` , `id_excursao_reserva_viajantes`)
    REFERENCES `goexcursao`.`reserva` (`id_reserva` , `id_usuario_reserva` , `id_excursao_reserva`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goexcursao`.`forma_pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goexcursao`.`forma_pagamento` (
  `id_forma_pagamento` BIGINT NOT NULL,
  `descricao_forma_pagamento` VARCHAR(45) NOT NULL DEFAULT ' ',
  PRIMARY KEY (`id_forma_pagamento`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goexcursao`.`forma_pagto_excursao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goexcursao`.`forma_pagto_excursao` (
  `id_excursao_formaPagtoExcursao` BIGINT NOT NULL,
  `id_forma_pagamento_formaPagtoExcursao` BIGINT NOT NULL,
  PRIMARY KEY (`id_excursao_formaPagtoExcursao`, `id_forma_pagamento_formaPagtoExcursao`),
  INDEX `fk_forma_pagto_excursao_forma_pagamento1_idx` (`id_forma_pagamento_formaPagtoExcursao` ASC) VISIBLE,
  CONSTRAINT `fk_forma_pagto_excursao_excursao1`
    FOREIGN KEY (`id_excursao_formaPagtoExcursao`)
    REFERENCES `goexcursao`.`excursao` (`id_excursao`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_forma_pagto_excursao_forma_pagamento1`
    FOREIGN KEY (`id_forma_pagamento_formaPagtoExcursao`)
    REFERENCES `goexcursao`.`forma_pagamento` (`id_forma_pagamento`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;