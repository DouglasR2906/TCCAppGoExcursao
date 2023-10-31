package tcc.goexcursao.apiGoExcursao.domain.excursao;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
@Service
public class ExcursaoService extends Exception{

    public void UploadImagem(MultipartFile imagem, Long id ) throws IOException {
        String diretorioBase = "C:/xampp/htdocs/GoExcursoes/Imagens/" + id;
        File diretorio = new File(diretorioBase);
        if (!diretorio.exists()) {
            diretorio.mkdirs();
        }
        String filePath = diretorioBase + "/" + imagem.getOriginalFilename();
        try {
            Files.write(Paths.get(filePath), imagem.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
