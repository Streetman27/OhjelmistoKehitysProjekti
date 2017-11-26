package fi.swd.Candystore.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface CandyRepository extends CrudRepository<Candy, Long>{

	List<Candy> findByAuthor(String author);
}
