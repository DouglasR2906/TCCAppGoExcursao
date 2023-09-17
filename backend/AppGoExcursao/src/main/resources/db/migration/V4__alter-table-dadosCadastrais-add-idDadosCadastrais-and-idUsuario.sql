SET @dbname = DATABASE();

/*--------------------------- ALTERANDO DADOSCADASTRAIS --------------------------*/
SET @tablename = 'dadoscadastrais';
SET @columnname = 'id_dadosCadastrais';

SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0, "SELECT 1", CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN " ,@columnname, " BIGINT NOT NULL FIRST;")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;

SET FOREIGN_KEY_CHECKS = 0;
ALTER TABLE dadoscadastrais DROP FOREIGN KEY `fk_dadosCadastrais_usuarios1`;
ALTER TABLE dadoscadastrais DROP PRIMARY KEY, ADD PRIMARY KEY (`id_dadosCadastrais`, `id_usuario_dadosCadastrais`);
ALTER TABLE dadoscadastrais ADD CONSTRAINT `fk_dadosCadastrais_usuarios1` FOREIGN KEY (`id_usuario_dadosCadastrais`)
    REFERENCES usuarios (`id_usuarios`)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

SET FOREIGN_KEY_CHECKS = 1;
/*--------------------------- ALTERANDO DADOSCADASTRAIS --------------------------*/