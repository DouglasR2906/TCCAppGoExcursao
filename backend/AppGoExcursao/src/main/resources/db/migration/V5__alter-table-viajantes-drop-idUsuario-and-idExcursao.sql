SET @dbname = DATABASE();

/*--------------------------- ALTERANDO VIAJANTES --------------------------*/
SET @tablename = 'viajantes';
SET @foreignKey = 'fk_viajantes_reserva1';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.INNODB_FOREIGN
    WHERE
      (id = concat(@dbname, "/", @foreignKey))
  ) > 0, CONCAT("ALTER TABLE ", @tablename, " DROP FOREIGN KEY ", @foreignKey, " ;"), "SELECT 1"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;


SET @columnname = 'id_excursao_reserva_viajantes';

SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0, CONCAT("ALTER TABLE ", @tablename, " DROP COLUMN " ,@columnname), "SELECT 1"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;

SET @columnname = 'id_usuario_reserva_viajantes';

SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0, CONCAT("ALTER TABLE ", @tablename, " DROP COLUMN " ,@columnname), "SELECT 1"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;

ALTER TABLE `viajantes` DROP PRIMARY KEY,
ADD PRIMARY KEY (`id_viajantes`, `id_reserva_viajantes`),
DROP INDEX `fk_viajantes_reserva1_idx` ,
ADD INDEX `fk_viajantes_reserva1_idx` (`id_reserva_viajantes` ASC) VISIBLE;

ALTER TABLE `viajantes`
ADD CONSTRAINT `fk_viajantes_reserva1`
  FOREIGN KEY (`id_reserva_viajantes`)
  REFERENCES `reserva` (`id_reserva`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
/*--------------------------- ALTERANDO VIAJANTES --------------------------*/