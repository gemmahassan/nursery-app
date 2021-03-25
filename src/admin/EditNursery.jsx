import React, {useEffect, useState} from 'react';

import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import JournalDataService from "../../../services/journal";
import JournalTypeDataService from "../../../services/journal-type";
import NurseryDataService from "../../../services/nursery";
import {Button, Form, Input, Modal} from "antd";

const EditEntry = ({nursery}) => {
  // const { nurseryId } = useParams();
  // const initialEntryState = {
  //   // id: nursery.id,
  //   // contactName: nursery.contactName,
  //   // type_id: typeId,
  //   // image: "",
  //   // text: text,
  //   // staff_id: staffId,
  //   // timestamp: timestamp,
  // };
  // //
  //
  // // const [journalTypes, setJournalTypes] = useState([]);
  // // const [children, setChildren] = useState([]);
  // // const [currentEntry, setCurrentEntry] = useState(initialEntryState);
  // //
  // const handleInputChange = event => {
  //   const {name, value} = event.target;
  //   setCurrentEntry({...currentEntry, [name]: value});
  //   console.log(currentEntry);
  // };
  //
  // const getJournalTypes = () => {
  //   JournalTypeDataService.getAll()
  //     .then(response => {
  //       setJournalTypes(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };
  //
  // // const getChildren = () => {
  // //   NurseryDataService.getChildren(nurseryId)
  // //     .then(response => {
  // //       setChildren(response.data);
  // //       console.log(response.data);
  // //     })
  // //     .catch(e => {
  // //       console.log(e);
  // //     });
  // // };
  //
  // useEffect(() => {
  //   getJournalTypes();
  //   // getChildren();
  // }, []);
  //
  // const handleUpdate = () => {
  //   let data = {
  //     type_id: currentEntry.type_id,
  //     child_id: currentEntry.child_id,
  //     image: currentEntry.image,
  //     text: currentEntry.text,
  //   };
  //
  //   JournalDataService.edit(data, childId, journalId)
  //     .then(response => {
  //       setCurrentEntry({
  //         id: response.data.id,
  //         child_id: response.data.child_id,
  //         type_id: response.data.type_id,
  //         image: response.data.image,
  //         text: response.data.text,
  //         staff_id: response.data.staff_id,
  //         timestamp: response.data.timestamp,
  //       });
  //       console.log("response: ", response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  return (
    <IonContent>
      {/*<Modal visible={showEditModal}>*/}
      {/*  <Form*/}
      {/*    name="updateNursery"*/}
      {/*    initialValues={{remember: true}}*/}
      {/*    onFinish={handleUpdate}*/}
      {/*  >*/}

      {/*    <Form.Item*/}
      {/*      label="Nursery Name"*/}
      {/*      name="name">*/}
      {/*      <Input*/}
      {/*      value={nursery.name}/>*/}
      {/*    </Form.Item>*/}

      {/*    <Form.Item*/}
      {/*      label="Contact Name"*/}
      {/*      name="contactName">*/}
      {/*      <Input*/}
      {/*        value={nursery.contactName}/>*/}
      {/*    </Form.Item>*/}

      {/*    <Form.Item*/}
      {/*      label="Email"*/}
      {/*      name="email"*/}
      {/*      rules={[{required: true, message: 'Please add an email address!'}]}*/}
      {/*    >*/}
      {/*      <Input/>*/}
      {/*    </Form.Item>*/}

      {/*    <Form.Item*/}
      {/*      label="Phone Number"*/}
      {/*      name="phone"*/}
      {/*      rules={[{required: true, message: 'Please add a phone number'}]}*/}
      {/*    >*/}
      {/*      <Input placeholder="Phone Number"/>*/}
      {/*    </Form.Item>*/}

      {/*    <Form.Item*/}
      {/*      label="Nursery Address"*/}
      {/*      name="addressLine1"*/}
      {/*      rules={[{required: true, message: 'Please add an address!'}]}*/}
      {/*    >*/}
      {/*      <Input placeholder="Line 1"/>*/}
      {/*    </Form.Item>*/}

      {/*    <Form.Item*/}
      {/*      name="addressLine2"*/}
      {/*    >*/}
      {/*      <Input placeholder="Line 2"/>*/}
      {/*    </Form.Item>*/}

      {/*    <Form.Item*/}
      {/*      name="town"*/}
      {/*      rules={[{required: true, message: 'Please add a town!'}]}*/}
      {/*    >*/}
      {/*      <Input placeholder="Town"/>*/}
      {/*    </Form.Item>*/}

      {/*    <Form.Item*/}
      {/*      name="county"*/}
      {/*      rules={[{required: true, message: 'Please add a county!'}]}*/}
      {/*    >*/}
      {/*      <Input placeholder="County"/>*/}
      {/*    </Form.Item>*/}

      {/*    <Form.Item*/}
      {/*      name="postcode"*/}
      {/*      rules={[{required: true, message: 'Please add a postcode!'}]}*/}
      {/*    >*/}
      {/*      <Input placeholder="Postcode"*/}
      {/*        // onChange={debounce=(handlePostcodeChange, 200)}*/}
      {/*      />*/}
      {/*    </Form.Item>*/}

      {/*    <Form.Item>*/}
      {/*      <Button type="primary" htmlType="submit">*/}
      {/*        Submit*/}
      {/*      </Button>*/}
      {/*    </Form.Item>*/}
      {/*  </Form>*/}
      {/*</Modal>*/}
    </IonContent>
  );
};

export default EditEntry;