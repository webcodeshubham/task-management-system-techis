import { Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import CustomTextArea from '../../components/form/CustomTextArea';
import CustomButton from '../../components/form/CustomButton';
import CustomSearchSelect from '../../components/form/CustomSearchSelect';
import CustomDateTimePicker from '../../components/form/CustomDateTimePicker';
import CustomLoadingButton from '../../components/form/CustomLoadingButton';
import CustomSelect from '../../components/form/CustomSelect';
import CustomTextField from '../../components/form/CustomTextField';
import { getUser } from '../../reducks/users/selectors';
import { useSelector } from 'react-redux';
import { leaveType, leaveStatus, leaveAppliedTo } from '../../constants';
import leaveRequest from '../../requests/leave-request';
import userRequest from '../../requests/user-request';

const AddUpdate = () => {
    const history = useHistory();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(!!id);
    const [userOptions, setUserOptions] = useState([]);

    const [leave, setLeave] = useState({
        leave_applied_by: { key: '', value: '' },
        leave_applicant_id: { key: '', value: '' },
        leave_type: '',
        leave_balance: '',
        from_date: '',
        to_date: '',
        duration: '',
        applied_to: '',
        created_at: '',
        updated_at: '',
        description: '',
        leave_status: ''
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (id) {
            leaveRequest.find(id).then(res => {
                setLeave({
                    ...res,
                    leave_applied_by: res.leave_applied_by
                        ? { key: res.leave_applied_by.id, value: res.leave_applied_by.name }
                        : null,
                    leave_applicant_id: res.leave_applicant_id
                        ? { key: res.leave_applicant_id.id, value: res.leave_applicant_id.name }
                        : null
                });

                setIsLoading(false);
                let userOpt = res.user
                    ? [
                          {
                              key: res.user.id,
                              value: res.user.name
                          }
                      ]
                    : [];
                setUserOptions(userOpt);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnchange = e => {
        const { name, value } = e.target;
        setLeave(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onChangeSearchSelect = (value, name) => {
        setLeave(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getUsers = async filter => {
        userRequest.index(filter).then(res => {
            let newOptions = res.results.length
                ? res.results.map(option => {
                      return {
                          key: option.id,
                          value: option.name
                      };
                  })
                : [];

            setUserOptions(newOptions);
        });
    };
    const onChangeDate = (value, name) => {
        setLeave(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = () => {
        setIsLoading(true);
        if (id) {
            leaveRequest
                .update(id, {
                    ...leave,
                    leave_applied_by: leave.leave_applied_by.key,
                    leave_applicant_id: leave.leave_applicant_id.key
                })
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        } else {
            leaveRequest
                .store({
                    ...leave,
                    leave_applied_by: leave.leave_applied_by.key,
                    leave_applicant_id: leave.leave_applicant_id.key
                })
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        }
    };

    const selector = useSelector(state => state);
    const user = getUser(selector);
    if (user.role === 'member' && user.team === 'engineer') {
        leave.leave_applied_by = { key: user.id, value: user.name };
        leave.leave_applied_by = { key: user.id, value: user.name };
    }

    return (
        <>
            <Typography variant="h5" gutterBottom component="div" my={2}>
                {id ? 'Update' : 'Add'} a leave
            </Typography>
            <Grid container spacing={2} marginBottom={2}>
                {user.team === 'engineer' && user.role === 'member' ? null : (
                    <>
                        <Grid item xs={4}>
                            <CustomSearchSelect
                                label="Applied_by"
                                name="leave_applied_by"
                                error={!!errors.leave_applied_by}
                                helperText={errors.leave_applied_by}
                                availableOptions={userOptions}
                                selectedValue={leave.leave_applied_by}
                                onChange={onChangeSearchSelect}
                                onTextChange={e => getUsers({ name: e && e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomSearchSelect
                                label="Applicant ID"
                                name="leave_applicant_id"
                                error={!!errors.leave_applicant_id}
                                helperText={errors.leave_applicant_id}
                                availableOptions={userOptions}
                                selectedValue={leave.leave_applicant_id}
                                onChange={onChangeSearchSelect}
                                onTextChange={e => getUsers({ name: e && e.target.value })}
                            />
                        </Grid>
                    </>
                )}
                {user.team === 'engineer' && user.role === 'member' && (
                    <>
                        <Grid item xs={4}>
                            <CustomTextField label="Engineer Name" value={user.name} disabled />
                        </Grid>
                    </>
                )}

                <Grid item xs={4}>
                    <CustomSelect
                        label="Leave Type"
                        name="leaveType"
                        error={!!errors.status}
                        helperText={errors.status}
                        selectedValue={leave.status}
                        onChange={handleOnchange}
                        options={leaveType}
                    />
                </Grid>

                <Grid item xs={4}>
                    <CustomSelect
                        label="Type of leave"
                        name="type"
                        error={!!errors.type}
                        helperText={errors.type}
                        selectedValue={leave.type}
                        onChange={handleOnchange}
                        options={leaveType}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomDateTimePicker
                        name="from_date"
                        label="From Date"
                        error={!!errors.start_date}
                        helperText={errors.start_date}
                        value={leave.start_date}
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomDateTimePicker
                        name="to_date"
                        label="To Date"
                        error={!!errors.due_date}
                        helperText={errors.due_date}
                        value={leave.due_date}
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomTextField
                        label="No. of Days(days)"
                        name="duration"
                        error={!!errors.duration}
                        type="number"
                        helperText={errors.duration}
                        value={leave.duration}
                        onChange={handleOnchange}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12}>
                    <CustomTextArea
                        name="note"
                        error={!!errors.note}
                        helperText={errors.note}
                        value={leave.note}
                        placeholder="Description and Responsibilities Assigned."
                        onChange={handleOnchange}
                    />
                </Grid>
            </Grid>
            <Stack spacing={2} direction="row">
                <CustomLoadingButton
                    onClick={onSubmit}
                    loading={isLoading}
                    variant="contained"
                    text={id ? 'Apply' : 'Add'}
                ></CustomLoadingButton>
                <CustomButton text="Cancel" variant="outlined" onClick={() => history.goBack()} />
            </Stack>
        </>
    );
};

export default AddUpdate;
