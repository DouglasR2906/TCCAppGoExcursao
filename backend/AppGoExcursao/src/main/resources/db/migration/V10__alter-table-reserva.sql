SET @dbname = DATABASE();

/*--------------------------- ALTERANDO RESERVA --------------------------*/
SET @tablename = 'reserva';
SET @columnname = 'status_reserva';

SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0, "SELECT 1", CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN ", @columnname, " INT NULL DEFAULT 0 AFTER `forma_pagto_reserva`;")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;

SET @tablename = 'reserva';
SET @columnname = 'forma_pagto_reserva';

SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0, CONCAT("ALTER TABLE ", @tablename, " CHANGE COLUMN ", @columnname, " " , @columnname, " BIGINT NULL DEFAULT NULL ;"),
  "SELECT 1"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;

ALTER TABLE `reserva` ADD INDEX `fk_reserva_formaPagamento1_idx` (`forma_pagto_reserva` ASC) VISIBLE;

ALTER TABLE `reserva`
ADD CONSTRAINT `fk_reserva_formaPagamento1`
  FOREIGN KEY (`forma_pagto_reserva`)
  REFERENCES `forma_pagamento` (`id_forma_pagamento`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

/*--------------------------- ALTERANDO RESERVA --------------------------*/