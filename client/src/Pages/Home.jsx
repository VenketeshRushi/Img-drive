import { Box, Modal, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import styles from "../Styles/home.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
function Home() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    fontFamily: "Manrope",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  let jwt = Cookies.get("jwttoken");
  let userid = Cookies.get("userid");
  console.log(userid);

  useEffect(() => {
    getimages();
  }, []);

  const onChange = (e) => {
    console.log(e.target.files);
    setFiles(e.target.files);
  };
  console.log(files);

  async function getimages() {
    try {
      const res = await axios.get("https://imguploads.herokuapp.com/files", {
        headers: {
          Authorization: `${userid}`,
        },
      });
      console.log(res);
      setImages(res.data);
      console.log(images);
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.values(files).forEach((file) => {
      formData.append("imgCollection", file);
    });
    try {
      const res = await axios.post("https://imguploads.herokuapp.com/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      });
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
      } else {
        console.log(err.response.data.msg);
      }
    }
    getimages();
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  let del = "";
  function handleChange(e) {
    let isChecked = e.target.checked;
    let value = e.target.value;
    if (isChecked) {
      del = value;
      deleteimg(value);
    }
    console.log(del);
    //deleteimg();
    del = "";
  }

  async function deleteimg(del) {
    console.log(del);
    let res = await axios({
      method: "post",
      url: "https://imguploads.herokuapp.com/files/del",
      headers: {
        Authorization: `${userid}`,
      },
      data: {
        img: del,
      },
    });
    getimages();
  }
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            marginBottom={2}
            display={"flex"}
            justifyContent={"space-between"}
          >
            {" "}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload new images
            </Typography>
            <Box onClick={handleClose}>
              <CloseIcon
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </Box>
          </Box>
          <Box
            border={"1px dashed"}
            mb={3}
            padding={5}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            {" "}
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 1 }}>
              Drop Files here
            </Typography>
            <Typography sx={{ mb: 3 }}>or</Typography>
            <div className={styles.uploads}>
              <form onSubmit={onSubmit}>
                <div>
                  <input
                    type="file"
                    id="file"
                    name="imgCollection"
                    onChange={onChange}
                  />
                </div>
                <button type="submit" value="Upload">
                  upload
                </button>
              </form>
            </div>
          </Box>
        </Box>
      </Modal>
      <div className={styles.hero}>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"12px"}
          padding={"16px 64px"}
        >
          <Stack gridAutoFlow={"column"}>
            <h2>Media Library</h2>
            <h4>{images.length} images</h4>
          </Stack>
          <Box>
            <button onClick={handleOpen}>
              <img src={require(`../Assets/images/plus-circle.png`)} alt="" />
              <h6>Upload new image</h6>
            </button>
          </Box>
        </Box>
        {images.length === 0 ? (
          <div className={styles.image}>
            <img src={require(`../Assets/images/upalod.png`)} alt="" />
            <p>Click on ‘Upload’ to start adding images</p>
          </div>
        ) : (
          <div className={styles.allimg}>
            {images?.map((e) => (
              <div key={e}>
                <input
                  onChange={(e) => handleChange(e)}
                  type="checkbox"
                  value={e}
                />
                <img src={e} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default Home;
