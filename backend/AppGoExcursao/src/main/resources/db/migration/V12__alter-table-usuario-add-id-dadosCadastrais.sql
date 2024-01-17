/*--------------------------- ALTERANDO USUARIOS --------------------------*/
ALTER TABLE `usuarios`
ADD COLUMN `id_dadoscadastrais_usuarios` BIGINT NULL AFTER `tipo_usuario`,
ADD INDEX `fk_dadoscadastrais_idx` (`id_dadoscadastrais_usuarios` ASC) VISIBLE;

ALTER TABLE `usuarios`
ADD CONSTRAINT `fk_dadoscadastrais`
  FOREIGN KEY (`id_dadoscadastrais_usuarios`)
  REFERENCES `dadoscadastrais` (`id_dadoscadastrais`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

UPDATE usuarios u
        JOIN
    dadoscadastrais d ON u.id_usuarios = d.id_usuario_dadoscadastrais
SET
    u.id_dadoscadastrais_usuarios = d.id_dadoscadastrais;

/*--------------------------- ALTERANDO USUARIOS --------------------------*/