import React from 'react';
import { IonPage, IonContent,IonItem, IonLabel ,IonInput,IonRow, IonCol, IonButton, IonLoading} from '@ionic/react';
import NavHeader from './../../components/Headers/NavHeader';
import { toast } from './../../helpers/toast';
import useForm from './../../hooks/useForm';
import firebase from './../../firebase';
import validateSignUp from './../../validators/validateSignUp';

const INITIAL_STATE ={
    name:"",
    email:"",
    password:""
}

const Signup =(props)=>{
    const { handleSubmit ,handleChange , values , isSubmitting} = useForm(INITIAL_STATE,validateSignUp,authenticateUser);
    const [busy ,setBusy] = React.useState(false);
    async function authenticateUser(){
        setBusy(true);
        const { name , email , password } = values;
        try{
            await firebase.register(name , email, password);
            toast('You have signedUp sucessfully');
            props.history.push('/');
        }catch(err){
            console.log('Authentication Error' , err);
            toast(err.msg)
        }
        setBusy(false);
    };

    return(
        <IonPage>
            <NavHeader title = "Sign Up" />
            <IonLoading message = 'Please Wait...' isOpen ={busy}/>
            <IonContent>
                <IonItem lines ='full'>
                    <IonLabel position ='floating'>Username</IonLabel>
                    <IonInput name='name' type = 'text' value ={values.name} onIonChange ={handleChange} required></IonInput>
                </IonItem>
                <IonItem lines ='full'>
                    <IonLabel position ='floating'>Email</IonLabel>
                    <IonInput name='email' type = 'text' value ={values.email} onIonChange ={handleChange} required></IonInput>
                </IonItem>
                <IonItem lines ='full'>
                    <IonLabel position ='floating'>Password</IonLabel>
                    <IonInput name='password' type = 'password'value ={values.password} onIonChange ={handleChange} required></IonInput>
                </IonItem>
                <IonRow>
                    <IonCol>
                        <IonButton type = 'submit' color = 'primary' onClick ={handleSubmit} disabled ={isSubmitting}  expand = "block"
                        >SignUp
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}

export default Signup