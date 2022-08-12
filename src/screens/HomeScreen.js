import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/Loading";
import MessageBox from "../components/Message";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/ProductActions";
import { Link } from "react-router-dom";

import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  return (
    <div>
      <Carousel
        showArrows={true}
        showIndicators={false}
        infiniteLoop={true}
        autoPlay
        showThumbs={false}
      >
        <Link to="/product/62bb4ce3e42cf143c86968ac">
          <img src="/images/banner1.png" alt="Banner1"></img>
        </Link>
        <Link to="/product/62bb4ce3e42cf143c86968ac">
          <img src="/images/banner2.PNG" alt="Banner2"></img>
        </Link>
        <Link to="/product/62bb4ce3e42cf143c86968ac">
          <img src="/images/banner3.PNG" alt="Banner3"></img>
        </Link>
      </Carousel>
      <h1 className="title">BRANDS</h1>
      <div>
        <div className="carouselbrands">
          <div className="slider-container">
            <Swiper
              // install Swiper modules
              modules={[Pagination, Navigation]}
              spaceBetween={10}
              slidesPerView={5}
              navigation
              breakpoints={{
                // when window width is >= 340px
                340: {
                  width: 200,
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  width: 768,
                  slidesPerView: 4,
                },
                // when window width is >= 1040px
                1040: {
                  width: 1040,
                  slidesPerView: 5,
                },
              }}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              <SwiperSlide>
                <Link to="/search/brand/Adidas">
                  <img
                    className="adidasimage"
                    src="/images/adidaslogo.png"
                    alt="Adidas"
                  ></img>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/search/brand/Nike">
                  <img
                    className="brandimage"
                    src="/images/nikelogo.png"
                    alt="Nike"
                  ></img>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/search/brand/Vans">
                  <img
                    className="brandimage"
                    src="/images/vanslogo.png"
                    alt="Vans"
                  ></img>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/search/brand/Santacruz">
                  <img
                    className="brandimage"
                    src="/images/santacruzlogo.png"
                    alt="SantaCruz"
                  ></img>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/search/brand/Volcom">
                  <img
                    className="brandimage"
                    src="/images/volcomlogo.png"
                    alt="Volcom"
                  ></img>
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <h1 className="title">CATEGORIES</h1>
        <div className="categorycontainer">
          <img
            className="categoriesimg"
            src="/images/shirtcategory.jpg"
            alt="shirtcategory"
          ></img>
          <img
            className="categoriesimg"
            src="/images/jacketcategory.jpg"
            alt="jacketcategory"
          ></img>
          <img
            className="categoriesimg"
            src="/images/hoodiecategory.jpg"
            alt="hoodiecategory"
          ></img>
          <div className="categoryall">
            <div className="categoryshirt">
              <h1 className="categorytitle">SHIRTS</h1>
              <Link to="/search/category/Shirts">
                <button className="categorybutton">SHOP NOW</button>
              </Link>
            </div>
            <div className="categoryjacket">
              <h1 className="categorytitle">JACKET</h1>
              <Link to="/search/category/Jackets">
                <button className="categorybutton">SHOP NOW</button>
              </Link>
            </div>
            <div className="categoryhoodie">
              <h1 className="categorytitle">HOODIE</h1>
              <Link to="/search/category/Hoodies">
                <button className="categorybutton">SHOP NOW</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <h1 className="title">NEW ARRIVALS</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product.id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}
