import React from "react";
import BestSeller from "../BestSeller/BestSeller";
import ElectricBikeCard from "../ElectricBikeCard/ElectricBikeCard";
import ElectricBikeTypes from "../ElectricBikeTypes/ElectricBikeTypes";
import { LowPriceBike } from "../LowPriceBike/LowPriceBike";
// import Footer from '../Footer/Footer'
import "./Home.scss";

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-center">
        <div className="homepage-title">
          Electric bikes - Compare the best models
        </div>
      </div>
      <div className="text-center">
        <img src="https://voltride.com/wp-content/uploads/2021/07/oolter-banner-1.png"></img>
      </div>
      <div className="text-center preview-wrapper">
        <div>
          <div className="preview-wrapper-title">Compare hundreds of electric bikes</div>
          <span className="preview-wrapper-sub-title">
            Easy to use. Data is taken directly from 50+ brands. Save time on
            your research.
          </span>
        </div>
        <div className="preview-wrapper-brand-preview">
          <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/1de457ad6f7d4a428f6b0af1f71e0b1e_ab1.png"></img>
          <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/5ecc1d1cd7b74fabade60075504ac728_br2.png"></img>
          <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/f2e12e69fd994d3f857566b77663ea03_bra3.png"></img>
          <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/adc8339cc85d473c9e29fd930592786b_br4.png"></img>
          <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/d8fe4a8c42e8486fbfb4c62dcd0c1178_ab2.png"></img>
        </div>
      </div>
      <div className="electric-bike-type-wrapper">
        <div className="text-center">
          <div className="electric-bike-title">Electric bikes types</div>
        </div>
        <div className="container-fluid">
        <div className="row" style={{padding:"2rem 0rem 2rem 0rem"}}>
          <div className="col-4"><ElectricBikeCard></ElectricBikeCard></div>
          <div className="col-4"><ElectricBikeCard></ElectricBikeCard></div>
          <div className="col-4"><ElectricBikeCard></ElectricBikeCard></div>
        </div>
        <div className="row" style={{padding:"2rem 0rem 2rem 0rem"}}>
          <div className="col-4"><ElectricBikeCard></ElectricBikeCard></div>
          <div className="col-4"><ElectricBikeCard></ElectricBikeCard></div>
          <div className="col-4"><ElectricBikeCard></ElectricBikeCard></div>
        </div>
        </div>
      </div>
      <div>
      <BestSeller></BestSeller>
      </div>
      {/* <ElectricBikeCard></ElectricBikeCard> */}
      {/* <div>
                <img src="https://voltride.com/wp-content/uploads/2021/07/oolter-banner-1.png"></img>
                <div>
                    <h1>Compare hundreds of electric bikes</h1>
                    <span>Easy to use. Data is taken directly from 50+ brands. Save time on your research.</span>
                </div>
                <div>
                    <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/1de457ad6f7d4a428f6b0af1f71e0b1e_ab1.png"></img>
                    <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/5ecc1d1cd7b74fabade60075504ac728_br2.png"></img>
                    <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/f2e12e69fd994d3f857566b77663ea03_bra3.png"></img>
                    <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/adc8339cc85d473c9e29fd930592786b_br4.png"></img>
                    <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/d8fe4a8c42e8486fbfb4c62dcd0c1178_ab2.png"></img>
                </div>

            </div> */}
      {/* <ElectricBikeTypes></ElectricBikeTypes>
            <BestSeller></BestSeller>
            <LowPriceBike></LowPriceBike> */}
    </div>
  );
};

export default Home;
