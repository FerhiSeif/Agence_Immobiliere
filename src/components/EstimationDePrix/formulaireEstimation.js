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
            surfaces: "",
            files: [],
            situation: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    remplir(elementFile) {
        console.log("remplir", elementFile);

        this.setState({
            files: elementFile
        });
         var formData = new FormData();
  const files=files.map((file, index) => {
            formData.append(`file${index}`, file);
        });
    }
    onSubmit(e) {
        e.preventDefault();
       
        const etudeProjet = {
            region: this.state.region,
            categorie: this.state.categorie,
            surfaces: this.state.surfaces,
            files: this.state.files,
            situation: this.state.situation
        }




        axios
            .post("http://localhost:8080/estimations/add", etudeProjet)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data));
        this.openModal();

    }

    render() {
        return ( <
            div className = "row" >
            <
            div className = "callus" >
            <
            form onSubmit = { this.onSubmit } >
            <
            div className = "col-sm-4" >


            <
            div className = "single-query" >
            <
            label > Catégories: < /label> < /
            div > <
            /div> <
            div className = "col-sm-8" >
            <
            div className = "single-query form-group" >

            <
            select value = { this.state.categorie }
            onChange = { this.onChange }
            name = "categorie" >

            {
                categories.map((el, i) => ( <
                    option key = { i }
                    value = { el } > { el } <
                    /option>
                ))
            } <
            /select> < /
            div > <
            /div>

            <
            div className = "col-sm-4" >
            <
            div className = "single-query" >
            <
            label > Région: < /label> < /
            div > <
            /div> <
            div className = "col-sm-8" >
            <
            div className = "single-query form-group" >
            <
            select name = "region"
            value = { this.state.region }
            onChange = { this.onChange } >

            {
                villes.map((el, i) => ( <
                    option key = { i }
                    value = { el } > { el } <
                    /option>
                ))
            } <
            /select> < /
            div > <
            /div> <
            div className = "col-sm-4" >
            <
            div className = "single-query" >
            <
            label > Surface: < /label> < /
            div > <
            /div> <
            div className = "col-sm-8" >
            <
            div className = "single-query form-group" >
            <
            input type = "text"
            value = { this.state.surface }
            onChange = { this.onChange }
            className = "keyword-input"
            name = "surface"
            style = {
                { backgroundColor: "transparent" }
            }
            /> < /
            div > <
            /div> <
            div className = "col-sm-4" >
            <
            div className = "single-query" >
            <
            label > Photos de la Propriété: < /label> < /
            div > <
            /div> <
            div className = "col-sm-8" >
            <
            div className = "single-query form-group" >
            <
            Preview remplirGenereic = { this.remplir }
            /> < /
            div > <
            /div>

            <
            div className = "col-md-12 col-sm-12 col-xs-12 text-right" >

            <
            button onSubmit = { this.onSubmit }
            className = "btn-blue border_radius"
            style = {
                {
                    marginRight: '391px',
                    marginTop: "26px"
                }
            } >
            Envoyer <
            /button> < /
            div > <
            /form> < /
            div > <
            /div>
        );
    }
}


export default FormulaireEstimation