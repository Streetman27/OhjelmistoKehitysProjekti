class  App extends React.Component {
		  constructor(props) {
		      super(props);
		      this.deleteProduct = this.deleteProduct.bind(this);
		      this.createProduct = this.createProduct.bind(this);
		      this.state = {
		          products: [],
		      };
		   }
		 
		  componentDidMount() {
		    this.loadProductsFromServer();
		  }
		  
		  // Load products from database
		  loadProductsFromServer() {
		      fetch('http://localhost:8080/api/products', {credentials: 'same-origin'}) 
		      .then((response) => response.json()) 
		      .then((responseData) => { 
		          this.setState({ 
		              products: responseData._embedded.products, 
		          }); 
		      });     
		  } 
		  
		  // Delete product
		  deleteProduct(product) {
		      fetch (product._links.self.href,
		      { method: 'DELETE', credentials: 'same-origin'})
		      .then( 
		          res => this.loadProductsFromServer()
		      )
		      .catch( err => console.error(err))                
		  }  
		  
		  // Create new product
		  createProduct(product) {
		      fetch('http://localhost:8080/api/products', {
			  method: 'POST', credentials: 'same-origin',
		          headers: {
		            'Content-Type': 'application/json',
		          },
		          body: JSON.stringify(product)
		      })
		      .then( 
		          res => this.loadProductsFromServer()
		      )
		      .catch( err => console.error(err))
		  }
		  
		  
		
		  render() {
		    return (
		       <div>
		       	  <h1>Moi</h1>
		          <ProductForm createProduct={this.createProduct}/>
		          <ProductTable deleteProduct={this.deleteProduct} products={this.state.products}/> 
		       </div>
		    );
		  }
		}
		    	
		class ProductTable extends React.Component {
		    constructor(props) {
		        super(props);
		    }
		    
		    render() {
		    var products = this.props.products.map(product =>
		        <Product key={product._links.self.href} product={product} deleteProduct={this.props.deleteProduct}/>
		    );

		    return (
		      <div>
		      <table className="table table-striped">
		        <thead>
		          <tr>
		            <th>Tuote</th><th>Lisätiedot</th><th>Määrä</th><th> </th>
		          </tr>
		        </thead>
		        <tbody>{products}</tbody>
		      </table>
		      </div>);
		  }
		}
		        
		class Product extends React.Component {
		    constructor(props) {
		        super(props);
		        this.deleteProduct = this.deleteProduct.bind(this);
		    }

		    deleteProduct() {
		        this.props.deleteProduct(this.props.product);
		    } 
		 
		    render() {
		        return (
		          <tr>
		            <td>{this.props.product.tuote}</td>
		            <td>{this.props.product.lisatiedot}</td>
		            <td>{this.props.product.maara}</td>
		            <td>
		                <button className="btn btn-danger" onClick={this.deleteProduct}>Delete</button>
		            </td>
		          </tr>
		        );
		    } 
		}

		class ProductForm extends React.Component {
		    constructor(props) {
		        super(props);
		        this.state = {tuote: '', lisatiedot: '', maara: ''};
		        this.handleSubmit = this.handleSubmit.bind(this);   
		        this.handleChange = this.handleChange.bind(this);     
		    }

		    handleChange(event) {
		        console.log("NAME: " + event.target.name + " VALUE: " + event.target.value)
		        this.setState(
		            {[event.target.name]: event.target.value}
		        );
		    }    
		    
		    handleSubmit(event) {
		        event.preventDefault();
		        console.log("tuote: " + this.state.tuote);
		        var newProduct = {tuote: this.state.tuote, lisatiedot: this.state.lisatiedot, maara: this.state.maara};
		        this.props.createProduct(newProduct);        
		    }
		    
		    render() {
		        return (
		            <div className="panel panel-default">
		                <div className="panel-heading">Luo ruokalista</div>
		                <div className="panel-body">
		                <form className="form-inline">
		                    <div className="col-md-2">
		                        <input type="text" placeholder="Tuote" className="form-control"  name="tuote" onChange={this.handleChange}/>    
		                    </div>
		                    <div className="col-md-2">       
		                        <input type="text" placeholder="Lisätiedot" className="form-control" name="lisatiedot" onChange={this.handleChange}/>
		                    </div>
		                    <div className="col-md-2">
		                        <input type="text" placeholder="Määrä" className="form-control" name="maara" onChange={this.handleChange}/>
		                    </div>
		                    <div className="col-md-2">
		                        <button className="btn btn-success" onClick={this.handleSubmit}>Save</button>   
		                    </div>        
		                </form>
		                </div>      
		            </div>
		         
		        );
		    }
		}

		ReactDOM.render(<App />, document.getElementById('root') );