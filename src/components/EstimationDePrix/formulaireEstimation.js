import React, { Component } from "react";
import { villes, categories, numbers } from "./../CreerAnnonce/static";
import Preview from './../CreerAnnonce/uploadImage'
import axios from "axios"


class FormulaireEstimation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: "",
            categorie: "",
            surface: "",
            files: [],
            situation: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.remplir = this.remplir.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            
        });
    }
    remplir(elementFile) {
        console.log("remplir", elementFile);

        this.setState({
            files: elementFile
        });

    }
 

    onSubmit(e) {
        e.preventDefault();
        const formData = new FormData() 
        //let file = this.state.files
        console.log("this.state.files")
        console.log(this.state.files)
        formData.append("region", this.state.region);
        formData.append("surface", this.state.surface);
        formData.append("categorie", this.state.categorie);
        formData.append("situation", this.state.situation);

        //formData.append("files",this.state.files[0])
        this.state.files.map((file, index) => {
        formData.append(`file${index}`, file);
    });

        console.log("formData ::::::::")
        console.log(formData)
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        
        axios({  
            method: "POST",
            url: `/estimations/add`,
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } },
            headers: { Authorization: localStorage.getItem("Authorization") }
        });
        alert("félicitations 🎉 votre demande a été envoyée avec succès");
        let statut = 200;
        this.setState({
    
                      region: "",
                      surface: "",
                      email2: "",
                      categorie:"",
                      files: [],
     
             });
        return statut;
    }

    render() {
        return ( 
        <div className = "row" >
          <div className = "callus" >
            <form onSubmit = { this.onSubmit } >
              <div className = "col-sm-4" >


               <div className = "single-query" >
                 <label > Catégories: < /label>
               </div> 
              </div> 
              <div className = "col-sm-8" >
            <div className = "single-query form-group" >

            <select value = { this.state.categorie }
            onChange = { this.onChange }
            name = "categorie" >

            {
                categories.map((el, i) => ( <
                    option key = { i }
                    value = { el } > { el } <
                    /option>
                ))
            }
            
             </select> 
             </div >
             </div>

            <div className = "col-sm-4" >
            <div className = "single-query" >
            <label> Région: </label> 
            </div> 
            </div> 
            <div className = "col-sm-8" >
            <div className = "single-query form-group" >
            <select name = "region"
            value = { this.state.region }
            onChange = { this.onChange } >

            {
                villes.map((el, i) => ( <
                    option key = { i }
                    value = { el } > { el } <
                    /option>                                            
                ))
            } </select>
             </div >
              </div> 
              <div className = "col-sm-4" >
            <div className = "single-query" >
            <label > Surface: < /label>
             </div >
              </div> 
              <div className = "col-sm-8" >
            <div className = "single-query form-group" >
            <input type = "text"
            value = { this.state.surface }
            onChange = { this.onChange }
            className = "keyword-input"
            name = "surface"
            style = {
                { backgroundColor: "transparent" }
            }
            /> 
            </div > 
            </div>
            <div className = "col-sm-4" >
            <div className = "single-query" >
            <label > Photos de la Propriété: < /label> 
            </div > 
            </div> 
            <div className = "col-sm-8" >
                <div className = "single-query form-group" >
                <Preview remplirGenereic = { this.remplir }/> 
                </div > 
            </div>

            <div className = "col-md-12 col-sm-12 col-xs-12 text-right" >

            <button onSubmit = { this.onSubmit }
            className = "btn-blue border_radius"
            style = {
                {
                    marginRight: '391px',
                    marginTop: "26px"
                }
            } >
            Envoyer 
            </button>
             </div > 
             </form>
              </div > 
              </div>
        );
    }
}


export default FormulaireEstimation