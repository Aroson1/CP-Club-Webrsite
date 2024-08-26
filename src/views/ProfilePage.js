import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import Sidebar from "components/Navbars/SideBar";
import { Toast } from "primereact/toast";
import apiService from "../apiService";
export default function RegisterPage() {
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [codeforcesVerified, setCodeforcesVerified] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [codechef, setCodechef] = useState("");
  const [leetcode, setLeetcode] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setName(userData.userName);
      setRollNumber(userData.rollNumber);
      setProfileImage(userData.profileImage);

      fetchUserDetails(userData.id);
    }
  }, []);

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

  const fetchUserDetails = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.get(`/v1/user-details/user/${userId}`);
      const userDetails = response;

      if (userDetails) {
        setLinkedin(userDetails.linkedIn || "");
        setGithub(userDetails.github || "");
        setCodeforcesVerified(userDetails.verified || false);
        setCodechef(userDetails.codechef || "");
        setLeetcode(userDetails.leetcode || "");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching user details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    const changesMade = linkedin || github || codechef || leetcode;

    if (!changesMade) {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "No changes made",
      });
      return;
    }

    setLoading(true);
    setError(null);
    const userData = JSON.parse(localStorage.getItem("userData"));

    try {
      const response = await apiService.put(
        `/v1/user-details/user/${userData.id}`,
        {
          userId: userData.id,
          linkedIn: linkedin,
          github: github,
          codeforces: "",
          codechef: codechef,
          leetcode: leetcode,
          verified: codeforcesVerified,
        }
      );
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Changes saved successfully",
      });
    } catch (err) {
      console.error(err);
      setError("An error occurred while saving changes.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  useEffect(() => {
    if (error && toast.current) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 3000,
      });
    }
  }, [error]);

  return (
    <>
      <div className="wrapper" style={{ height: "100vh", overflow: "hidden" }}>
        <div className="page-header" style={{ height: "100%" }}>
          <Sidebar />
          <img
            alt="..."
            className="dots"
            src={require("assets/img/dots.png")}
          />

          <Container className="h-100">
            <Row className="h-100">
              <Col
                className="offset-lg-0 offset-md-3 d-flex align-items-center"
                lg="5"
                md="6"
              >
                <Card
                  className="card-register w-100"
                  style={{ maxHeight: "90vh" }}
                >
                  <CardBody
                    className="d-flex flex-column"
                    style={{ overflowY: "auto" }}
                  >
                    <CardTitle tag="h3" className="text-center mb-3">
                      User Profile
                    </CardTitle>
                    <div className="text-center position-relative mb-3">
                      <img
                        top
                        src={
                          profileImage
                            ? profileImage
                            : "https://via.placeholder.com/150"
                        }
                        alt="Profile Image"
                        className="rounded-circle"
                        style={{
                          width: "25%",
                          height: "auto",
                          maxWidth: "150px",
                        }}
                      />
                    </div>
                    <div className="text-center mb-3">
                      <h5 className="mb-1">{name}</h5>
                      <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                        {rollNumber}
                      </p>
                    </div>
                    <FormGroup
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <label>Codeforces ID </label>
                      <Button
                        color={codeforcesVerified ? "success" : "primary"}
                        onClick={() =>
                          setCodeforcesVerified(!codeforcesVerified)
                        }
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
                    <Row>
                      <FormGroup className="mt-auto">
                        <Button
                          color="primary"
                          onClick={handleSaveChanges}
                          block
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save Changes"}
                        </Button>
                      </FormGroup>
                      <FormGroup className="mt-auto">
                        <Button
                          color="blue"
                          onClick={handleLogOut}
                          block
                          disabled={loading}
                        >
                          {loading ? "Logging Out..." : "Log Out"}
                        </Button>
                      </FormGroup>
                    </Row>
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
      <Toast ref={toast} />
    </>
  );
}
