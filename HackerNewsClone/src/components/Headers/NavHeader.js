import React from 'react';
import { IonHeader,IonToolbar, IonBackButton,IonButtons, IonTitle } from '@ionic/react';

const NavHeader =({title})=>{
    return(
    <IonHeader>
        <IonToolbar color = 'primary'>
            <IonButtons slot ='start'>
                <IonBackButton defaultHref ='/'></IonBackButton>
            </IonButtons>
            <IonTitle>{title}</IonTitle>
        </IonToolbar>
    </IonHeader>
    )
}

export default NavHeader;