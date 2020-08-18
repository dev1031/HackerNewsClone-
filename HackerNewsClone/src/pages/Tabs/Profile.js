import React  from "react";
import {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonCardContent,
    IonCard,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
  } from "@ionic/react";
  import { personCircleOutline, mailOutline } from "ionicons/icons";
import SmallHeader from './../../components/Headers/SmallHeader';
import LargeHeader from './../../components/Headers/LargeHeader';
import {toast} from './../../helpers/toast';
import firebase from './../../firebase/firebase';
import UserContext from './../../Context/UserContext';

const Profile = (props) => {
    const { user } = React.useContext(UserContext);
  
    async function logoutUser() {
      try {
        await firebase.logout();
        props.history.push("/");
        toast("You have logged out successfully.");
      } catch (err) {
        console.error("Logout Error", err);
        toast(err.message);
      }
    }
  
    return (
      <IonPage>
        <SmallHeader title="Profile" />
        <IonContent>
          <LargeHeader title="Profile" />
          {user ? (
            <>
              <IonCard>
                <IonCardContent>
                  <IonList lines="none">
                    <IonItem>
                      <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
                      <IonLabel>
                        <strong>{user.displayName}</strong>
                        <p>Username</p>
                      </IonLabel>
                    </IonItem>
  
                    <IonItem>
                      <IonIcon icon={mailOutline} slot="start"></IonIcon>
                      <IonLabel>
                        <strong>{user.email}</strong>
                        <p>Email</p>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    routerLink={`/editProfile`}
                    color="primary"
                    fill="outline"
                  >
                    Edit Profile
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" color="primary" onClick={logoutUser}>
                    Log Out
                  </IonButton>
                </IonCol>
              </IonRow>
            </>
          ) : (
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    routerLink={`/register`}
                    color="primary"
                  >
                    Sign Up
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    routerLink={`/login`}
                    color="primary"
                    fill="outline"
                  >
                    Log In
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}
        </IonContent>
      </IonPage>
    );
  };

export default Profile;
