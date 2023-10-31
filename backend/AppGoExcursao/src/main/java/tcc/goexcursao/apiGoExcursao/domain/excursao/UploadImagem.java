package tcc.goexcursao.apiGoExcursao.domain.excursao;

import org.springframework.web.multipart.MultipartFile;

public record UploadImagem(
        MultipartFile imagem
) {
}
