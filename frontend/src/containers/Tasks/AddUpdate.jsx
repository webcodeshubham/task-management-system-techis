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
import {
    taskStatusOption,
    taskTypeOption,
    taskStudentSupportOptions,
    taskSessionFeedbackOption,
    taskInternalSupportOptions
} from '../../constants';
import taskRequest from '../../requests/task-request';
import userRequest from '../../requests/user-request';

const AddUpdate = () => {
    const history = useHistory();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(!!id);
    const [userOptions, setUserOptions] = useState([]);

    const [task, setTasks] = useState({
        user_id_assigned_by: { key: '', value: '' },
        user_id_assigned: { key: '', value: '' },
        duration: '0',
        status: '',
        name: '',
        type: '',
        note: '',
        student_support_type: '',
        start_date: null,
        due_date: null,
        session_topic: 'N/A',
        session_feedback: 'no',
        session_student_name: 'N/A',
        session_video_link: ''
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (id) {
            taskRequest.find(id).then(res => {
                setTasks({
                    ...res,
                    user_id_assigned_by: res.user_id_assigned_by
                        ? { key: res.user_id_assigned_by.id, value: res.user_id_assigned_by.name }
                        : null,
                    user_id_assigned: res.user_id_assigned
                        ? { key: res.user_id_assigned.id, value: res.user_id_assigned.name }
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
        setTasks(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onChangeSearchSelect = (value, name) => {
        setTasks(prev => ({
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
        setTasks(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = () => {
        setIsLoading(true);
        if (id) {
            taskRequest
                .update(id, {
                    ...task,
                    user_id_assigned_by: task.user_id_assigned_by.key,
                    user_id_assigned: task.user_id_assigned.key
                })
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        } else {
            taskRequest
                .store({
                    ...task,
                    user_id_assigned_by: task.user_id_assigned_by.key,
                    user_id_assigned: task.user_id_assigned.key
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
        task.user_id_assigned = { key: user.id, value: user.name }
        task.user_id_assigned_by = { key: user.id, value: user.name }
     }

    return (
        <>
            <Typography variant="h5" gutterBottom component="div" my={2}>
                {id ? 'Update' : 'Add'} a Task
            </Typography>
            <Grid container spacing={2} marginBottom={2}>
                {(user.team === 'engineer' && user.role === 'member') ? null : (
                    <>
                        <Grid item xs={4}>
                            <CustomSearchSelect
                                label="Assigned_by"
                                name="user_id_assigned_by"
                                error={!!errors.user_id_assigned_by}
                                helperText={errors.user_id_assigned_by}
                                availableOptions={userOptions}
                                selectedValue={task.user_id_assigned_by}
                                onChange={onChangeSearchSelect}
                                onTextChange={e => getUsers({ name: e && e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomSearchSelect
                                label="Assigned_to"
                                name="user_id_assigned"
                                error={!!errors.user_id_assigned}
                                helperText={errors.user_id_assigned}
                                availableOptions={userOptions}
                                selectedValue={task.user_id_assigned}
                                onChange={onChangeSearchSelect}
                                onTextChange={e => getUsers({ name: e && e.target.value })}
                            />
                        </Grid>
                    </>
                )
            }
                {user.team === 'engineer' && user.role === 'member' && (
                    <>
                        <Grid item xs={4}>
                            <CustomTextField label="Engineer Name" value={user.name} disabled />
                        </Grid>
                    </>
                )}

                <Grid item xs={4}>
                    <CustomSelect
                        label="Status"
                        name="status"
                        error={!!errors.status}
                        helperText={errors.status}
                        selectedValue={task.status}
                        onChange={handleOnchange}
                        options={taskStatusOption}
                    />
                </Grid>

                <Grid item xs={4}>
                    <CustomSelect
                        label="Type of Task"
                        name="type"
                        error={!!errors.type}
                        helperText={errors.type}
                        selectedValue={task.type}
                        onChange={handleOnchange}
                        options={taskTypeOption}
                    />
                </Grid>

                {task.type === 'student_support' && (
                    <>
                        <Grid item xs={4}>
                            <CustomSelect
                                label="Student Support Type"
                                name="student_support_type"
                                error={!!errors.student_support_type}
                                helperText={errors.student_support_type}
                                selectedValue={task.student_support_type}
                                onChange={handleOnchange}
                                options={taskStudentSupportOptions}
                            />
                        </Grid>
                    </>
                )}
                {task.type === 'internal_support' && (
                    <Grid item xs={4}>
                        <CustomSelect
                            label="Internal Support Type"
                            name="student_support_type"
                            error={!!errors.student_support_type}
                            helperText={errors.student_support_type}
                            selectedValue={task.student_support_type}
                            onChange={handleOnchange}
                            options={taskInternalSupportOptions}
                        />
                    </Grid>
                )}
                {(task.type === 'internal_support')? null : (
                    <>
                        <Grid item xs={4}>
                            <CustomTextField
                                name="session_student_name"
                                label=" Student Name"
                                error={!!errors.session_student_name}
                                helperText={errors.session_student_name}
                                value={task.session_student_name}
                                onChange={handleOnchange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField
                                name="session_topic"
                                error={!!errors.session_topic}
                                helperText={errors.session_topic}
                                value={task.session_topic}
                                onChange={handleOnchange}
                                label=" Topic "
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <CustomSelect
                                label="FeedBack Form"
                                name="session_feedback"
                                error={!!errors.session_feedback}
                                helperText={errors.session_feedback}
                                selectedValue={task.session_feedback}
                                onChange={handleOnchange}
                                options={taskSessionFeedbackOption}
                            />
                        </Grid>
                    </>
                )}
                <Grid item xs={4}>
                    <CustomTextField
                        name="session_video_link"
                        label="Session video link"
                        error={!!errors.session_video_link}
                        helperText={errors.session_video_link}
                        value={task.session_video_link}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomDateTimePicker
                        name="start_date"
                        label="Start Date"
                        error={!!errors.start_date}
                        helperText={errors.start_date}
                        value={task.start_date}
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomDateTimePicker
                        name="due_date"
                        label="Due Date"
                        error={!!errors.due_date}
                        helperText={errors.due_date}
                        value={task.due_date}
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomTextField
                        label="Duration (Minutes)"
                        name="duration"
                        error={!!errors.duration}
                        type="number"
                        helperText={errors.duration}
                        value={task.duration}
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
                        value={task.note}
                        placeholder="Note"
                        onChange={handleOnchange}
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
