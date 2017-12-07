function predicateBy(prop){
	return function(a,b){
	  if( a[prop] > b[prop]){
		  return 1;
	  }else if( a[prop] < b[prop] ){
		  return -1;
	  }
	}
}
class  App extends React.Component {
		  constructor(props) {
		      super(props);
		      this.deleteProduct = this.deleteProduct.bind(this);
			  this.getProduct = this.getProduct.bind(this);
			  this.updateProduct = this.updateProduct.bind(this);
		      this.createProduct = this.createProduct.bind(this);
		      this.state = {
		          products: [],
				  product: null
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
		  
		  // Update new product
		  updateProduct(product) {
			fetch(product._links.self.href, {
				method: 'PUT',
				credentials: 'same-origin',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(product)
			})
			.then( 
		          res => this.loadProductsFromServer()
		      )
		      .catch( err => console.error(err))
		  }
		  
		  // Get existing product
		  getProduct(product) {
			fetch (product._links.self.href,
		      { method: 'GET', credentials: 'same-origin'})
		      .then((response) => response.json()) 
		      .then((responseData) => { 
		          this.setState({ 
		              product: responseData,
		          }); 
		      });             
		  }
		  
		
		  render() {
		    return (
		       <div>
		          <ProductForm createProduct={this.createProduct}/>
				  <EditProduct product={this.state.product} updateProduct={this.updateProduct}/>
		          <ProductTable getProduct={this.getProduct} deleteProduct={this.deleteProduct} products={this.state.products}/> 
		       </div>
		    );
		  }
		}
		    	
		class ProductTable extends React.Component {
		    constructor(props) {
		        super(props);
		    }
			
		    render() {
			this.props.products.sort( predicateBy("tuote") );
		    var products = this.props.products.map(product =>
		        <Product key={product._links.self.href} product={product} deleteProduct={this.props.deleteProduct} getProduct={this.props.getProduct}/>
		    );

		    return (
		      <div>
		      <table className="table table-striped">
		        <thead>
		          <tr>
		            <th>Tuote</th><th>Lisätiedot</th><th>Määrä</th><th> </th><th> </th>
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
				this.getProduct = this.getProduct.bind(this);
		    }

		    deleteProduct() {
		        this.props.deleteProduct(this.props.product);
		    }
			
			getProduct() {
		        this.props.getProduct(this.props.product);
		    } 
		 
		    render() {
		        return (
		          <tr>
		            <td>{this.props.product.tuote}</td>
		            <td>{this.props.product.lisatiedot}</td>
		            <td>{this.props.product.maara}</td>
					<td>
						<button className="btn btn-info" onClick={this.getProduct}>Edit</button>
					</td>
					<td>
		                <button className="btn btn-danger" onClick={this.deleteProduct}>Delete</button>
		            </td>
		          </tr>
		        );
		    } 
		}
		
		class EditProduct extends React.Component {
			constructor(props) {
				super(props);
				this.handleChange = this.handleChange.bind(this);
				this.handleSubmit = this.handleSubmit.bind(this);
				
				this.state = {
					product: null,
					tuote: '',
					lisatiedot: '',
					maara: ''
				};
				
			}
			
			handleChange(event) {
		        this.setState(
		            {[event.target.name]: event.target.value}
		        );
		    }    
		    
		    handleSubmit(event) {
		        event.preventDefault();
				console.log(this.state.product);
				
				this.state.product.tuote = this.state.tuote;
				this.state.product.lisatiedot = this.state.lisatiedot;
				this.state.product.maara = this.state.maara;
				
		        console.log(this.state.product);
				this.props.updateProduct(this.state.product);
				this.setState({product: null});
		    }
		    
			componentWillReceiveProps(nextProps) {
			if (this.state.product !== nextProps.product) {
				this.setState({product: nextProps.product});
				if (nextProps.product != null) {
					this.setState ({
						tuote: nextProps.product.tuote,
						lisatiedot: nextProps.product.lisatiedot,
						maara: nextProps.product.maara
					});
				}	
			}
			
			}

		    render() {
		        return (
		            <div className="panel panel-default">
		                <div className="panel-heading">Muokkaa ruokalista</div>
		                <div className="panel-body">
		                <form className="form-inline">
		                    <div>
		                        <input type="text" placeholder="Tuote" className="form-control"  name="tuote" value={this.state.tuote} onChange={this.handleChange} required/>    
		                    </div>
		                    <div>       
		                        <input type="text" placeholder="Lisätiedot" className="form-control" name="lisatiedot" value={this.state.lisatiedot} onChange={this.handleChange} required/>
		                    </div>
		                    <div>
		                        <input type="number" placeholder="Määrä" className="form-control" name="maara" value={this.state.maara} onChange={this.handleChange} required/>
		                    </div>
		                    <div>
		                        <button className="btn btn-success" onClick={this.handleSubmit}>Save</button>   
		                    </div>        
		                </form>
		                </div>      
		            </div>
		         
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
		                    <div>
		                        <input type="text" placeholder="Tuote" className="form-control"  name="tuote" onChange={this.handleChange} required/>    
		                    </div>
		                    <div>       
		                        <input type="text" placeholder="Lisätiedot" className="form-control" name="lisatiedot" onChange={this.handleChange} required/>
		                    </div>
		                    <div>
		                        <input type="number" placeholder="Määrä" className="form-control" name="maara" onChange={this.handleChange} required/>
		                    </div>
		                    <div>
		                        <button className="btn btn-success" onClick={this.handleSubmit}>Save</button>   
		                    </div>        
		                </form>
		                </div>      
		            </div>
		         
		        );
		    }
		}

		ReactDOM.render(<App />, document.getElementById('root') );