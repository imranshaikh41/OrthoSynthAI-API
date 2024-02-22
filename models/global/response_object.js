var GetResponseMessage = {
  200: "Success!",
  202: "Login details are incorrect!",
  203: "Email or phone is not registered yet!",
  205: "Email or phone already exists!",
  422: "Username already exists!",
  206: "Duplicate value not allowed!",
  207: "Old password is wrong!",
  400: "Bad Request!",
  500: "Internal server error!",
  401: "Unauthorized!",
  404: "Data Not Found",
};

module.exports = {
  StatusResponse: function (Code) {
    return (res = {
      Status: {
        ResponseCode: Code,
        ResponseMessage: GetResponseMessage[Code],
      },
    });
  },

  ObjectResponse: function (Code, Object, ObjectName) {
    return (res = {
      Status: {
        ResponseCode: Code,
        ResponseMessage: GetResponseMessage[Code],
      },
      [ObjectName]: Object,
    });
  },
  dBResponse: function (Code, Object, ObjectName) {
    return Object; // res = {
    //     // Status: {
    //     //     ResponseCode: Code,
    //     //     ResponseMessage: GetResponseMessage[Code]
    //     // },
    //     [ObjectName]: Object
    // }
  },
};
