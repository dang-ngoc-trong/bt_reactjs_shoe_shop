import React, { Component } from "react";
import data from "./data (1).json";
import GioHang from "./GioHang";
import ModalShoe from "./ModalShoe";
import Shoe from "./Shoe";

export default class ShoeShop extends Component {
  state = {
    product: {
      id: 1,
      name: "Adidas Prophere",
      alias: "adidas-prophere",
      price: 350,
      description:
        "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
      shortDescription:
        "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
      quantity: 995,
      image: "http://svcy3.myclass.vn/images/adidas-prophere.png",
    },
    cart: [
      // {
      //   id: 1,
      //   name: "Adidas Prophere",
      //   alias: "adidas-prophere",
      //   price: 350,
      //   description:
      //     "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
      //   shortDescription:
      //     "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
      //   quantity: 995,
      //   image: "http://svcy3.myclass.vn/images/adidas-prophere.png",
      // },
    ],
  };

  handleModal = (shoe, boolean) => {
    this.setState({
      product: shoe,
      isShow: boolean,
    });
  };

  handleCart = (shoeClick) => {
    const value = { ...shoeClick, soLuong: 1 };
    const data = [...this.state.cart];
    const index = data.findIndex((shoe) => shoe.id === shoeClick.id);
    if (index !== -1) {
      data[index].soLuong += 1;
    } else {
      data.push(value);
    }
    // set lại state thêm state sản phẩm được Click

    this.setState({
      cart: data,
    });
  };

  handleRemoveCart = (id) => {
    // alert(id);
    const data = this.state.cart.filter((item) => item.id !== id);
    this.setState({
      cart: data,
    });
  };

  handleQuantity = (id, quantity) => {
    console.log("id", id);
    console.log("quantity", quantity);
    const data = [...this.state.cart];
    console.log("data", data);
    const index = data.findIndex((item) => item.id === id);
    if (data[index].soLuong > 1 || quantity > 0) {
      data[index].soLuong += quantity;
    } else if (window.confirm("Bạn có muốn xóa sản phẩm ?")) {
      data.splice(index, 1);
    }
    this.setState({
      cart: data,
    });
  };

  render() {
    return (
      <div className="container">
        <ModalShoe
          shoe={this.state.product}
          show={this.state.isShow}
          handleModal={this.handleModal}
        />
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className=''>
            <a class="navbar-brand " style={{ marginLeft: '2rem' }} href="#">Shoe Shop</a>
          </div>
          <div class="collapse navbar-collapse flex-row-reverse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contact</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><GioHang
                  cart={this.state.cart}
                  handleRemoveCart={this.handleRemoveCart}
                  handleQuantity={this.handleQuantity}
                /></a>
              </li>
            </ul>


          </div>
        </nav>

        <div><h2 style={{
          textAlign: "center",
          marginTop: "2rem"
        }}>HIGHLIGHTS ADIDAS PRODUCTS</h2></div>
        <div className="row my-5">
          {data.map((shoe) => {
            return (
              <div className="col-4 my-2">
                <Shoe
                  product={shoe}
                  handleModal={this.handleModal}
                  handleCart={this.handleCart}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
