
import React, { useState } from 'react';
import Select from 'react-select'
import "./../style/select.css";
const Selector = ({setOption , choosenOption , optionList}) => {

  //  const options = [
  //      { value: "Islamabad" },
  //      { value: "Rawalpindi" },
  //      { value: "Lahore" },
  //      { value: "Karachi" },

  //  ];
  const [region, setRegion] = useState(optionList[0]);
  const onchangeSelect = (item) => {
    
   
    setOption(item.value);
    setRegion(item);
    
  };
  return (
    <div className="a">
       <Select className="customclass"
          
          value= {region}
          onChange={onchangeSelect}
          options={optionList}
          getOptionValue={(option) => option.value}
          getOptionLabel={(option) => option.value}
       />

    </div>

  );
};

export default Selector;