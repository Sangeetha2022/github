import React from "react";
import "./LowPriceBike.scss";
import { Progress } from "reactstrap";
import ElectricBikeCard from "../ElectricBikeCard/ElectricBikeCard";
export const LowPriceBike = () => {
  return (
    <div>
      <div>
        <div>
          <div>Low price electric bikes</div>
          <div>
            <button>Commuter</button>
          </div>
        </div>
        <div>
          <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/4b5891fb097c45288832b07de06f1cbb_arrow-left.png"></img>
          <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/85e726dc24914133b6fbb9a7fc68f679_arrow-right.png"></img>
        </div>
      </div>
      <div className="row">
          <div className="col-4"><div className="i4nry8">
        <div>
          <div>MSRP : $1095RIDE1UP ROADSTER V2</div>
          <div>
            <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/69c9c4319ea5493b8dc8e79ec38f0a10_plus2.png"></img>
          </div>
        </div>
        <div>
          <div>
            <div>Motor torque</div>
            <div>Nm</div>
          </div>
          <Progress value={50} />
        </div>
        <div>
          <div>
            <div>Battery capicity</div>
            <div>252 Wh</div>
          </div>
          <Progress value={50} />
        </div>
        <div>
          <div>
            <div>Mileage</div>
            <div>75 Mi / 121 Km</div>
          </div>
          <Progress value={50} />
        </div>
      </div></div>
      <div className="col-4"><div className="i4nry8">
        <div>
          <div>MSRP : $1095RIDE1UP ROADSTER V2</div>
          <div>
            <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/69c9c4319ea5493b8dc8e79ec38f0a10_plus2.png"></img>
          </div>
        </div>
        <div>
          <div>
            <div>Motor torque</div>
            <div>Nm</div>
          </div>
          <Progress value={50} />
        </div>
        <div>
          <div>
            <div>Battery capicity</div>
            <div>252 Wh</div>
          </div>
          <Progress value={50} />
        </div>
        <div>
          <div>
            <div>Mileage</div>
            <div>75 Mi / 121 Km</div>
          </div>
          <Progress value={50} />
        </div>
      </div></div>
      <div className="col-4"><div className="i4nry8">
        <div>
          <div>MSRP : $1095RIDE1UP ROADSTER V2</div>
          <div>
            <img src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/69c9c4319ea5493b8dc8e79ec38f0a10_plus2.png"></img>
          </div>
        </div>
        <div>
          <div>
            <div>Motor torque</div>
            <div>Nm</div>
          </div>
          <Progress value={50} />
        </div>
        <div>
          <div>
            <div>Battery capicity</div>
            <div>252 Wh</div>
          </div>
          <Progress value={50} />
        </div>
        <div>
          <div>
            <div>Mileage</div>
            <div>75 Mi / 121 Km</div>
          </div>
          <Progress value={50} />
        </div>
      </div></div>
      </div>
    </div>
  );
};
