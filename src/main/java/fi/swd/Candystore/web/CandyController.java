package fi.swd.Candystore.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import fi.swd.Candystore.domain.Candy;
import fi.swd.Candystore.domain.CandyRepository;

@Controller
public class CandyController {

	@Autowired
	private CandyRepository repository;

	@RequestMapping(value = "/login")
	public String login() {
		return "login";
	}

	@RequestMapping(value = "/booklist", method = RequestMethod.GET)
	public String bookForm(Model model) {

		model.addAttribute("books", repository.findAll());
		return "booklist";
	}

	@RequestMapping(value = "/add", method = RequestMethod.GET)
	public String add(Model model) {

		model.addAttribute("book", new Candy());
		return "addbook";
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String save(Candy book) {
		repository.save(book);
		return "redirect:/booklist";
	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
	public String delete(@PathVariable("id") long bookId) {
		repository.delete(bookId);
		return "redirect:/booklist";
	}

	// JSON findAll
	@RequestMapping(value = "/books", method = RequestMethod.GET)
	public @ResponseBody List<Candy> bookListRest() {
		return (List<Candy>) repository.findAll();
	}

	// JSON findOne
	@RequestMapping(value = "/book/{id}", method = RequestMethod.GET)
	public @ResponseBody Candy findBookRest(@PathVariable("id") long bookId) {
		return repository.findOne(bookId);
	}
	
    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

}