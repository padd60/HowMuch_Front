import React, { useEffect, useState } from "react";
import { SiCashapp } from "react-icons/si";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie";

const Register = () => {
  let navigate = useNavigate();

  // cookie

  let csrf = new Cookies().get("XSRF-TOKEN");
  console.log(csrf);

  // end cookie

  let dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [titleCheck, SettitleCheck] = useState(false);

  const [contentCheck, SetcontentCheck] = useState(false);

  const [suggestCheck, SetsuggestCheck] = useState(false);

  const checkValue = (input) => {
    console.log(input.value);

    return input.value;
  };

  const resetShow = () => {
    SettitleCheck(false);
    SetcontentCheck(false);
    SetsuggestCheck(false);
  };

  let currentWidth = document.documentElement.clientWidth;

  // resize screen

  let [flexdir, Setflexdir] = useState("row nowrap");

  useEffect(() => {
    if (currentWidth > 1200) {
      Setflexdir("row nowrap");
    }
    if (currentWidth <= 1200) {
      Setflexdir("column nowrap");
    }
  }, [flexdir, currentWidth]);

  window.addEventListener("resize", () => {
    let screenWidth = document.documentElement.clientWidth;

    if (screenWidth <= 1200) {
      Setflexdir("column nowrap");
    }

    if (screenWidth > 1200) {
      Setflexdir("row nowrap");
    }
  });

  ///end resize screen

  // styled component
  let TopTitle = styled("p")`
    font-size: 48px;
  `;

  let Label = styled("div")`
    font-size: 48px;
    text-align: center;
    display: inline-block;
    width: 300px;
  `;

  let Warn = styled("p")`
    color: red;
  `;

  let Line = styled("div")`
    width: 80%;
    height: 5px;
    background-color: #2d4059;
    margin: 0 auto;
  `;
  // end styled component

  return (
    <div>
      <div className="cotainer-lg">
        <div
          className="row d-flex justify-content-center"
          style={{ width: "100%", paddingTop: "50px" }}
        >
          <div
            className="col-lg-1"
            onClick={() => {
              navigate("/");
            }}
            style={{ marginBottom: "20px", cursor: "pointer" }}
          >
            <SiCashapp
              style={{ color: "#EA5455", fontSize: "70px", margin: "0 20px" }}
            />
          </div>
          <div className="col-lg-9">
            <TopTitle>Check items & Feed back</TopTitle>
          </div>
        </div>
      </div>
      <Line></Line>
      <div className="container">
        <div className="row">
          <div
            className="col d-flex flex-column justify-content-center align-items-center"
            style={{ paddingTop: "80px" }}
          >
            <div
              style={{
                display: "flex",
                width: "80%",
                paddingTop: "30px",
                alignItems: "center",
                flexFlow: flexdir,
              }}
            >
              <Label>제목</Label>
              <input
                id="TITLE"
                type="text"
                placeholder="제목을 입력하세요"
                style={{
                  width: "400px",
                  height: "50px",
                  fontSize: "20px",
                }}
              />
            </div>
            {titleCheck ? <Warn>제목을 입력해주세요.</Warn> : null}
            <div
              style={{
                display: "flex",
                width: "80%",
                paddingTop: "30px",
                alignItems: "center",
                flexFlow: flexdir,
              }}
            >
              <Label>
                사진 첨부
                <br />
                (선택사항)
              </Label>
              <div
                style={{
                  width: "450px",
                  height: "400px",
                  fontSize: "20px",
                  border: "1px solid #666",
                  borderRadius: "3px",
                  overflow: "auto",
                }}
              >
                <input
                  id="ATTACH"
                  type="file"
                  multiple="multiple"
                  accept=".jpg, .jpeg, .png, .svg+xml, .gif"
                  onChange={(e) => {
                    console.log("change!");

                    let fileArr = [...e.target.files];

                    // fileArr = [file(),file(),file()]

                    let base64Arr = [];

                    let base64Obj = {};

                    fileArr.forEach((item, index) => {
                      let reader = new FileReader();

                      let imgBox = document.getElementById("imgBox");
                      let image = document.createElement("img");

                      reader.onload = (e) => {
                        let dataURL = reader.result;
                        // console.log(typeof reader.result);
                        base64Arr.push(dataURL);
                        image.src = dataURL;
                        image.style =
                          "width: 350px; display: block; margin-bottom: 20px";

                        imgBox.appendChild(image);
                      };

                      reader.readAsDataURL(item);

                      // console.log(base64Arr);
                      // console.log(typeof base64Arr);
                      // console.log(base64Arr[0]);
                    });
                  }}
                  style={{ width: "400px", margin: "20px 0" }}
                />
                <div
                  id="imgBox"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexFlow: "column wrap",
                  }}
                ></div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "80%",
                alignItems: "center",
                paddingTop: "30px",
                flexFlow: flexdir,
              }}
            >
              <Label>내용</Label>
              <textarea
                id="CONTENT"
                placeholder="본문 내용을 입력하세요"
                style={{
                  width: "450px",
                  height: "400px",
                  fontSize: "20px",
                  marginBottom: "10px",
                  resize: "none",
                }}
              />
            </div>
            {contentCheck ? <Warn>내용을 입력해주세요.</Warn> : null}
            <div
              style={{
                display: "flex",
                width: "80%",
                paddingTop: "30px",
                alignItems: "center",
                flexFlow: flexdir,
              }}
            >
              <Label>
                제시가
                <br />
                (선택사항)
              </Label>
              <input
                id="SUGGESTION"
                type="text"
                placeholder="제시할 가격을 입력하세요 (생략가능)"
                style={{
                  width: "400px",
                  height: "50px",
                  fontSize: "20px",
                }}
              />
            </div>
            {suggestCheck ? (
              <Warn style={{ marginLeft: "-80px" }}>
                숫자만 입력이 가능합니다.
              </Warn>
            ) : null}
            <div
              style={{
                display: "flex",
                width: "80%",
                paddingTop: "30px",
                alignItems: "center",
                flexFlow: flexdir,
              }}
            >
              <Label>
                태그 (최대3개)
                <br />
                (선택사항)
              </Label>
              <input
                id="TAG1"
                type="text"
                placeholder="태그 입력란"
                style={{
                  width: "150px",
                  height: "50px",
                  fontSize: "20px",
                }}
              />
              <input
                id="TAG2"
                type="text"
                placeholder="태그 입력란"
                style={{
                  width: "150px",
                  height: "50px",
                  margin: "20px 20px",
                  fontSize: "20px",
                }}
              />
              <input
                id="TAG3"
                type="text"
                placeholder="태그 입력란"
                style={{
                  width: "150px",
                  height: "50px",
                  fontSize: "20px",
                }}
              />
            </div>
            <div
              style={{
                paddingTop: "60px",
                paddingRight: "20px",
                display: "flex",
                width: "300px",
                justifyContent: "space-evenly",
                paddingBottom: "50px",
              }}
            >
              <Button
                onClick={async () => {
                  let thumbnailURL = "";
                  let postImgURL = [];

                  let attachImgBox = document.querySelectorAll("#imgBox img");

                  if (attachImgBox.length > 0) {
                    let arrAttachImgBox = [...attachImgBox];

                    let thumbnailImgTag = attachImgBox[0];

                    console.log(attachImgBox);

                    thumbnailURL = thumbnailImgTag.src;

                    console.log(thumbnailURL);

                    postImgURL = arrAttachImgBox.map((item, index) => {
                      return item.src;
                    });

                    console.log(postImgURL);
                  }

                  resetShow();

                  let titleInput = document.getElementById("TITLE");
                  let contentInput = document.getElementById("CONTENT");
                  let suggestInput = document.getElementById("SUGGESTION");
                  let tag1Input = document.getElementById("TAG1");
                  let tag2Input = document.getElementById("TAG2");
                  let tag3Input = document.getElementById("TAG3");

                  let tagArr = [];

                  if (tag1Input.value) {
                    tagArr.push(tag1Input.value);
                  }
                  if (tag2Input.value) {
                    tagArr.push(tag2Input.value);
                  }
                  if (tag3Input.value) {
                    tagArr.push(tag3Input.value);
                  }

                  console.log(tagArr);

                  // console.log(titleInput);

                  let number = /[0-9]/; // 숫자 체크

                  if (!checkValue(titleInput)) {
                    SettitleCheck(true);
                    return;
                  }
                  if (!checkValue(contentInput)) {
                    SetcontentCheck(true);
                    return;
                  }

                  if (checkValue(suggestInput)) {
                    if (!number.test(suggestInput.value)) {
                      SetsuggestCheck(true);
                      suggestInput.value = "";
                      return;
                    }
                  }

                  await axios({
                    url: "/register",
                    method: "post",
                    data: {
                      title: titleInput.value,
                      content: contentInput.value,
                      imageList: postImgURL.length > 0 ? postImgURL : null,
                      tagList: tagArr.length > 0 ? tagArr : null,
                      suggestion: suggestInput.value
                        ? suggestInput.value
                        : null,
                    },
                    headers: {
                      "XSRF-TOKEN": csrf,
                    },
                  }).then((res) => {
                    console.log(res.data);
                  });

                  handleShow();
                }}
                style={{
                  backgroundColor: "#2d4059",
                  border: "none",
                  fontSize: "24px",
                }}
              >
                등록하기
              </Button>
              <Button
                onClick={() => {
                  navigate("/boardmain");
                }}
                style={{
                  backgroundColor: "#2d4059",
                  border: "none",
                  fontSize: "24px",
                }}
              >
                취소
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal
        show={show}
        onHide={handleClose}
        style={{ fontFamily: "'Do Hyeon', sans-serif" }}
      >
        <Modal.Header>
          <Modal.Title>글이 정상 등록되었습니다.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>게시판페이지에서 등록한 게시물을 확인해보세요.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/boardmain");
            }}
          >
            게시판으로 이동
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
