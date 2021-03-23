import BasicFormPage from "./BasicFormPage";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage(props) {
  return (
    <BasicFormPage form={<ResetPasswordForm token={props.match.params.token}/>} />
  )
}