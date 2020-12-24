import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserDataService from "../services/user.service";

export default class User extends Component {
    constructor(props){
        super(props);
        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangePrenom = this.onChangePrenom.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);

        this.state = {
            currentUser: {
                id: null,
                nom: "",
                prenom: "",
                email: "",
                message: ""
            },
            message: "",
            errmsg:""
        };
    }

    componentDidMount(){
        this.getUser(this.props.match.params.id);
    }

    onChangeNom(e){
        const nom = e.target.value;
        this.setState(function(prevState){
            return {
                currentUser: {
                    ...prevState.currentUser,
                    nom: nom
                }
            };
        });
    }

    onChangePrenom(e){
        const prenom = e.target.value;
        this.setState(function(prevState){
            return {
                currentUser: {
                    ...prevState.currentUser,
                    prenom: prenom
                }
            };
        });
    }

    onChangeEmail(e){
        const email = e.target.value;
        this.setState(function(prevState){
            return {
                currentUser: {
                    ...prevState.currentUser,
                    email: email
                }
            };
        });
    }

    getUser(id){
        UserDataService.get(id)
        .then(response => {
            this.setState({currentUser: response.data});
            console.log(response.data);
            this.setState({updated:false});
        }).catch(e=>{
            console.log(e);
        });
        
    }

    updateUser(){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(this.state.currentUser.email).toLowerCase())) {
            UserDataService.update(this.state.currentUser.id,this.state.currentUser)
            .then(response => {
                console.log(response.data);
                this.setState({message:"User update Successfully"});
                this.setState({updated:true});
            }).catch(e=>{
                console.log(e);
                this.setState({errmsg:"Error while updating, mail may already exist"});
            });
        } else{
            this.setState({message:"Invalid mail adress, must be in x@y.z format"});
            return;
        }
        
    }

    render(){
        const {currentUser} = this.state;

        return(
            <div className="edit-form">
                {this.state.updated ? (
                    <div>
                        <h4>Updated successfully!</h4>
                        <Link to={"/"} className="btn btn-sucess">Main</Link>
                    </div>
                ) : (
                    <div>
                        <h4>User</h4>
                        {this.state.errmsg.length > 0 ? 
                                    (<div className="text-danger">{this.state.errmsg}</div>) : ""
                        }
                        <form>
                            <div className="form-group">
                                <label htmlFor="nom">Nom</label>
                                <input type="text" className="form-control" id="nom" value={currentUser.nom}
                                onChange={this.onChangeNom} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="prenom">Prenom</label>
                                <input type="text" className="form-control" id="prenom" value={currentUser.prenom}
                                onChange={this.onChangePrenom} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                {this.state.message.length > 0 ? 
                                    (<div className="text-danger">{this.state.message}</div>) : ""
                                }
                                <input type="email" className="form-control" id="email" value={currentUser.email}
                                onChange={this.onChangeEmail} />
                            </div>
                        </form>
                        <button type="submit" className="btn btn-success"
                        onClick={this.updateUser}>Save</button>     <Link to={"/"} className="btn btn-info">Cancel</Link>
                    </div>
                )}
            </div>
        );
    }



}