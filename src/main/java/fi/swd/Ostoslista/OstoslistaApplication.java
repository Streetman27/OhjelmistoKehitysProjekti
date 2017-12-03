package fi.swd.Ostoslista;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import fi.swd.Ostoslista.domain.Product;
import fi.swd.Ostoslista.domain.ListaRepository;
import fi.swd.Ostoslista.domain.User;
import fi.swd.Ostoslista.domain.UserRepository;

@SpringBootApplication
public class OstoslistaApplication {

	private static final Logger log = LoggerFactory.getLogger(ListaRepository.class);
	
	public static void main(String[] args) {
		SpringApplication.run(OstoslistaApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner demo(ListaRepository repository, UserRepository urepository) {
		return (args) -> {
			// save a couple of products
			repository.save(new Product("Maito", "Valio", 2));
			repository.save(new Product("Nuudelit", "Sijaitsee K-Citymarketissa", 8));
			
			// Create users: admin/admin user/user
						User user1 = new User("user", "$2a$06$3jYRJrg0ghaaypjZ/.g4SethoeA51ph3UD4kZi9oPkeMTpjKU5uo6", "user@", "USER");
						User user2 = new User("admin", "$2a$10$0MMwY.IQqpsVc1jC8u7IJ.2rT8b0Cd3b3sfIBGV2zfgnPGtT4r0.C","admin@","ADMIN");
						urepository.save(user1);
						urepository.save(user2);
			//fetch all users
			log.info("Users found with findAll():");
			log.info("------------------------------");
			for (User user : urepository.findAll()) {
				log.info(user.toString());
			}
			log.info("");
			
			// fetch all in list
			log.info("List found with findAll():");
			log.info("-------------------------------");
			for (Product list : repository.findAll()) {
				log.info(list.toString());
			}
			log.info("");

			// fetch an individual book by ID
			Product lista = repository.findOne(1L);
			log.info("List found with findOne(1L):");
			log.info("--------------------------------");
			log.info(lista.toString());
			log.info("");

			// fetch books by item
			log.info("Book found with findByItem('Maito'):");
			log.info("--------------------------------------------");
			for (Product list : repository.findByTuote("Maito")) {
				log.info(list.toString());
			}
		};
	}

}
