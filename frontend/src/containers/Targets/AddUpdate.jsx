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
import { targetStatusOption, targetTypeOption } from '../../constants';
import targetRequest from '../../requests/target-request';
import userRequest from '../../requests/user-request';

const AddUpdate = () => {
    const history = useHistory();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(!!id);
    const [userOptions, setUserOptions] = useState([]);

    const [target, setTargets] = useState({
        user_id: { key: '', value: '' },
        status: '',
        type: '',
        note: '',
        target_number: '0',
        cohort: '',
        project_start_date: null,
        project_due_date: null,
        project_name: '',
        project_github_link: '',
        project_student_name: ''
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (id) {
            targetRequest.find(id).then(res => {
                setTargets({
                    ...res,
                    user_id: res.user_id ? { key: res.user_id.id, value: res.user_id.name } : null
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
        setTargets(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onChangeSearchSelect = (value, name) => {
        setTargets(prev => ({
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
        setTargets(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = () => {
        setIsLoading(true);
        if (id) {
            targetRequest
                .update(id, {
                    ...target,
                    user_id: target.user_id.key
                })
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        } else {
            targetRequest
                .store({
                    ...target,
                    user_id: target.user_id.key
                })
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        }
         
    };

    return (
        <>
            <Typography variant="h5" gutterBottom component="div" my={2}>
                {id ? 'Update' : 'Add'} a target
            </Typography>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={4}>
                    <CustomSearchSelect
                        label="Tutor Name"
                        name="user_id"
                        error={!!errors.user_id}
                        helperText={errors.user_id}
                        availableOptions={userOptions}
                        selectedValue={target.user_id}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getUsers({ name: e && e.target.value })}
                    />
                </Grid>

                <Grid item xs={4}>
                    <CustomSelect
                        label="Status"
                        name="status"
                        error={!!errors.status}
                        helperText={errors.status}
                        selectedValue={target.status}
                        onChange={handleOnchange}
                        options={targetStatusOption}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomSelect
                        label="Type "
                        name="type"
                        error={!!errors.type}
                        helperText={errors.type}
                        selectedValue={target.type}
                        onChange={handleOnchange}
                        options={targetTypeOption}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={4}>
                    <CustomTextField
                        label="Target Count"
                        name="target_number"
                        error={!!errors.target_number}
                        type="number"
                        helperText={errors.target_number}
                        value={target.target_number}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomTextField
                        name="cohort"
                        error={!!errors.cohort}
                        helperText={errors.cohort}
                        value={target.cohort}
                        onChange={handleOnchange}
                        label="Cohort"
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomTextField
                        name="project_name"
                        error={!!errors.project_name}
                        helperText={errors.project_name}
                        value={target.project_name}
                        onChange={handleOnchange}
                        label="Project Name"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={2}>
                    <CustomDateTimePicker
                        name="project_start_date"
                        label="Start Date"
                        error={!!errors.project_start_date}
                        helperText={errors.project_start_date}
                        value={target.project_start_date}
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomDateTimePicker
                        name="project_due_date"
                        label="Due Date"
                        error={!!errors.project_due_date}
                        helperText={errors.project_due_date}
                        value={target.project_due_date}
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomTextField
                        name="project_github_link"
                        error={!!errors.project_github_link}
                        helperText={errors.project_github_link}
                        value={target.project_github_link}
                        onChange={handleOnchange}
                        label=" GitHub Link "
                    />
                </Grid>

                <Grid item xs={4}>
                    <CustomTextField
                        name="project_student_name"
                        label=" Student Name"
                        error={!!errors.project_student_name}
                        helperText={errors.project_student_name}
                        value={target.project_student_name}
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
                        value={target.note}
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
