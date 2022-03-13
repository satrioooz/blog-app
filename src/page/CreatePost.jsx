import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MDEditor, { image } from "@uiw/react-md-editor";
import {
  setDataBlog,
  updateBlog,
  setAddBlog,
} from "../Reducer/Action/CreateRedux";
import rehypeSanitize from "rehype-sanitize";
import { useSelector, useDispatch } from "react-redux";
import UploadImage from "./UploadImage";
import Cookies from "js-cookie";


function CreatePost(id) {
  const [text, setText] = useState("Create Blog Post");
  // STATE GLOBAL
  const params = useParams();
  const [images, setImage] = useState(null);
  const [button, setButton] = useState("Submit");
  const [idPost, setIdPost] = useState(null);
  const form = useSelector((state) => state.form);
  const [isUpdate, setIsUpdate] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(false);
  const [warning, setWarning] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  // LIB
  const navigate = useNavigate();

  // STATE LOCAL
  const [success, setSuccess] = useState(false);
  const [valid, isValid] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTitle(value);
    setBody(body);
    setImage(images);
    // console.log(body)nst
  };
  const handleEditor = (value) => {
    setBody(value);
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImgPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    let id = params.id;

    axios
      .get(`http://localhost:4001/post/${id}`)
      .then((res) => {
        const response = res.data;
        setText("Update Blog Post");
        setButton("Update Blog Post");
        setIdPost(response.data.id);
        setIsUpdate(true);
        setTitle(response.data.title);
        setCategory(!category);
        setBody(response.data.body);
        setImgPreview(`http://localhost:4001/${response.data.image}`);
        
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (isUpdate === null) {
      if (title === "" || body === "") {
        isValid(false);
      } else {
        isValid(true);
        dispatch(setAddBlog({ title, body, images }));
        navigate("/");
      }
    } else {
      if (images === null || title === "" || body === "") {
        isValid('Masukan Title');
        if(title === "" && body === ""){
          isValid('Masukan Body dan Title')
        }
         else if(body === ""){
          isValid('Masukan Body..')
        }
        // setSuccess(true);
        setWarning("Mohon Upload Gambar..");
      }
      id = params.id;
      const fd = new FormData();
      fd.append("title", title);
      fd.append("body", body);
      // fd.append("username", Cookies.get("username"));
      fd.append("image", images);
      axios
        .put(`http://localhost:4001/post/${id}`, fd)
        .then((res) => {
          const response = res.data.data;
          console.log(res);
          dispatch(
            updateBlog({
              id: response.id,
              title: response.title,
              body: response.body,
              image: response.image,
            })
          );
          setIdPost(null);
          setIsUpdate(null);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="fs-4 fw-200">{text}</h1>
        <div className="posting">
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              {valid && <div className="alert alert-danger" style={{padding:'5px 25px'}}>
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                    viewBox="0 0 16 16"
                    role="img"
                    aria-label="Warning:"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                {valid}</div>}
              {success ? (
                <div className="alert alert-success">Success</div>
              ) : null}
            </div>
            <label className="col-form-label fs-4 fw-200">Title</label>
            <div className="form-text">
              <input
                value={title}
                onChange={handleChange}
                type="text"
                placeholder="Your Title"
                name="title"
                className="form-control title"
              />
            </div>
            <div className="col-auto my-4">
              <h1 className="fs-4 fw-200">Select Image</h1>
              {warning && (
                <div className="alert alert-danger">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                    viewBox="0 0 16 16"
                    role="img"
                    aria-label="Warning:"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  {warning}
                </div>
              )}
              <input onChange={onChangeImage} type="file" />
              <img
                className="preview"
                value={`${imgPreview}`}
                style={{ width: "15%" }}
                src={imgPreview}
              />
            </div>
          </div>
          <div style={{ height: "60vh" }}>
            <h1 className="fs-4 fw-200">Body</h1>
            <MDEditor
              className="editor"
              value={body}
              onChange={handleEditor}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
              height={250}
              name="body"
              // className="form-control"

              placeholder="Your Post"
            />
          </div>

          {/* <MDEditor.Markdown source={body} /> */}

          <div className="">
            <button className="btn btn-success" onClick={handleAdd}>
              {category ? "Update Post" : "Create Blog Post"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
