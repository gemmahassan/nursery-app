import React, {useRef} from 'react';
import {IonContent,} from '@ionic/react';
import {Button, Form, Input, Modal, Select} from "antd";

const EditEntry = ({
                     currentEntry,
                     deleteSuccess,
                     handleDelete,
                     handleEditEntry,
                     hideEditModal,
                     journalTypes,
                     photoPermission,
                     setImage,
                     showEditModal,
                     updateSuccess
                   }) => {
    const formElement = useRef();

    return (
      <IonContent>
        <Modal
          visible={showEditModal}
          onOK={() => {
            formElement.current && formElement.current.submit();
          }}
          onCancel={() => hideEditModal()}
          footer={[
            <Button
              key="cancel"
              onClick={() => hideEditModal()}>
              Cancel
            </Button>,
            <Button
              key="save"
              type="primary"
              onClick={() => {
                formElement.current && formElement.current.submit();
              }}>
              Save
            </Button>,
            <Button
              key="delete"
              type="danger"
              onClick={() => handleDelete()}
            >
              DELETE
            </Button>
          ]}
        >
          <Form
            ref={formElement}
            name="editEntry"
            initialValues={{type_id: currentEntry.type_id, text: currentEntry.text}}
            onFinish={handleEditEntry}
          >
            Update Journal entry
            <Form.Item
              label="Entry Type"
              name="type_id"
            >
              <Select name="type_id">
                {journalTypes && journalTypes.map(type => (
                  <Select.Option value={type.id}>{type.type}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            {photoPermission &&
            <Form.Item
              name="image"
              label="Add an image"
            >
              <input
                name="image" // name of input field or fieldName simply
                encType="multipart/form-data"
                type="file"
                onChange={(event) => {
                  // setState method with event.target.files[0] as argument
                  setImage(event.target.files[0]);
                }}
              />
            </Form.Item>
            }

            <Form.Item
              label="Description"
              name="text"
            >
              <Input
                placeholder={currentEntry.text}
              />
            </Form.Item>

          </Form>
          {updateSuccess &&
          <p>Updated!</p>
          }

          {deleteSuccess &&
          <p>Deleted</p>
          }
        </Modal>
      </IonContent>
    );
  }
;

export default EditEntry;