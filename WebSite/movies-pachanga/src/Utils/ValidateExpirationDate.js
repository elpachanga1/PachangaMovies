import Swal from "sweetalert2";
import moment from "moment";

export default function Validate(props) {
  const { token, SalirUsuario, history } = props;

  if (token && moment().isAfter(token.expirationDateTime)) {
    SalirUsuario();

    Swal.fire("Ohhh No!", "User Session Ended", "warning");
    history.push("/");
  }
}
