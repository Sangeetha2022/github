import React from 'react'
import './BestSeller.scss'
const BestSeller = () => {
    return (
            <div className="d-flex align-items-center justify-content-between p-5">
                <div>
                    <div className="best-seller-text">BEST SELLER</div>
                    <div className="sub-title">Top 10 Best Electric Bikes 2021</div>
                </div>
                <div className="round-icon">
                    <div>
                    <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/4b5891fb097c45288832b07de06f1cbb_arrow-left.png"></img>
                    </div>
                    <div>
                    <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/85e726dc24914133b6fbb9a7fc68f679_arrow-right.png"></img>
                    </div>
                </div>
            </div>   
    )
}

export default BestSeller;
