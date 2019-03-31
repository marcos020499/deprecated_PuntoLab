import React, { Component } from 'react'

export default class soporte extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            problema: ""
        }
    }

    onChange = (e) => {
        const { updateServiceData } = this.props;
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }, () => {
            updateServiceData(this.state)
        });
    }

    componentDidMount = () => {
        const { updateServiceData } = this.props;
        updateServiceData(this.state);
    }
    

    render() {

        const { problema } = this.state;

        return (
            <div className='row'>
                <div className="col-sm-12">
                    <div className="form-group mb-4">
                        <input type="text" className="form-control form-control frm_field" required value={problema} name="problema" onChange={this.onChange} />
                        <small className="form-text text-muted">Falla</small>
                    </div>
                </div>
            </div>
        )
    }
}
