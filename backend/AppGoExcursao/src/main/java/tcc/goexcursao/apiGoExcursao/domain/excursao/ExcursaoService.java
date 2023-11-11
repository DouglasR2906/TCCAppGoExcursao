package tcc.goexcursao.apiGoExcursao.domain.excursao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tcc.goexcursao.apiGoExcursao.domain.categoria.CategoriaRepository;
import tcc.goexcursao.apiGoExcursao.domain.usuario.UsuarioRepository;
import tcc.goexcursao.apiGoExcursao.infra.exception.ValidacaoException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExcursaoService extends Exception{

    @Autowired
    private ExcursaoRepository excursaoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;
    private String diretorioBase = "C:/xampp/htdocs/GoExcursoes/Imagens/";

    public Excursao cadastrar(DadosExcursao dadosExcursao){

        var usuario = usuarioRepository.findById(dadosExcursao.idUsuarioExcursao()).orElse(null);
        var categoria = categoriaRepository.findById(dadosExcursao.categoriaExcursao()).orElse(null);

        if (usuario == null && !usuario.getAtivoUsuario()) {
            throw new ValidacaoException("Usuário informado não encontrado ou inativo!");
        }

        if (categoria == null){
            throw new ValidacaoException("Categoria informada não encontrado!");
        }

        var excursao = new Excursao(dadosExcursao);
        excursao.setUsuario(usuario);
        excursao.setCategoria(categoria);
        excursaoRepository.save(excursao);

        excursao = excursaoRepository.getReferenceById(excursao.getIdExcursao());
        excursao.setUrlImagensExcursao("http://localhost/GoExcursoes/Imagens/" + excursao.getIdExcursao() + "/" );

        return excursao;
    }

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

    public Page<DadosExcursaoListagem> buscarByFiltros(Pageable paginacao, String cidadeDestino, LocalDate dataInicio, LocalDate dataFinal){
        return excursaoRepository.buscarPorDestinoDataIda(cidadeDestino, dataInicio, dataFinal, paginacao).map(DadosExcursaoListagem::new);
    }



}
