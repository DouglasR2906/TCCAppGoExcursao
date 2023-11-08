package tcc.goexcursao.apiGoExcursao.domain.excursao;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExcursaoService extends Exception{

    private String diretorioBase = "C:/xampp/htdocs/GoExcursoes/Imagens/";

    public void UploadImagem(MultipartFile imagem, Long id ) throws IOException {
        diretorioBase += id;
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

    public List<String> listaImagens(Excursao excursao){
        File diretorioImagens = new File(diretorioBase + excursao.getIdExcursao());
        if (!diretorioImagens.exists() || !diretorioImagens.isDirectory()) {
            return null;
        }

        File[] arquivos = diretorioImagens.listFiles();
        if (arquivos == null || arquivos.length == 0) {
            return null;
        }

        List<String> nomesImagens = Arrays.stream(arquivos)
                .filter(File::isFile)
                .map(file -> excursao.getUrlImagensExcursao() + file.getName())
                .collect(Collectors.toList());

        return nomesImagens;
    }
}
