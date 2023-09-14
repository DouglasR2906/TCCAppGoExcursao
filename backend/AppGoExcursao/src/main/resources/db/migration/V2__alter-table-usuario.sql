SET @dbname = DATABASE();

/*--------------------------- ALTERANDO USUARIO <fim> --------------------------*/
SET @tablename = "usuarios";
SET @columnname = "ativo_usuarios";

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

UPDATE USUARIOS SET ativo_usuarios = true;

ALTER TABLE USUARIOS CHANGE COLUMN ativo_usuarios ativo_usuarios TINYINT NOT NULL DEFAULT 1;
/*--------------------------- ALTERANDO USUARIO <fim> --------------------------*/