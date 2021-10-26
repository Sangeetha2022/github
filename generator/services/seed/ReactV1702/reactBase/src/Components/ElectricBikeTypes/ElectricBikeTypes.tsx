import React from 'react'
import ElectricBikeCard from '../ElectricBikeCard/ElectricBikeCard';

const ElectricBikeTypes = () => {
    const chunkArray = (myArray: any[], chunk_size: number) => {
        var index = 0;
        var arrayLength = myArray?.length;
        var tempArray = [];
        for (index = 0; index < arrayLength; index += chunk_size) {
            let myChunk = myArray.slice(index, index + chunk_size);
            tempArray.push(myChunk);
        }
        return tempArray;
    }
    let abc=chunkArray([1,2,3,4,5,6,7,8,9],3)
    console.log("chunkArray",abc)
    return (
        <div>
            <div className="row">
                <div className="col-4"><ElectricBikeCard></ElectricBikeCard></div>
                <div className="col-4"><ElectricBikeCard></ElectricBikeCard></div>
                <div className="col-4"><ElectricBikeCard></ElectricBikeCard></div>
            </div>
            <div className="row">
                <div className="col-4"><ElectricBikeCard></ElectricBikeCard></div>
                <div className="col-4"><ElectricBikeCard></ElectricBikeCard></div>
                <div className="col-4"><ElectricBikeCard></ElectricBikeCard></div>
            </div>
           
        </div>
    )
}

export default ElectricBikeTypes
