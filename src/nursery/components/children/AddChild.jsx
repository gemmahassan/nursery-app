import React, {useRef} from "react";
import {Form, Input, Modal, Switch} from "antd";

const AddChild = ({
                    addSuccess,
                    handleAddChild,
                    hideAddChildModal,
                    photoPermission,
                    setImage,
                    setPhotoPermission,
                    showAddChildModal
                  }) => {
  const formElement = useRef();

  return (
    <>
      <Modal
        visible={showAddChildModal}
        onCancel={() => hideAddChildModal()}
        onOk={() => {
          formElement.current && formElement.current.submit();
        }}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          ref={formElement}
          name="child"
          onFinish={handleAddChild}
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{required: true, message: 'Please add a first name'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Surname"
            name="surname"
            rules={[{required: true, message: 'Please add a surname'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            name="permission"
            label="Permission to share photos of this child?"
            onClick={() => setPhotoPermission(!photoPermission)}
          >
            <Switch/>
          </Form.Item>

          {photoPermission && (
            <Form.Item
              name="image"
              label="Add an image"
            >
              <input
                name="image"
                encType="multipart/form-data"
                type="file"
                onChange={(event) => setImage(event.target.files[0])}
              />
            </Form.Item>
          )}
        </Form>
        {addSuccess &&
        <p>Added!</p>
        }
      </Modal>
    </>
  );
};

export default AddChild;