import React, {useRef} from 'react';
import {IonContent} from '@ionic/react';
import {Form, Input, Modal, Select} from "antd";

const AddEntry = ({
                    addSuccess,
                    child,
                    handleAddEntry,
                    hideAddModal,
                    journalTypes,
                    setImage,
                    showAddModal
                  }) => {
  const formElement = useRef();

  return (
    <IonContent>
      <Modal
        visible={showAddModal}
        onOk={() => {
          formElement.current && formElement.current.submit();
        }}
        onCancel={() => hideAddModal()}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          ref={formElement}
          name="journal"
          initialValues={{remember: true}}
          onFinish={handleAddEntry}>
          Add a Journal entry for {child.first_name}
          <Form.Item
            label="Entry Type"
            name="entryType"
            rules={[{required: true, message: 'Please select the entry type'}]}
          >
            <Select name="type_id">
              {journalTypes && journalTypes.map(type => (
                <Select.Option value={type.id}>{type.type}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          {child.photo &&
          <Form.Item
            name="image"
            label="Add an image"
          >
            <input
              name="image" // name of input field or fieldName simply
              encType="multipart/form-data"
              type="file"
              onChange={(event) => {
                setImage(event.target.files[0]);
              }}
            />
          </Form.Item>
          }X

          <Form.Item
            label="Description"
            name="text">
            <Input/>
          </Form.Item>

        </Form>
        {addSuccess && (
          <p>Added!</p>
        )}
      </Modal>
    </IonContent>
  );
};

export default AddEntry;