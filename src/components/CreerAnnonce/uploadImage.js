import React from "react";
import ReactDOM from "react-dom";
import "./upload.css"

//import Dropzone from "react-dropzone";
import Dropzone from 'react-dropzone-uploader'
class Preview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image : [],
      
      dropzone2: []
    };
  }

  addFilesToDropzone(files, dropzone) {
    let files_with_preview = [];
    files.map(file => {
      file["preview"] = URL.createObjectURL(file);
      files_with_preview.push(file);
    });

    const new_files = [...this.state[dropzone], ...files_with_preview];
    this.setState({ [dropzone]: new_files });
  }
  handleSubmit(files, allFiles) {
   
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
    
  }
  render() {
    const { dropzone2 } = this.state;
    return (
      <div className="App">
        <div style={{ display: "flex", flexDirection: "row", marginTop: 25 ,borderStyle:"dotted",borderColor: "white"}}>
          <div style={{ width: "100%" }}>
            
            <Dropzone
            handleSubmit={this.handleSubmit}
              onDrop={files => {
                this.addFilesToDropzone(files, "dropzone2");
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="">
                  <input {...getInputProps()} />
                  <div style={{ height: 200}}>
                     <i className="fa fa-plus-circle" />
                              Cliquez ici pour déposer des fichiers à
                              télécharger
                    {dropzone2.map(file => (
                      <img
                        src={file.preview}
                        alt="dsds"
                        style={{ width: 40, height: 40 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </Dropzone>
          </div>
        </div>
      </div>
    );
  }
}


export default Preview;