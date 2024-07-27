import React, { useState, useRef, useEffect } from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import Sidebar from "components/Navbars/SideBar";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Tooltip } from "primereact/tooltip";
import { classNames } from "primereact/utils";

export default function RegisterPage() {
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");
  const [fullNameFocus, setFullNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("John Doe"); // Static name for example
  const [rollNumber, setRollNumber] = useState("2023BCS0023"); // Static roll number for example
  const [codeforcesVerified, setCodeforcesVerified] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [codechef, setCodechef] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const toast = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);

  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };

  const handleSaveChanges = () => {
    const changesMade = linkedin || github || codechef || leetcode;

    if (changesMade) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Changes saved successfully",
      });
    } else {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "No changes made",
      });
    }
  };

  return (
    <>
      <div className="wrapper" style={{ height: '100vh', overflow: 'hidden' }}>
        <div className="page-header" style={{ height: '100%' }}>
          <Sidebar />
          <img
            alt="..."
            className="dots"
            src={require("assets/img/dots.png")}
          />
          <div className="container h-100">
            <Container className="h-100">
              <Row className="h-100">
                <Col className="offset-lg-0 offset-md-3 d-flex align-items-center" lg="5" md="6">
                  <Card className="card-register w-100" style={{ maxHeight: '90vh' }}>
                    <CardBody className="d-flex flex-column" style={{ overflowY: 'auto' }}>
                      <CardTitle tag="h3" className="text-center mb-3">User Profile</CardTitle>
                      <div className="text-center position-relative mb-3">
                        <CardImg
                          top
                          src={
                            profileImage
                              ? URL.createObjectURL(profileImage)
                              : "https://via.placeholder.com/150"
                          }
                          alt="Profile Image"
                          className="rounded-circle"
                          style={{ width: "25%", height: "auto", maxWidth: "150px" }}
                        />
                        <FileUpload
                          mode="basic"
                          accept="image/*"
                          customUpload
                          auto
                          onSelect={(e) => setProfileImage(e.files[0])}
                          className="position-absolute p-button-rounded p-button-info p-button-sm"
                          style={{ bottom: 0, right: 0 }}
                          chooseLabel="Upload"
                        />
                      </div>
                      <div className="text-center mb-3">
                        <h5 className="mb-1">{name}</h5>
                        <p className="mb-0" style={{ fontSize: '0.9rem' }}>{rollNumber}</p>
                      </div>
                      <FormGroup style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        <label>Codeforces ID </label>
                        <Button
                          color={codeforcesVerified ? "success" : "primary"}
                          onClick={() => setCodeforcesVerified(!codeforcesVerified)}
                          className="mx-2"
                          size="sm"
                        >
                          {codeforcesVerified ? "Verified" : "Verify"}
                        </Button>
                      </FormGroup>
                      <FormGroup>
                        <label>LinkedIn URL</label>
                        <Input
                          type="url"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          placeholder="https://linkedin.com/in/yourusername"
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>GitHub URL</label>
                        <Input
                          type="url"
                          value={github}
                          onChange={(e) => setGithub(e.target.value)}
                          placeholder="https://github.com/yourusername"
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Codechef URL</label>
                        <Input
                          type="url"
                          value={codechef}
                          onChange={(e) => setCodechef(e.target.value)}
                          placeholder="https://www.codechef.com/users/yourusername"
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Leetcode URL</label>
                        <Input
                          type="url"
                          value={leetcode}
                          onChange={(e) => setLeetcode(e.target.value)}
                          placeholder="https://leetcode.com/yourusername"
                        />
                      </FormGroup>
                      <FormGroup className="mt-auto">
                        <Button color="primary" onClick={handleSaveChanges} block>
                          Save Changes
                        </Button>
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-7"
                id="square7"
                style={{ transform: squares7and8 }}
              />
              <div
                className="square square-8"
                id="square8"
                style={{ transform: squares7and8 }}
              />
            </Container>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </>
  );
}