import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SiCashapp } from "react-icons/si";
import styled from "styled-components";
import Banner from "../img/banner.svg";
import ItemCard from "./ItemCard";
import BoardImg from "../img/board.png";
import PointImg from "../img/point.png";
import ValueImg from "../img/value.png";
import { IoShareSocialSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BiArrowToTop } from "react-icons/bi";
import Cookies from "universal-cookie";
import axios from "axios";
import { userInfo } from "os";

const Mainpage = () => {
  // redux

  const checkLogin = async () => {
    await axios
      .get("/checklogin")
      .then((result) => {
        SetCheckUser(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log("please login");
      });
  };

  let [checkUser, SetCheckUser] = useState("");

  let dispatch = useDispatch();

  const readList = async () => {
    await axios.get("/readList").then((res) => {
      console.log("success");
      console.log(res.data);
      dispatch({
        type: "readList",
        payload: res.data,
      });
    });
  };

  const readHotList = async () => {
    await axios.get("/hotList").then((res) => {
      console.log("success");
      console.log(res.data);
      dispatch({
        type: "readHotList",
        payload: res.data,
      });
    });
  };

  useEffect(() => {
    checkLogin();
    readList();
    readHotList();
  }, []);

  let state = useSelector((state) => {
    return state;
  });

  let boardState = state.boardReducer;

  let hotBoardState = state.hotBoardReducer;

  console.log(boardState);

  let hotBoard = [...hotBoardState.slice(0, 3)];

  console.log(hotBoard);

  let newBoard = [...boardState.slice(0, 3)];

  console.log(newBoard);

  // end redux

  // cookie

  let csrf = new Cookies().get("XSRF-TOKEN");
  console.log(csrf);

  // end cookie

  // modal control
  const [loginShow, setloginShow] = useState(false);

  const handleLoginClose = () => setloginShow(false);
  const handleLoginShow = () => setloginShow(true);
  // modal control end

  let currentImageWidth = document.documentElement.clientWidth;

  let [imageWidth, imageWidthChange] = useState("600px");

  let [rowAlign, rowAlignChange] = useState("space-between");

  window.addEventListener("resize", () => {
    let screenWidth = document.documentElement.clientWidth;

    if (screenWidth <= 990) {
      imageWidthChange("450px");
      rowAlignChange("center");
    }

    if (screenWidth > 990) {
      imageWidthChange("600px");
      rowAlignChange("space-between");
    }
  });

  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentImageWidth <= 990) {
      imageWidthChange("450px");
      rowAlignChange("center");
    }
  }, [currentImageWidth]);

  let [TbtnOpa, TbtnOpaChange] = useState(0);

  window.addEventListener("scroll", () => {
    let screenScroll = document.documentElement.scrollTop;

    if (screenScroll > 1000) {
      TbtnOpaChange(1);
    }

    if (screenScroll <= 1000) {
      TbtnOpaChange(0);
    }
  });

  // console.log(imageWidth);

  // style component

  let Jumbo = styled("div")`
    background-color: #ffd460;
    padding-top: 110px;
  `;

  let Line = styled("div")`
    border-bottom: 3px solid #2d4059;
    margin: 150px auto;
  `;

  let GuideText = styled("div")`
    text-align: left;
    padding: 20px 0 20px 60px;
  `;

  let GuideTitle = styled("div")`
    text-align: left;
    font-size: 28px;
    display: flex;
  `;

  let NumberBox = styled("span")`
    border: 3px solid black;
    padding: 0 10px;
    margin-right: 20px;
    height: 45px;
  `;

  let Footer = styled("div")`
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #2d4059;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    color: white;
    text-align: left;
  `;

  let TopBtn = styled("div")`
    position: fixed;
    transition: all 1s;
    bottom: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
    background-color: #f07b3f;
    color: #2d4059;
    font-size: 24px;
    border-radius: 7px;
    cursor: pointer;
    opacity: ${(props) => props.TbtnOpa};
  `;

  // end style component

  return (
    <div>
      {/* navbar */}
      <Navbar
        fixed="top"
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "#2D4059" }}
      >
        <div className="container-fluid">
          <div
            className="d-flex align-items-center"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            style={{ cursor: "pointer" }}
          >
            <SiCashapp
              style={{
                color: "#EA5455",
                fontSize: "70px",
                margin: "0 20px",
              }}
            />
            <Navbar.Brand
              style={{
                color: "white",
                fontSize: "50px",
                paddingTop: "15px",
                fontWeight: "bold",
              }}
            >
              How Much ?
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="fixnav basic-navbar-nav">
            <Nav
              className="d-flex justify-content-around"
              style={{ width: "400px" }}
            >
              <Nav.Link
                onClick={() => {
                  navigate("/login");
                }}
                style={{ color: "white", fontSize: "24px" }}
              >
                {checkUser ? (
                  <form id="logout" action="/logout" method="post">
                    <span
                      onClick={() => {
                        let form = document.getElementById("logout");

                        form.submit();
                      }}
                    >
                      ????????????
                    </span>
                    <input type="hidden" name="_csrf" value={csrf} />
                  </form>
                ) : (
                  <span>?????????</span>
                )}
              </Nav.Link>
              {checkUser ? null : (
                <Nav.Link
                  onClick={() => {
                    navigate("/account");
                  }}
                  style={{ color: "white", fontSize: "24px" }}
                >
                  ????????????
                </Nav.Link>
              )}
              <Nav.Link
                onClick={() => {
                  navigate("/boardmain");
                }}
                style={{ color: "white", fontSize: "24px" }}
              >
                ?????????
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  checkUser ? navigate("/mypage") : handleLoginShow();
                }}
                style={{ color: "white", fontSize: "24px" }}
              >
                ?????? ?????????
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {/* jumbotron */}
      <Jumbo>
        <div
          style={{
            position: "relative",
            paddingTop: "100px",
            paddingBottom: "150px",
          }}
        >
          <p
            style={{
              fontSize: "24px",
              position: "absolute",
              top: "50px",
              left: "50px",
            }}
          >
            ????????? ?????? ?????? ??????{" "}
            <span style={{ borderBottom: "2px solid #EA5455" }}>
              ???????????? ??????
            </span>
            ??? ?????? !
          </p>
          <img src={Banner} alt="banner" style={{ width: imageWidth }} />
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50px",
              textAlign: "left",
            }}
          >
            <p style={{ fontSize: "24px" }}>
              ?????? ???????????? ?????? <span style={{ color: "#EA5455" }}>??????</span>
              ?????????,
            </p>
            <p style={{ fontSize: "24px" }}>
              ???????????? ????????????{" "}
              <span style={{ borderBottom: "2px solid #EA5455" }}>
                ????????? ??????????????? !
              </span>
            </p>
            <Button
              id="startBtn"
              onMouseEnter={() => {
                let startBtn = document.getElementById("startBtn");

                startBtn.setAttribute(
                  "style",
                  "border: none; width: 250px; font-size: 25px; background-color: #EB2A19;"
                );
              }}
              onMouseLeave={() => {
                let startBtn = document.getElementById("startBtn");

                startBtn.setAttribute(
                  "style",
                  "border: none; width: 250px; font-size: 25px; background-color: #EA5455;"
                );
              }}
              onClick={() => {
                if (checkUser) {
                  navigate("/register");
                } else {
                  navigate("/login");
                }
              }}
              style={{
                backgroundColor: "#EA5455",
                border: "none",
                width: "250px",
                fontSize: "25px",
              }}
            >
              ????????????
            </Button>
          </div>
        </div>
      </Jumbo>

      {/* item list */}

      <div className="container-lg" style={{ margin: "80px auto" }}>
        <div
          className="row"
          style={{
            margin: "30px 0",
            fontSize: "32px",
            display: "flex",
            justifyContent: rowAlign,
          }}
        >
          <div className="col-lg-2">?????? ?????????</div>
          <div
            className="col-lg-2"
            onClick={() => {
              navigate("/hotboard");
            }}
            style={{ fontSize: "24px", cursor: "pointer" }}
          >
            + ?????????
          </div>
        </div>
        <div className="row">
          {hotBoard.length === 0 ? (
            <p style={{ fontSize: "20px" }}>?????? ?????? ???????????? ????????????.</p>
          ) : (
            hotBoard.map((item, index) => {
              return (
                <div
                  className="col-lg-4 d-flex justify-content-center"
                  key={index}
                >
                  <div
                    onClick={() => {
                      navigate("/detail/" + item.bno);
                      console.log(item);
                    }}
                  >
                    <ItemCard item={item} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="container-lg" style={{ margin: "80px auto" }}>
        <div
          className="row"
          style={{
            margin: "30px 0",
            fontSize: "32px",
            display: "flex",
            justifyContent: rowAlign,
          }}
        >
          <div className="col-lg-2">??? ?????????</div>
          <div
            className="col-lg-2"
            onClick={() => {
              navigate("/boardmain");
            }}
            style={{ fontSize: "24px", cursor: "pointer" }}
          >
            + ?????????
          </div>
        </div>
        <div className="row">
          {newBoard.length === 0 ? (
            <p style={{ fontSize: "20px" }}>?????? ????????? ???????????? ????????????.</p>
          ) : (
            newBoard.map((item, index) => {
              return (
                <div
                  className="col-lg-4 d-flex justify-content-center"
                  key={index}
                >
                  <div
                    onClick={() => {
                      navigate("/detail/" + item.bno);
                      console.log(item);
                    }}
                  >
                    <ItemCard item={item} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <Line className="container-lg"></Line>

      {/* user guide */}
      <div className="container-lg" style={{ margin: "80px auto" }}>
        <div className="row" style={{ marginBottom: "120px" }}>
          <span style={{ fontSize: "32px" }}>
            ????????? ???????????? ????????? ????????? ?????????{" "}
            <span style={{ color: "#F07B3F" }}>?????? ???</span>
          </span>
        </div>
        <div
          className="row d-flex justify-content-around"
          style={{ marginBottom: "150px" }}
        >
          <div className="col-lg-5">
            <GuideTitle>
              <NumberBox>1</NumberBox> ????????? ?????? ????????? ??????????????????.
            </GuideTitle>
            <GuideText>
              <p>
                ????????? ????????? ????????????, ?????? ??????, ???????????? ???, ????????? ?????????
                ?????? ?????? ????????? ?????? ?????? ?????? ???????????? ... !
              </p>
              <p>?????? ??????????????? ????????? ???????????? ?????? ???????????? ??????????????? !</p>
            </GuideText>
          </div>
          <div className="col-lg-5">
            <img
              src={BoardImg}
              alt="guideImage"
              style={{ width: "100%", padding: "20px" }}
            ></img>
          </div>
        </div>

        <div
          className="row d-flex justify-content-around"
          style={{ marginBottom: "150px" }}
        >
          <div className="col-lg-5">
            <GuideTitle>
              <NumberBox>2</NumberBox>
              <span> ?????? ????????? ?????? ?????? ??????????????????.</span>
            </GuideTitle>
            <GuideText>
              <p>
                ????????? ????????? ???????????? ?????? ?????? ????????? ????????? ????????? ????????????
                ????????? ????????? ??????????????????!
              </p>
              <p>????????? ????????? ?????? ????????? ?????????.</p>
            </GuideText>
          </div>
          <div className="col-lg-5">
            <img
              src={ValueImg}
              alt="guideImage"
              style={{ width: "100%", padding: "20px" }}
            ></img>
          </div>
        </div>

        <div
          className="row d-flex justify-content-around"
          style={{ marginBottom: "150px" }}
        >
          <div className="col-lg-5">
            <GuideTitle>
              <NumberBox>3</NumberBox> ????????? ???????????? ?????? ??????????????????.
            </GuideTitle>
            <GuideText>
              <p>
                ???????????? ???????????? ????????? ?????? ????????? ???????????? ??????????????????
                ????????? ????????? ????????? ??? ????????????.
              </p>
            </GuideText>
          </div>
          <div className="col-lg-5">
            <img
              src={PointImg}
              alt="guideImage"
              style={{ width: "100%", padding: "20px" }}
            ></img>
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-6">
            <IoShareSocialSharp
              style={{
                fontSize: "28px",
                marginRight: "20px",
                backgroundColor: "#EA5455",
                padding: "2px",
                borderRadius: "5px",
              }}
            />
            ????????????????????? ???????????? ????????????.
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-6" style={{ height: "250px" }}>
            <p>????????????</p>
            <p>
              1. ?????? ????????? ????????? ?????? ????????? ?????? ?????? ???????????? ????????? ?????????
              ????????????.
            </p>
            <p>
              2. ????????? ???????????? ?????? ??? ?????? ???????????? ?????? ???????????? ??????,
              ????????? ????????? ????????? ???????????? ????????? ???????????????. <br />
              (?????? ???????????? ???????????? ?????? ????????? ??????)
            </p>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-6" style={{ height: "150px" }}>
            <p>
              ?????????: howmuch company <br />
              ????????? ?????? ?????? : 0000-0000-0000 <br />
              ?????? : ????????? oooo oooo xxxx xxxx <br />
              ???????????? : 02-xxx-xxxx
            </p>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-6" style={{ height: "20px" }}>
            Copyright??2021 Alright reserved by howmuch
          </div>
        </div>
      </Footer>
      {/* top btn */}
      <TopBtn
        TbtnOpa={TbtnOpa}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <BiArrowToTop />
      </TopBtn>

      {/* login modal start */}
      <Modal
        show={loginShow}
        onHide={handleLoginShow}
        style={{ fontFamily: "'Do Hyeon', sans-serif" }}
      >
        <Modal.Header>
          <Modal.Title>?????? ???????????? ????????? ??????????????????! ??????</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ???????????? ?????????????????? ???????????? ???????????????.
          <br />
          ???????????? ???????????? ????????? ??????????????? ???????????? ??? ?????? ??????????????????.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLoginClose}>
            ??????
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleLoginClose();
              navigate("/login");
            }}
          >
            ??????????????? ??????
          </Button>
        </Modal.Footer>
      </Modal>
      {/* login modal end */}
    </div>
  );
};

export default Mainpage;
