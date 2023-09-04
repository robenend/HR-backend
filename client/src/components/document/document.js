import React, { useState } from 'react';
import { Upload, Button, Form, Input, message } from 'antd';
import axios from 'axios';

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);

  const onFinish = (values) => {
    const { title, description } = values;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    // Send the file, title, and description to the backend server running on port 5000
    axios.post('http://localhost:5000/upload', formData)
      .then((response) => {
        // Handle the response from the server
        // (e.g., display a success message)
        console.log(response.data);
        message.success('File uploaded successfully');
      })
      .catch((error) => {
        // Handle any errors that occurred during the file upload
        console.error(error);
        message.error('File upload failed');
      });
  };

  const onFileChange = (info) => {
    if (info.file.status === 'done') {
      setFile(info.file.originFileObj);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="file" valuePropName="fileList">
        <Upload name="file" multiple={false} onChange={onFileChange}>
          <Button>Select File</Button>
        </Upload>
      </Form.Item>
      <Form.Item name="title">
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item name="description">
        <Input.TextArea placeholder="Description" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Upload
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FileUploadComponent;