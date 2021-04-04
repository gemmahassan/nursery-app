// import React, {useEffect, useState} from "react";
// import {IonContent, IonPage} from '@ionic/react';
// import {Button, Form, Input} from "antd";
// import NurseryDataService from "../services/nursery";
// import UserDataService from "../services/user";
// import Nav from "../public/Nav";
// import {useParams} from "react-router-dom";
// import {CirclePicker} from 'react-color';
// import http from "../shared/http-common";
//
//
// const NurserySignup = () => {
//   // TO DO: on submit, create nursery
//   // create user? separate?
//   // add admin role to db
//   // admin should be able to add staff, children and carers - generate usernames and passwords
//   // address of nursery to be used in google map based on user's location, shows nearest nurseries
//   // only northern ireland postcodes
//   // on first login - change password prompt?
//   // enabled flag in user db - if not enabled, prompt for password change to complete user registration
//   // if enabled, log in as normal
//   // same for staff, carers
//   const {nurseryId} = useParams();
//
//   const [nursery, setNursery] = useState();
//
//   useEffect(() => {
//     getNursery();
//   }, []);
//
//   const getNursery = () => {
//     NurseryDataService.get(nurseryId)
//       .then(response => {
//         setNursery(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };
//
//   const handleSignup = () => {
//     if (!image) {
//       console.error('No image supplied. Need to add validation for this.');
//       return;
//     }
//
//     const formData = new FormData();
//     formData.append('image', image, image.name);
//     formData.append('color', color);
//
//     console.log("nursery: ", nursery);
//
//     NurseryDataService.signup(nurseryId, formData)
//       .then(
//         response => {
//           formData.append('email', nursery.email);
//           formData.append('first_name', nursery.contact_first_name);
//           formData.append('surname', nursery.contact_surname);
//           formData.append('nursery_id', nurseryId);
//           formData.append('role', 'admin');
//           UserDataService.create(formData)
//             .then(
//               response => {
//                 const nurseryName = nursery.name;
//                 const firstName = nursery.contact_first_name;
//                 const surname = nursery.contact_surname;
//                 const email = nursery.email;
//                 const password = response.data.password;
//                 const subject = 'Nursery Journal - Registration complete!';
//                 const message = `Hi ${firstName}, your registation for ${nurseryName} is complete.
//                                   Your username is your email address.
//                                   Your temporary password is ${password}. You will be prompted to change this
//                                    the first time you log in.`;
//                 http.post("/send", {
//                   firstName,
//                   surname,
//                   email,
//                   subject,
//                   message
//                 }).then(() => {
//                     setSignupSuccessful(true);
//                 }
//                 ).catch(err => {
//                   console.log(err)
//                 })
//               })
//             .catch(e => {
//               console.log(e);
//             })
//         })
//       .catch(e => {
//         console.log(e);
//       });
//   };
//
//   const getLayout = () => {
//     if (nursery) {
//       if (nursery.pending === 2) {
//         return (
//           <>already signed up</>
//         );
//       } else {
//         return (
//           <>
//             Hi, welcome to Nursery Journal. To finish creating an account for {nursery.name}, please upload an image
//             of
//             your nursery and select a colour for your page branding.
//
//             <div
//               style={{
//                 'display': 'flex',
//                 'flexDirection': 'column',
//                 'padding': '50px',
//                 width: '100%',
//                 'maxWidth': '600px'
//               }}>
//               <Form
//                 name="basic"
//                 initialValues={{remember: true}}
//                 onFinish={handleSignup}
//               >
//
//
//                 <Form.Item>
//                   <Button type="primary" htmlType="submit">
//                     Submit
//                   </Button>
//                 </Form.Item>
//               </Form>
//             </div>
//           </>
//         );
//       }
//     } else {
//       return (
//         <>Nothing to see here</>
//       );
//     }
//   }
//
//   return (
//     <>
//       <IonPage>
//         <Nav/>
//         <IonContent>
//           {getLayout()}
//           {signupSuccessful && (
//             <>Thank you! You can now use Nursery Journal</>
//           )}
//         </IonContent>
//       </IonPage>
//     </>
//   );
// };
//
// export default NurserySignup;
