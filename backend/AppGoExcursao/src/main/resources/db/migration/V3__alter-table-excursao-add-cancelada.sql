SET @dbname = DATABASE();

/*--------------------------- ALTERANDO USUARIO <fim> --------------------------*/
SET @tablename = "excursao";
SET @columnname = "cancelada_excursao";

SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0, "SELECT 1", CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN " ,@columnname, " TINYINT;")
  
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;

UPDATE excursao SET cancelada_excursao = false;

ALTER TABLE excursao CHANGE COLUMN cancelada_excursao cancelada_excursao TINYINT NOT NULL DEFAULT 0;
/*--------------------------- ALTERANDO USUARIO <fim> --------------------------*/