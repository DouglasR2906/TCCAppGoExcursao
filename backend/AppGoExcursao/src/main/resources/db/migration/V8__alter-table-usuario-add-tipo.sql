SET @dbname = DATABASE();

/*--------------------------- ALTERANDO USUARIO --------------------------*/
SET @tablename = 'usuario';
SET @columnname = 'tipoUsuario';

SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0, "SELECT 1",
  CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN ", @columnname, " VARCHAR(15) NOT NULL DEFAULT ' ' AFTER ativo_usuarios;")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
/*--------------------------- ALTERANDO USUARIO --------------------------*/