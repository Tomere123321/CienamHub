import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

const AddMember = () => {
    const navigate = useNavigate();
    const [memberData, setMemberData] = useState({
        name: '',
        email: '',
        city: ''
    });
    const handleSubmit = async (event) => {
        const response = await axios.post('http://localhost:8000/members', memberData)
        let newMember = {
            _id: response.data,
            name: memberData.name,
            email: memberData.email,
            city: memberData.city
        };
        dispatch({ type: 'ADDMEMBER', payload: newMember });
        navigate('/mainPage/subscriptions/membersData')
    }
    return (
        <Container>
            <Card sx={{ padding: 1, marginTop: 2, background: '#B4C9C7', width: 500 }} elevation={3}>
                <CardMedia height='200'><h2 style={{ fontFamily: 'Comic Sans MS', color: '#4a6baf' }}>Add New Member</h2></CardMedia>
                <CardContent>
                    <TextField sx={{ padding: 1, marginTop: 0.5 }}
                        required label='Full Name' id='outlined-fullname'
                        onChange={(event) => setMemberData({ ...memberData, name: event.target.value })} /><br />
                    <TextField sx={{ padding: 1, marginTop: 0.5 }}
                        required label=' Email' id='outlined-last-email'
                        onChange={(event) => setMemberData({ ...memberData, email: event.target.value })} /><br />
                    <TextField sx={{ padding: 1, marginTop: 0.5 }}
                        required label=' City' id='outlined-last-city'
                        onChange={(event) => setMemberData({ ...memberData, city: event.target.value })} /><br />
                    <Button sx={{ padding: 1, marginTop: 2 }}
                        variant='outlined' type='submit' onClick={handleSubmit}>Save</Button>
                    <Button sx={{ padding: 1, marginTop: 2, marginLeft: 2 }}
                        variant='outlined' type='submit'
                        onClick={() => navigate('/mainPage/subscriptions/membersData')}>Cancel</Button>
                </CardContent>
            </Card>
        </Container >
    );
}
export default AddMember;
