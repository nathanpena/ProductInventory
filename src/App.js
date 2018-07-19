import React, { Component } from 'react';
import Products from './Products';
import AddItem from './AddItem';
import logo from './logo.svg';
import './App.css';

const products = [
  {
    name: 'Guitar',
    price: 200
  },
  {
    name: 'Bass',
    price: 248
  }
];

localStorage.setItem('products', JSON.stringify(products));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  componentWillMount() {
    const products = this.getProducts();
    this.setState({ products });
  }

  getProducts() {
    return this.state.products;
    
  }

  onDelete(name) {
    const products = this.getProducts();
    const filteredProducts = products.filter(product => {
      return product.name !== name;
    });
    this.setState({ products: filteredProducts });
  }

  onAdd(name, price) {
    const products = this.getProducts();
    products.push({ name,price });
    this.setState({ products });
  }
  
  onEditSubmit(name, price, originalName) {
    let products = this.getProducts();
    products = products.map(
      product => {
        if (product.name === originalName) {
          product.name = name;
          product.price = price;
        }
        return product;
      });
      this.setState({ products });
  }

  render() {
       
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.title}</h1>
        </header>
        <AddItem 
          onAdd={this.onAdd}
        />
        {
          this.state.products.map(product => {
            return (
              <Products key={product.name}
                        {...product}
                        onDelete = {this.onDelete}
                        onEditSubmit = {this.onEditSubmit}
              />
            );
          })
        } 

      </div>      
    );
  }
}

export default App;
