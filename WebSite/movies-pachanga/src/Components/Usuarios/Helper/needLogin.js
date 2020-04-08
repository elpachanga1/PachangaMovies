import Swal from "sweetalert2";

const needLogin = (history) => {
  Swal.fire({
    title: "You are not Authenticated",
    text: "Log in and write your Comment",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yeah, Log in",
    cancelButtonText: "Nohh, Thanks",
  }).then(async (result) => {
    if (result.value) {
      try {
        history.push("/login");
      } catch (ex) {
        console.log(ex);
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "An Error Happened, Try again",
        });
      }
    }
  });
};

export default needLogin;
