import db from './Firebase';
import React from 'react';
import {FieldValue, collection} from 'firebase/firestore';
import {ref, onValue } from 'firebase/database';
import {Table} from 'react-bootstrap';

export class Realtimedata extends React.Component {
    constructor() {
        super();
        this.state = {
            tableData: []
        }
    }

    componentDidMount() {
        const dbref = ref(db, 'User');
        onValue(dbref, (snapshot) => {
            let records = [];
            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let sdata = childSnapshot.val();
                records.push({"key": keyName, "data": sdata});
            });
            this.setState({tableData: records});
        });
    }

    render() {
    
        return (
            <table>
                <thead >
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Fullname</th>
                        <th>email</th>
                        <th>password</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.tableData.map((rowdata, index) => {
                        return (
                            <tr key={index}>
                                <td key={index}>{index}</td>
                                <td>{rowdata.data.username}</td>
                                <td>{rowdata.data.name}</td>
                                <td>{rowdata.data.email}</td>
                                <td>{rowdata.data.password}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )
    }
}