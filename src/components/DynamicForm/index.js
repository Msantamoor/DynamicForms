import React from 'react';
import ReactDom from 'react-dom';
import './form.css';

function validate(email, phone, password, cpassword) {
            return {
                email: email.length === 0,
                phone: phone.length === 0 || phone.length > 10,
                password: password.length === 0,
                cpassword: cpassword !== password
            }
        }



export default class DynamicForm extends React.Component {
    state = {
        
        fname: "",
        lname: "",   
        email: "",
        phone: "",
        age: "",
        password: "",
        cpassword: ""
    }
    constructor(props) {
        super(props);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { password, cpassword } = this.state;
        if (password !== cpassword) {
            alert("Passwords don't match");
        } else {
            if(this.props.onSubmit) this.props.onSubmit(this.state);
        }
    }
   
    onChange = (e, key) => {
        this.setState({
            [key]: this[key].value
        })
        
        
    }

   

    renderForm = () => {
        
        
        let fields = this.props.model;
        let formUI = fields.map((m) => {
            let key = m.key
            let type = m.type || "text";
            let props = m.props || {};

            return (
                <div key={key} className="form-group">
                    <label className="form-label"
                        key={"l" + m.key}
                        htmlFor={m.key}>
                        {m.label}
                    </label>
                    <input {...props}
                        ref={(key) => {this[m.key]=key}}
                        className="form-input"
                        type={type}
                        key={"i" + m.key}
                        onChange={(e) => {this.onChange(e, key)}}
                    />
                </div>

            );
        });
        return formUI;
        
    }

    

    render(){
        
        let title = this.props.title || "Dynamic Form";
        const errors = validate(this.state.email, this.state.phone, this.state.password, this.state.cpassword);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        return (
            <div className={this.props.className}>
                <h3>{title}</h3>
                <form className="dynamic-form" onSubmit={(e) => {this.onSubmit(e)}}>
                    {this.renderForm()}
                    <div className="form-group">
                        <button type="submit" disabled={!isEnabled}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}