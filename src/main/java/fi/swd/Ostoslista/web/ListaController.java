package fi.swd.Ostoslista.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import fi.swd.Ostoslista.domain.Product;
import fi.swd.Ostoslista.domain.ListaRepository;

@Controller
public class ListaController {

	@Autowired
	private ListaRepository repository;

	@RequestMapping(value = "/login")
	public String login() {
		return "login";
	} 

	@RequestMapping(value = "/ostoslista", method = RequestMethod.GET)
	public String listForm(Model model) {

		model.addAttribute("list", repository.findAll());
		return "ostoslista";
	}	
	
    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
	
	@RequestMapping(value = "/add", method = RequestMethod.GET)
	public String add(Model model) {

		model.addAttribute("tuote", new Product());
		return "add";
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String save(Product list) {
		repository.save(list);
		return "redirect:/ostoslista";
	}
	
	@RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
	public String edit(@PathVariable("id") long tuoteId) {
		repository.findOne(tuoteId);
		return "/edit";
	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
	public String delete(@PathVariable("id") long tuoteId) {
		repository.delete(tuoteId);
		return "redirect:/ostoslista";
	}

	// JSON findAll
	@RequestMapping(value = "/lista", method = RequestMethod.GET)
	public @ResponseBody List<Product> tuoteListRest() {
		return (List<Product>) repository.findAll();
	}

	// JSON findOne
	@RequestMapping(value = "/ostoslista/{id}", method = RequestMethod.GET)
	public @ResponseBody Product findtuoteRest(@PathVariable("id") long listId) {
		return repository.findOne(listId);
	}
    
    
}