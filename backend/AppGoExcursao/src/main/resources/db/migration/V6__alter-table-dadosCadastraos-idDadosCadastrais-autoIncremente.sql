SET @dbname = DATABASE();

/*--------------------------- ALTERANDO DADOSCADSTRAIS --------------------------*/
SET @tablename = 'dadoscadastrais';
SET @columnname = 'id_dadoscadastrais';

SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0, CONCAT("ALTER TABLE ", @tablename, " CHANGE COLUMN ", @columnname, " ", @columnname, " BIGINT NOT NULL AUTO_INCREMENT;"), "SELECT 1"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;

/*--------------------------- ALTERANDO DADOSCADSTRAIS --------------------------*/