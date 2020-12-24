import React, { Component } from "react";
import UserDataService from "../services/user.service";
import {Link} from "react-router-dom";

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangePrenom = this.onChangePrenom.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.newUser = this.newUser.bind(this);

        this.state = {
            id: null,
            nom: "",
            prenom: "",
            email: "",
            message: "",
            errmsg: ""
        };
    }

    onChangeNom(e){
        this.setState({
            nom: e.target.value
        });
    }

    onChangePrenom(e){
        this.setState({
            prenom: e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    saveUser(){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let data = {
            nom: this.state.nom,
            prenom: this.state.prenom,
            email: this.state.email,
            message: "",
            errmsg: ""
        };

        if (re.test(String(data.email).toLowerCase())) {
            UserDataService.new(data)
            .then(response => {
                this.setState({
                id: response.data.id,
                nom: response.data.nom,
                prenom: response.data.prenom,
                email: response.data.email,

                submitted: true
            });
            console.log(response.data);
            }).catch(e => {
                console.log(e);
                this.setState({errmsg:"Error while creating new user, mail may already exist"});
            });
        } else {
            this.setState({message: "Invalid mail adress, must be in x@y.z format"});
            return;
        }

        
    }

    newUser(){
        this.setState({
            id: null,
            nom: "",
            prenom: "",
            email: "",
            message: "",
            submitted: false
        });
    }

    render(){
        return (
        <div className="submit-form">
            {this.state.submitted ? (
                <div>
                    <h4>Submitted successfully!</h4>
                    <button className="btn btn-sucess" onClick={this.newUser}>New</button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        {this.state.errmsg.length > 0 ? 
                            (<div className="text-danger">{this.state.errmsg}</div>) : ""
                        }
                        <label htmlFor="nom">Nom</label>
                        <input type="text" className="form-control" id="nom" required value={this.state.nom}
                        onChange={this.onChangeNom} name="nom" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prenom">Prenom</label>
                        <input type="text" className="form-control" id="prenom" required 
                        value={this.state.prenom}
                        onChange={this.onChangePrenom} name="prenom" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        {this.state.message.length > 0 ? 
                        (<div className="text-danger">{this.state.message}</div>) : ""
                        }
                        <input type="email" className="form-control" id="email" required 
                        value={this.state.email}
                        onChange={this.onChangeEmail} name="email" />
                    </div>

                    <button onClick={this.saveUser} className="btn btn-success">Save</button>     <Link to={"/"} className="btn btn-info">Cancel</Link>
                </div>
            )}
        </div>
        );
    }

}