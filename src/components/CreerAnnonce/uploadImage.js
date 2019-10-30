// import React from "react";
// import ReactDOM from "react-dom";
// import "./upload.css"

// //import Dropzone from "react-dropzone";
// import Dropzone from 'react-dropzone-uploader'
// class Preview extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       image : [],
      
//       dropzone2: []
//     };
//   }

//   addFilesToDropzone(files, dropzone) {
//     let files_with_preview = [];
//     files.map(file => {
//       file["preview"] = URL.createObjectURL(file);
//       files_with_preview.push(file);
//     });

//     const new_files = [...this.state[dropzone], ...files_with_preview];
//     this.setState({ [dropzone]: new_files });
//   }
//   handleSubmit(files, allFiles) {
   
//     console.log(files.map(f => f.meta));
//     allFiles.forEach(f => f.remove());
    
//   }
//   render() {
//     const { dropzone2 } = this.state;
//     return (
//       <div className="App">
//         <div style={{ display: "flex", flexDirection: "row", marginTop: 25 ,borderStyle:"dotted",borderColor: "white"}}>
//           <div style={{ width: "100%" }}>
            
//             <Dropzone
//             handleSubmit={this.handleSubmit}
//               onDrop={files => {
//                 this.addFilesToDropzone(files, "dropzone2");
//               }}
//             >
//               {({ getRootProps, getInputProps }) => (
//                 <div {...getRootProps()} className="">
//                   <input {...getInputProps()} />
//                   <div style={{ height: 200}}>
//                      <i className="fa fa-plus-circle" />
//                               Cliquez ici pour déposer des fichiers à
//                               télécharger
//                     {dropzone2.map(file => (
//                       <img
//                         src={file.preview}
//                         alt="dsds"
//                         style={{ width: 40, height: 40 }}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </Dropzone>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }import React, { useState } from 'react'




























import React from "react";
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
 class Preview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: [
        {
          source: "index.html",
          options: {
            type: "local"
          }
        }
      ]
    };
  }

    imgFunction(elmt){
      console.log("imgFunction", elmt);
      this.props.remplirGenereic(elmt)
    }

    handleInit() {
      console.log("FilePond instance has initialised", this.pond);
    }

  render() {
    return (
      <div className="App">
        {/* Pass FilePond properties as attributes */}
        <FilePond
          ref={ref => (this.pond = ref)}
          files={this.state.files}
          allowMultiple={true}
          maxFiles={15}
          oninit={() => this.handleInit()}
          onupdatefiles={fileItems => {
            console.log("files filpomd", fileItems);
            // Set currently active file objects to this.state
            this.setState({
              files: fileItems.map(fileItem => fileItem.file)
            });
            var imagesLoop = fileItems.map(fileItem => fileItem.file) ;
            this.imgFunction(imagesLoop);
          }}
        />
      </div>
    );
  }
}
export default Preview;