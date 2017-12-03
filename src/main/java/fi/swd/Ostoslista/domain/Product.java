package fi.swd.Ostoslista.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Product {
	
	@JsonIgnore
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private String tuote;
	private String lisatiedot;
	private int maara;
	
	public Product() {
		super();
	}

	public Product(String tuote, String lisatiedot, int maara) {
		super();
		this.tuote = tuote;
		this.lisatiedot = lisatiedot;
		this.maara = maara;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTuote() {
		return tuote;
	}

	public void setTuote(String tuote) {
		this.tuote = tuote;
	}

	public String getLisatiedot() {
		return lisatiedot;
	}

	public void setLisatiedot(String lisatiedot) {
		this.lisatiedot = lisatiedot;
	}

	public int getMaara() {
		return maara;
	}

	public void setMaara(int maara) {
		this.maara = maara;
	}


	@Override
	public String toString() {
		return "Lista [id=" + id + ", tuote=" + tuote + ", lisatiedot=" + lisatiedot + ", maara=" + maara 
				 + "]";
	}
	

}	