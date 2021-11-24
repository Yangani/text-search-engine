import "./upload.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const Input = styled("input")({
  display: "none",
});

const Upload = (setFiles) => {
  // Reads files on uploading them
  // files read are encoded as Base64
  const onFileUpload = (event) => {
    console.log(event.target);
    event.preventDefault();
    const id = event.target.id;
    const file_reader = new FileReader();
    const fileList = event.target.files;

    // file_reader.onload = () => {};

    fileList.map((file) => {
      file_reader.readAsDataURL(file);

      return setFiles((files) => [
        ...files,
        { file_id: id, uploaded_file: file_reader.result },
      ]);
    });
  };

  return (
    <Stack className="upload-files">
      <label htmlFor="contained-button-file">
        <Input
          accept=".txt"
          id="contained-button-file"
          multiple
          type="file"
          onChange={onFileUpload}
        />
        <Button
          variant="outlined"
          component="span"
          startIcon={<FileUploadIcon />}
        >
          Upload
        </Button>
      </label>
    </Stack>
  );
};

export default Upload;
