import React, { Component } from "react";
import UserDataService from "../services/user.service";
import {Link} from "react-router-dom";

export default class Userlist extends Component{
    constructor(props){
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.search = this.search.bind(this);
        //this.onDeleteUser = this.onDeleteUser.bind(this);

        this.state = {
            users: [],
            currentUser: null,
            currentIndex: -1,
            search: ""
        };
    }

    componentDidMount(){
        this.retrieveUsers();
    }

    onChangeSearch(e){
        const search = e.target.value;

        this.state.state({
            search: search
        });
    }

    retrieveUsers(){
        UserDataService.getAll()
        .then(response => {
            this.setState({users: response.data});
            console.log(response.data);
        }).catch(e=>{
            console.log(e);
        })
    }

    onDeleteUser(user,index){
        if(window.confirm("Delete " + user.nom + "?")){
            /*let users = [...this.state.users];
            users.splice(index, 1);
            this.setState({users: users});*/
            let i = this.state.users.indexOf(user);
            this.state.users.splice(i, 1);
            this.setState(this.state.users);
            UserDataService.delete(user.id)
            .then(response => {
                console.log(response.data);
            }).catch(e=>{
                console.log(e);
            });
        }
        
    }

    handleChange = event =>{
        this.setState({search: event.target.value})
    };

    search(){
        
    }

    render(){
        const {search, users, currentUser, currentIndex} = this.state;
        const lowercasedSearch = search.toLowerCase();
        const searchedData = users.filter(item => {
            return Object.keys(item).some(key => item[key].toLowerCase().includes(lowercasedSearch)
            );
        });

        return(
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search"
                        value={search} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="col-md-10">
                    <h4>Users List</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">Prenom</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedData.map((user,index) => (
                                <tr>
                                    <td>{user.nom}</td>
                                        <td>{user.prenom}</td>
                                    <td>{user.email}</td>
                                    <td><Link to={"/user/" + user.id} className="btn btn-warning">Edit</Link>     <button className="btn btn-danger"
                                    onClick={(e)=>{
                                        e.stopPropagation(); 
                                        e.preventDefault();
                                    this.onDeleteUser(user,index)}}>Delete</button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }


}