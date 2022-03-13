import React from 'react'
import './footer.css';
import {InstagramOutlined, GithubOutlined,createFromIconfontCN} from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const Footer = () => {
  return (
    <>
    <div className='footer'>
      <div className='icon-footer'>
<GithubOutlined style={{margin:'0 10px'}} />
<IconFont type="icon-facebook" style={{fontSize:'1.4rem',margin:'0 10px'}}/>
<InstagramOutlined style={{margin:'0 10px'}} />
      </div>
  
    </div>
    </>
  )
}

export default Footer