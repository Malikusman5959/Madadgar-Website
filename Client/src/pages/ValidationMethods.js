

const validateEmail = (data) => {
  if (
    data.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    return true;
  } else {
    return false;
  }
};

const validatePassword = (data) => {
  if (
    data.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    )
  ) {
    return true;
  } else {
    return false;
  }
};

const validateDOB = (data) => {
    if (
      parseInt(data.substring(0, 4)) < 2021
    ) {
      return true;
    } else {
      return false;
    }
  };


  const validateFromDate = (data1 , data2) => {
    if (
      data1 > 1900 && data1 <= 2021 && data1 <= data2  
    ) {
      return true;
    } else {
      return false;
    }
  };


  const validateTillDate = (data1 , data2) => {
    if (
      data1 > 1900 && data1 <= 2021 && data1 >= data2  
    ) {
      return true;
    } else {
      return false;
    }
  };


  const validateCnic = (data) => {
    if (
        data.match(
            /\d{5}-\d{7}-\d/)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const validateMobile = (data) => {
    if (
        data.match(
            /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/gm)
    ) {
      return true;
    } else {
      return false;
    }
  };


export default {validateEmail , validatePassword , validateDOB , validateCnic , validateMobile , validateFromDate , validateTillDate};
