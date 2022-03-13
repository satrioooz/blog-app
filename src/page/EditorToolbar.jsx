import React from 'react'
import { Comment, Avatar, Form, Button, List, Input } from 'antd';


const EditorToolbar = ({handleChange,comment}) => {
  const { TextArea } = Input;

  return (
    <div>
         <Form.Item>
          <TextArea rows={4} onChange={handleChange} value={comment}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit"  type="primary">
        Add Comment
      </Button>
    </Form.Item>
    </div>
  )
}

export default EditorToolbar