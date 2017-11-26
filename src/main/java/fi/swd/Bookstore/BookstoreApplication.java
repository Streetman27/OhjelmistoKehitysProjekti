package fi.swd.Bookstore;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import fi.swd.Bookstore.domain.User;
import fi.swd.Bookstore.domain.Book;
import fi.swd.Bookstore.domain.BookRepository;
import fi.swd.Bookstore.domain.UserRepository;

@SpringBootApplication
public class BookstoreApplication {

	private static final Logger log = LoggerFactory.getLogger(BookRepository.class);
	
	public static void main(String[] args) {
		SpringApplication.run(BookstoreApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner demo(BookRepository repository, UserRepository urepository) {
		return (args) -> {
			// save a couple of books
			repository.save(new Book("A Farewell to Arms", "Ernest Hemingway","1929","1232323-21"));
			repository.save(new Book("Animal Farm", "George Orwell","1945","2212343-5"));
			
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
			
			// fetch all books
			log.info("Books found with findAll():");
			log.info("-------------------------------");
			for (Book book : repository.findAll()) {
				log.info(book.toString());
			}
			log.info("");

			// fetch an individual book by ID
			Book book = repository.findOne(1L);
			log.info("Book found with findOne(1L):");
			log.info("--------------------------------");
			log.info(book.toString());
			log.info("");

			// fetch books by author
			log.info("Book found with findByAuthor('George Orwell'):");
			log.info("--------------------------------------------");
			for (Book author : repository.findByAuthor("George Orwell")) {
				log.info(author.toString());
			}
			log.info("");
		};
	}

}
