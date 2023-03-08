import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import CustomLoadingButton from '../../components/form/CustomLoadingButton';
import CustomButton from '../../components/form/CustomButton';
import CustomSelect from '../../components/form/CustomSelect';
import CustomTextField from '../../components/form/CustomTextField';
import { adminStatusOptions, adminRoleOptions, adminTeamOptions, adminBatchOptions, adminShiftOptions } from '../../constants';
import userRequest from '../../requests/user-request';
import { useSelector } from 'react-redux';
import { getUser } from '../../reducks/users/selectors';


const AddUpdate = () => {
    const history = useHistory();
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(!!id);
    
    const [admin, setAdmin] = useState({
        name: '',
        employee_id: 0,
        status: '',
        role: '',
        team: '',
        password: '',
        confirm_password:'',
        shifts: 'n/a',
        batch: 'n/a'
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (id) {
            userRequest.find(id).then(res => {
                setAdmin(prev => ({
                    ...prev,
                    ...res
                }));
                setIsLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnchange = e => {
        const { name, value } = e.target;
        setAdmin(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = () => {
        setIsLoading(true);
        if (admin.password !== admin.confirm_password) {
            setErrors(prev => ({
                ...prev,
                confirm_password: ['Your password and confirmation password do not match.']
            }));
            setIsLoading(false);
            return;
        }
        if (id) {
            userRequest
                .update(id, admin)
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        } else {
            userRequest
                .store(admin)
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        }
    };
    const selector = useSelector(state => state);
    const user = getUser(selector);
    var dn = false;
    if(user.role==='member'){
        dn = true;
    }

    return (
        <>
            <Typography variant="h5" gutterBottom component="div" my={2}>
                {id ? 'Update' : 'Add'} an admin
            </Typography>

            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomTextField
                        name="name"
                        type= "text"
                        error={!!errors.name}
                        helperText={errors.name}
                        value={admin.name}
                        onChange={handleOnchange}
                        label="Username"
                        
                    />
                </Grid>

                <Grid item xs={3}>
                    <CustomTextField
                        disabled={dn}
                        name="email"
                        type = "email"
                        error={!!errors.email}
                        helperText={errors.email}
                        value={admin.email}
                        onChange={handleOnchange}
                        label="Email"
                    />
                </Grid>

                <Grid item xs={3}>
                    <CustomSelect
                        disabled={dn}
                        label="Status"
                        name="status"
                        error={!!errors.status}
                        helperText={errors.status}
                        selectedValue={admin.status}
                        onChange={handleOnchange}
                        options={adminStatusOptions}
                    />
                </Grid>

                <Grid item xs={3}>
                    <CustomSelect 
                        disabled={dn}
                        label="Role"
                        name="role"
                        error={!!errors.role}
                        helperText={errors.role}
                        selectedValue={admin.role}
                        onChange={handleOnchange}
                        options={adminRoleOptions}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        disabled={dn}
                        label="Team"
                        name="team"
                        error={!!errors.team}
                        helperText={errors.team}
                        selectedValue={admin.team}
                        onChange={handleOnchange}
                        options={adminTeamOptions}
                    />
                </Grid>
            {admin.team === 'engineer' &&
                <>
                <Grid item xs={3}>
                    <CustomSelect
                        disabled={dn}
                        label="Batch"
                        name="batch"
                        error={!!errors.batch}
                        helperText={errors.batch}
                        selectedValue={admin.batch}
                        onChange={handleOnchange}
                        options={adminBatchOptions}
                    />
                </Grid>
                <Grid item xs={3}>
                <CustomSelect
                    disabled={dn}
                    label="Shift"
                    name="shifts"
                    error={!!errors.shifts}
                    helperText={errors.shifts}
                    selectedValue={admin.shifts}
                    onChange={handleOnchange}
                    options={adminShiftOptions}
                />
            </Grid>
            </>
                }
                <Grid item xs={3}>
                    <CustomTextField
                        disabled={dn}
                        label="Emp ID"
                        name="employee_id"
                        error={!!errors.employee_id}
                        helperText={errors.employee_id}
                        value={admin.employee_id}
                        onChange={handleOnchange}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={6}>
                    <CustomTextField
                        name="password"
                        error={!!errors.password}
                        helperText={errors.password}
                        value={admin.password}
                        type="password"
                        onChange={handleOnchange}
                        label="Password"

                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="confirm_password"
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password}
                        value={admin.confirm_password}
                        type="password"
                        onChange={handleOnchange}
                        label="Confirm Password"
                    />
                </Grid>
            </Grid>

            <Stack spacing={2} direction="row">
                <CustomLoadingButton
                    onClick={onSubmit}
                    loading={isLoading}
                    variant="contained"
                    text={id ? 'Update' : 'Add'}
                ></CustomLoadingButton>
                <CustomButton text="Cancel" variant="outlined" onClick={() => history.goBack()} />
            </Stack>
        </>
    );
};

export default AddUpdate;
