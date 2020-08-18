import React from 'react';
import { IonPage, IonContent,IonItem, IonLabel ,IonInput,IonRow, IonCol, IonButton ,IonLoading} from '@ionic/react';
import NavHeader from './../../components/Headers/NavHeader';
import validatePasswordReset from './../../validators/validatePasswordReset';
import { toast } from './../../helpers/toast';
import useForm from './../../hooks/useForm';
import firebase from './../../firebase';

const INITIAL_STATE ={
    email:""
}

const Forgot = (props) => {
    const { handleSubmit, handleChange, values, isSubmitting } = useForm(
      INITIAL_STATE,
      validatePasswordReset,
      handleResetPassword
    );
  
    const [busy, setBusy] = React.useState(false);
  
    async function handleResetPassword() {
      setBusy(true);
      const { email } = values;
      try {
        await firebase.resetPassword(email);
        toast("Check your email to reset your password.");
        props.history.push("/login");
      } catch (err) {
        console.error("Password Reset Error", err);
        toast(err.message);
      }
      setBusy(false);
    }
  
    return (
      <IonPage>
        <NavHeader title="Password Reset" />
        <IonLoading message={"Please wait..."} isOpen={busy} />
        <IonContent>
          <IonItem lines="full">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              name="email"
              value={values.email}
              type="text"
              onIonChange={handleChange}
              required
            ></IonInput>
          </IonItem>
          <IonRow>
            <IonCol>
              <IonButton
                type="submit"
                color="primary"
                expand="block"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Get Reset Link
              </IonButton>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    );
  };

export default Forgot