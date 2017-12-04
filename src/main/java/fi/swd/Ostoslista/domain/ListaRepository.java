package fi.swd.Ostoslista.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

@RestResource
public interface ListaRepository extends CrudRepository<Product, Long>{

	List<Product> findByTuote(String tuote);

}